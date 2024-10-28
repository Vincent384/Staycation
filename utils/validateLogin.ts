
export function validateLogin(form:LoginForm,setError:React.Dispatch<React.SetStateAction<LoginForm>>):boolean{

    let emailError = ''
    let passwordError = ''
    let userNameError = ''

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!emailRegex.test(form.email)) {
      emailError = 'Please enter a valid email address'
    }
  

    if(form.email.trim() === '') {
        emailError = 'Skriv en fullständigt e-postadress'
    }

    if(form.password.trim() === '') {
        passwordError = 'Skriv ditt lösenord'
    }
    
    if(emailError || passwordError || userNameError){
        setError({
            email:emailError,
            password:passwordError,
        })
        return false
    }
     return true
    }