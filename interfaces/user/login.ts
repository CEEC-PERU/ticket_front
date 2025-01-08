export interface LoginResponse {
    code?: number;
    msg?: string;
    token?: string;
    possibleAttempts?: number
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    user_id: number;
    email: string;
    role_id: number;
    is_active: boolean;
    expired_at?: null;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserInfo {
    id?: number;
    email: string;
    role_id: number;
    userProfile?: Profile
}

export interface Profile {
   profile_id: number;
    name : string;
    last_name : string;
    user_id: number;
}