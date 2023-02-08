// const mealId = urlParams.get("mealId");
// fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
//   .then((response) => response.json())
//   .then((data) => {
//     const meal = data.meals[0];
//     // Now you can access the meal data and display it on the page
//   });

// const name = document.getElementById("name");
// const image = document.getElementById("image");
// const ingredients = document.getElementById("ingredients");

// name.innerHTML = meal.strMeal;
// ingredients.innerHTML = `
//   <li>${meal.strIngredient1}</li>
//   <li>${meal.strIngredient2}</li>
//   <li>${meal.strIngredient3}</li>
//   <li>${meal.strIngredient4}</li>`;
// image.src = meal.strMealThumb;

// Copy code
const getMealFromURL = () => {
  // Get the URL parameters
  const meal = JSON.parse(
    decodeURIComponent(window.location.search.split("=")[1])
  );
  displayMeal(meal);
};

const displayMeal = (meal) => {
  console.log(meal);
  const mealName = document.getElementById("content-title");
  mealName.innerText = meal.strMeal;

  const mealImage = document.getElementById("image");
  mealImage.src = meal.strMealThumb;

  const ingredientsList = document.getElementById("ingredients");
  ingredientsList.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (!ingredient) break;

    const ingredientItem = document.createElement("li");
    ingredientItem.innerText = ingredient;
    ingredientsList.appendChild(ingredientItem);
  }

  const instructionsList = document.getElementById("instructions");
  instructionsList.innerHTML = meal.strInstructions;
};

// Call the getMealFromURL function when the page loads
document.addEventListener("DOMContentLoaded", getMealFromURL);
