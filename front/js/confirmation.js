// création du numéro de commande:
function orderNumber() {
  const orderId = document.getElementById("orderId");
  orderId.textContent = localStorage.getItem("orderId");
  localStorage.clear()
}
orderNumber();


// Création du message de remerciement: 
function thanksMessage() {
const orderMessage = document.querySelector("p")
orderMessage.setAttribute("id", "message")
const orderMessageId = document.getElementById("message")
const thanksText = document.createElement("p");
orderMessageId.append(thanksText)
thanksText.textContent = "Merci pour votre achat !"
thanksText.style.margin = "-8px"
thanksText.style.fontSize = "25px"
thanksText.style.fontWeight = "bold"
}
thanksMessage() 
