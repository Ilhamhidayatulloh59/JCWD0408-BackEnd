import { sign } from 'jsonwebtoken'

export interface IPayload {
    id: number;
    role: string;
}

const key = process.env.SECRET_KEY || ''

export const createToken = (payload: IPayload) => {
    const token = sign(payload, key, { expiresIn: '5m' })
    return token
}