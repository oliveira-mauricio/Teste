export interface LoginReq {
    email: string,
    password: string
}

export interface LoginRes {
    email: string,
    token: string,
}

export interface LogoutReq {
    token: string
}

export interface RegisterReq {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface RegisterRes {
    user: {
        id: string
        name: string,
        email: string,
        role: 'user'|'admin',
        created_at: string,
        updated_ad: string,
        email_verified_at: string
    }
}