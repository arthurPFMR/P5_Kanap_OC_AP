// declaration variable key + value
let productToLocalStorage = JSON.parse(localStorage.getItem("#addToCart"));

// affichage produit
const cartProduct = document.querySelector("#cart__items")
// si panier vide
if (productToLocalStorage === null) {
  const emptyBasket = []
  alert ("le panier est vide")
  // le panier n'est pas vide
} else {
  let displayProduct = []
  for (let i = 0; i < productToLocalStorage.lenght; i++) {
    displayProduct.push(productToLocalStorage)
  }
}
console.log(productToLocalStorage)

