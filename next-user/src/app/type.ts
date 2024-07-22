export interface UserInput {
    username: string;
    email: string;
    password: string;
}

export interface IUser extends UserInput {
    id: number;
}