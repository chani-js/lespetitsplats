import Dropdown from "./dropdown.js";
import { GetAppareil, GetIngredients, GetUstensils } from "./Helpers.js";


document.addEventListener("DOMContentLoaded", function(event) {

    const ingredients = GetIngredients()
    console.log("ingredients ==>", ingredients)
    const ustensiles = GetUstensils()
    console.log("ustensiles ==>", ustensiles)
    const appareil = GetAppareil()
    console.log("appareil ==>", appareil)
    const dropdownindredient = new Dropdown(ingredients, document.getElementsByClassName("ingredient")[0], "Ingrédient", "ingredient")
    dropdownindredient.init()
    const dropdownustensil = new Dropdown(ustensiles, document.getElementsByClassName("ustensil")[0], "Ustensiles", "ustensils")
    dropdownustensil.init()
    const dropdownappareil = new Dropdown(appareil, document.getElementsByClassName("appareil")[0], "Appareil", "appareil")
    dropdownappareil.init()



});