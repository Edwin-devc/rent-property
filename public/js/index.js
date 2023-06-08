const logIn = document.getElementById('log-in');
const signUp = document.getElementById('sign-up');

signUp.addEventListener('click', () => {
    document.getElementById('signup-form').className += ' d-block';
    document.getElementById('signup-form').classList.remove('d-none');
    document.getElementById('login-form').className += ' d-none';
})

logIn.addEventListener('click', () => {
    document.getElementById('login-form').className += ' d-block';
    document.getElementById('login-form').classList.remove('d-none');
    document.getElementById('signup-form').className += ' d-none';
})