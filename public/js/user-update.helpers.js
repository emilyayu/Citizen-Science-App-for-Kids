//update student button
const updBtn = document.getElementById('updateUserBtn')
updBtn.addEventListener("click", (event) => {

  const user_id = event.target.dataset.id


  //package data for request
  const user_values = ['FirstName', 'LastName', 'Email', 'IsTeacher']
  const user_data = generateDataObj(user_values)

  //data validation
  if(!validateFormData(user_data)){
    return
  }

  sendPost(user_id, user_data)
  window.location.href = "/users" 
   
});

// updateUserButton

//listens for user input, if user adds input hide error message
const firstNameInput = document.getElementById('FirstName')
firstNameInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

//listens for user input, if user adds input hide error message
const lastNameInput = document.getElementById('LastName')
lastNameInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});

const emailInput = document.getElementById('Email')
emailInput.addEventListener("input", (event) => {
  hideInputError(event.target)

});


//send http post request with data to the server
function sendPost(id, data){
    $.ajax({
      url: '/users/' + id,
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function() {
      }
    });
  }
  