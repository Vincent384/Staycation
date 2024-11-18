type ValidateProps = {
    newPassword: string,
    checkPassword: string,
    setError: React.Dispatch<React.SetStateAction<RegisterForm>>
  }
  
  export function validateChangePassword({ newPassword, checkPassword, setError }: ValidateProps): boolean {
    setError((prev) => ({
      ...prev,
      password: ''
    }));
  
    if (newPassword.trim() === '') {
      setError((prev) => ({
        ...prev,
        password: 'Skriv ditt lösenord'
      }));
      return false;
    } else if (newPassword.length < 6) {
      setError((prev) => ({
        ...prev,
        password: 'Lösenordet måste vara minst 6 tecken långt'
      }));
      return false;
    } else if (!/[A-Za-z]/.test(newPassword)) {
      setError((prev) => ({
        ...prev,
        password: 'Lösenordet måste innehålla minst en bokstav'
      }));
      return false;
    } else if (!/\d/.test(newPassword)) {
      setError((prev) => ({
        ...prev,
        password: 'Lösenordet måste innehålla minst en siffra'
      }));
      return false;
    }
  
    if (newPassword !== checkPassword) {
      setError((prev) => ({
        ...prev,
        password: 'Lösenorden matchar inte'
      }));
      return false;
    }
  
    return true;
  }
  