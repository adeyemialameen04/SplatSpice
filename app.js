const resultsSecion = document.getElementById("results");
const getMealBtn = document.getElementById("getMealBtn");

const getIngredients = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  return ingredients;
};
const generateMeal = async () => {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    const response = await fetch(url);
    const data = await response.json();
    const meal = data.meals[0];
    return meal;
  } catch (error) {
    console.log(error);
  }
};

getMealBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const meal = await generateMeal();
  const ingredients = await getIngredients(meal);
  console.log(meal);
  const resultsSectionInnerHtml = `
  <div class="left">
  <div class="img__container">
    <img
      src="${meal?.strMealThumb}"
      alt=""
    />
  </div>
  <div class="small-details">
    <h5>Category: <span>${meal?.strCategory}</span></h3>
    <h5>Area: <span>${meal?.strArea}</span></h3>
  </div>
  <h3>Ingredients</h3>
  <ul>
${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
  </ul>
</div>
<div class="right">
  <h2>${meal?.strMeal}</h2>
  <p>
${meal?.strInstructions}
  </p>
</div>
<div>
${
  meal.strYoutube !== ""
    ? ` <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>`
    : ""
}
</div>
  `;
  resultsSecion.innerHTML = resultsSectionInnerHtml;
});
