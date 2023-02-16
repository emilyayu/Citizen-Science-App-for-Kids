
function deleteProjectJS(IDProject) {
    let link = '/projects/'+ IDProject;
    let data = {
      id: IDProject
    };
    console.log(data)
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(IDProject);
        window.location.reload();
      }
    });

}

function deleteRow(IDProject){

    let table = document.getElementById("project-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == IDProject) {
            table.deleteRow(i);
            break;
       }
    }

}