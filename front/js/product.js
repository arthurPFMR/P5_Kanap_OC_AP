//récupération des paramètres d’URL___________________________________________
const idProductUrl = window.location.search;
const urlParams = new URLSearchParams(idProductUrl);
const productId = urlParams.get("id");

// _____appel API_____________________________________________________________
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
// écoute du boutton ajouter
const button = document.querySelector("#addToCart");
if (button != null) {
  button.addEventListener("click", () => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if (color == null || color == "" || quantity == null || quantity == 0) {
      alert("Veuillez sélectionner la couleur et la quantité.");
      return;
    }
    let productOptions = {
      id: productId,
      colors: color,
      quantity: Number(quantity),
    };
    //___________localStorage__________________________
    function addToLocalStorage() {
      productToLocalStorage.push(productOptions);
      localStorage.setItem("kanap", JSON.stringify(productToLocalStorage));
    }

    //declaration key & value
    let productToLocalStorage = JSON.parse(localStorage.getItem("kanap"));

    //si produit ds localstorage
    if (productToLocalStorage) {
      const getProductStorage = productToLocalStorage.find(
        (p) => p.id == productOptions.id && p.colors == color
      );
      if (getProductStorage) {
        getProductStorage.quantity += Number(quantity);
        localStorage.setItem(
          "kanap",
          JSON.stringify(productToLocalStorage)
        );
        return;
      }
      productToLocalStorage.push(productOptions);
      //si pas de produit créer array
    } else {
      productToLocalStorage = [];
      productToLocalStorage.push(productOptions);
    }
    localStorage.setItem("kanap", JSON.stringify(productToLocalStorage));
    // window.location.href = "cart.html";
  });
}