
const moment = require('moment')

//**FOR ADDING GCLOUD STORAGE */
//https://cloud.google.com/appengine/docs/flexible/using-cloud-storage?tab=node.js

// // These environment variables are set automatically on Google App Engine
// const {Storage} = require('@google-cloud/storage');

// // Instantiate a storage client
// const storage = new Storage();


// // A bucket is a container for objects (files).
// const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

//** END */

// Generates a 6 digit access code
function getAccessCode(){
    var min = 100000;
    var max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Uses request body & file to generate a list of values for create entries pool query
function getProjectEntryValues(req){

    //initiate list with request body data
    const project_entry = {
        EntryDate: getUTCDateTime(),
        EntryImage: getPublicUrl(req),
        EntryLatLong: req.body.EntryLatLong,
        ProjectsFK: parseInt(req.body.ProjectsFK),
        UsersFK: parseInt(req.body.UsersFK) //DUMMY VALUE getUserId(onid)
    }

    return Object.values(project_entry)

}

//Uses request body & file to generate a list of values for update entries pool query
function getProjectEntryUpdValues(req){
    const upd_project_entry = {
        EntryImage: getPublicUrl(req), 
        EntryLatLong: req.body.EntryLatLong, 
        IDProjectEntries: parseInt(req.params.id)
    }
    return Object.values(upd_project_entry)
}

//Generates today's date in UTC standard
function getUTCDateTime(){
    // get current date, convert to UTC for storage
    const curr_date = new Date(Date.now())
    const utc_date = moment(curr_date.toISOString()).format('YYYY-MM-DD hh:mm:ss')

    return utc_date
}

//**SKELETON FUNCTION FOR FUTURE IMAGE UPLOADS*** Upload file from upload folder to google cloud
//https://www.youtube.com/watch?v=srPXMt1Q0nY&ab_channel=Academind
//https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876
function getPublicUrl(req){

    // // Create a new blob in the bucket and upload the file data.
    // const blob = bucket.file(req.file.originalname);
    // const blobStream = blob.createWriteStream();

    // blobStream.on('error', err => {
    //     next(err);
    // });

    // blobStream.on('finish', () => {
    //     // The public URL can be used to directly access the file via HTTP.
    //     const publicUrl = format(
    //     `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    //     );
    //     res.status(200).send(publicUrl);
    // });

    // blobStream.end(req.file.buffer);


    //Take file from uploads folder & save it in cloud storage
    //Return the image url for accessing from the bucket
    const image_url = 'www.gcloud-bucket.' + req.file.originalname
    return image_url
}

function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
    return (false)
}

function IsString(str){
    if (typeof str === 'string' || str instanceof String)
    {
        return (true)
    }
    return (false)
}

module.exports = 
{
    getAccessCode,
    getProjectEntryValues,
    getProjectEntryUpdValues,
    getUTCDateTime,
    getPublicUrl,
    ValidateEmail,
    IsString
}