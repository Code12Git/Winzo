export type TopDeal = {
    id: number,
    img: string,
    name: string,
    email: string,
    transaction: number
}

export type Login = {
    email: string,
    password: string
}
export interface AuthError {
    email?: string,
    name?: string,
    username?: string,
    password?: string
}

export type User = {
    id: number;
    email: string;
    username: string;
    phone: string;
    Role: string;
    countryCode: string;
    name?: string;
}

export type Session = {
    id?: number;
    color: string;
    number: number;

};
