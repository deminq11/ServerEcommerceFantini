
const socket = io()
const productList = document.getElementById("product-list")

socket.on("productAdd", AddedProduct=>{
    let productItem=document.createElement("li")
    productItem.innerHTML=`${AddedProduct.title} -$${AddedProduct.price}`
    productItem.id=AddedProduct.id
    productList.append(productItem)
})

socket.on("productChange", updatedProduct=>{
    let productItem=document.createElement("li")
    productItem.innerHTML=`${updatedProduct.title} -$${updatedProduct.price}`
    productItem.id=updatedProduct.id

    let productIndex = -1
    for (let i = 0; i < productList.children.length; i++) {
        const product = productList.children[i];
        if (product.id == updatedProduct.id) {
            productIndex = i
        }
    }
    if(productIndex !== -1){
        productList.children[productIndex].replaceChild(productItem, productList.children[productIndex].childNodes[0])
    }
})

socket.on("productDelete", deletedProduct =>{
    let productIndex = -1
    for (let i = 0; i < productList.children.length; i++) {
        const product = productList.children[i];
        if (product.id == deletedProduct.id) {
            productIndex = i
        }
    }
    if(productIndex !== -1){
        productList.children[productIndex].remove()
    }
})