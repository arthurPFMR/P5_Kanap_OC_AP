// // declaration variable key + value
// let productToLocalStorage = JSON.parse(localStorage.getItem("#addToCart"));

// // affichage produit
// const cartProduct = document.querySelector("#cart__items");
// // si panier vide
// if (productToLocalStorage === null) {
//   const emptyBasket = [];
//   alert("le panier est vide");
//   // le panier n'est pas vide
// } else {
//   let displayProduct = [];
//   for (let i = 0; i < productToLocalStorage.lenght; i++) {
//     displayProduct.push(productToLocalStorage);
//   }
// }

// cart est un Array
const cart = [];
// pour chaque produit dans le LS afficher la carte produit
productFromLocalStorage();
cart.forEach((product) => displayCartProduct(product));
// retrouver le produit dans le LS
function productFromLocalStorage() {
  const numberOfProduct = localStorage.length;
  for (let i = 0; i < numberOfProduct; i++) {
    const product = localStorage.getItem(localStorage.key(product));
    const productObject = JSON.parse(product);
    cart.push(productObject);
  }
}

// creation des elements dans l'article
function displayCartProduct(product) {
  let article = insertArticle(product);
  displayArticle(article);
  const image = insertImage(product);
}
// recherche article
function displayArticle(article) {
  document.querySelector("#cart__items").append(article);
}
// insérer l'article
function insertArticle(product) {
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = product.id;
  article.dataset.color = product.color;
  return article;
}
// inserer l'image
function insertImage(product) {
  const image = document.createElement("image");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  return image;
}
//inserer la description
//inserer la quantité
//inserer la suppression de produit

//div cart__price
// insérer la quantité total
// insérer le prix total

// div cart__order
