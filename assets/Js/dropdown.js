export default class Dropdown {
    constructor(datas, element, placeholder, type) {
        this.datas = datas
        this.element = element
        this.placeholder = placeholder
        this.type = type
        this.value = ""
    }

    renderlist() {
        //[...this.datas] clone de this.data
        let filtereddata = [...this.datas]
        if (this.value)
            filtereddata = filtereddata.filter(item => item.toLowerCase().includes(this.value.toLocaleLowerCase()))
        let liste = ""
        if (filtereddata.length == 0) {
            liste += `<div class="list-element">Aucun résultat</div>`
        } else
            filtereddata.map(element =>
                liste += `<div class="list-element list-element-${this.type}">${element}</div>`
            )
        return liste
    }

    render() {
            //.map est equivalent au foreach 

            let dropdown =
                `<input type="text" ${this.value && `value="${this.value}"`} placeholder="${this.placeholder}" class="input-${this.type}"><i class="fas fa-chevron-down"></i>
                <div class="list-${this.type} list-dropdown">
                   ${this.renderlist()}
                </div>`

        this.element.innerHTML = dropdown
        

    }

    handleClickelement(e){
        e.preventDefault()
        let result = document.getElementsByClassName("result-search")[0]
        let div = `<div class="element-${this.type} search-element"> ${e.target.innerHTML} <i class="far fa-times-circle"></i></div>`
        result.innerHTML += div

    }

    handleClick(){
        this.element.classList.toggle("dropdown-open")
    }

    handleChange(e){
        
        if(e.target.value.length > 2){
            let liste = document.getElementsByClassName(`list-${this.type}`)[0]
            this.value= e.target.value
            liste.innerHTML = this.renderlist()
            console.log(e.target.value)
            
        }else {
            this.value=""
            let liste = document.getElementsByClassName(`list-${this.type}`)[0]
            liste.innerHTML = this.renderlist()
        }
        

    }
    init(){
        this.render()
        const input = document.getElementsByClassName(`input-${this.type}`)[0]
        this.element.addEventListener("click",this.handleClick.bind(this))
        input.addEventListener("input",this.handleChange.bind(this))
        const listeelement = document.getElementsByClassName(`list-element-${this.type}`)
        for(let i=0 ;i<listeelement.length;i++){
            listeelement[i].addEventListener("click", this.handleClickelement.bind(this))
        }
        


    }



}