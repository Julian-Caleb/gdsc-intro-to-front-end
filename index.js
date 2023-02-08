const searchBtn = document.getElementById("search-btn");
const cancelBtn = document.getElementById("cancel-btn");
const searchBox = document.getElementById("search-box");
const inputField = document.getElementById("input-field");

searchBtn.onclick = () => {
  if (searchBox.classList.contains("active")) {
    logInputValue();
  } else {
    searchBox.classList.add("active");
  }
};

inputField.onkeydown = (event) => {
  if (event.key === "Enter" && searchBox.classList.contains("active")) {
    logInputValue();
  }
};

const logInputValue = () => {
  const inputValue = inputField.value;
  fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const items = document.getElementById("items");
      items.innerHTML = "";
      if (data.meals == null) {
        document.getElementById("msg").style.display = "block";
      } else {
        document.getElementById("msg").style.display = "none";
        data.meals.forEach((meal) => {
          console.log(meal);
          const itemDiv = document.createElement("div");
          itemDiv.innerHTML = `
            <div class="card" style="background: orange; width: 400px; height: 500px; margin: 20px; cursor: pointer;">
                <img src="${meal.strMealThumb}" class="card-img-top" style="width: 400px; height: 400px; alt="..."> 
                <div class="card-body"> 
                    <p class="card-text" style="padding: 8px; font-size: 30px; text-align: center;">
                        ${meal.strMeal} 
                    </p> 
                </div> 
            </div>`;
          itemDiv.setAttribute("onclick", `details('${meal.idMeal}')`);
          items.appendChild(itemDiv);
        });
      }
    });
};

function details(id) {
  fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((detail) => {
      let meal = detail.meals[0];
      console.log(meal);
      let details = document.getElementById("details");
      details.innerHTML = "";
      let detailsDiv = document.createElement("div");
      let detailsInfo = `
      <div class="card" style="background: orange; width: 400px; margin: 20px; cursor: pointer;">
          <img src="${meal.strMealThumb}" class="card-img-top" style="width: 400px; height: 400px; alt="..."> 
          <div class="card-body"> 
              <h3 class="card-text" style="text-align: center; padding: 8px; font-size: 30px;">
                  ${meal.strMeal} 
              </h3>
              <h6 style="text-align: center; font-size: 20px; margin: 2px;">${meal.strArea}</h6>
              <h6 style="text-align: center; font-size: 20px; margin: 2px;">${meal.strCategory}</h6>
              <br />
              <button id="view-recipe-btn" style="margin-left: 30px; margin-bottom: 20px; background-color: orangered">View Recipe</button>
          </div> 
      </div>`;
      detailsDiv.innerHTML = detailsInfo;
      details.appendChild(detailsDiv);

      document
        .getElementById("view-recipe-btn")
        .addEventListener("click", function () {
          window.location.href = `/details_page.html?meal=${encodeURIComponent(
            JSON.stringify(meal)
          )}`;
        });
    });
}

cancelBtn.onclick = () => {
  searchBox.classList.remove("active");
};
