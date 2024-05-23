import usersStore from "./store/users-store";

export const UserApp = async(element) => {
    element.innerHTML = '...Loading';
    await usersStore.loadNextPage();
}