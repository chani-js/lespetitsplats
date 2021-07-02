import { recipes } from "../Json/mock.js";

/* Helpers contient les fonctions de Getter pour les données*/

//fonction stockée dans uneconstante syntaxe ECMAscript
export const GetIngredients = () => {
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
export const GetUstensils = () => {
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

export const GetAppareil = () => {
    const appareils = []
    recipes.forEach(element => {
        if (!appareils.includes(element.appliance))
            appareils.push(element.appliance)
    })
    return appareils

}