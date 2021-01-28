
import { getDataFromStorage, saveDataToStorage } from '../../utils/local-storage.js';
import { getMailList, getMailBody} from './../../service/mail-service.js';

import { findMailItemById, formatDate } from './../../utils/helper.js';

const _createMailListFromData = list => {
		let mailString = '<div class="mail-list-container">'
		list.map(mail => mailString+= _getTempate(mail));
		mailString += '</div>';
    return mailString;
}

const _getTempate = mail => {
	const mailContent = `
			<div data-mail-id="${mail.id}" class="mail-item mail-${mail.id}">
				<div class="avatar"><div>${mail.from.name[0]}</div></div>
				<div class="mail-content">
					<div class="sender">From :  <span> ${mail.from.name} &nbsp; ${mail.from.email} </span> </div>
					<div class="subject">Subject :  <span> ${mail.subject} </span> </div>
					<div class="body">${mail.short_description}</div>
					<span class="date">${mail.date}</span>
					<span class="favourite"> ${mail.fav ? 'Favourite': ''}</span>
				</div>
			</div>
		`
	return mailContent;
}

const _createMailBodyFromData = ({mail, body}) => {
	const formattedDate = formatDate(mail.date)
	let mailString = `
		<section>
			<div>${mail.from.name}</div>
			<div>${formattedDate}</div>
			<button data-mail-id="${mail.id}" class="mark-fav">Mark as Favourite</button>
			${body.body}
	</section>
	`
	return mailString;
}


const getMailListString = async () => {
	const mailListData = await getMailList();
	const data = mailListData.list;
	saveDataToStorage(data);
    const mailListString = _createMailListFromData(data);
    return mailListString;
}


const getMailbodyString = async (id) => {
	const body = await getMailBody(id);
	const mail = findMailItemById(id);
	let mailContentBody = _createMailBodyFromData({ mail, body})
	return mailContentBody;
}

const filterMailList = filterBy => {
	const data = getDataFromStorage();
	const res = data.filter(item => item[filterBy] == filterBy)
	return res;
}

const getMailListStringForFilter = () => {
	return; // TODO : Implement the method, it will take the data from local storage and render the list again and return
}
export {
	getMailListString,
	getMailbodyString,
	filterMailList,
	getMailListStringForFilter

}