const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
// const { processFileMiddleware } = require("../middleware/helper");
const url = require('url')
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("project-image-bucket");

const upload = async (req, res) => {
    console.log('-1')
    try {
        console.log('0', req.body)
        // req.file = url.pathToFileURL(req.body.ProjectImage)
        await processFile(req, res);
        console.log('1', req.file)
        if (!req.file) {
            console.log('no')
            return res.status(400).send({ message: "Please upload a file!" });
        }
        console.log('2', req.body)

        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
        console.log('3')
        blobStream.on("error", (err) => {
            res.status(500).send({ message: err.message });
        });
        console.log('4')
        blobStream.on("finish", async (data) => {
            // Create URL for directly file access via HTTP.
            console.log("4.4", bucket.name, blob.name)
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            console.log('5')
            try {
                // Make the file public
                await bucket.file(req.file.originalname).makePublic();
            } catch {
                console.log('6')
                return res.status(500).send({
                message:
                    `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                url: publicUrl,
                });
            }
            console.log('7')
            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
                url: publicUrl,
            });
        });

        blobStream.end(req.file.buffer);
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
        }
      
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};
  
const getListFiles = async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        let fileInfos = [];
    
        files.forEach((file) => {
            fileInfos.push({
                name: file.name,
                url: file.metadata.mediaLink,
            });
        });
    
        res.status(200).send(fileInfos);
    } catch (err) {
        console.log(err);
    
        res.status(500).send({
            message: "Unable to read list of files!",
        });
    }
};

const download = async (req, res) => {
    try {
        const [metaData] = await bucket.file(req.params.name).getMetadata();
        res.redirect(metaData.mediaLink);
        
    } catch (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
};
  