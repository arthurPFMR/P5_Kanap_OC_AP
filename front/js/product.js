const idUrl = window.location.search
const urlParams = new URLSearchParams(idUrl)
const productId = urlParams.get("id")

    console.log(productId)