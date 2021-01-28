/** 
 * This is our storage for the appliction, 
 * later it will be replaced by actual database 
 * and real APIs to store the information.
 */



const saveDataToStorage = (list) => {
    localStorage.setItem("MailList", JSON.stringify(list));
}

const getDataFromStorage = _ => {
    const _cardsString = localStorage.getItem('MailList');
    const cardsList = _cardsString ? JSON.parse(_cardsString) : [];
    return cardsList;
}

export {
    saveDataToStorage,
    getDataFromStorage
}