document.addEventListener('DOMContentLoaded', () => {
    const collectionList = document.getElementById('collection-list');
    const filmTitleInput = document.getElementById('film-title');
    const addForm = document.getElementById('add-form');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const API_KEY = 'your_api_key_here'; // Wstaw swój klucz API z OMDB

    // Pobieranie danych z LocalStorage i wyświetlanie
    function loadCollection() {
        const collection = JSON.parse(localStorage.getItem('collection')) || [];
        collectionList.innerHTML = '';
        collection.forEach(film => {
            const li = document.createElement('li');
            li.innerHTML = `${film.title} <button class="remove-button">Usuń</button>`;
            li.querySelector('.remove-button').addEventListener('click', () => removeFromCollection(film));
            collectionList.appendChild(li);
        });
    }

    // Dodawanie elementu do kolekcji
    function addToCollection(title) {
        const collection = JSON.parse(localStorage.getItem('collection')) || [];
        collection.push({ title });
        localStorage.setItem('collection', JSON.stringify(collection));
        loadCollection();
    }

    // Usuwanie elementu z kolekcji
    function removeFromCollection(filmToRemove) {
        let collection = JSON.parse(localStorage.getItem('collection')) || [];
        collection = collection.filter(film => film.title !== filmToRemove.title);
        localStorage.setItem('collection', JSON.stringify(collection));
        loadCollection();
    }

    // Obsługa formularza
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = filmTitleInput.value.trim();
        if (title) {
            addToCollection(title);
            filmTitleInput.value = '';
        }
    });

    // Wyszukiwanie filmów z API
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetch(`http://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.Response === "True") {
                        alert(`Znaleziono film: ${data.Title}`);
                    } else {
                        alert("Film nie został znaleziony.");
                    }
                })
                .catch(error => {
                    alert("Błąd połączenia z API.");
                });
        }
    });

    // Ładowanie kolekcji po załadowaniu strony
    loadCollection();
});
