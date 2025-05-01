import userQueries from "../../config/db_queries/userQueries";


const createUser = async (name: string, email: string, password: string, isVerified: boolean) => {
    const result =  await userQueries.createUser(name, email, password, isVerified);

    return result
}

const checkUserWithEmail = async (email: string) => {
    const result = await userQueries.getUserWithEmail(email);

    return result
}

const checkUserWithId = async (user_id: number) => {
    const result = await userQueries.getUserWithId(user_id)

    return result
}

const updateUserInfo = async (name: string, email: string, password: string, user_id: number) => {
    const result = await userQueries.updateUser(name, email, password, user_id)

    return result
}

const deleteUserInfo = async (user_id: number) => {
    const result =  await userQueries.deleteUser(user_id);

    return result
}

const userFn = {
    createUser,
    checkUserWithEmail,
    checkUserWithId,
    updateUserInfo,
    deleteUserInfo
}

export default userFn
