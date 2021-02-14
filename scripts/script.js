// Script.js

const myStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
    const productsStr = myStorage.getItem('products');
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
    const cartCount = document.getElementById('cart-count');
    const addedProducts = [];

    for (let index = 0; index < products.length; index++) {
        const product = products[index];

        const comp = document.createElement('product-item');
        comp.setAttribute('image', product.image);
        comp.setAttribute('title', product.title);
        comp.setAttribute('price', product.price);
        comp.setCartCallback((button) => {
            const prodIndex = addedProducts.indexOf(product.id);
            if (prodIndex != -1) {
                addedProducts.splice(prodIndex, 1);
                button.innerHTML = "Add to Cart";
            } else {
                addedProducts.push(product.id);
                button.innerHTML = "Remove from Cart";
            }
            cartCount.innerHTML = addedProducts.length;
            console.log(addedProducts);
        });

        productList.appendChild(comp);
    }
}