import { recipesMock } from "../Json/mock.js";
//fonction stockée dans uneconstante syntaxe ECMAscript
export const getIngredients = (recipes) => {
    const ingredients = []
    recipes.forEach(element => {
        //recuperation du tableau d'ingredient
        const recipeingredients = element.ingredients
        recipeingredients.forEach(item => {
            if (!ingredients.includes(item.ingredient))
                ingredients.push(item.ingredient)
        })

    })
    return ingredients

}
export const getUstensils = (recipes) => {
    const ustensiles = []
    recipes.forEach(element => {
        const recipeustensiles = element.ustensils
        recipeustensiles.forEach(ustensile => {
            if (!ustensiles.includes(ustensile))
                ustensiles.push(ustensile)
        })

    })
    return ustensiles

}

export const getAppareils = (recipes) => {
    const appareils = []
    recipes.forEach(element => {
        if (!appareils.includes(element.appliance))
            appareils.push(element.appliance)
    })
    return appareils

}

export const getRecipes = (recipes) => {
    return recipes
}

export const linearSearch = (recipes, key) => {
    let newRecipes = []
    if (key === '') {
        newRecipes = recipes
    } else {
        // ajouter un tolower case pour les recettes
        for (let i = 0; i < recipes.length; i++) {
            switch (true) {
                case recipes[i].name.toLowerCase().includes(key.toLowerCase()):
                    newRecipes.push(recipes[i])
                    break;
                case recipes[i].description.toLowerCase().includes(key.toLowerCase()):
                    newRecipes.push(recipes[i])
                    break;
                    /*
                                    case recipes[i].appliance.includes(key.toLowerCase()):
                                        newRecipes.push(recipes[i])
                                        break;
                                    case recipes[i].ustensils.includes(key.toLowerCase()):
                                        newRecipes.push(recipes[i])
                                        break;*/
                case isInIngredients(recipes[i].ingredients, key):
                    newRecipes.push(recipes[i])
                    break;
            }
        }
    }
    return newRecipes
}
export const filterSearch = (recipes, key) => {
    if (key === '') {
        return newRecipes = recipes
    }
    return recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(key.toLowerCase()) ||
        recipe.description.toLowerCase().includes(key.toLowerCase()) ||
        isInIngredients(recipe.ingredients, key)
    )

}

export const getFiltersResults = (results) => {
    const filters = {
        ingredients: [],
        ustensils: [],
        appliance: []
    }
    for (let i = 0; i < results.length; i++) {
        if (results[i].classList.contains('element-ingredient'))
            filters.ingredients.push(results[i].textContent)
        else if (results[i].classList.contains('element-ustensils'))
            filters.ustensils.push(results[i].textContent)
        else if (results[i].classList.contains('element-appareil'))
            filters.appliance.push(results[i].textContent)
    }
    return filters
}

export const filterRecipes = (filters, recipes) => {
    if (filters.ustensils.length === 0 && filters.ingredients.length === 0 && filters.appliance.length === 0) {
        return recipesMock
    }
    console.log("filters==>", filters)
    let filteredRecipes = []
    console.log("frecipe==>", filteredRecipes)
    const filtersKey = Object.keys(filters) //donne un tableau de clé des differentes proprietes de l' objets 
    for (let i = 0; i < filtersKey.length; i++) {
        for (let j = 0; j < filters[filtersKey[i]].length; j++) {
            for (let k = 0; k < recipes.length; k++) {
                if (filtersKey[i] === "ingredients") {
                    if (isInIngredients(recipes[k].ingredients, filters[filtersKey[i]][j]) && !isInRecipes(filteredRecipes, recipes[k]))
                        filteredRecipes.push(recipes[k])
                } else if (filtersKey[i] === "ustensils") {
                    if (recipes[k].ustensils.includes(filters[filtersKey[i]][j]) && !isInRecipes(filteredRecipes, recipes[k]))
                        filteredRecipes.push(recipes[k])
                } else if (filtersKey[i] === "appliance") {
                    if (recipes[k].appliance.includes(filters[filtersKey[i]][j]) && !isInRecipes(filteredRecipes, recipes[k]))
                        filteredRecipes.push(recipes[k])
                }

            }
        }
    }
    return filteredRecipes
}
const isInRecipes = (recipes, key) => {
    let isIn = false
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i] && recipes[i].id === key.id) {
            isIn = true
            break
        }
    }
    return isIn;
}
const isInIngredients = (ingredients, key) => {
    let isIn = false
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient.toLowerCase().includes(key.toLowerCase())) {
            isIn = true
            break
        }
    }
    return isIn;
}