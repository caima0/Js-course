const cooks = [
  {
    name: "Gordon Ramsay",
    multiplier: 2,
  },
  {
    name: "Jamie Oliver",
    multiplier: 1.5,
  },
  {
    name: "Nigella Lawson",
    multiplier: 1.2,
  },
  {
    name: "Heston Blumenthal",
    multiplier: 1.1,
  },
];

const recipes = [
  {
    name: "Beef Wellington",
    cook: "Gordon Ramsay",
    time: 10,
  },
  {
    name: "Scrambled Eggs",
    cook: "Gordon Ramsay",
    time: 20,
  },
  {
    name: "Pasta Carbonara",
    cook: "Jamie Oliver",
    time: 30,
  },
  {
    name: "Chicken Fajitas",
    cook: "Jamie Oliver",
    time: 20,
  },
  {
    name: "Chocolate Cake",
    cook: "Nigella Lawson",
    time: 35,
  },
  {
    name: "Roast Chicken",
    cook: "Nigella Lawson",
    time: 45,
  },
  {
    name: "Molecular Gastronomy Salad",
    cook: "Heston Blumenthal",
    time: 40,
  },
  {
    name: "Triple Cooked Chips",
    cook: "Heston Blumenthal",
    time: 60,
  },
];

function getCookByRecipe(recipeName) {
  const recipe = recipes.find(
    (recipe) => recipe.name.toLowerCase() === recipeName.toLowerCase()
  );
  if (recipe) {
    return cooks.find((cook) => cook.name === recipe.cook);
  }
  return null;
}

function getAdjustedCookingTime(recipeName) {
  const recipe = recipes.find(
    (recipe) => recipe.name.toLowerCase() === recipeName.toLowerCase()
  );
  if (recipe) {
    const cook = getCookByRecipe(recipeName);
    if (cook) {
      return recipe.time / cook.multiplier;
    }
  }
  return null;
}

function makeDish(recipeName) {
  const adjustedTime = getAdjustedCookingTime(recipeName);
  if (adjustedTime !== null) {
    const cook = getCookByRecipe(recipeName);
    if (cook) {
      alert(
        `Cooking ${recipeName} by ${
          cook.name
        } will take approximately ${adjustedTime.toFixed(2)} seconds.`
      );
    }

    // TODO: Simulate cooking time with promise
    // Promise should resolve with recipe name after adjusted time
    const serving = new Promise((resolve) => {
      setTimeout(() => {
        resolve(recipeName);
      }, Number(adjustedTime.toFixed(2)) * 1000);
    });
    return serving;
  } else {
    alert(`Recipe ${recipeName} not found.`);
    const agreement = prompt(`Enter *yes* if you want to try again`);
    if (agreement.toLowerCase() === "yes") {
      const recipeName = prompt(
        `Enter the recipe name from the menu:\n${menu}`
      );
      makeDish(recipeName).then((name) =>
        alert(`${name} is ready! Enjoy your meal!`)
      );
    }
  }
}

const menu = recipes.map((recipe) => recipe.name).join("\n");

const recipeName = prompt(`Enter the recipe name from the menu:\n${menu}`);
//makeDish(recipeName);
// TODO: Uncomment the line below to test the function
makeDish(recipeName).then((name) =>
  alert(`${name} is ready! Enjoy your meal!`)
);
