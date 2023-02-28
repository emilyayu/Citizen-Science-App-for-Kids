
// console.log("Specific-project-entreis-helper")

function deleteEntriesJS(IDProjectEntries) {
    let link = '/users/'+IDProjectEntries;
    let data = {
      id: IDProjectEntries
    };
    // console.log(data)
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
function deleteRow(IDProjectEntries){

    let table = document.getElementById("specific-project-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == IDProjectEntries) {
            table.deleteRow(i);
            break;
       }
    }

}