type HostType = {
    name:string,
    avatar:string,
    userId:string
}

type HostData = {
    name:string,
    avatar:string,
}

type HostDataWithId = HostData & {
    _id:string
}