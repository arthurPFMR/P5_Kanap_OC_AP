//récupération des paramètres d’URL___________________________________________
const orderProductsUrl = window.location.search;
const urlParams = new URLSearchParams(orderProductUrl);
const orderProducts = urlParams.get("orderId");

// _____appel API_____________________________________________________________
fetch("http://localhost:3000/api/products/" + orderId)
  .then((response) => response.json())
  .then((data) => useData(data));
