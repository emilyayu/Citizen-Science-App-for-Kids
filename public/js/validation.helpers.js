


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
