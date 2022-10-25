
function orderNumber() {
    const orderId = document.getElementById("orderId")
    orderId.textContent = localStorage.getItem("orderId")
    localStorage.clear()
}

orderNumber() 