import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async (page = 1) => {
    if (page <= 0) throw new Error(`Invalid page number: ${page}`)
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    const users = data.data.map(localhostUserToModel);
    data.data=users;
    return data;
}