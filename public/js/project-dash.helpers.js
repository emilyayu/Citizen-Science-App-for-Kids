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
  const project_values = ['ProjectName', 'ProjectType', 'ProjectDescription', 'ProjectImage', 'ProjectInstructions']
  const project_data = generateDataObj(project_values)

  //data validation
  if(!validateFormData(project_data)){
    return
  }

  sendPost(project_id, project_data)
  window.location.href = window.location.href;    // reloads the page. window.location.reload() doesn't work on chrome/firefox a lot of the times.


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

//------SENT UPDATE REQUEST------

//send http post request with data to the server
function sendPost(id, data){
  $.ajax({
    url: '/projects/' + id,
    type: 'PUT',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function() {
        // window.location.redirect(true)
    }
  });
}
