


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