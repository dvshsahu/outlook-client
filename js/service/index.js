
const getDataFromAPI = async (URL) => {
    const res = await fetch(URL)
        .then(response => response.json());
    return res;
}


export {
    getDataFromAPI
}