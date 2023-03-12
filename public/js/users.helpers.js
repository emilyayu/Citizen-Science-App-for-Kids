


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

