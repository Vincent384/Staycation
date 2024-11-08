



export function validateUpdateUser(form:UpdateUser,setError:React.Dispatch<React.SetStateAction<RegisterForm>>):boolean{

    let firstNameError = ''
    let lastNameError = ''
    let phoneError = ''
    let emailError = ''

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(form.firstName.trim() === ''){
        firstNameError = 'Fyll i ditt Förnamn'
    }

    if(form.lastName.trim() === ''){
        lastNameError = 'Fyll i ditt Efternamn'
    }

    
    if(form.phone.trim() === ''){
        phoneError = 'Fyll i ditt telefonnummer'
    }

    if(form.email.trim() === '') {
        emailError = 'Skriv en fullständigt e-postadress'
    }else if(!emailRegex.test(form.email))
    {
      emailError = 'Skriv ett fullständigt e-postadress'
    }

    
    if(emailError || firstNameError || lastNameError || phoneError){
        setError({
            firstName:firstNameError,
            lastName:lastNameError,
            phone:phoneError,
            email:emailError,
            password:''
        })
        return false
    }
     return true
    }