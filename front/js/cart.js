// récup du panier en array via LS_________________________________________
let infoProduct = null;
let arrayCart = [];

const getDataFromLocalStorage = () => {
  //vérifie et récupère les données du panier__________________________
  if (localStorage.getItem("kanap") == null) {
    alert("Le panier vide");
  } else if (localStorage.getItem("kanap")) {
    arrayCart = JSON.parse(localStorage.getItem("kanap"));
  }

  for (let i = 0; i < arrayCart.length; i++) {
    const productInCart = arrayCart[i];
    cartElement(productInCart);
  }
};

//fonction   génération de l'article______________________________________
const cartElement = (data) => {
  infoProduct = data;

  // article______________________________________________________________
  let cartProduct = document.createElement("article");
  document.querySelector("#cart__items").append(cartProduct);
  cartProduct.dataset.id = infoProduct.id;
  cartProduct.dataset.color = infoProduct.colors;
  cartProduct.classList.add("cart__item");

  // div image ___________________________________________________________
  let divImage = document.createElement("div");
  cartProduct.append(divImage);
  divImage.classList.add("cart__item__img");

  // image _______________________________________________________________
  let imageProduct = document.createElement("img");
  divImage.append(imageProduct);

  //   div content________________________________________________________
  let content = document.createElement("div");
  cartProduct.append(content);
  content.classList.add("cart__item__content");

  // div content desciption (titre + couleur + prix_______________________
  let description = document.createElement("div");
  content.append(description);
  description.classList.add("cart__item__content__description");

  // titre________________________________________________________________
  let nameProduct = document.createElement("h2");
  description.append(nameProduct);

  // couleur______________________________________________________________
  let colorProduct = document.createElement("p");
  description.append(colorProduct);

  // prix_________________________________________________________________
  let priceProduct = document.createElement("p");
  description.append(priceProduct);

  // div paramètre________________________________________________________
  let settings = document.createElement("div");
  content.append(settings);
  settings.classList.add("cart__item__content__settings");

  // div quantité
  let quantityDiv = document.createElement("div");
  settings.append(quantityDiv);
  quantityDiv.classList.add("cart__item__content__settings__quantity");

  // quantité_____________________________________________________________
  let quantity = document.createElement("p");
  quantityDiv.append(quantity);

  // input quantité_______________________________________________________
  let inputQuantity = document.createElement("input");
  quantityDiv.append(inputQuantity);
  inputQuantity.type = "number"
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.name = "itemQuantity"
  inputQuantity.min = 1;
  inputQuantity.max = 100;
  inputQuantity.setAttribute("value", data.quantity) 

  // afifichage de toutes les datas
  url = "http://localhost:3000/api/products/" + infoProduct.id;
  fetch(url).then((response) =>
    response
      .json()
      .then((product) => {
        imageProduct.src = product.imageUrl;
        imageProduct.alt = product.altTxt;
        nameProduct.textContent = product.name;
        colorProduct.textContent = data.colors;
        priceProduct.textContent = product.price + " €";
        quantity.textContent = "Qté : ";
        // inputQuantity.value = data.quantity;
      })
      .catch((err) => console.error(err))
  );
  
};
getDataFromLocalStorage();
