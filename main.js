window.addEventListener('load', () => {
    const form = document.querySelector('#form');

    for (let element of form) {
        element.addEventListener('focusout', (e) => {
            validateField(e);
        });

        element.addEventListener('input', (e) => {
            validateField(e);
        });
    };
})

function validateField(e) {
    const element = e.target;
    const parentEl = element.parentElement;
    const errorHelp = element.nextElementSibling;

    const validity = element.validity;

    let message;

    switch (element.id) {
        case 'first_name':
            message = "First name is required";
            break;
        case 'last_name':
            message = "Last name is required";
            break;
        case 'email':
            message = 'Please enter a valid email address'
            break;
        case 'pwd':
            message = 'A password is required';
            break;
        case 'pwd-conf':
            message = validatePassword() || 'You must confirm you password';
            break;
    }

    if (validity.valueMissing || validity.typeMismatch || validatePassword()) {
        parentEl.classList.add('invalid');
        parentEl.classList.remove('valid');
        errorHelp.textContent = message;
    } else {
        parentEl.classList.add('valid');
        parentEl.classList.remove('invalid');
        errorHelp.textContent = '';
    }
}

function validatePassword() {
    const pwd = document.querySelector('#pwd');
    const pwdConf = document.querySelector('#pwd-conf');

    let message = null;

    
    if (pwd.value != pwdConf.value) {
        message = 'Passwords do not match';
    }

    console.log(message);

    return message;
}