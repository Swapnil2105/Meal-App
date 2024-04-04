// favorites.js
document.addEventListener('DOMContentLoaded', () => {
    displayFavoriteMeals();
});

function displayFavoriteMeals() {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorite meals yet!</p>';
    } else {
        favoritesContainer.innerHTML = '';
        favorites.forEach(async mealId => {
            const meal = await getMealDetails(mealId);
            const favoriteMeal = document.createElement('div');
            favoriteMeal.classList.add('favorite-meal');
            favoriteMeal.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <button class="remove-btn" data-mealid="${meal.idMeal}">Remove from Favorites</button>
            `;
            favoritesContainer.appendChild(favoriteMeal);
        });
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromFavorites);
        });
    }
}

function removeFromFavorites(e) {
    const mealId = e.target.dataset.mealid;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== mealId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavoriteMeals();
}
