



//Submit Project Event
const delBtns = document.querySelectorAll('.delete-button')

delBtns.forEach((btn) => {
  // console.log(btn)
  btn.addEventListener('click', (event)=>{
    const dataset = event.target.dataset
    //alertbox do you want to delete?
    if (!window.confirm(`Do you really want to delete "${dataset.name}" ?`)) {
      return
    }
    sendDeleteReq(dataset.id)
  })
})


function sendDeleteReq(IDProject){
  let link = '/projects/'+ IDProject;
  let data = {
    id: IDProject
  };
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(data) {
      // window.location.reload();
    }
  });
}


