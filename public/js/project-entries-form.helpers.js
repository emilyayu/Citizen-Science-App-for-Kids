// Source: Email Validation regex example
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

// source: convert json object to form data
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects

//Submit user Event
const addBtn = document.getElementById('addEntryBtn')
addBtn.addEventListener("click", (event) => {
  const project_id = addBtn.dataset.id

  //package data for request
  const user_values = ['EntryImage', 'EntryLatLong', 'ProjectsFK', 'UsersFK']

  const user_data = generateEntryObj(user_values)

//   data validation
  if(!validateFormData(user_data)){
    return
  }

  const form = convertToFormData(user_data)
  sendPost(form)
  window.location.href = "/project-entries/" + project_id
    // event.preventDefault()

});

function generateEntryObj(values){
    let user = {}
    values.forEach(element => {
        
        if(element == 'EntryImage'){
            const EntryImage = document.getElementById(element).files[0]
            if(EntryImage){
                user[element] = EntryImage
            }else{
                user[element] = ''
            }

        } else if(element == 'EntryLatLong'){
            user[element] = generateLatLong()

        } else {
            user[element] = document.getElementById(element).value
        }
    
    })
  
    return user
}

function generateLatLong(){
    const lat = document.getElementById('EntryLatitude').value
    const long = document.getElementById('EntryLongitude').value

    return `POINT(${lat} ${long})`

}

//listens for user input, if user adds input hide error message
const studentInput = document.getElementById('UsersFK')
studentInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

//listens for user input, if user adds input hide error message
const latInput = document.getElementById('EntryLatitude')
latInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

const longInput = document.getElementById('EntryLongitude')
longInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

const imageInput = document.getElementById('EntryImage')
imageInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

function convertToFormData(data){
    const form = new FormData();

    for(property in data){
        form.append(property, data[property])
    }

    // printForm(form)
    return form
    
}

//function for testing form construction
function printForm(form){
        for (var pair of form.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
}

//send http post request with data to the server
function sendPost(form){
    
  $.ajax({
    url: '/project-entries',
    type: 'POST',
    data: form,
    processData: false, 
    contentType: false,
    success: function() {
        window.location.href = "/project-entries/56" 
    }
  });
  
}