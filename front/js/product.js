// console.log(window.location.search)

// _____récupération des paramètres d’URL__________________
const idProductUrl = window.location.search;
const urlParams = new URLSearchParams(idProductUrl);
const productId = urlParams.get("id");

// _____appel API__________________________________________
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((data) => useData(data));

function useData(itemKanap) {
  const { colors, name, price, imageUrl, description, altTxt } = itemKanap;
  insertColors(colors);
  insertTitle(name);
  insertPrice(price);
  insertImage(imageUrl, altTxt);
  insertDescription(description);
}

function insertColors(colors) {
  const select = document.querySelector("#colors");
  {
    colors.forEach((tint) => {
      const option = document.createElement("option");
      option.value = tint;
      option.textContent = tint;
      select.append(option);
    });
  }
}

function insertTitle(name) {
  const h1 = document.querySelector("#title");
  h1.textContent = name;
}

function insertPrice(price) {
  const kanapPrice = document.querySelector("#price");
  kanapPrice.textContent = price;
}

function insertImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const bounce = document.querySelector(".item__img");
  bounce.append(image);
}

function insertDescription(description) {
  const kanapDescription = document.querySelector("#description");
  kanapDescription.textContent = description;
}

// gestion d'ajout couleur et nombre de produit
// const button = document.querySelector("#addToCart");
// if (button != null) {
//   button.addEventListener("click", (event) => {
//     const color = document.querySelector("#colors").value;
//     const quantity = document.querySelector("#quantity").value;
//     if (color == null || color == "" || quantity == null || quantity == 0) {
//       alert("Merci de choisir la couleur et la quantité souhaité");
//       return;
//     }
//     let basket = {
//       colors: color,
//       quantity: Number(quantity)
//     };
//     localStorage.setItem(productId, JSON.stringify(basket));
//     window.location.href = "cart.html";
//   });
// }

let basketOption = {
  color: "#colors",
  quantity: Number(quantity),
};

let button = document.getElementById("#addToCart");
if (button != null) {
  button.addEventListener("click", () => {
    let productOption = JSON.parse(localStorage.getItem("product"));
    let color = document.getElementById("#colors").value;
    let quantity = document.getElementById("#quantity").value;
    if (productOption == null) {
      productOption = [];
      productOption.push(basketOption);
      localStorage.setItem("product", JSON.stringify(productOption));
    }
  });
}
// enregistre clef "basket" et valeur basket dans API localStorage
// function saveBasket(basket) {
//   localStorage.setItem("basket", JSON.stringify(basket));
// }
// // recupere l'item avec la clef basket
// function getBasket() {
//   let basket = localStorage.getItem("basket");
//   if (basket == null) {
//     return [];
//   } else {
//     return JSON.parse(basket);
//   }
// }

// function addBasket(product) {
//   let basket = getBasket();
//   let foundProduct = basket.find(p => p.id ==product.id);
//   if(foundProduct != undefined) {
//     foundProduct.quantity++;
//   } else {
//     product.quantity = 1;
//     basket.push(product);
//   }
//   basket.push(product);
//   saveBasket(basket);
// }

// function removeFromBascket(product) {
//   let basket = getBasket();
//   basket = basket.filter(p => p.id != product.id);
//   saveBasket(basket);
// }

// function changeQuantity(product, quantity) {
//   let basket = getBasket();
//   let foundProduct = basket.find(p => p.id == product.id);
//   if (foundProduct != undefined) {
//     foundProduct.quantity += quantity;
//     if (foundProduct.quantity <= 0) {
//       removeFromBascket(foundProduct);
//     }
//   } else {
//     saveBasket(basket)
//   }
// }

// function getNumberProduct() {
//   let basket = getBasket();
//   let number = 0;
//   for (let product of basket) {
//     number += product.quantity;
//   }
//   return number;
// }

// function getTotalPrice() {
//   let basket = getBasket();
//   let total = 0;
//   for (let product of basket) {
//     total += product.quantity * product.price;
//   }
//   return total;
// }
