const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item"  data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" onclick="getMealRecipe" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));

    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <img class="modal-image" src="${meal.strMealThumb}">
        <h1 class = "recipe-title">${meal.strMeal}</h1>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p class="modal-ingredient">${meal.strIngredient1}</p>
            <p class="modal-ingredient">${meal.strIngredient2}</p>
            <p class="modal-ingredient">${meal.strIngredient3}</p>
            <p class="modal-ingredient">${meal.strIngredient4}</p>
            <p class="modal-ingredient">${meal.strIngredient5}</p>
            <p class="modal-ingredient">${meal.strIngredient6}</p>
        </div>
        
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}


// fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=egg')
// .then(res=>res.json())
// .then(data=>console.log(data))
// .then(data=>{
//     const chickenBreast=meal.chicken_breast;
//     for (let i = 0; i < chickenBreast.length; i++) {
//         const element = chickenBreast[i];
//         console.log(element);
//     }
// })