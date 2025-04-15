import bcrypt from "bcrypt";

export const encryptPassword = async (password: string) => {
    try {
        const salt = 10;
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error
    }
}

export const comparePasswords = async (inputPassword: string, storedHashedPassword: string) => {
    try {
        const match = await bcrypt.compare(inputPassword, storedHashedPassword);
        return match;
    } catch (error) {
        console.error("Passwords don\'t match:", error);
        throw error
    }
}

