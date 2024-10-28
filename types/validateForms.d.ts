

type LoginForm = {
    email:string,
    password:string
}

type RegisterForm = LoginForm & {
    firstName:string,
    lastName:string,
    phone:string
}