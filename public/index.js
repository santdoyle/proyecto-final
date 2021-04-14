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
})


/*
    * Listar todos los productos
*/

const getProductos = async () => {
    const data = await fetch('/productos/listar')
    const response = data.json();
    return response
}

getProductos().then(resp => {
    if(resp.msg === "No hay productos añadidos"){
        const container = document.getElementById("contenedor")

        container.innerHTML = resp.msg
    
    }else{
        const producto = document.getElementById("producto")

        resp.forEach(element => {
            let div = document.createElement('div')
            
            div.innerHTML = `<div class="card shadow-sm">
                        <img src="${element.imgUrl}">
                        <div class="card-body">
                        <h2>${element.nombre}</h2>
                        <small id="idProducto">${element.id}</small>
                        <p class="card-text">${element.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                            <button type="button" id="verProducto-${element.id}" class="btn btn-sm btn-outline-secondary">Ver</button>
                            </div>
                            <small class="text-muted">Agregar al carrito</small>
                        </div>
                        </div>
                    </div>`
            div.className = "col"
            producto.appendChild(div)

            /*
                * Ver producto por ID - Editar y Borrar
            */
            const botonVer = document.getElementById(`verProducto-${element.id}`)
            const container = document.getElementById("contenedor")
            
            botonVer.addEventListener('click', () => {

                const getProductoByID = async () => {
                    const data = await fetch('/productos/listar?id=' + element.id)
                    const respuesta = await data.json()

                    return respuesta
                }

                getProductoByID().then(resp => {
                    const ficha = `<div class="card">
                                    <div class="row">
                                        <aside class="col-sm-5 border-right">
                                            <article class="gallery-wrap"> 
                                                <div class="img-big-wrap">
                                                <div> <a href="#"><img src="${resp.imgUrl}"></a></div>
                                                </div> <!-- slider-product.// -->
                                            </article> <!-- gallery-wrap .end// -->
                                        </aside>
                                        <aside class="col-sm-7">
                                        <article class="card-body p-5">
                                            <h3 class="title mb-3">${resp.nombre}</h3>
                                        
                                            <p class="price-detail-wrap"> 
                                                <span class="price h3 text-warning"> 
                                                    <span class="currency">ARS $</span><span class="num">${resp.precio}</span>
                                                </span> 
                                            </p> <!-- price-detail-wrap .// -->
                                            <dl class="item-property">
                                                <dt>Description</dt>
                                                <dd><p>${resp.descripcion} </p></dd>
                                            </dl>
                                            <dl class="param param-feature">
                                                <dt>Codigo</dt>
                                                <dd>${resp.codigo}</dd>
                                            </dl>  <!-- item-property-hor .// -->
                                            <dl class="param param-feature">
                                                <dt>Stock</dt>
                                                <dd>${resp.stock}</dd>
                                            </dl>  <!-- item-property-hor .// -->                            
                                            <hr>
                                            <a href="#" class="btn btn-lg btn-outline-primary "> <i class="fas fa-shopping-cart"></i> Agrear al carrito </a>
                                            <hr>
                                            <button type="button" id="borrar" class="btn btn-sm btn-outline-secondary">Borrar</button>
                                            <button type="button" id="editar" class="btn btn-sm btn-outline-secondary">Editar</button>
                                            </article> <!-- card-body.// -->
                                        </aside> <!-- col.// -->
                                    </div> <!-- row.// -->
                                </div> <!-- card.// -->`
                    const encabezado = document.getElementById('encabezado')
                    encabezado.remove()
                    
                    container.innerHTML = ficha

                    /* 
                        * Actualizar Producto
                    */
                    const editar = document.getElementById('editar')
                    


                    /* 
                        * Borrar producto
                    */

                    const borrar = document.getElementById('borrar')

                    borrar.addEventListener('click', () => {

                        fetch(`/productos/borrar/${element.id}`, {
                            method: 'DELETE',
                        })
                        .then(resp => resp.json())
                        .then(resp => {
                            container.innerHTML = resp.msg
                        })

                    })
                })
            })
            
        });

        
    }
    
    
})



