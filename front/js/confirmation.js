//récupération des paramètres d’URL___________________________________________
const orderProductsUrl = window.location.search;
const urlParams = new URLSearchParams(orderProductsUrl);
const orderProducts = urlParams.get("orderId");

let orderRequest = [];
orderRequest = localStorage.getItem("orderId");
document.getElementById("orderId").textContent = orderRequest;
// localStorage.clear()

