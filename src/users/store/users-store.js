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
    if (state.currentPage===1) return;
    try {
        const data = await loadUsersByPage(state.currentPage - 1);
        if (data.next === null && data.first === state.currentPage) return;
        state.currentPage -= 1;
        state.users = data.data;
    } catch (error) {
        console.error(error);
    }

}

const onUserChanged = () => {
    throw new Error('Not implemented');
}

const reloadPage = () => {
    throw new Error('Not implemented');
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