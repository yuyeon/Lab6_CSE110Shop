// Script.js

let myStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
    let productsStr = myStorage.getItem('products');
    if (productsStr === null) {
        fetch("https://fakestoreapi.com/products")
            .then(response => response.json())
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
    for (let index = 0; index < products.length; index++) {
        let product = products[index];

        let comp = document.createElement('product-item');
        comp.setAttribute('image', product.image);
        comp.setAttribute('title', product.title);
        comp.setAttribute('price', product.price);

        productList.appendChild(comp);
    }
}