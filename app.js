let number = +prompt('How many?')
let container = document.getElementById('container')
let possitionUp = 0
let interval = 0
for (let i = 0; i < number; i++){
let div = document.createElement('div')
div.className = 'box'
console.log(div)
if (i % 2 === 0){
    div.style.left = '-1000px'
} else {
    div.style.left = '100%'
}
div.style.bottom = possitionUp + 'px'
setTimeout(() => {
div.style.left = 'calc(50% - 250px)'
}, interval)
possitionUp += 50
interval += 300
container.appendChild(div)
}