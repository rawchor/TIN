function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const dateOfBirth = document.getElementById('birthdate');
    const dighy = document.getElementById('dighy');
    const sailNumber = document.getElementById('sailNumber');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorDateOfBirth = document.getElementById('errorBirthdate');
    const errorDighy = document.getElementById('errorDighy');
    const errorSailNumber = document.getElementById('errorSailNumber');

    const errorSummary = document.getElementById('errorSummary');
    
    resetErrors([firstNameInput, lastNameInput, dateOfBirth, dighy, sailNumber], [errorFirstName, errorLastName, errorDateOfBirth, errorDighy, errorSailNumber], errorSummary);

    // flaga zmieniana w zależności od poprawności formularza
    let valid = true;

    // check if required
    // firstName validation
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    // firstName validation
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    // lastName validation
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    // dighy validation
    if (!checkRequired(dighy.value)) {
        valid = false;
        dighy.classList.add("error-input");
        errorDighy.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(dighy.value, 2, 60)) {
        valid = false;
        dighy.classList.add("error-input");
        errorDighy.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    // sailNumber validation
    if (!checkRequired(sailNumber.value)) {
        valid = false;
        sailNumber.classList.add("error-input");
        errorSailNumber.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(sailNumber.value, 2, 60)) {
        valid = false;
        sailNumber.classList.add("error-input");
        errorSailNumber.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
}