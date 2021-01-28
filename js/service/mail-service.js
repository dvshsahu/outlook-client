import {getDataFromAPI} from './index.js' 
import { API_URL } from './../utils/constants.js';


const getMailList = async _ => {
    const _mailList = await getDataFromAPI(API_URL.MAIL_LIST)
    return _mailList;
}

const getMailBody = (id) => {
    const _mailbody = getDataFromAPI(API_URL.MAIL_BODY+id)
    return _mailbody;
}

export {
    getMailList,
    getMailBody
}