



export function validateRgister(form:RegisterForm,setError:React.Dispatch<React.SetStateAction<RegisterForm>>):boolean{

    let firstNameError = ''
    let lastNameError = ''
    let phoneError = ''
    let emailError = ''
    let passwordError = ''

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


    if(form.password.trim() === '') {
        passwordError = 'Skriv ditt lösenord'
    }

    if (form.password.trim() === '') {
        passwordError = 'Skriv ditt lösenord';
      } else if (form.password.length < 6) {
        passwordError = 'Lösenordet måste vara minst 6 tecken långt';
      } else if (!/[A-Za-z]/.test(form.password)) {
        passwordError = 'Lösenordet måste innehålla minst en bokstav';
      } else if (!/\d/.test(form.password)) {
        passwordError = 'Lösenordet måste innehålla minst en siffra';
      }
    
    if(emailError || passwordError || firstNameError || lastNameError || phoneError){
        setError({
            firstName:firstNameError,
            lastName:lastNameError,
            phone:phoneError,
            email:emailError,
            password:passwordError,
        })
        return false
    }
     return true
    }