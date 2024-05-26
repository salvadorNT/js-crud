import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {
    const data = await loadUsersByPage(state.currentPage + 1);
    if (data.next === null && data.last === state.currentPage) return;
    state.currentPage += 1;
    state.users = data.data;
}

const loadPreviousPage = async () => {
    if (state.currentPage === 1) return;
    try {
        const data = await loadUsersByPage(state.currentPage - 1);
        if (data.next === null && data.first === state.currentPage) return;
        state.currentPage -= 1;
        state.users = data.data;
    } catch (error) {
        console.error(error);
    }

}

/**
 * 
 * @param {User} user 
 */
const onUserChanged = (updatedUser) => {

    let wasFound = false;

    state.users = state.users.map(user => {
        if (user.id === updatedUser.id) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser)
    }
}

const reloadPage = async () => {
    const data = await loadUsersByPage(state.currentPage);

    if (data.pages === 0) {
        state.users = [];
        return;
    };
    state.users = data.data;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * 
     * @returns Number
     */
    getCurrentPage: () => state.currentPage,
}