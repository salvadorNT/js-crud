import { User } from "../models/user";

/**
 * 
 * @param {User} user 
 * @returns {}
 */
export const userModelToLocalhost = (user) => {

    const {
        avatar,
        balance,
        isActive,
        firstName,
        lastName,
        gender,
        id
    } = user;

    return {
        isActive,
        balance,
        avatar,
        first_name: firstName,
        last_name: lastName,
        gender,
    }
}