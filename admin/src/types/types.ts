
export type Login = {
    phone: string,
    password: string
}
export interface AuthError {
    name?: string,
    password?: string
}

export type User = {
    id: number;
    phone: string;
    Role: string;
    countryCode: string;
    name?: string;
}

export type Session = {
    id?: number;
    color: string;


};

export type TransactionDetails = {
    balance: number;
    betAmount: number;
    deposit: number;
    withdrawal: number;
    id: number;
    transactionId: string;
    user: {
        id: number;
        name: string;
        phone: string;
    };
    createdAt: string
};

export type ScreenshotDetails = {
    id: number;
    screenshot: string;
    userId: number;
    phone: string;
    user?: User;
    createdAt: string;
};
export type BalanceDetails = {
    id: number,
    name: string,
    phone: string,

    balance: number
}

export interface Metadata {
    title: string;
    description: string;
}