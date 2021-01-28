import { getDataFromStorage } from './local-storage.js';

const findMailItemById = (id) => {
    const data = getDataFromStorage();
    if(!data) return {};
    const item = data.find(item => item.id == id)
    return item;
}

const formatDate = date => {
    if(!date) return
    return new Date(date)
}

export {
    findMailItemById,
    formatDate
}