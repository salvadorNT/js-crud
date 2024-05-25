import modalHtml from './render-modal.html?raw'
import './render-modal.css'


let modal, form;

export const showModal = () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */
export const renderModal = (element, callback) => {
    if (modal) return;
    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const userLike = {};
        userLike['isActive'] = false;
        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = +value;
                continue;
            }
            if (key === 'isActive') {
                
                userLike[key] = (value === 'on') ? true : false;
                continue
            }
            userLike[key] = value;
        }
        await callback(userLike);
        hideModal();
    })

    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        }
    })

    element.append(modal);
}