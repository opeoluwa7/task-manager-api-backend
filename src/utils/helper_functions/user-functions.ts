import userQueries from "../../config/db_queries/userQueries";
import CheckUserWithIdType from "../../types/userTypes/CheckUserWithIdType";
import CheckUserWithEmailType from "../../types/userTypes/CheckWithEmailType";
import CreateUserType from "../../types/userTypes/CreateUserType";
import DeleteUserType from "../../types/userTypes/DeleteUserType";
import UpdateUserType from "../../types/userTypes/UpdateUserType";


const createUser = async (data: CreateUserType) => {
    const result =  await userQueries.createUser(data);

    return result
}

const checkUserWithEmail = async (data: CheckUserWithEmailType) => {
    const result = await userQueries.getUserWithEmail(data);

    return result
}

const checkUserWithId = async (data: CheckUserWithIdType) => {
    const result = await userQueries.getUserWithId(data)

    return result
}

const updateUserInfo = async (data: UpdateUserType) => {
    const result = await userQueries.updateUser(data)

    return result
}

const deleteUserInfo = async (data: DeleteUserType) => {
    const result =  await userQueries.deleteUser(data);

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
