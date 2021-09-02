export default class Dropdown {
    constructor(datas, element, placeholder, type, event) {
        this.datas = datas;
        this.element = element;
        this.placeholder = placeholder;
        this.type = type;
        this.value = "";
        this.event = event;
    }

    /*  parcourir le tableau de dropdown affiché et remove ou update les drpdown ainsi que
      l'affihage des recettes*/

    renderlist() {
        //[...this.datas] clone de this.data
        let filtereddata = [...this.datas];
        if (this.value)
            filtereddata = filtereddata.filter((item) =>
                item.toLowerCase().includes(this.value.toLocaleLowerCase())
            );
        let liste = "";
        if (filtereddata.length == 0) {
            liste += `<div class="list-element">Aucun résultat</div>`;
        } else
            filtereddata.map(
                (element) =>
                (liste += `<div class="list-element list-element-${this.type}">${element}</div>`)
            );
        return liste;
    }

    render() {
            //.map est equivalent au foreach
            const dropdown = `<input type="text" ${
      this.value && `value="${this.value}"`
    } placeholder="${this.placeholder}" class="input-${
      this.type
    }"><i class="fas fa-chevron-down"></i>
                <div class="list-${this.type} list-dropdown">
                   ${this.renderlist()}
                </div>`;

    this.element.innerHTML = dropdown;
  }

  handleClickElement(e) {
    e.preventDefault();
    const result = document.getElementsByClassName("result-search")[0];
    const div = `<div class="element-${this.type} search-element">${e.target.innerHTML}<i class="far fa-times-circle result-icon"></i></div>`;
    result.innerHTML += div;
    result.dispatchEvent(this.event);
  }

  handleClick() {
    this.element.classList.toggle("dropdown-open");
  }

  handleChange(e) {
    if (e.target.value.length > 2) {
      const liste = document.getElementsByClassName(`list-${this.type}`)[0];
      this.value = e.target.value;
      liste.innerHTML = this.renderlist();
      console.log(e.target.value);
    } else {
      this.value = "";
      const liste = document.getElementsByClassName(`list-${this.type}`)[0];
      liste.innerHTML = this.renderlist();
    }
  }

  init() {
    this.render();
    const input = document.getElementsByClassName(`input-${this.type}`)[0];
    this.element.addEventListener("click", this.handleClick.bind(this));
    input.addEventListener("input", this.handleChange.bind(this));
    const listeElement = document.getElementsByClassName(
      `list-element-${this.type}`
    );
    for (let i = 0; i < listeElement.length; i++) {
      listeElement[i].addEventListener(
        "click",
        this.handleClickElement.bind(this)
      );
    }
  }

  update(recipes) {
    this.datas = recipes;
    const list = document.getElementsByClassName(`list-${this.type}`)[0];
    list.innerHTML = this.renderlist();
    const listeElement = document.getElementsByClassName(
      `list-element-${this.type}`
    );
    for (let i = 0; i < listeElement.length; i++) {
      listeElement[i].addEventListener(
        "click",
        this.handleClickElement.bind(this)
      );
    }
  }
}