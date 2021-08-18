import { recipesMock } from "../Json/mock.js";
import { getAppareils, getIngredients, getUstensils, getRecipes, linearSearch, getFiltersResults, filterRecipes, filterSearch } from "./Helpers.js";
import Dropdown from "./dropdown.js";
import Recipes from "./recipes.js";



document.addEventListener("DOMContentLoaded", function(event) {
    const changeFilters = new Event('changeFilters');
    let recipesFiltered = recipesMock;

    // make listing recipes
    const recipes = getRecipes(recipesMock)
    const listRecipes = new Recipes(recipes, document.getElementsByClassName("card-container")[0])
    listRecipes.init()

    // make Dropdown Ingredients
    const ingredients = getIngredients(recipesMock)
    const dropdownIngredients = new Dropdown(ingredients, document.getElementsByClassName("ingredient")[0], "Ingrédient", "ingredient", changeFilters)
    dropdownIngredients.init()
    console.log("ingredients ==>", ingredients)

    // make Dropdown Ustensils
    const ustensiles = getUstensils(recipesMock)
    const dropdownUstensils = new Dropdown(ustensiles, document.getElementsByClassName("ustensil")[0], "Ustensiles", "ustensils", changeFilters)
    dropdownUstensils.init()
    console.log("ustensiles ==>", ustensiles)

    // make Dropdown Appareils
    const appareil = getAppareils(recipesMock)
    const dropdownAppareils = new Dropdown(appareil, document.getElementsByClassName("appareil")[0], "Appareil", "appareil", changeFilters)
    dropdownAppareils.init()
    console.log("appareil ==>", appareil)

    // Listen search Input
    const search = document.getElementById("search")
    search.addEventListener('input', (e) => {
        document.getElementsByClassName("fa-search")[0].classList.add('icon-search-hide')
        if (e.target.value.length > 3) {
            recipesFiltered = linearSearch(recipes, e.target.value)
            console.log(("tata"))
                //recipesFiltered = filterSearch(recipes, e.target.value)
            listRecipes.update(recipesFiltered)
            dropdownIngredients.update(getIngredients(recipesFiltered))
            dropdownUstensils.update(getUstensils(recipesFiltered))
            dropdownAppareils.update(getAppareils(recipesFiltered))
        }
    })

    // trigger when clear the input when click on X
    search.addEventListener('search', () => {
        recipesFiltered = linearSearch(recipes, '')
            //console.log("toto")
            //recipesFiltered.filterSearch(recipes, '')
        listRecipes.update(recipesFiltered)
            // update des dropdown
        dropdownIngredients.update(getIngredients(recipesFiltered))
        dropdownUstensils.update(getUstensils(recipesFiltered))
        dropdownAppareils.update(getAppareils(recipesFiltered))
        document.getElementsByClassName("fa-search")[0].classList.remove('icon-search-hide')
    })
    const result = document.getElementsByClassName("result-search")[0]
    result.addEventListener('changeFilters', () => {
        const resultsElements = document.getElementsByClassName("result-icon")
        for (let i = 0; i < resultsElements.length; i++) {
            resultsElements[i].addEventListener('click', (e) => {
                //La propriété en lecture seule parentNode renvoie le parent du nœud spécifié dans l'arborescence de DOM 
                e.target.parentNode.remove()
                result.dispatchEvent(changeFilters);
            })
        }
        const filters = getFiltersResults(result.children)
        recipesFiltered = filterRecipes(filters, recipesFiltered.length > 0 ? recipesFiltered : recipes)
        listRecipes.update(recipesFiltered)
        dropdownIngredients.update(getIngredients(recipesFiltered))
        dropdownUstensils.update(getUstensils(recipesFiltered))
        dropdownAppareils.update(getAppareils(recipesFiltered))
    }, false);

});