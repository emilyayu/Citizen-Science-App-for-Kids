
//Submit Project Event
const addBtn = document.getElementById('addProjectBtn')
addBtn.addEventListener("click", () => {

  //package data for request
  const project_values = ['ProjectName', 'ProjectType', 'ProjectDescription', 'ProjectImage']
  const project_data = generateDataObj(project_values)
  
  //data validation
  if(!validateFormData(project_data)){
    return
  }

  sendPost(project_data)

});

//listens for user input, if user adds input hide error message
const projectNameInput = document.getElementById('ProjectName')
projectNameInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

const projectDescInput = document.getElementById('ProjectDescription')
projectDescInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

//generate js object with values from the form
function generateDataObj(values){
  let project = {}
  values.forEach(element => {
    project[element] = document.getElementById(element).value
  })

  return project
}

//check for empty values in object properties
function validateFormData(data){
  let isValid = true

  for(const property in data){
    if(data[property] == ''){
      showInputError(property)
      isValid = false
    }
  }

  return isValid
}

function showInputError(property){
  const err_message = document.getElementById(property).nextElementSibling
  err_message.style.display = ''

}

function hideInputError(property){
  const err_message = property.nextElementSibling
  err_message.style.display = 'none'
}

//send http post request with data to the server
function sendPost(data){
  $.ajax({
    url: '/projects',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function() {
        window.location.href = "/projects"
    }
  });
}