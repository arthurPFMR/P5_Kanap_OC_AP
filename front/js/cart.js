fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((product) => productInLocalStorage(product));

const productCart = [];

productInLocalStorage();
// boucle pour afficher tout les objets du LS
productCart.forEach((product) => displayProduct(product));
// productCart.forEach((product) => {
//   return displayProduct(product);
// });

function productInLocalStorage() {
  // définir le nombre de donnée ds LS
  const numberOfProduct = localStorage.length;
  // boucle pour définir la position des données ds LS
  for (let i = 0; i < numberOfProduct; i++) {
    const product = localStorage.getItem(localStorage.key(i));
    // convertir en objet (parse)
    const dataToObject = JSON.parse(product);
    // push objet dans array productCart
    productCart.push(dataToObject);
  }
}
// console.log(product)

// affichage produit
function displayProduct(product) {
  const article = insertArticle(product);
  displayArticle(article);
  const imageBloc = insertImage(product);
  article.append(imageBloc);
}

// affichage article
function displayArticle(article) {
  document.querySelector("#cart__items").append(article);
}

function insertArticle(product) {
  for (const k of product) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = k.id;
    article.dataset.color = k.colors;
    return article;
  }
}

const dataAPI = fetch("http://localhost:3000/api/products");

dataAPI.then(async (response) => {
  const dataProduct = await response.json();
  console.log(dataProduct)
  for (const l of dataProduct) {
    imageUrl = l.imageUrl
  }
console.log(imageUrl )
});
function insertImage(product) {
  const imageBloc = document.createElement("div");
  imageBloc.classList.add("cart__item__img");
  let image = document.createElement("cart__item__img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  imageBloc.append(image);
  return imageBloc;
}

