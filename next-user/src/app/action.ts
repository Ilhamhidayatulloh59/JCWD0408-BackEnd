'use server'

import { UserInput } from "./type"

const base_url = "http://localhost:8000/api"

export const onRegister = async (data: UserInput) => {
    const res = await fetch(base_url + '/users', {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    
    const result = await res.json()
    return { result, ok: res.ok }
}

export const onLogin = async (email: string, password: string) => {
    const res = await fetch(base_url + '/users/sign-in', {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    })

    const result = await res.json()
    return { result, ok: res.ok }
}