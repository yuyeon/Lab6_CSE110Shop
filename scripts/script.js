// Script.js

let myStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
    let products = myStorage.getItem('products');
    if (products === null) {
        fetch("https://fakestoreapi.com/products")
            .then(response => {
                myStorage.setItem('products', JSON.stringify(response));
                products = JSON.parse(myStorage.getItem('products'));
                updateProducts(products);
            })
            .catch(error => {
                console.log("Chi is trolling me");
            });
    } else {
        updateProducts(products);
    }
});

function updateProducts(products) {
    const productList = document.getElementById('product-list');
    console.log(products)
    for (index in products) {
        let product = products[index];
        console.log(product);

        let comp = document.createElement('product-item');
        comp.setAttribute('image', product.image);
        comp.setAttribute('title', product.title);
        comp.setAttribute('price', product.price);

        productList.appendChild(comp);
    }
}