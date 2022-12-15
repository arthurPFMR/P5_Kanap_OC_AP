//RECUPERATION DES PARAMETRES DE L'URL--------------------------------------

// récupère les paramètres query search (?=.....):
const querySearch = window.location.search;
// formatage des données de l'API => queryString:
const params = new URLSearchParams(querySearch);
// envoie à productId la queryString formater nommage "id":
const productId = params.get("id");
// -------------------------------------------------------------------------
//

// APPEL API----------------------------------------------------------------
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((data) => useData(data));
// --------------------------------------------------------------------------

// SECTION ITEM---------------------------------------------------------------------------------------------------------------
//
// fonction datas de itemKanap_______________________
// permet de visualiser les détail produit dans le DOM
function useData(itemKanap) {
  const { colors, name, price, imageUrl, description, altTxt } = itemKanap;
  colorMaker(colors);
  titleMaker(name);
  priceMaker(price);
  imageMaker(imageUrl, altTxt);
  descriptionMaker(description);
}

// div item_img______________________________
function imageMaker(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const bounce = document.querySelector(".item__img");
  bounce.append(image);
}

// H1_________________________________________
function titleMaker(name) {
  const h1 = document.getElementById("title");
  h1.textContent = name;
}

// span price_________________________________
function priceMaker(price) {
  const kanapPrice = document.getElementById("price");
  kanapPrice.textContent = price;
}

// div item_content_description_____________
function descriptionMaker(description) {
  const kanapDescription = document.getElementById("description");
  kanapDescription.textContent = description;
}

// select colors______________________________
function colorMaker(colors) {
  const selectColor = document.getElementById("colors");
  {
    colors.forEach((kanapColor) => {
      const option = document.createElement("option");
      option.value = kanapColor;
      option.textContent = kanapColor;
      selectColor.append(option);
    });
  }
}

// select quantity_______________________________
const itemQuantity = document.getElementById("quantity");
const regexQuantity = /[.,]+/;
// évènement d'écoute de l'input quantité:
itemQuantity.addEventListener("change", (e) => {
  if (
    itemQuantity.value < 0 ||
    itemQuantity.value > 100 ||
    regexQuantity.test(e.target.value)
  ) {
    itemQuantity.value = 0;
  }
});

// ECOUTE DU BOUTON "ajouter"-------------------------------------------------------------------------------------------------------
//
const button = document.getElementById("addToCart");
if (button != null) {
  button.addEventListener("click", () => {
    // pris en compte de la couleur et de la quantité__________
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    if (color == null || color == "" || quantity == null || quantity == 0) {
      alert("Veuillez sélectionner la couleur et la quantité.");
      return;
    } else {
      confirm("Produit ajouté au panier.");
    }

    // définition des "keysJSON options"________________________
    let productOptions = {
      id: productId,
      colors: color,
      quantity: Number(quantity),
    };

    //LOCALSTORAGE-----------------------------------------------------------------------------------------------------------------
    //declaration key & value______________________
    // analyse la chaîne JSON et construit la valeur JS:
    let productToLocalStorage = JSON.parse(localStorage.getItem("kanap"));

    //si produit ds localstorage:
    if (productToLocalStorage) {
      // retrouve l'ID et la couleur:
      const getProductStorage = productToLocalStorage.find(
        (i) => i.id == productOptions.id && i.colors == color
      );
      if (getProductStorage) {
        // renvoie la quantité (+= permet d'additionné l'item):
        getProductStorage.quantity += Number(quantity);
        localStorage.setItem("kanap", JSON.stringify(productToLocalStorage));
        return;
      }
      // ajoute les items et renvoie un nouveau tableau:
      productToLocalStorage.push(productOptions);

      //si pas de produit déja présent ds LS, créer array______________
    } else {
      productToLocalStorage = [];
      productToLocalStorage.push(productOptions);
    }
    localStorage.setItem("kanap", JSON.stringify(productToLocalStorage));
  });
}
