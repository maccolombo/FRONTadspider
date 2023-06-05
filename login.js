// login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Check if token is already saved in browser on page load
    const token = localStorage.getItem('token');

    if (token) {
        // If token is found, redirect to popup.html
        window.location.href = 'popup.html';
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.classList.add('button-loading'); // Add loading class to button

        fetch('https://adspider.herokuapp.com/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include', // needed for sending cookies with fetch
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.ok) {
                    // If the response is 200 OK, parse the JSON response and handle it here
                    response.json().then(data => {
                        // Save token to localStorage
                        localStorage.setItem('token', data.token);
                        // Redirect to popup.html on success
                        window.location.href = 'popup.html';
                    });
                } else {
                    // If the response is not 200 OK, handle the error here
                    response.json().then(error => {
                        const errorMessage = document.getElementById('error-message');
                        errorMessage.style.color = 'red';
                        errorMessage.innerHTML = `${error.message}`;
                    });
                    // throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                const errorMessage = document.getElementById('error-message');
                errorMessage.style.color = 'red';
                errorMessage.innerHTML = `Erro no servidor, tentar novamente em alguns minutos`;
            })
            .finally(() => {
                submitButton.classList.remove('button-loading'); // Remove loading class from button
            });
    });
});
