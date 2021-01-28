/**
 * This file will be exporting to the outsite pages for linking.
 * 
 */

// import { getPage, getcardListTemplate, HandleSaveCard, handleEditCard, handleDeleteCard, getCardDetailsById } from './modules/manage-cards/card-manager.js';
import { sectionIds } from './utils/constants.js';
// import { validateCardNumber } from './utils/card-validator.js'

import { getMailListString, getMailbodyString, filterMailList, getMailListStringForFilter } from './modules/mail/mail-list.js'


const renderMailingList = (sectionId, mailString)=> {
	const mailListSection = document.getElementById(sectionId);
	mailListSection.innerHTML = mailString;
}
const createMailList = async sectionId => {
	const mailListString = await getMailListString();
	renderMailingList(sectionId, mailListString);
}
const handleMailCardClick = async (event) =>{
	const id = event.currentTarget.dataset.mailId;
	const mailBody = await getMailbodyString(id);
	const mailBodySection = document.getElementById(sectionIds.MAIL_BODY);
	mailBodySection.innerHTML = mailBody;
	_cleanUp();
	const markFavButtonEl = document.querySelector(`.${sectionIds.MARK_FAV_BUTTON_LIST}`);
	markFavButtonEl.addEventListener('click', HandleMarkFavClick);

}

const HandleMarkFavClick = event => {
	const id = event.currentTarget.dataset.mailId;
	const elem = document.querySelector(`.mail-${id}`);
	elem.classList.add('fav-mail');
}

const handleMailFilterClick = async event => {
	const filterBy = event.currentTarget.dataset.filterPredicate;
	const isFiltered = await filterMailList(filterBy);
	if(!isFiltered) {
		console.error('ERROR : while filtering data')
		return;
	}
	const mailListString = await getMailListStringForFilter(); // TODO : Craete new method to filter the and give the string 
	renderMailList(sectionIds.MAIL_LIST, mailListString );

}

//TODO : correct the method
const _cleanUp = () => {
	document.getElementById(sectionIds.MAIL_BODY).classList.remove('dispNone');
	const bodyEl = document.querySelectorAll('.body');
	bodyEl.forEach(el => el.classList.add('displayNone'));


}
const initScript = async () => {
	document.getElementById(sectionIds.MAIL_BODY).classList.add('dispNone');
	await createMailList(sectionIds.MAIL_LIST)
	
	// attaching event listeners
	const mailItemEl = document.querySelectorAll('.mail-item');
	mailItemEl.forEach( elem => elem.addEventListener('click', handleMailCardClick))

	const filterEl = document.querySelectorAll('.filter-list');
	// filterEl.forEach(elem => elem.addEventListener('click', handleMailFilterClick))


}

document.onload = initScript();

