let infoProduct = null;
let arrayCart = [];

// récup du panier en array via LS_________________________________________
const getDataFromLocalStorage = () => {
  //vérifie et récupère les données du panier______________________________
  if (localStorage.getItem("kanap")) {
    arrayCart = JSON.parse(localStorage.getItem("kanap"));
  } else {
    alert("Votre panier est vide");
    document.getElementById("order").setAttribute("disabled", true);
  }

  for (let i = 0; i < arrayCart.length; i++) {
    const productInCart = arrayCart[i];
    cartElement(productInCart);
  }
};

//fonction   génération de l'article-------------------------------------------------------------
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
  removeProduct.addEventListener("click", (eventDelete) => {
    if (confirm("Retirer cet article du panier ?")) {
      // retrouve l'index du produit dans arraycart________________________
      let indexOfProduct = Array.prototype.indexOf.call(
        document.querySelectorAll(".cart__item"),
        eventDelete.target.closest(".cart__item")
      );
      // suppression dans arraycart________________________________________
      if (indexOfProduct > -1) {
        arrayCart.splice(0, 1);
      }
      // Màj du LS
      localStorage.setItem("kanap", JSON.stringify(arrayCart));
      // supprime l'article du Html
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
        removeProduct.textContent = "Supprimer";
      })
      .catch((err) => console.error(err))
  );
  tolalPriceAndQuantity();
};

// TOTAL-----------------------------------------------------------------------------------------
const tolalPriceAndQuantity = () => {
  let finalPrice = null;
  let quantityOfProductInCart = null;

  //récupération des data price______________________________________________________
  let allInfoProductAsync = arrayCart.map((data) =>
    fetch("http://localhost:3000/api/products/" + data.id).then((response) =>
      response.json()
    )
  );
  Promise.all(allInfoProductAsync).then((products) => {
    products.forEach((product, i) => {
      // parseInt renvoie un entier exprimé dans une base données____________________
      finalPrice += parseInt(product.price) * parseInt(arrayCart[i].quantity);
      // récupération des items du panier____________________________________________
      quantityOfProductInCart += parseInt(arrayCart[i].quantity);
      // envoi ces résultats à la div "cart_price" pour afficher le total____________
      document.querySelector("#totalQuantity").textContent =
        quantityOfProductInCart;
      document.querySelector("#totalPrice").textContent = parseInt(finalPrice);
    });
  });
};
getDataFromLocalStorage();

//
// REGEX pour le formulaire----------------------------------------------------------------------
function regex() {
// (unicode et -)_________________________________
const regexName = /[^\p{L}\s-]/gmu;
// (unicode et -,)________________________________
const regexAddress = /[^0-9\p{L},\s-]/gmu;
// mail___________________________________________
const regexMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

//
// SAISIE FORMULAIRE-----------------------------------------------------------------------------
// input prénom_________________________________________________________
let firstName = document.querySelector('input[name="firstName"]');

firstName.addEventListener("input", (eventInput) => {
  // si regex pas respecté => error msg______________
  if (regexName.test(eventInput.target.value)) {
    document.getElementById("firstNameErrorMsg").textContent =
      "Le champs est invalide";
    //désactivation du bouton "commander"____________
    document.getElementById("order").setAttribute("disabled", true);
  } else {
    // sinon on active le bouton "commander" et supprime le msg error
    document.getElementById("firstNameErrorMsg").textContent = null;
    document.getElementById("order").removeAttribute("disabled");
  }
});

// input nom____________________________________________________________
let lastName = document.querySelector('input[name="lastName"]');

lastName.addEventListener("input", (eventInput) => {
  if (regexName.test(eventInput.target.value)) {
    document.getElementById("lastNameErrorMsg").textContent =
      "Le champs est invalide";
    document.getElementById("order").setAttribute("disabled", true);
  } else {
    document.getElementById("lastNameErrorMsg").textContent = null;
    document.getElementById("order").removeAttribute("disabled");
  }
});

// input adresse________________________________________________________
let address = document.querySelector('input[name="address"]');

address.addEventListener("input", (eventInput) => {
  if (regexAddress.test(eventInput.target.value)) {
    document.getElementById("addressErrorMsg").textContent =
      "Le champs est invalide";
    document.getElementById("order").setAttribute("disabled", true);
  } else {
    document.getElementById("addressErrorMsg").textContent = null;
    document.getElementById("order").set;
  }
});

// input city___________________________________________________________
let city = document.querySelector('input[name="city"]');

city.addEventListener("input", (eventInput) => {
  if (regexName.test(eventInput.target.value)) {
    document.getElementById("cityErrorMsg").textContent =
      "Le champs est invalide";
    // alors désactivation du bouton "commander"_____
    document.getElementById("order").setAttribute("disabled", true);
  } else {
    document.getElementById("cityErrorMsg").textContent = null;
    document.getElementById("order").removeAttribute("disabled");
  }
});

// input mail___________________________________________________________
let mail = document.querySelector('input[name="email"]');

mail.addEventListener("input", (eventInput) => {
  if (!regexMail.test(eventInput.target.value)) {
    document.getElementById("emailErrorMsg").textContent =
      "Adresse mail invalide";
    document.getElementById("order").setAttribute("disabled", true);
  } else {
    document.getElementById("emailErrorMsg").textContent = null;
    document.getElementById("order").removeAttribute("disabled");
  }
});

//
// BOUTON COMMANDER-------------------------------------------------------------------------------
const orderButton = document.getElementById("order");

orderButton.addEventListener("click", (event) => {
  event.preventDefault();

  //Récupération des inputs du formulaire_______________________________
  let inputFirstName = document.getElementById("firstName");
  if (inputFirstName.value == "") {
    alert("Veuillez remplir tout les champs du formulaire");
    document.getElementById("order").setAttribute("disabled", true);
    return;
  }
  let inputLastName = document.getElementById("lastName");
  if (inputLastName.value == "") {
    alert("Veuillez remplir tout les champs du formulaire");
    document.getElementById("order").setAttribute("disabled", true);
    return;
  }
  let inputAdress = document.getElementById("address");
  if (inputAdress.value == "") {
    alert("Veuillez remplir tout les champs du formulaire");
    document.getElementById("order").setAttribute("disabled", true);
    return;
  }
  let inputCity = document.getElementById("city");
  if (inputCity.value == "") {
    alert("Veuillez remplir tout les champs du formulaire");
    document.getElementById("order").setAttribute("disabled", true);
    return;
  }
  let inputMail = document.getElementById("email");
  if (inputMail.value == "") {
    alert("Veuillez remplir tout les champs du formulaire");
    document.getElementById("order").setAttribute("disabled", true);
    return;
  }

  // array product_______________________________________________________
  let product = [];
  if (product == null) {
    document.getElementById("order").setAttribute("disabled", true);
  } else {
  for (let i = 0; i < arrayCart.length; i++) {
    product.push(arrayCart[i].id);
  }
}
  // creation du body (contact{} + produit[])____________________________
  const order = {
    contact: {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAdress.value,
      city: inputCity.value,
      email: inputMail.value,
    },
    products: product,
  };

  // Method POST_________________________________________________________
  const request = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // Requete fetch_______________________________________________________
  fetch("http://localhost:3000/api/products/order", request)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html";
    })
    .catch((err) => {
      alert("Nous rencontrons des problèmes, code: " + err.message);
    });
});
