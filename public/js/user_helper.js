
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

function getUserJS(IDUser) {
    console.log('USER', IDUser)
    let link = '/users/'+ IDUser;
    console.log("link", link)
    let data = {
      id: IDUser
    };
    $.ajax({
      url: link,
      type: 'GET',
      // data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        // deleteRow(IDUser);
        console.log('YES')
        
        // window.location.reload();

      }
    });
}

function updateUserJS(IDUser, FirstName, LastName, Email) {
  console.log('USER', IDUser)
  console.log("LINE59 Helper", FirstName)
  let link = '/users/'+ IDUser;
  console.log("link", link)
  let data = {
    id: IDUser,
    FirstName: FirstName,
    LastName: LastName,
    Email: Email
  };
  $.ajax({
    url: link,
    type: 'PUT',
    // data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      // deleteRow(IDUser);
      console.log('YES')
      
      // window.location.reload();

    }
  });
}