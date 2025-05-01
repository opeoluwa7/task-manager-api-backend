import { comparePasswords, encryptPassword } from "../bcrypt"


export const encryptedPassword = async (password: string) => {
    const result = await encryptPassword(password)

    return result
}

export const matchPasswords = async (password: string, storedHashedPassword: string) => {
    const result = await comparePasswords(password, storedHashedPassword)

    return result
}


