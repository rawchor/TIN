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
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
}