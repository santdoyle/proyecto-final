const eliminar = document.getElementById('borrar');
const id = document.getElementById('productoID').innerHTML
console.log(id)
eliminar.addEventListener('click', () => {
    fetch('/productos/borrar/' + id, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(e => console.log(e))
})

