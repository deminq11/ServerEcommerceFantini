
document.querySelectorAll('#addToCartForm').forEach(form => {
    form.addEventListener('submit', AddToCart)
  })
async function AddToCart(event){
    event.preventDefault()
    const form = event.target
    const pid = form.querySelector('#productId').dataset.id
    const cid = form.querySelector('#idInput').value.trim()
    if (cid) {
        try {
            let response=await fetch(`/api/carts/${cid}/products/${pid}`,{
                method:"post"
            })
            if(response.status==200){
                const data = await response.json();
                alert(`El producto se añadió con exito al carrito: ${JSON.stringify(data.message)}`);
            }else{
                let error =await response.json()
                alert(error.message)
            }
        } catch (error) {
            console.error(error);
            alert(error.message||'Error inesperado...');
        }
    }else{
        alert("Porfavor introduzca un id de carrito.")
    }
}