export interface UserApiResponse {
    id:number;
    name:string;
    email:string;
    address: {city:string};
    company: {name:string};
}

export interface User {
    id:string;
    name:string;
    email:string;
    city:string;
    company:string;
}