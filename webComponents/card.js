// @ts-nocheck
class Card extends HTMLElement {
    shadow;
    article = document.createElement('article')
    style = document.createElement('style')
    h1 = document.createElement('h1')

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.style.textContent = `
            .card {
                width: 100px;
                height: 100px;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            }
        `;
    }

    set card(value) {
        this.article.setAttribute('class', 'card')
        this.h1.innerHTML = value.id
        this.article.appendChild(this.h1)
        this.shadow.appendChild(this.style)
        this.shadow.appendChild(this.article)
    }
}


customElements.define('cjh-card', Card)
  