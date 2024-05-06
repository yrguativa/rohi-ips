export interface IUserAuthState {
    status: string | undefined | null,
    uid?: string | undefined | null,
    email?: string | undefined | null,
    displayName?: string | undefined | null,
    photoURL?: string | undefined | null,
    errorMessage?: string | undefined | null,
    roles?: IRolesAuth
}

export interface IUserRegisterAuth {
    email: string,
    password: string,
    displayName?: string,
    isRadioUser?: boolean
    isAdmin?: boolean
}

export interface IRolesAuth {
    isRadioUser: boolean,
    isAccountant: boolean,
    isAdmin: boolean
}