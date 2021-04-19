/*
    * Cargar producto
*/

const cargar = document.getElementById('cargar')

cargar.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value
    const descripcion = document.getElementById('descripcion').value
    const codigo = document.getElementById('codigo').value
    const imgUrl = document.getElementById('imgUrl').value
    const precio = document.getElementById('precio').value
    const stock = document.getElementById('stock').value

    if(nombre == "" || descripcion == "" || codigo == "" || imgUrl == "" || precio == "" || stock == ""){
       
        alert('Todos los campos son obligatorios') 
    
    }else{
        const data = {
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            imgUrl: imgUrl,
            precio: precio,
            stock: stock
        }
    
        fetch('/productos/agregar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(
                data
            )
        })
        .then(resp => resp)
        .then(resp => console.log(resp))
    
        window.location.assign('/tienda')
    }
})