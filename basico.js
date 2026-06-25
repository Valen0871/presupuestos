const automotores = [
    { marca: "Chevrolet Corsa City", precio: 39.45 },
    { marca: "Citroen C4", precio: 63 },
    { marca: "Fiat Palio Weekend", precio: 54.4 },
    { marca: "Fiat Siena", precio: 37.2 },
    { marca: "Ford Explorer XLT 4x4", precio: 42.9 },
    { marca: "Ford Ranger XLT 4x4", precio: 66.6 },
    { marca: "Peugeot 306", precio: 25 },
    { marca: "Renault Laguna", precio: 29.5 },
    { marca: "Suzuki Fun", precio: 32.59 },
    { marca: "Volkswagen Gol", precio: 39.8 },
    { marca: "Volkswagen Suran", precio: 13.32 }
];
const presupuestos = [];
const selectVehiculo = document.getElementById("vehiculo");

automotores.forEach(auto => {
    selectVehiculo.innerHTML += `
        <option value="${auto.marca}">
            ${auto.marca}
        </option>
    `;
});

document.getElementById("formulario").addEventListener("submit", function(e){
    e.preventDefault();
    const cliente = document.getElementById("cliente").value;
    const vehiculo = document.getElementById("vehiculo").value;
    const auto = automotores.find(a => a.marca === vehiculo);
    let precio = auto.precio;
    let iva = precio * 0.21;
    let contado = precio + iva;
    let interes = contado * 0.10;
    let precioInteres = contado + interes;
    let cuotas24 = precioInteres / 24;
    let cuotas36 = precioInteres / 36;
    presupuestos.push({
        marca: vehiculo,
        cliente,
        precio,
        iva,
        contado,
        interes,
        precioInteres,
        cuotas24,
        cuotas36
    });
    mostrarTabla(presupuestos);
    this.reset();
});

function mostrarTabla(lista)
{
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    lista.forEach(item => {
        tabla.innerHTML += `
        <tr>
            <td>${item.marca}</td>
            <td>${item.cliente}</td>
            <td>${item.precio.toFixed(2)}</td>
            <td>${item.iva.toFixed(2)}</td>
            <td>${item.contado.toFixed(2)}</td>
            <td>${item.interes.toFixed(2)}</td>
            <td>${item.precioInteres.toFixed(2)}</td>
            <td>${item.cuotas24.toFixed(2)}</td>
            <td>${item.cuotas36.toFixed(2)}</td>
        </tr>
        `;
    });
}

function buscarPorCliente()
{
    const nombre = document
        .getElementById("buscarCliente")
        .value
        .toLowerCase();
    const resultado = presupuestos.filter(
        p => p.cliente.toLowerCase().includes(nombre)
    );

    mostrarTabla(resultado);
}
function filtrarPrecio()
{
    const minimo = Number(
        document.getElementById("precioMinimo").value
    );
    const resultado = presupuestos.filter(
        p => p.precio > minimo
    );
    mostrarTabla(resultado);
}