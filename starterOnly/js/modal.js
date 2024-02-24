function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}





// launch modal form
function launchModal() {
	const modal = document.querySelector(".bground");
	modal.style.display = "block";
	let messageValidateForm=document.getElementById('messageValidateForm');
	messageValidateForm.style.display = "none";
}



//close modal
function closeModal() {
	let form=document.getElementsByName('reserve');
	let messageValidateForm=document.getElementById('messageValidateForm');
	form[0].reset()
	form[0].style.display = "block";
	messageValidateForm.style.display = "none";

	const modal = document.querySelector(".bground");
	modal.style.display = "none";
}

//fonction d'initialisation des événements de la modal
function inti_event() {
	const btnInscription = document.querySelectorAll(".modal-btn");
	const modalCloseBtn = document.querySelectorAll(".close");
	const modalCloseValidateFormBtn = document.querySelectorAll(".closeValidateForm");
	
	btnInscription.forEach((btn) => btn.addEventListener("click", launchModal));
	modalCloseBtn.forEach((btn) => btn.addEventListener("click",closeModal));
	modalCloseValidateFormBtn.forEach((btn) => btn.addEventListener("click",closeModal));
}

// fonction d'initialisation de la page
function main(tata) {
	inti_event();
}

main();
