// meal.js
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');
    if (mealId) {
        const meal = await getMealDetails(mealId);
        displayMealDetails(meal);
    }
});

async function getMealDetails(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
}

function displayMealDetails(meal) {
    const mealDetailsContainer = document.getElementById('meal-details-container');
    const mealDetails = document.createElement('div');
    mealDetails.classList.add('meal-details');
    mealDetails.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;
    mealDetailsContainer.appendChild(mealDetails);
}
