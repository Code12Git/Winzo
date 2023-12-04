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

export type TransactionDetails = {
    balance: number;
    betAmount: number;
    deposit: number;
    withdrawal: number;
    id: number;
    transactionId: string;
    user: {
        email: string;
        id: number;
        name: string;
        username: string;
    };
};

export type ScreenshotDetails = {
    id: number;
    screenshot: string;
    userId: number;
    user?: User;
    createdAt: string;
};
export type BalanceDetails = {
    id: number,
    email: string,
    name: string,
    username: string,
    balance: number
}

export interface Metadata {
    title: string;
    description: string;
}