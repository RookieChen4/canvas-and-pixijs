// @ts-nocheck
window.addEventListener('load', ()=> {
    const main = document.querySelector('main')
    fetch('http://localhost:5000/api/test',{method: 'POST'})
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            myJson.data.forEach(element => {
                const el = document.createElement('cjh-card')
                el.card = element
                main.appendChild(el)
            });
        });
})