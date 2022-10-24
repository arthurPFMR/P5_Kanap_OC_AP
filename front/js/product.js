//récupération des paramètres d’URL------------------------------------------
const idProductUrl = window.location.search;
const urlParams = new URLSearchParams(idProductUrl);
const productId = urlParams.get("id");

// _____appel API-----------------------------------------------------------
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((data) => useData(data));
// -----------------------------------------------------------------------

// fonction datas de item Kanap_______________________
function useData(itemKanap) {
  const { colors, name, price, imageUrl, description, altTxt } = itemKanap;
  colorMaker(colors);
  titleMaker(name);
  priceMaker(price);
  imageMaker(imageUrl, altTxt);
  descriptionMaker(description);
}

// SECTION ITEM-----------------------------------------------------
//

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
  const select = document.getElementById("colors");
  {
    colors.forEach((tint) => {
      const option = document.createElement("option");
      option.value = tint;
      option.textContent = tint;
      select.append(option);
    });
  }
}

// écoute du boutton "ajouter"-------------------------------------------------
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

    // définition des "keys options"________________________
    let productOptions = {
      id: productId,
      colors: color,
      quantity: Number(quantity),
    };

    //localStorage-------------------------------------------------------------
    function addToLocalStorage() {
      productToLocalStorage.push(productOptions);
      localStorage.setItem("kanap", JSON.stringify(productToLocalStorage));
    }

    //declaration key & value______________________
    let productToLocalStorage = JSON.parse(localStorage.getItem("kanap"));

    //si produit ds localstorage___________________
    if (productToLocalStorage) {
      const getProductStorage = productToLocalStorage.find(
        (p) => p.id == productOptions.id && p.colors == color
      );
      if (getProductStorage) {
        getProductStorage.quantity += Number(quantity);
        localStorage.setItem("kanap", JSON.stringify(productToLocalStorage));
        return;
      }
      productToLocalStorage.push(productOptions);

      //si pas de produit créer array______________
    } else {
      productToLocalStorage = [];
      productToLocalStorage.push(productOptions);
    }
    localStorage.setItem("kanap", JSON.stringify(productToLocalStorage));
  });
}
