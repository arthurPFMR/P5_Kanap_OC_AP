// _____appel API___________________________________
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => addProducts(data))

//création des cartes kanap______________________
function addProducts(data) {

//création de la boucle______________________________
    data.forEach(kanap => {
        
// appel data produit________________________________
    const { id, imageUrl, altTxt, name, description } = kanap

// création des éléments (lien->article->contenu)____
    const link = insertLink(id)
    const article = insertArticle()
    const image = insertImage(imageUrl, altTxt)
    const h3 = insertH3(name)
    const paragraph = insertParagraph(description)
    
// Ajout des éléments à l'article____________________
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(paragraph)

// Ajout de l'article dans le lien___________________
    appendArticleInLink(link, article)
    })
}


function insertLink(id) {
    const anchor = document.createElement("a")
        anchor.href = `./product.html?id=` + id
            return anchor
}

function appendArticleInLink(anchor, article) {
    const items = document.querySelector("#items")
            if (items != null) {
                items.appendChild(anchor)
                anchor.appendChild(article)
            }
}

function insertImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
        return image
}

function insertArticle() {
    const article = document.createElement("article")
        return article
}

function insertH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
        return h3
}

function insertParagraph(description) {
    const paragraph = document.createElement("paragraph")
    paragraph.textContent = description
    paragraph.classList.add("productDescription")
        return paragraph
}