// FONCTION(async) DE RECUPERATION DES ITEMS DE L'API-----------------------------------

const kanapItems = async function () {
  try {
    // variable cherchant les données:
    let response = await fetch("http://localhost:3000/api/products/");
    // variable executant les réponses en objet JS (fichier json):
    let listItems = await response.json();
    // si fetch ok, on joue dataTocards:
    if (response.ok) {
      dataToCards(listItems);
    }
    // si erreur attrappe l'erreur et log status code HTTP:
  } catch (err) {
    console.error(err);
  }
};

// FONCTION D'INTEGRATION DES ELEMENTS DE L'API---------------------------------

function dataToCards(data) {
  // boucle incrémentant l'index des datas pour chaque produit
  for (let i = 0; i < data.length; i++) {
    const dataDisplay = data[i];

    // carte link(items id de la section)_______________________
    let kanapCart = document.createElement("a");
    items.append(kanapCart);
    kanapCart.setAttribute("href", "./product.html?id=" + dataDisplay._id);

    // article__________________________________________________
    let kanapArticle = document.createElement("article");
    kanapCart.append(kanapArticle);

    // image____________________________________________________
    let kanapImage = document.createElement("img");
    kanapArticle.append(kanapImage);
    kanapImage.setAttribute("src", dataDisplay.imageUrl);
    kanapImage.setAttribute("alt", dataDisplay.altTxt);

    // titre____________________________________________________
    let kanapName = document.createElement("h3");
    kanapArticle.append(kanapName);
    kanapName.classList.add("productName");
    kanapName.textContent = dataDisplay.name;

    // description______________________________________________
    let kanapDescription = document.createElement("p");
    kanapArticle.append(kanapDescription);
    kanapDescription.classList.add("productDescription");
    kanapDescription.textContent = dataDisplay.description;
  }
}

// joue la fonction async:
kanapItems();
