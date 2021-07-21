/* Helpers contient les fonctions de Getter pour les données*/

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
        for (let i = 0; i < recipes.length; i++) {
            switch (true) {
                case recipes[i].name.includes(key):
                    newRecipes.push(recipes[i])
                    break;
                case recipes[i].description.includes(key):
                    newRecipes.push(recipes[i])
                    break;
                case recipes[i].appliance.includes(key):
                    newRecipes.push(recipes[i])
                    break;
                case recipes[i].ustensils.includes(key):
                    newRecipes.push(recipes[i])
                    break;
                case isInIngredients(recipes[i].ingredients, key):
                    newRecipes.push(recipes[i])
                    break;
            }
        }
    }
    return newRecipes
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
    console.log(filters)
    let filteredRecipes = [...recipes]
    // console.log(filteredRecipes)
    // if (filters.appliance.length > 0) {
    //     filteredRecipes = filteredRecipes.filter((item) => filters.appliance.includes(item.appliance))
    // }
    // if (filters.ustensils.length > 0) {
    //     filteredRecipes = filteredRecipes.filter((item) => {
    //         for (let i = 0; i < item.ustensils.length; i++) {
    //             if (item.ustensils[i] === filters.ustensils)
    //                 return true
    //         }
    //     })
    // }
    // console.log(filteredRecipes)
    return filteredRecipes
}

const isInIngredients = (ingredients, key) => {
    let isIn = false
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient.includes(key)) {
            isIn = true
            break
        }
    }
    return isIn;
}