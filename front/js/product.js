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
      select.appendChild(option);
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
  bounce.appendChild(image);
}

function insertDescription(description) {
  const kanapDescription = document.querySelector("#description");
  kanapDescription.textContent = description;
}

// gestion d'ajout couleur et nombre de produit
const button = document.querySelector("#addToCart");
if (button != null) {
  button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value;
    if (color == null || color === "" || quantity == null || quantity == 0) {
      alert("Merci de choisir la couleur et la quantité souhaité");
    }
    const data = {
      colors: color,
      quantity: quantity,
      price: price
    }
    localStorage.setItem(JSON.stringify(data))
  });
}
