type IUser = {
    firstName:string,
    lastName:string,
    phone:string,
    email:string,
    password:string
}


type Login = {
    email:string,
    password:string
}

type UpdateUser = User & {
    userId:string
}