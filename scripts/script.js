// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  myStorage = window.localStorage;
  if(myStorage.getItem('products') == null){
    let response = fetch("https://fakestoreapi.com/products");
    myStorage.setItem('products', JSON.stringify(response));
  }
});