
//creando html en js
let titulo = document.getElementById('header');
titulo.innerHTML = `
        <h1>Tienda de Componentes</h1>
        `;

let footer = document.getElementById('fondo-gamer');
footer.innerHTML = ` <span>By: Camila Fariña</span> `;
//
        let carrito = []

        document.addEventListener('DOMContentLoaded', () =>{
            if (localStorage.getItem('carrito')){
                carrito = JSON.parse(localStorage.getItem('carrito'))
                actualizarCarrito()
            }
        })

        const botonVaciar = document.getElementById('vaciar-carrito')
        const contadorCarrito = document.getElementById('contadorCarrito')

        const precioTotal = document.getElementById('precioTotal')
        const realizarcompra = document.getElementById('realizar-compra')


        const contenedorCarrito = document.getElementById('contenedor-carrito')

        botonVaciar.addEventListener('click', () =>{
            carrito.length = 0
            actualizarCarrito()
        })
//
        const contenedorMain = document.getElementById('contenedor-main')
        const cantidad = document.getElementById('cantidad')

        listaComponentes.forEach((producto) => {
            const div = document.createElement('section')
            div.classList.add('imagen-componentes')
            div.innerHTML = `
            <img src=${producto.img} style="width:300px;height:300px;" alt="">
            <h6>${producto.producto}</h6>
            <h4>${producto.precio.toLocaleString()}</h4>
            <button id="boton${producto.id}" class="agregar">Agregar Carrito</button>
            `
        
            contenedorMain.appendChild(div)

            const boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', () =>{
                agregarCarrito(producto.id)
                });
        });

    

const agregarCarrito = (prodId) =>{
    const existe = carrito.some (prod => prod.id === prodId) 


    if (existe){
        const prod = carrito.map (prod => {

            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } 
    else{
        const item = listaComponentes.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito()

    Toastify({
        text: "Se Agrego Al Carrito",
        duration: 3000,
        newWindow: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
        background: "#1d1d44",
        position: "sticky", 
        },
        onClick: function(){}
    }).showToast();
    
    
};


const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)

    actualizarCarrito()


};


const actualizarCarrito = () =>{

    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) =>{
        
        const div = document.createElement('div')
        div.className = ('productoEncarrito')
        div.innerHTML = `
        <div class="contenedor-del-carrito">
            <img src=${prod.img} style="width:150px;height:150px;" alt="">
            <p>${prod.producto}</p>
            <p>${prod.precio.toLocaleString()}</p>
            <p>cantidad: ${prod.cantidad}</p>
            <button onclick = "eliminarDelCarrito(${prod.id})" class="agregar">Eliminar del Carrito <i class="fas fa-trash-alt"</button>
        </div>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText ='Precio Total: $' + carrito.reduce((acc , prod)=> acc + prod.precio * prod.cantidad,0)

};
realizarcompra.addEventListener('click', () =>{
    carrito.length = 0
    actualizarCarrito()

    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Compra Realizada. Gracias Por Su Compra!:)',
        showConfirmButton: false,
        timer: 1500
    })
    
});


//fetch

fetch('/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error(error))





