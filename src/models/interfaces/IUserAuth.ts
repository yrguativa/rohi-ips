export interface IUserAuthState {
    status: string | undefined | null,
    uid?: string | undefined | null,
    email?: string | undefined | null,
    displayName?: string | undefined | null,
    photoURL?: string | undefined | null,
    errorMessage?: string | undefined | null,
}

export interface IUserRegisterAuth {
    email: string,
    password: string,
    displayName?: string,
}
