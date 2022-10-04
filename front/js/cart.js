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

  // affichage de toutes les datas du produit______________________________________
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
    // envoi ces résultats à la div "cart_price" pour afficher le total____________
    document.querySelector("#totalQuantity").textContent = quantityOfItemInCart;
    document.querySelector("#totalPrice").textContent = finalPrice;
  }
  console.log(finalPrice);
};

getDataFromLocalStorage();

// SAISIE FORMULAIRE_____________________________________________________________
// regex nom/prénom/ville______________________________________
const regexName = /[^\p{L}\s-]/giu;

// regex adresse_______________________________________________
const regexAdress = /[^0-9\p{L},\s-]/giu;

// regex mail__________________________________________________
const regexMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// input prénom________________________________________________
let firstName = document.querySelector("#firstName");

firstName.addEventListener("input", (eventInput) => {
  // si regex pas respecté______________________________
  if (regexName.test(eventInput.target.value)) {
    document.querySelector("#firstNameErrorMsg").textContent =
      "Le champs est invalide";
    // alors désactivation du bouton "commander"________
    document.querySelector("#order").setAttribute("disabled", true);
  } else {
    document.querySelector("#firstNameErrorMsg").textContent = null;
    document.querySelector("#order").removeAttribute("disabled");
  }
});

// input nom___________________________________________________
let lastName = document.querySelector("#lastName");

lastName.addEventListener("input", (eventInput) => {
  // si regex pas respecté___________________________
  if (regexName.test(eventInput.target.value)) {
    document.querySelector("#lastNameErrorMsg").textContent =
      "Le champs est invalide";
    // alors désactivation du bouton "commander"_____
    document.querySelector("#order").setAttribute("disabled", true);
  } else {
    document.querySelector("#lastNameErrorMsg").textContent = null;
    document.querySelector("#order").removeAttribute("disabled");
  }
});

// input adresse___________________________________________________
let adress = document.querySelector("#address");

adress.addEventListener("input", (eventInput) => {
  // si regex pas respecté___________________________
  if (regexName.test(eventInput.target.value)) {
    document.querySelector("#address").textContent = "Le champs est invalide";
    // alors désactivation du bouton "commander"_____
    document.querySelector("#order").setAttribute("disabled", true);
  } else {
    document.querySelector("#addressErrorMsg").textContent = null;
    document.querySelector("#order").removeAttribute("disabled");
  }
});

// input city___________________________________________________
let city = document.querySelector("#city");

city.addEventListener("input", (eventInput) => {
  // si regex pas respecté___________________________
  if (regexName.test(eventInput.target.value)) {
    document.querySelector("#city").textContent = "Le champs est invalide";
    // alors désactivation du bouton "commander"_____
    document.querySelector("#order").setAttribute("disabled", true);
  } else {
    document.querySelector("#cityErrorMsg").textContent = null;
    document.querySelector("#order").removeAttribute("disabled");
  }
});

// input mail___________________________________________________
let mail = document.querySelector("#email");

mail.addEventListener("input", (eventInput) => {
  // si regex pas respecté___________________________
  if (regexName.test(eventInput.target.value)) {
    document.querySelector("#email").textContent = "Le champs est invalide";
    // alors désactivation du bouton "commander"_____
    document.querySelector("#order").setAttribute("disabled", true);
  } else {
    document.querySelector("#emailErrorMsg").textContent = null;
    document.querySelector("#order").removeAttribute("disabled");
  }
});

//OBJET CONTACT _______________________________________________________
function objectContact(firstName, lastName, address, city, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.city = city;
  this.email = email;
}

// let contactInfo = {
//   firstName: firstName,
//   lastName: lastName,
//   address: address,
//   city: city,
//   email: email,
// };

// BOUTON COMMANDER_____________________________________________________
let orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (eventOrder) => {
  // création objet contact + produit_____________________________
  let customerContact = objectContact(
    firstName.value,
    lastName.value,
    address.value,
    city.value,
    email.value
  );
  let basket = []
  for (let i = 0; i < arrayCart.length; i++) {
    basket.push(arrayCart[i]._id)
  }
  let order = JSON.stringify({customerContact, basket})
  console.log("ici", order)
});

