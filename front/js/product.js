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

// ______________________________________________________________
const button = document.querySelector("#addTocart");
if (button != null) {
  button.addEventListener("click", () => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if (color == null || color == "" || quantity == null || quantity == 0) {
      alert("Merci de choisir la couleur et la quantité souhaité");
      return;
    }
    let product = {
      id: productId,
      colors: color,
      quantity: Number(quantity),
    };
    // localStorage_____________________________________________
    function saveBasket(basket) {
      localStorage.setItem("#addToCart", JSON.stringify(basket));
    }
    
    function getBasket() {
      let basket = localStorage.getItem("#addToCart");
      if (basket == null) {
        return [];
      } else {
        return JSON.parse(basket);
      }
    }
    
    function addBasket(product) {
      let basket = getBasket();
      let foundProduct = basket.find((p) => p.id == product.id);
      if (foundproduct != undefined) {
        foundProduct.quantity++;
      } else {
        product.quantity = 1;
        basket.push(product);
      }
      saveBasket(basket);
    }
  });
}

// const button = document.querySelector("#addToCart");
// if (button != null) {
//   button.addEventListener("click", () => {
//     const color = document.querySelector("#colors").value;
//     const quantity = document.querySelector("#quantity").value;
//     if (color == null || color == "" || quantity == null || quantity == 0) {
//       alert("Merci de choisir la couleur et la quantité souhaité");
//       return;
//     }
//     let productOptions = {
//       id: productId,
//       colors: color,
//       quantity: Number(quantity),
//     };
//     //___________localStorage__________________________
//     let addToLocalStorage = () => {
//       productToLocalStorage.push(productOptions);
//       localStorage.setItem("#addToCart", JSON.stringify(productToLocalStorage));
//     };

//     //declaration key & value
//     let productToLocalStorage = JSON.parse(localStorage.getItem("#addToCart"));

//     //si produit ds localstorage
//     if (productToLocalStorage) {
//       addToLocalStorage();
//       //si pas de produit créer array
//     } else {
//       productToLocalStorage = [];
//       addToLocalStorage();
//     }
//     let foundProduct = productToLocalStorage.find(p => p.id == productOptions.id);
//     if (foundProduct != undefined) {
//       productOptions.quantity++
//     } else {
//       productOptions.quantity = 1
//     }
//     // window.location.href = "cart.html";
//   });
// }
