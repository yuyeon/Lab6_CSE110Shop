// Script.js

const myStorage = window.localStorage;
const ADD_CART_TEXT = "Add to Cart";
const REMOVE_CART_TEXT = "Remove from Cart";

window.addEventListener('DOMContentLoaded', () => {
    const productsStr = myStorage.getItem('products');
    if (productsStr === null) {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json()) // Change into json, but still waiting for response (response.json just a promise)
            .then(data => {
                myStorage.setItem('products', JSON.stringify(data));
                updateProducts(data);
            })
            .catch(error => {
                console.log("Chi is trolling me");
            });
    } else {
        updateProducts(JSON.parse(productsStr));
    }
});

function updateProducts(products) {
    console.log(products);

    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');
    const addedProducts = JSON.parse(myStorage.getItem('added-products')) || [];
    console.log(addedProducts);
    cartCount.innerHTML = addedProducts.length;

    for (let index = 0; index < products.length; index++) {
        const product = products[index];

        const comp = document.createElement('product-item');
        comp.setAttribute('image', product.image);
        comp.setAttribute('title', product.title);
        comp.setAttribute('price', product.price);
        if (addedProducts.includes(product.id)) {
            comp.setAttribute('btnText', REMOVE_CART_TEXT);
        } else {
            comp.setAttribute('btnText', ADD_CART_TEXT);
        }
        comp.setCartCallback(button => {
            const prodIndex = addedProducts.indexOf(product.id);
            if (prodIndex != -1) {
                addedProducts.splice(prodIndex, 1);
                button.innerHTML = ADD_CART_TEXT;
            } else {
                addedProducts.push(product.id);
                button.innerHTML = REMOVE_CART_TEXT;
                alert('Added to Cart!');
            }
            cartCount.innerHTML = addedProducts.length;
            myStorage.setItem('added-products', JSON.stringify(addedProducts));
            console.log(addedProducts);
        });

        productList.appendChild(comp);
    }
}