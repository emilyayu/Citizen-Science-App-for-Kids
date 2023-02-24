//Edit Button Event
const editBtn = document.getElementById('editProjectBtn')
editBtn.addEventListener("click", (event) => {
    
    editDisplayOn()
    
});

//update project button ("done") click event
const updBtn = document.getElementById('updateProjectBtn')
updBtn.addEventListener("click", (event) => {


  const project_id = event.target.dataset.id

  //package data for request
  const project_values = ['ProjectName', 'ProjectType', 'ProjectDescription', 'ProjectImage']
  const project_data = generateDataObj(project_values)
  window.location.href = window.location.href;    // reloads the page. window.location.reload() doesn't work on chrome/firefox a lot of the times.

  //data validation
  if(!validateFormData(project_data)){
    return
  }

  sendPost(project_id, project_data)



});


function editDisplayOn(){

    const project_dash = document.getElementById("ProjectDash")
    const project_dash_edit = document.getElementById("ProjectDashEdit")

    //hide edit button
    editBtn.style = "display: none;"

    //show done button
    document.getElementById("updateProjectBtn").style = ""

    //change to regular dash
    project_dash.style = "display: none;"
    project_dash_edit.style = ""
    

    return
}

// function editDisplayOff(){

//     console.log("in else clause")
//     //change to regular dash
//     project_dash_edit.style = "display: none;"
//     project_dash.style = ""

//     //change button to done
//     editBtn.innerText = "Edit"

//     event.target.dataset.edit = "false"

//     return

// }



//generate js object with values from the form
function generateDataObj(values){
  let project = {}
  values.forEach(element => {
    project[element] = document.getElementById(element).value
  })

  return project
}

//---------INPUT VALIDATION-------


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

//listens for user input, if user adds input hide error message
const projectNameInput = document.getElementById('ProjectName')
projectNameInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

//listens for user input, if user adds input hide error message
const projectDescInput = document.getElementById('ProjectDescription')
projectDescInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

//--------- END----------

//------SENT UPDATE REQUEST------

//send http post request with data to the server
function sendPost(id, data){
  $.ajax({
    url: '/projects/' + id,
    type: 'PUT',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function() {
        window.location.reload(true)
    }
  });
}
