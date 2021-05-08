
//Fetch por defecto
let url = '/productos/vista-test'
fetch(url)
    .then(resp => resp.json())
    .then(resp => replace(resp))

//Fetch con filtro
    const filtro = document.getElementById('filtro')
    filtro.addEventListener('change', () => {
        console.log(filtro.value)
        url = `/productos/vista-test?cant=${filtro.value}`;
        
        (() => {
            fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                replace(resp)
            })
            .catch(e => console.log(e))
        })()
        
    })
    

function replace(data){
    if(data.msj){
        const contenedor = document.getElementById('tablaContenedor')

        contenedor.innerHTML = `<h3>${data.msj}</h3>`
    }else{

        const tabla = document.getElementById('mytable')
        const cuerpoTabla = document.createElement('tbody')

        data.forEach(item => {
            let fila = document.createElement('tr')

            let td = document.createElement('td')
            td.innerHTML = item.nombre
            fila.appendChild(td)

            td = document.createElement('td')
            td.innerHTML = item.precio
            fila.appendChild(td)

            td = document.createElement('td')
            td.innerHTML = item.descripcion
            fila.appendChild(td)

            td = document.createElement('td')
            td.innerHTML = `<img src="${item.foto}" width="130" height="130">`
            fila.appendChild(td)

            cuerpoTabla.appendChild(fila)

        });
        
        tabla.appendChild(cuerpoTabla)
    }
}