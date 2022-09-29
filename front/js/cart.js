fetch("http://localhost:3000/api/products/")
  .then((response) => response.json())
  .then((data) => getDataFromLocalStorage(data));

// récup du panier en array LS_________________________________________
let infoProduct = null;
let arrayCart = [];

const getDataFromLocalStorage = () => {
  //vérifie et récupère les données du panier__________________________
  if (localStorage.getItem("kanap") == null) {
    alert("panier vide");
  } else if (localStorage.getItem("kanap")) {
    arrayCart = JSON.parse(localStorage.getItem("kanap"));
  }

  for (let i = 0; i < arrayCart.length; i++) {
    const productInCart = arrayCart[i];
    cartElement(productInCart);
  }
};

//fonction   génération de l'article :___________________________________________
const cartElement = (data) => {
  infoProduct = data;

  // article :
  let cartProduct = document.createElement("article");
  document.querySelector("#cart__items").append(cartProduct);
  cartProduct.dataset.id = infoProduct.id;
  cartProduct.dataset.color = infoProduct.colors;
  cartProduct.classList.add("cart__item");

  // div image :________________________________________________________
  let divImage = document.createElement("div");
  cartProduct.append(divImage);
  divImage.classList.add("cart__item__img");

  // image :____________________________________________________________
  let imageProduct = document.createElement("img");
  divImage.append(imageProduct);
  imageProduct.setAttribute("src", infoProduct.imageUrl);
  imageProduct.setAttribute("alt", infoProduct.altTxt);

  //   div content________________________________________________________
  let content = document.createElement("div");
  cartProduct.append(content);
  content.classList.add("cart__item__content");

  // div content desciption_______________________________________________
  let description = document.createElement("div");
  content.append(description);
  description.classList.add("cart__item__content__description");
};
 getDataFromLocalStorage()