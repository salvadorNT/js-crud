import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";
import usersStore from "../store/users-store";

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {
    const user = new User(userLike);

    if (!user.firstName || user.lastName) {
        throw 'firstName and lastName are required.'
    }

    const userToSave = userModelToLocalhost(user);

    if (user.id) {
        throw 'Update not implemented'
    }
    const updatedUser = await createUser(userToSave);
    return updatedUser;
}

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await response.json();
    console.log(newUser);

    return newUser;
}