export default class Recipes {
    constructor(datas, element) {
        this.datas = datas
        this.element = element
    }

    renderIngredients(ingredients) {
        return ingredients.map((ing) =>
                `<li>${ing.ingredient} ${ing.quantity ? ing.quantity : ''}${ing.unit ? ing.unit : ''}</li>`
            ).join("") // verifierle fonctionnement du .join()
    }

    renderCardRecipe(recipeData) {
        const recipe =
            `<div class="card">
          <div class="up-card"></div>
          <div class="down-card">
              <div class="left-card">
                  <div class="recipe-name">
                      ${recipeData.name}
                  </div>
                  <div class="recipe-ingredient">
                      <ul>
                          ${this.renderIngredients(recipeData.ingredients)}
                      </ul>
                  </div>
              </div>
              <div class="right-card">
                  <div class="recipe-time">
                      <i class="far fa-clock"> ${recipeData.time} min</i>
                  </div>
                  <div class="recipe">
                      ${recipeData.description}
                  </div>
              </div>
          </div>
      </div>`
        return recipe
    }

    render() {
        const listRecipes = this.datas.map((recipe) => this.renderCardRecipe(recipe))
        this.element.innerHTML = listRecipes
    }
    init() {
        this.render()
    }
    update(newRecipes) {
        this.element.innerHTML = ''
        if (newRecipes.length > 0) {
            const listRecipes = newRecipes.map((recipe) => this.renderCardRecipe(recipe))
            this.element.innerHTML = listRecipes
        } else {
            this.element.innerHTML = 'No Results'
        }

    }
}