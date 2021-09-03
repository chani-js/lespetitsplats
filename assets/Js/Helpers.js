import { recipesMock } from "../Json/mock.js";
//fonction stockée dans uneconstante syntaxe ECMAscript
export const getIngredients = (recipes) => {
    const ingredients = [];
    recipes.forEach((element) => {
        //recuperation du tableau d'ingredient
        const recipeingredients = element.ingredients;
        recipeingredients.forEach((item) => {
            if (!ingredients.includes(item.ingredient))
                ingredients.push(item.ingredient);
        });
    });
    return ingredients;
};
export const getUstensils = (recipes) => {
    const ustensiles = [];
    recipes.forEach((element) => {
        const recipeustensiles = element.ustensils;
        recipeustensiles.forEach((ustensile) => {
            if (!ustensiles.includes(ustensile)) ustensiles.push(ustensile);
        });
    });
    return ustensiles;
};

export const getAppareils = (recipes) => {
    const appareils = [];
    recipes.forEach((element) => {
        if (!appareils.includes(element.appliance))
            appareils.push(element.appliance);
    });
    return appareils;
};

export const getRecipes = (recipes) => {
    return recipes;
};

// algo de recherche lineaire avec le . includes
export const linearSearch = (recipes, key) => {
    let newRecipes = [];
    if (key === "") {
        newRecipes = recipes;
    } else {
        // ajouter un tolower case pour les recettes
        for (let i = 0; i < recipes.length; i++) {
            switch (true) {
                // La méthode includes() permet de déterminer si un tableau contient une valeur et renvoie true si c'est le cas, false sinon.
                case recipes[i].name.toLowerCase().includes(key.toLowerCase()):
                    newRecipes.push(recipes[i]);
                    // push les recette dans un tableau selon le nom de la recette
                    break;
                case recipes[i].description.toLowerCase().includes(key.toLowerCase()):
                    newRecipes.push(recipes[i]);
                    // push les recettes dans un tableau selon si le terme se trouve dans la description
                    break;

                case isInIngredients(recipes[i].ingredients, key):
                    newRecipes.push(recipes[i]);
                    // push des recettes selon la liste des ingredients
                    break;
            }
        }
    }
    return newRecipes;
    // retourne le tableau de recette filtré
};

// Algo avec le .filter
export const filterSearch = (recipes, key) => {
    if (key === "") {
        return (newRecipes = recipes);
    }
    return recipes.filter(
        (recipe) =>
        recipe.name.toLowerCase().includes(key.toLowerCase()) ||
        recipe.description.toLowerCase().includes(key.toLowerCase()) ||
        isInIngredients(recipe.ingredients, key)
    );
};

export const getFiltersResults = (results) => {
    const filters = {
        // objet qui vas recuperer tout les tableaux filtré pour les dropdown
        ingredients: [],
        ustensils: [],
        appliance: [],
    };
    for (let i = 0; i < results.length; i++) {
        if (results[i].classList.contains("element-ingredient"))
            filters.ingredients.push(results[i].textContent);
        else if (results[i].classList.contains("element-ustensils"))
            filters.ustensils.push(results[i].textContent);
        else if (results[i].classList.contains("element-appareil"))
            filters.appliance.push(results[i].textContent);
    }
    return filters;
};

export const filterRecipes = (filters, recipes) => {
    let filteredRecipes = [];
    if (
        filters.ustensils.length === 0 &&
        filters.ingredients.length === 0 &&
        filters.appliance.length === 0
    ) {
        filteredRecipes = recipesMock;
    } else {
        recipesMock.forEach((item) => {
            let KeepRecipe = true;
            filters.ustensils.forEach((ustensil) => {
                if (!item.ustensils.includes(ustensil)) KeepRecipe = false;
            });
            filters.ingredients.forEach((ingredient) => {
                if (!isInIngredients(item.ingredients, ingredient)) KeepRecipe = false;
            });
            filters.appliance.forEach((appli) => {
                if (!isInRecipes(item.appliance, appli)) KeepRecipe = false;
            });

            if (KeepRecipe) filteredRecipes.push(item);
        });
    }
    return filteredRecipes;
};
/* parcourir le tableau d e recette et ensuite verifier les conditions et y faire les push selon les tags
pour chaque recette verifier les ingredients ustensiles et appareil et ensuite faire les push  */
const isInRecipes = (recipes, key) => {
    let isIn = false;
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i] && recipes[i].id === key.id) {
            isIn = true;
            break;
        }
    }
    return isIn;
};
const isInIngredients = (ingredients, key) => {
    let isIn = false;
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient.toLowerCase().includes(key.toLowerCase())) {
            isIn = true;
            break;
        }
    }
    return isIn;
};