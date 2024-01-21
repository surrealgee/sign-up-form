window.addEventListener('load', () => {
    const form = document.querySelector('#form');

    for (let element of form) {
        element.addEventListener('focusout', (e) => {
            validateField(e);

            /* Adds Input listener to field after the user has gotten out of the field. */
            element.addEventListener('input', (e) => {
                validateField(e);
            });
        });
    };

    form.addEventListener('submit', (e) => {
        if (e.checkValidity) {
            e.preventDefault();
            console.log('Sent')
        } else {
            e.preventDefault();
            console.log('Some fields are invalid, please correct!')
        }
    });
})



function validateField(e) {
    const element = e.target;
    const validity = element.validity;

    switch (element.id) {
        case 'first_name':
            validateName(element, 'First name is required');
            break;
        case 'last_name':
            validateName(element, 'Last name is required');
            break;
        case 'email':
            validateEmail(element);
            break;
        case 'pwd':
            validatePassword(element);
            break;
        case 'pwd-conf':
            confirmPassword(element);
            break;
    }
}

function validateName(element, message) {
    if (element.value != '') {
        isValid(element, 'Name is valid');
    } else {
        isInvalid(element, message)
    }
}

function validateEmail(element) {
    const emailRegex = /^(\w+)([\.\-\_])?(\w+)@([a-zA-Z]+)(\.[a-zA-Z]{2,3})(\.[a-zA-Z]{2,3})?$/gm;

    if (emailRegex.test(element.value)) {
        isValid(element, 'Email is valid');
    } else {
        isInvalid(element, 'Please enter a valid email address');
    }
}

function validatePassword(element) {
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/g

    if (pwdRegex.test(element.value)) {
        isValid(element, 'Password is valid');
    } else {
        isInvalid(element, 'Must include 8-16 characters, an uppercase/lowercase and a number');
    }
}

function confirmPassword(element) {
    const password = document.querySelector('#pwd');
    const confirmation = element;

    if (password.value != confirmation.value) {
        isInvalid(element, 'Passwords do not match');
    } else if (confirmation.value === '') {
        isInvalid(element, 'Please confirm your password');
    } else {
        isValid(element, 'Password is valid');
    }

}

function isValid(element, message) {
    element.parentElement.classList.remove('invalid')
    element.parentElement.classList.add('valid')
    element.nextElementSibling.textContent = message || '';
}

function isInvalid(element, message) {
    element.parentElement.classList.remove('valid')
    element.parentElement.classList.add('invalid')
    element.nextElementSibling.textContent = message;
}