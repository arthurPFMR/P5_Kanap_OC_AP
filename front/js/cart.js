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
    const ProductInCart = arrayCart[i];
    cartElement(ProductInCart);
  }
};

//fonction génération de l'article :___________________________________________
const cartElement = (data) => {
  infoProduct = data;

  // article :
  let cartproduct = document.createElement("article");
  document.querySelector("#cart__items").append(cartproduct);
  cartproduct.dataset.id = infoProduct.id;
  cartproduct.dataset.color = infoProduct.color;
  cartproduct.classList.add("cart__item");

  // div image :________________________________________________________
  let divImage = document.createElement("div");
  cartproduct.append(divImage);
  divImage.classList.add("cart__item__img");

  // image :____________________________________________________________
  let imageProduct = document.createElement("img");
  divImage.append(imageProduct);
  imageProduct.setAttribute("src", infoProduct.imageUrl);
  imageProduct.setAttribute("alt", infoProduct.altTxt);

  //   div content________________________________________________________
  let content = document.createElement("div");
  cartproduct.append(content);
  content.classList.add("cart__item__content");

  // div content desciption_______________________________________________
  let description = document.createElement("div");
  content.append(description);
  description.classList.add("cart__item__content__description");
};
 getDataFromLocalStorage()