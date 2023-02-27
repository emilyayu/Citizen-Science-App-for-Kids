


// Source: Email Validation regex example
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript


//Submit user Event
const addBtn = document.getElementById('addStudentBtn')
addBtn.addEventListener("click", () => {

  //package data for request
  const user_values = ['FirstName', 'LastName', 'Email', 'IsTeacher']
  const user_data = generateDataObj(user_values)

  
  //data validation
  if(!validateFormData(user_data)){
    return
  }

  sendPost(user_data)

});

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

//generate js object with values from the form
function generateDataObj(values){
  let user = {}
  values.forEach(element => {
    user[element] = document.getElementById(element).value
  })

  return user
}

//check for empty values in object properties
function validateFormData(data){
  let isValid = true

  for(const property in data){
    if(data[property] == ''){
      showInputError(property)
      isValid = false
    }

    if(property == 'Email'){
      if(!ValidateEmail(data[property])){
        showInputError(property)
        isValid = false
      }
      
    }
  }
  return isValid
}


function ValidateEmail(email){
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
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
    url: '/users',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function() {
      window.location.reload();
    }
  });
}

function deleteUserJS(IDUser) {
    let link = '/users/'+IDUser;
    let data = {
      id: IDUser
    };
    console.log(data)
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(IDUser);
        window.location.reload();
      }
    });

}
function deleteRow(IDUser){

    let table = document.getElementById("student-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == IDUser) {
            table.deleteRow(i);
            break;
       }
    }

}