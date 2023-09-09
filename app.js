const resultsSecion = document.getElementById("results");
const getMealBtn = document.getElementById("getMealBtn");

const generateMeal = async () => {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.meals[0]);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const meal = generateMeal();
console.log(meal);
