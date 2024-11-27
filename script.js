let currentPage = 1;
const limit = 10; // Número de elementos por página

// Manejo del formulario de inicio de sesión
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const messageDiv = document.getElementById('message');

    // Definir las credenciales correctas
    const correctUsername = 'USER';
    const correctPassword = 'PASS';

    // Verificar las credenciales
    if (username === correctUsername && password === correctPassword) {
        messageDiv.textContent = 'Ingreso correcto. Bienvenido, ' + username + '!';
        messageDiv.style.color = 'green'; // Cambiar el color del mensaje a verde

        // Simulación de envío de correo
        console.log('Correo enviado: El usuario ' + username + ' ha ingresado a la página web.');

        // Redirigir a la página principal después de 2 segundos
        setTimeout(() => {
            window.location.href = 'pagina1.html'; // Cambia a la URL de la página principal
        }, 2000);
    } else {
        messageDiv.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
        messageDiv.style.color = 'red'; // Color del mensaje de error
    }
});

// Cargar imagen de perro al hacer clic
document.getElementById('load-dog')?.addEventListener('click', async () => {
    const dogContainer = document.getElementById('dog-container');
    dogContainer.innerHTML = '<p>Cargando...</p>';

    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        const dogImage = document.createElement('img');
        dogImage.src = data.message;
        dogImage.alt = 'Muestra de perro';
        dogImage.style.width = '300px'; // Ajusta el tamaño de la imagen
        dogImage.style.margin = '10px'; // Margen entre imágenes

        dogContainer.innerHTML = ''; // Limpiar el contenedor
        dogContainer.appendChild(dogImage); // Agregar la imagen al contenedor
    } catch (error) {
        dogContainer.innerHTML = '<p>Error al cargar la imagen.</p>';
        console.error(error);
    }
});

// Cargar datos aleatorios de Dragon Ball al hacer clic
document.getElementById('fetchData')?.addEventListener('click', async () => {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '<p>Cargando datos...</p>';

    try {
        const response = await fetch(`https://dragonball-api.com/api/characters?page=${currentPage}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API: ' + response.status);
        }

        const data = await response.json();
        const characters = data.items;

        if (characters.length > 0) {
            const character = characters[Math.floor(Math.random() * characters.length)];
            dataDisplay.innerHTML = `
                <h3>${character.name}</h3>
                <p>${character.description || 'Sin descripción disponible.'}</p>
                <img src="${character.image}" alt="${character.name}" style="width: 200px; margin-top: 10px;">
            `;
            updatePagination(data.meta);
        } else {
            dataDisplay.innerHTML = '<p>No se encontraron personajes.</p>';
        }
    } catch (error) {
        dataDisplay.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
        console.error(error);
    }
});

// Función para actualizar la paginación
function updatePagination(meta) {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= meta.totalPages;

    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            document.getElementById('fetchData').click(); // Recargar datos
        }
    };

    nextButton.onclick = () => {
        if (currentPage < meta.totalPages) {
            currentPage++;
            document.getElementById('fetchData').click(); // Recargar datos
        }
    };
}












