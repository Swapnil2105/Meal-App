// script.js
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', async (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm.length > 0) {
        const meals = await searchMeals(searchTerm);
        displaySearchResults(meals);
    } else {
        searchResults.innerHTML = '';
    }
});

async function searchMeals(term) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await response.json();
    return data.meals;
}

function displaySearchResults(meals) {
    searchResults.innerHTML = '';
    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <button class="favorite-btn" data-mealid="${meal.idMeal}">Add to Favorites</button>
            <a href="meal.html?id=${meal.idMeal}" class="meal-details-link">More Details</a>
        `;
        searchResults.appendChild(mealCard);
    });

    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', addToFavorites);
    });
}

async function addToFavorites(e) {
    const mealId = e.target.dataset.mealid;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(mealId)) {
        favorites.push(mealId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to Favorites');
    } else {
        alert('This meal is already in Favorites');
    }
}

