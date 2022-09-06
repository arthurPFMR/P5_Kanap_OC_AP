// console.log(window.location.search)

// _____récupération des paramètres d’URL__________________
const idProductUrl = window.location.search;
const urlParams = new URLSearchParams(idProductUrl);
const productId = urlParams.get("id");

// _____appel API__________________________________________
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((data) => useData(data));

function useData(item) {
  const { colors, name, price, imageUrl, description, altTxt } = item;
  insertColors(colors);
  insertTitle(name);
  insertPrice(price);
  insertImage(imageUrl, altTxt);
  insertDescription(description);
}

function insertColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
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
  if (h1 != null) h1.textContent = name;
}

function insertPrice(price) {
  const kanapPrice = document.querySelector("#price");
  if (price != null) kanapPrice.textContent = price;
}

function insertImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.scr = imageUrl;
  image.alt = altTxt;
  const bounce = document.querySelector(".item__img");
  if (bounce != null) bounce.appendChild(image);
  //   bounce.appendChild(image)
  //   return image;
}

function insertDescription(description) {
  const kanapDescription = document.querySelector("#description");
  if (description != null) kanapDescription.textContent = description;
}
