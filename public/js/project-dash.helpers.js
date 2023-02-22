//Edit Button Event
const editBtn = document.getElementById('editProjectBtn')
editBtn.addEventListener("click", (event) => {
    
    toggleEditDisplay(event)
    
});

function toggleEditDisplay(event){

    const edit_ctrl = event.target.dataset.edit
    console.log(edit_ctrl)

    const project_dash = document.getElementById("ProjectDash")
    const project_dash_edit = document.getElementById("ProjectDashEdit")

    //if false, toggle to true
    if(edit_ctrl == "false"){
        editDisplayOn(event, project_dash, project_dash_edit)
        
    } else {
        editDisplayOff(event, project_dash, project_dash_edit)
    }

    return
}


function editDisplayOn(event, project_dash, project_dash_edit){
    console.log("in edit display on")
    //change to regular dash
    project_dash.style = "display: none;"
    project_dash_edit.style = ""
    
    //change button to done
    editBtn.innerText = "Done"
    
    event.target.dataset.edit = "true"

    return

}

function editDisplayOff(event, project_dash, project_dash_edit){

    console.log("in else clause")
    //change to regular dash
    project_dash_edit.style = "display: none;"
    project_dash.style = ""

    //change button to done
    editBtn.innerText = "Edit"

    event.target.dataset.edit = "false"

    return

}

//Submit Project Event
const updBtn = document.getElementById('updateProjectBtn')
updBtn.addEventListener("click", (event) => {
  const project_id = event.target.dataset.id
  console.log(typeof project_id)
  //package data for request
  const project_values = ['ProjectName', 'ProjectType', 'ProjectDescription', 'ProjectImage']
  const project_data = generateDataObj(project_values)

  //data validation
  if(!validateFormData(project_data)){
    return
  }

  sendPost(project_id, project_data)

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
function sendPost(id, data){
  $.ajax({
    url: '/projects/' + id,
    type: 'PUT',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function() {
        window.location.reload();
    }
  });
}