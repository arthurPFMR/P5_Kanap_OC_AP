const idProductUrl = window.location.search;
const urlParams = new URLSearchParams(idProductUrl);
const productId = urlParams.get("id");
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((product) => productInLocalStorage(product));

const productCart = [];

productInLocalStorage();
// boucle pour afficher tout les objets du LS
productCart.forEach((product) => {
  return displayProduct(product);
});

function productInLocalStorage() {
  // définir le nombre de donnée ds LS
  const numberOfProduct = localStorage.length;
  // boucle pour définir la position des données ds LS
  for (let addToCart = 0; addToCart < numberOfProduct; addToCart++) {
    const product = localStorage.getItem(localStorage.key(addToCart));
    // convertir en objet (parse)
    const dataObject = JSON.parse(product);
    // push objet du LS
    productCart.push(dataObject);
  }
}

// affichage produit
function displayProduct(product) {
  const article = insertArticle(product);
  displayArticle(article);
  console.log(article)
  const imageDiv = insertImage(product);
  article.append(imageDiv);
}

// affichage article
function displayArticle(article) {
  document.querySelector("#cart__items").append(article);
}

function insertArticle(product) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = product.id;
  article.dataset.color = product.color;
  return article;
}

function insertImage(product) {
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("cart__item__img");
  let image = document.createElement("cart__item__img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  imageDiv.append(image);
  return imageDiv;
}