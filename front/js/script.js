// FONCTION DE RECUPERATION DES ITEMS DE L'API_________________________________

const kanapItems = async function () {
  try {
    let response = await fetch("http://localhost:3000/api/products/");

    let listItems = await response.json();

    if (response.ok) {
      dataToCards(listItems);
    }
  } catch (e) {
    console.error(e);
  }
};

// FONCTION D'INTEGRATION DES ELEMENTS DE L'API_________________________________

const dataToCards = async function (data) {
  for (let index = 0; index < data.length; index++) {
    const kanapProduct = data[index];

    // carte link_______________________________________________________________
    let kanapCart = document.createElement("a");
    items.append(kanapCart);
    kanapCart.setAttribute("href", "./product.html?id=" + kanapProduct._id);


    // article__________________________________________________________________
    let kanapArticle = document.createElement("article");
    kanapCart.append(kanapArticle);


    // image____________________________________________________________________
    let kanapImage = document.createElement("img");
    kanapArticle.append(kanapImage);
    kanapImage.setAttribute("src", kanapProduct.imageUrl);
    kanapImage.setAttribute("alt", kanapProduct.altTxt);


    // titre_____________________________________________________________________
    let kanapName = document.createElement("h3");
    kanapArticle.append(kanapName);
    kanapName.classList.add("productName");
    kanapName.textContent = kanapProduct.name;


    // description________________________________________________________________
    let kanapDescription = document.createElement("p");
    kanapArticle.append(kanapDescription);
    kanapDescription.classList.add("productDescription");
    kanapDescription.textContent = kanapProduct.description;
  }
};

kanapItems();
