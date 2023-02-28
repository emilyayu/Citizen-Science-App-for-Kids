


//generate js object with values from the form
function generateDataObj(values){
    let user = {}
    console.log(values)
    values.forEach(element => {
      console.log("HELPER - validation", element)
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
        if(!validateEmail(data[property])){
          showInputError(property)
          isValid = false
        }   
      }

      if(property == 'EntryLatLong'){
        const latitude = document.getElementById('EntryLatitude').value
        const longitude = document.getElementById('EntryLongitude').value

        if(latitude == ''){
            showInputError('EntryLatitude')
            isValid = false
        }

        if(!validateLatitude(latitude)){
            showInputError('EntryLatitude')
            isValid = false
          }  

        if(longitude == ''){
            showInputError('EntryLongitude')
            isValid = false
        }

        if(!validateLongitude(longitude)){
            showInputError('EntryLongitude')
            isValid = false
          }  

      }
    }
    return isValid
  }
  
  const between = (x, min, max) => {
    return x >= min && x <= max
  }

  function validateLatitude(latitude){
    if (!between(Number(latitude), -90, 90)){
        return false
    }
    return true
  }

  function validateLongitude(longitude){
    if (!between(Number(longitude), -180, 180)){
        return false
    }
    return true
    
    }
  
  function validateEmail(email){
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
