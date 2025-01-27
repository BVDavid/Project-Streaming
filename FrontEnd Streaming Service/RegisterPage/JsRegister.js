document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const message = document.getElementById('message');
    message.style.display = 'none';

    // Crearea unui obiect URLSearchParams pentru a trimite datele
    const formData = new URLSearchParams();
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);

    try {
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  // Asigură-te că folosești acest tip de content
            },
            body: formData.toString(),  // Datele sunt trimise în format URL-encoded
        });

        let result;
        if (response.ok) {
            result = await response.json();
        } else {
            result = { message: 'A apărut o eroare!' }; // Folosește mesajul default dacă nu există unul în răspuns
        }

        if (response.ok) {
            message.style.display = 'block';
            message.className = 'success-message';
            message.textContent = 'Cont creat cu succes!';
            setTimeout(() => {
                window.location.href = '/login';  // Redirect după succes
            }, 2000);
        } else {
            message.style.display = 'block';
            message.className = 'error-message';
            message.textContent = result.message || 'A apărut o eroare!';
        }
    } catch (error) {
        message.style.display = 'block';
        message.className = 'error-message';
        message.textContent = 'Eroare de rețea! Vă rugăm să încercați din nou.';
    }
});
