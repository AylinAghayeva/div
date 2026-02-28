let iconCart = document.querySelector('.iconCart')
let cart = document.querySelector('.cart')
let container = document.querySelector('.container')
let close = document.querySelector('.close')
iconCart.addEventListener('click', ()=>{
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%'
        container.style.transform = 'translateX(0)'
    }
})
close.addEventListener('click', ()=>{
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)'
})
let products = null;
//get data from file json
fetch('product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})
//show datas in list html
function addDataToHTML(){
  //remove datas default in html
  let listProductHTML = document.querySelector('.listProduct')  
  listProductHTML.innerHTML = '';
  // add new datas
if(products != null){
    products.forEach(product => {
        let newProduct = document.createElement('div')
        newProduct.classList.add('item');
        newProduct.innerHTML = 
      `<img src="${product.image}">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button onclick="addToCart(${product.id})">Add To Cart</button>`;
        listProductHTML.appendChild(newProduct);
  });
}
}
let listCart = [];
// and i get ookie data cart
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='))
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
 }
}
checkCart();
function addToCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    // if this product is not in the cart
    if(!listCart[$idProduct]){  
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        // add data product in cart
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    }else{
        // if this product is already in the cart
        // i just increase the quantity
        listCart[$idProduct].quantity++;
    }
    // i will save datas cart in cookie
    // to save this datas cart when i turn of the computer
    let timeSave = "expires=Thu, 31 Dec 2026 12:00:00 UTC";
    document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/";
     addCartToHTML();
}
addCartToHTML();
   function addCartToHTML(){
    // clear data default;
    let listCartHTML = document.querySelector('.listCart');
    listCart.innerHTML = '';
    let totalHTML = document.querySelector('.totalQuantity');
    let toalQuantity = 0;
   
    if(listCart){
        listCart.forEach(product => {
    if(product){
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML =
        ` <img class="cart-img" src="${product.image}">
                    <div class="content">
                        <div class="name">
                            ${product.name}
                        </div>
                        <div class="price">
                            $${product.price}/1 product
                        </div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                    listCartHTML.appendChild(newCart);
                    toalQuantity = toalQuantity + product.quantity;
        }
    })

} 
   totalHTML.innerText = toalQuantity;
}
// function changeQuantity($idProduct, $type){
//     switch($type){
//         case '+':
//             listCart[$idProduct].quantity++;
//             break;
//         case '-':
//             listCart[$idProduct].quantity--;
//             if(listCart[$idProduct].quantity <= 0){
//                 delete listCart[$idProduct];
//             }
//             break;
//             default:
//                 break;
//     }
// //save new data in cookie
//     let timeSave = "expires=Thu, 31 Dec 2026 12:00:00 UTC";
//     document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/";
// //reload list cart in HTML
// addCartToHTML();
// }
function addCartToHTML() {
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';
    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = `
                    <img class="cart-img" src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}

function changeQuantity(idProduct, type) {
    if (type == '+') {
        listCart[idProduct].quantity++;
    } else {
        listCart[idProduct].quantity--;

        // FIX: Check the .quantity property specifically
        if (listCart[idProduct].quantity <= 0) {
            delete listCart[idProduct];
        }
    }

    // Save to cookie
    let timeSave = "expires=Thu, 31 Dec 2026 12:00:00 UTC";
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; " + timeSave + "; path=/";

    // Refresh the UI
    addCartToHTML();
}
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.nonce='3GqUEt1apXw=';d.innerHTML="window.__CF$cv$params={r:'9cdba31899b9d91d',t:'MTc3MTA2MjM3My4wMDAwMDA='};var a=document.createElement('script');a.nonce='3GqUEt1apXw=';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');

// Password Validator: Works as you type
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;

    if (val.length === 0) {
        // Reset if empty
        passwordInput.classList.remove('error', 'success');
    } else if (val.length < 8) {
        // Less than 8 symbols = RED
        passwordInput.classList.add('error');
        passwordInput.classList.remove('success');
    } else {
        // 8 or more = GREEN
        passwordInput.classList.add('success');
        passwordInput.classList.remove('error');
    }
});

// Email Validator: Works as you type
emailInput.addEventListener('input', () => {
    const val = emailInput.value;

    if (val.length === 0) {
        emailInput.classList.remove('error', 'success');
    } else if (!val.includes('@')) {
        // No @ symbol = RED
        emailInput.classList.add('error');
        emailInput.classList.remove('success');
    } else {
        // Has @ symbol = GREEN
        emailInput.classList.add('success');
        emailInput.classList.remove('error');
    }
});
const password = document.getElementById('password');

password.addEventListener('input', () => {
    const value = password.value;

    if (value.length === 0) {
        // If the box is empty, remove all colors
        password.classList.remove('is-invalid', 'is-valid');
    } 
    else if (value.length < 8) {
        // If it's 1-7 characters, force it RED immediately
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
    } 
    else {
        // If it's 8 or more, turn it GREEN
        password.classList.add('is-valid');
        password.classList.remove('is-invalid');
    }
});