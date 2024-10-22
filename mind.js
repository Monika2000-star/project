const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Function to search for meals
async function searchMeal() {
    const query = document.getElementById('meal-input').value;

    if (!query) {
        alert('Please enter a search item name like sushi, apple, whatever you want.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching the meal data:', error);
    }
}

// Function to display meal results
function displayMeals(meals) {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = ''; // Clear previous results

    if (!meals) {
        mealContainer.innerHTML = '<p>No meals found</p>';
        return;
    }

    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"><br>
            <button class="details-button" onclick="getMealDetails(${meal.idMeal})"><h5 style="color: blue; btn btn-success">Show Details</h5></button>
                     
        `;
        
 

        mealContainer.appendChild(mealCard);
    });
}

// Function to get meal details by ID
async function getMealDetails(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        const mealDetails = data.meals[0];

        // Now fill the modal with the meal details
        document.getElementById('mealTitle').textContent = mealDetails.strMeal;
        document.getElementById('mealImage').src = mealDetails.strMealThumb;
        document.getElementById('mealImage').alt = mealDetails.strMeal;
        document.getElementById('mealInstructions').textContent = mealDetails.strInstructions;

        // Trigger the Bootstrap modal
        $('#mealDetailsModal').modal('show');
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}