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
    //Au clic, retrouver l'index du produit dans l'array___________________
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
  let removeProduct = document.createElement("p");
  remove.append(removeProduct);
  removeProduct.classList.add("deleteItem");

  // boutton supprimer_____________________________________________________
  removeProduct.addEventListener("click", (eventRemove) => {
    if (confirm("Retirer cet article du panier?")) {
      // retrouve l'index du produit dans arraycart________________________
      let indexOfItems = Array.prototype.indexOf.call(
        document.querySelector(".cart__item"),
        eventRemove.target.closest(".cart__item")
      );
      // suppression dans arraycart________________________________________
      if (indexOfItems > -1) {
        arrayCart.splice(indexOfItems, 1);
      }
      // Màj du LS
      localStorage.setItem("kanap", JSON.stringify(arrayCart));
      // supprime l'article
      removeProduct.closest("article").remove();
      // affichage total update
      tolalPriceAndQuantity();
    }
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
        removeProduct.textContent = "Supprimer";
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
  let quantityOfProductInCart = null;

  for (let i = 0; i < arrayCart.length; i++) {
    // parseInt renvoie un entier exprimé dans une base données________________________
    finalPrice +=
      parseInt(arrayCart[i].price) * parseInt(arrayCart[i].quantity);
    // récupération des items du panier________________________________________________
    quantityOfProductInCart += parseInt(arrayCart[i].quantity);
    // envoi ces résultats à la div "cart_price" pour afficher le total____________
    document.querySelector("#totalQuantity").textContent =
      quantityOfProductInCart;
    document.querySelector("#totalPrice").textContent = parseInt(finalPrice);
  }
  console.log(finalPrice);
};

getDataFromLocalStorage();

// SAISIE FORMULAIRE_____________________________________________________________
// regex nom/prénom/ville______________________________________
const regexName = /[^\p{L}\s-]/gmu;

// regex adresse_______________________________________________
const regexAddress = /[0-9^\p{L}\s-]/gmu;

// regex mail__________________________________________________
const regexMail = /^\w+([\.-]?\w+)*@([\.-]?\w+)*(\.\w{2,3})+$/;

// input prénom_________________________________________________________
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

// input nom____________________________________________________________
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

// input adresse________________________________________________________
let address = document.querySelector("#address");

address.addEventListener("input", (eventInput) => {
  // si regex pas respecté___________________________
  if (regexAddress.test(eventInput.target.value)) {
    document.querySelector("#address").textContent = "Le champs est invalide";
    // alors désactivation du bouton "commander"_____
    document.querySelector("#order").setAttribute("disabled", true);
  } else {
    document.querySelector("#addressErrorMsg").textContent = null;
    document.querySelector("#order").removeAttribute("disabled");
  }
});

// input city___________________________________________________________
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

// input mail___________________________________________________________
let mail = document.querySelector("#email");

mail.addEventListener("input", (eventInput) => {
  // si regex pas respecté___________________________
  if (regexMail.test(eventInput.target.value)) {
    document.querySelector("#email").textContent = "Le champs est invalide";
    // alors désactivation du bouton "commander"_____
    document.querySelector("#order").setAttribute("disabled", true);
  } else {
    document.querySelector("#emailErrorMsg").textContent = null;
    document.querySelector("#order").removeAttribute("disabled");
  }
});

//OBJET CONTACT ___________________________________________________________________
function objectForm(firstName, lastName, address, city, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.city = city;
  this.email = email;
}

// BOUTON COMMANDER_____________________________________________________
let orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (eventOrder) => {
  // création objet contact + produit_____________________________
  let contact = objectForm(
    firstName.value,
    lastName.value,
    address.value,
    city.value,
    mail.value,
  );

  let products = [];
  for (let i = 0; i < arrayCart.length; i++) {
    products.push(arrayCart[i]._id);
  }

  let orderRequest = JSON.stringify({ contact, products });
  // document.location.href = "confirmation.html"
  //requête post pour récupérer l' orderId par l'API______________
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: orderRequest,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      //  si ok, redirection vers page confirmation_______________
    })
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);
      // on efface le LS__________________________________________
      localStorage.clear();

      window.location.href = "confirmation.html";
    });
});
