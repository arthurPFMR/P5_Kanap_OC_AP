// récup du panier en array via LS_________________________________________
let infoProduct = null;
let arrayCart = [];

const getDataFromLocalStorage = () => {
  //vérifie et récupère les données du panier______________________________
  if (localStorage.getItem("kanap")) {
    arrayCart = JSON.parse(localStorage.getItem("kanap"));
  }

  for (let i = 0; i < arrayCart.length; i++) {
    const productInCart = arrayCart[i];
    cartElement(productInCart);
  }
};

//fonction   génération de l'article_____________________________________________________
const cartElement = (data) => {
  infoProduct = data;

  // article_______________________________________________________________________
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

  // div quantité_________________________________________________________
  let quantityDiv = document.createElement("div");
  settings.append(quantityDiv);
  quantityDiv.classList.add("cart__item__content__settings__quantity");

  // quantité_____________________________________________________________
  let quantity = document.createElement("p");
  quantityDiv.append(quantity);

  // input quantité_______________________________________________________
  let inputQuantity = document.createElement("input");
  quantityDiv.append(inputQuantity);
  inputQuantity.type = "number";
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.name = "itemQuantity";
  inputQuantity.min = 1;
  inputQuantity.max = 100;
  inputQuantity.setAttribute("value", data.quantity);

  // évènement d'écoute sur l'input quantité_______________________________
  inputQuantity.addEventListener("input", (eventSelect) => {
    //Au changement, retrouver l'index du produit dans l'array_____________
    let indexOfProducts = Array.prototype.indexOf.call(
      document.querySelectorAll(".cart__item"),
      eventSelect.target.closest(".cart__item")
    );

    //Si nouvelle valeur différente,
    // modification dans l'array Panier et dans local Storage______________
    if (
      inputQuantity.value !== arrayCart[indexOfProducts].quantity &&
      1 <= inputQuantity.value <= 100
    ) {
      let updateQuantity = parseInt(inputQuantity.value);

      //Màj quantité dans l' Array Panier___________________________________
      arrayCart[indexOfProducts].quantity = updateQuantity;

      //MàJ du localStorage_________________________________________________
      localStorage.setItem("kanap", JSON.stringify(arrayCart));

      //Modification de l'affichage du total,
      // si modification de l'input quantité sur la page panier_____________
      tolalPriceAndQuantity();
    }
  });

  // div supprimer_________________________________________________________
  let remove = document.createElement("div");
  settings.append(remove);
  remove.classList.add("cart__item__content__settings__delete");

  // supprimer_____________________________________________________________
  let removeItem = document.createElement("p");
  remove.append(removeItem);
  removeItem.classList.add("deleteItem");

  // boutton supprimer_____________________________________________________
  removeItem.addEventListener("click", (eventDelete) => {
    // retrouve l'index du produit dans arraycart________________________
    let indexOfItems = Array.prototype.indexOf.call(
      document.querySelector(".cart__item"),
      eventDelete.target.closest(".cart__item")
    );
    // suppression dans arraycart________________________________________
    if (indexOfItems > -1) {
      arrayCart.splice(indexOfItems, 1);
    }
    // Màj du LS
    localStorage.setItem("kanap", JSON.stringify(arrayCart));
    // supprime l'article
    removeItem.closest("article").remove();
    // affichage total update
    tolalPriceAndQuantity();
  });

  // afifichage de toutes les datas________________________________________________
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
        removeItem.textContent = "Supprimer";
      })
      .catch((err) => console.error(err))
  );
  tolalPriceAndQuantity();
};

// TOTAL_________________________________________________________________________________________
/*dans le array: récupération et multiplication des items du panier : 
            (price x quantity)
                                puis on additione les résultats*/
const tolalPriceAndQuantity = () => {
  let finalPrice = null;
  let quantityOfItemInCart = null;

  for (let i = 0; i < arrayCart.length; i++) {
    // parseInt renvoie un entier exprimé dans une base données________________________
    finalPrice +=
      parseInt(arrayCart[i].price) * parseInt(arrayCart[i].quantity);
    // récupération des items du panier________________________________________________
    quantityOfItemInCart += parseInt(arrayCart[i].quantity);
    // on envoie ces résultats à la div "cart_price" pour afficher le total____________
    document.querySelector("#totalQuantity").textContent = quantityOfItemInCart;
    document.querySelector("#totalPrice").textContent = finalPrice;
  }
  console.log(finalPrice);
};

getDataFromLocalStorage();



// SAISIE FORMULAIRE_____________________________________________________________