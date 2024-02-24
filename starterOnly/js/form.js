function main() {
	initEvent();
	initForm();
}

main();


// 1/ vérifier les autres champs
// 2/ vérifier l'émail avec un regexp
// 3/ Ajouter un évenement pour que à chaque saisie on contrôle les champs (BLUR)

// DOM Elements
/*
const FORM_DATA = document.querySelectorAll(".formData");

function inti_event() {
	const btnSubmit= document.querySelectorAll(".btn-submit");
	btnSubmit.forEach((btn) => btn.addEventListener("click",(e)=>submitForm(e)));

}

function submitForm(event) {
	event.preventDefault();
	console.log('submitForm');

	if( checkInputFirstName()==true) {
		console.log('Il y a une erreur');
		return;
	}

	console.log('OK');
}

function checkInputFirstName() {
	let isError=false;
	let input=document.getElementById('first');
	
	removeError(input);

	if(input.value=="" || input.value.length < 5) {
		setError(input,'Merci de corriger le prénom');
		isError=true;
	}

	return isError;

}

function setError(input, message) {
	let inputParent= input.parentElement;
	inputParent.setAttribute('data-error', message);
	inputParent.setAttribute('data-error-visible', 'true');
}

function removeError(input) {
	let inputParent= input.parentElement;
	inputParent.setAttribute('data-error', '');
	inputParent.setAttribute('data-error-visible', 'false');
}


function main() {
	inti_event();
}

main();*/


/*
const first = document.getElementById("first")
const last = document.getElementById("last")
const email = document.getElementById("email")

const form = document.getElementById("form")
const error = document.getElementById("error")


	const prev = form.addEventListener("submit",  (e) => {
	e.preventDefault()
})

if (first.value === "" || first.value == null) {
	error.value = "Une erreur"
	prev()
}

if (first.length < 5) {
	error.value = "Une erreur"
	console.log("plus")
	prev()
}
*/


function checkFirstName() {
	return checkInput("first", "Le prénom est incorrect")
}
function checkLastName() {
	return checkInput("last", "Le nom est incorrect")
}

function checkBirthdate() {
	const input = document.getElementById('birthdate')

	hideMessageError(input);
	if (input.value === "" || input.value == null || input.value.length != 10) {
		input.focus();
		showMessageError(input, 'La date de naissance n\'est pas valide');
		/*const first = document.getElementById("first")
		first.style.borderColor = 'red';
		errorFirst.textContent = 'Please enter at least 2 alphabetical characters.'; */
		return false;
	}
	if (!isDateValid(input.value)) {
		showMessageError(input, 'La date de naissance n\'est pas valide');
		return false;
	}
	return isAdult('birthdate');



}

function isDateValid(dateStr) {
	return !isNaN(new Date(dateStr));
}

function isAdult(birthdateId) {
	const birthdate = document.getElementById(birthdateId);
	const enteredDate = new Date(birthdate.value);
	const today = new Date();

	let ageDiff = today.getFullYear() - enteredDate.getFullYear();
	const monthDiff = today.getMonth() - enteredDate.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < enteredDate.getDate())) {
		ageDiff--;
	}
	hideMessageError(birthdate);
	if (birthdate.value.length > 10 && birthdate.vaue.length === null) {
		console.error("Invalid input length");
		showMessageError(birthdate, "Invalid input length");
		return false;
	}
	console.log(ageDiff);
	if (ageDiff < 18) {
		showMessageError(birthdate, "Not an adult")
		return false;
	}
	if (ageDiff > 100) {
		showMessageError(birthdate, "too old")
		return false;
	}
	return true;
}

function checkEmail() {
	let retour = checkInput("email", "Le mail est incorrect")
	if (!retour) {
		return false;
	}
	return isMail("email", "Le format du mail est incorrect");
}

function checkCGU() {
	const checkbox1 = document.getElementById('checkbox1');
	hideMessageError(checkbox1)

	if (!checkbox1.checked) {
		showMessageError(checkbox1, "Please accept the terms and conditions.");
		return false;
	}
	return true;
}


function checkInput(inputId, errorMessage) {
	const input = document.getElementById(inputId)

	hideMessageError(input);
	if (input.value === "" || input.value == null || input.value.length <= 2) {
		input.focus();
		showMessageError(input, errorMessage);

		return false;
	}
	return true;
}

function isMail(inputId, errorMessage) {
	const input = document.getElementById(inputId);
	hideMessageError(input);
	if (!input.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
		input.focus();
		showMessageError(input, errorMessage);
		return false
	}
	return true;
}


function checkQuantity() {
	return quantityValue("quantity", "La quantité est incorrect")
}

function quantityValue(inputId, errorMessage) {
	const input = document.getElementById(inputId)

	hideMessageError(input);
	if (input.value === "" || input.value == null) {
		input.focus();
		showMessageError(input, errorMessage);

		return false;
	}
	return true;
}

function checkLocation() {
    const radios = document.getElementsByName('location');
    let checked = false;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            checked = true;
            break;
        }
    }
	locationError('location1','Merci de sélectionner une location',checked)
    return checked;
}

function locationError(inputId, errorMessage,locationsSelected) {
    const input = document.getElementById(inputId);
    if (!locationsSelected) {
        showMessageError(input, errorMessage);
    }
    hideMessageError(input);
}





function checkForm() {
	if (checkFirstName() && checkLastName() && checkEmail() && checkBirthdate() && checkQuantity()   && checkLocation() && checkCGU()) {
		enabledBtnSubmit(true);
	} else {
		enabledBtnSubmit(false);
	}



}

function initEvent() {
	const first = document.getElementById("first")
	first.addEventListener("keyup", checkForm);

	const last = document.getElementById("last")
	last.addEventListener("keyup", checkForm);

	const email = document.getElementById("email")
	email.addEventListener("keyup", checkForm)

	const birthdate = document.getElementById("birthdate")
	birthdate.addEventListener("keyup", checkForm)

	const quantity = document.getElementById("quantity")
	quantity.addEventListener("change", checkForm);

	const radioBtns = document.getElementsByName('location');
    radioBtns.forEach(btn => btn.addEventListener("change", checkForm)); // Use "change" event for radio buttons

	/*const radioBtn = document.getElementsByName('location');
	radioBtn.addEventListener("keyup", checkForm) */

	const checkbox = document.getElementById("checkbox1")
	checkbox.addEventListener("click", checkForm)

	const form = document.getElementById("form_submit")

	form.addEventListener("click", (e) => {
		validForm(e);
	})

}

function validForm(e) {
	e.preventDefault();
	console.log('Formulaire validé');

	let form=document.getElementsByName('reserve');
	let messageValidateForm=document.getElementById('messageValidateForm');
	form[0].reset()
	form[0].style.display = "none";
	messageValidateForm.style.display = "block";

}

function initForm() {
	enabledBtnSubmit(false);
}

function enabledBtnSubmit(isEnabled) {
	const btn = document.querySelector(".btn-submit");
	if (isEnabled) {
		// Button is enabled
		btn.disabled = false;
		btn.style.backgroundColor = 'red'; // Set your desired enabled color
	} else {
		// Button is disabled
		btn.disabled = true;
		btn.style.backgroundColor = 'grey'; // Set your desired disabled color
	}
	btn.disabled = !isEnabled;
}



function showMessageError(input, message) {
	let parent = input.parentElement;
	parent.setAttribute('data-error', message);
	parent.setAttribute('data-error-visible', 'true');
}

function hideMessageError(input) {
	let parent = input.parentElement;
	parent.setAttribute('data-error-visible', 'false');
}





