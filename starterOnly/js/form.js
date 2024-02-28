function main() {
	initEvent();
	initForm();
}

main();



// Fonction pour vérifier le champ du prénom

function checkFirstName() {
	return checkInput("first", "Le prénom est incorrect")
}

// Fonction pour vérifier le champ du nom de famille

function checkLastName() {
	return checkInput("last", "Le nom est incorrect")
}

// Fonction pour vérifier le champ de la date de naissance

function checkBirthdate() {
	const input = document.getElementById('birthdate')

	hideMessageError(input);
	if (input.value === "" || input.value == null || input.value.length != 10) {
		showMessageError(input, 'La date de naissance n\'est pas valide');

		return false;
	}
	if (!isDateValid(input.value)) {
		showMessageError(input, 'La date de naissance n\'est pas valide');
		return false;
	}
	return isAdult('birthdate');



}

// Fonction pour vérifier si une date est valide

function isDateValid(dateStr) {
	return !isNaN(new Date(dateStr));
}

// Fonction pour vérifier si l'utilisateur est majeur en fonction de sa date de naissance

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

// Fonction pour vérifier le champ de l'e-mail

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

// Fonction pour vérifier si une valeur d'entrée est valide

function checkInput(inputId, errorMessage) {
	const input = document.getElementById(inputId)

	hideMessageError(input);
	if (input.value === "" || input.value == null || input.value.length <= 2) {
		showMessageError(input, errorMessage);

		return false;
	}
	return true;
}

// Fonction pour vérifier si un e-mail est valide

function isMail(inputId, errorMessage) {
	const input = document.getElementById(inputId);
	hideMessageError(input);
	if (!input.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
		showMessageError(input, errorMessage);
		return false
	}
	return true;
}

// Fonction pour vérifier le champ de la quantité

function checkQuantity() {
	return quantityValue("quantity", "La quantité est incorrect")
}

// Fonction pour vérifier la valeur du champ de la quantité

function quantityValue(inputId, errorMessage) {
	const input = document.getElementById(inputId)

	hideMessageError(input);
	if (input.value === "" || input.value == null) {
		showMessageError(input, errorMessage);

		return false;
	}
	return true;
}

// Fonction pour vérifier si une localisation est sélectionnée

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

// Fonction pour afficher un message d'erreur si aucune localisation n'est sélectionnée

function locationError(inputId, errorMessage,locationsSelected) {
    const input = document.getElementById(inputId);
    if (!locationsSelected) {
        showMessageError(input, errorMessage);
    }
    hideMessageError(input);
}



// Fonction pour vérifier l'ensemble du formulaire

function checkForm() {
	if (checkFirstName() && checkLastName() && checkEmail() && checkBirthdate() && checkQuantity()   && checkLocation() && checkCGU()) {
		enabledBtnSubmit(true);
	} else {
		enabledBtnSubmit(false);
	}
}

// Fonction pour initialiser les événements du formulaire

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
    radioBtns.forEach(btn => btn.addEventListener("change", checkForm)); 

	const checkbox = document.getElementById("checkbox1")
	checkbox.addEventListener("click", checkForm)

	const form = document.getElementById("form_submit")

	form.addEventListener("click", (e) => {
		validForm(e); // Valider le formulaire lors du clic sur le bouton de soumission
	})

}

// Fonction pour valider le formulaire

function validForm(e) {
	e.preventDefault(); // Empêcher le comportement par défaut du formulaire
	console.log('Formulaire validé');

	let form=document.getElementsByName('reserve');
	let messageValidateForm=document.getElementById('messageValidateForm');
	form[0].reset() // Réinitialiser le formulaire après la soumission
	form[0].style.display = "none"; // Masquer le formulaire après la soumission
	messageValidateForm.style.display = "block"; // Afficher un message de validation du formulaire

}


// Fonction pour initialiser le formulaire

function initForm() {
	enabledBtnSubmit(false); // Désactiver le bouton de soumission au chargement de la page
}


// Fonction pour activer ou désactiver le bouton de soumission

function enabledBtnSubmit(isEnabled) {
	const btn = document.querySelector(".btn-submit");
	if (isEnabled) {
		// Le bouton est activé
		btn.disabled = false;
		btn.style.backgroundColor = 'red'; 
	} else {
		// Le bouton est désactivé
		btn.disabled = true;
		btn.style.backgroundColor = 'grey'; 
	}
	btn.disabled = !isEnabled;
}


// Fonction pour afficher un message d'erreur sous le champ concerné

function showMessageError(input, message) {
	let parent = input.parentElement;
	parent.setAttribute('data-error', message);
	parent.setAttribute('data-error-visible', 'true');
}


// Fonction pour masquer le message d'erreur sous le champ concerné

function hideMessageError(input) {
	let parent = input.parentElement;
	parent.setAttribute('data-error-visible', 'false');
}





