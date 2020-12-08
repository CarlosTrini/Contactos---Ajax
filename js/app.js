$(function () {
    $('#traer').on('click', evaluarValor);
}); // Funcion de inicio

//VARIABLES
let contenedorError = $('#contenedor-boton');
let p = document.createElement('p');

let name = $('#nombre');
let email = $('#email');
let direccion = $('#direccion');
let telefono = $('#telefono');
let web = $('#web');

//FUNCIONES
function evaluarValor(e) {
    e.preventDefault();
    let id = $('#id').val();

    if (id <= 0 || id >= 11) {
       
        p.innerHTML = `
            <p class="error mt-2 text-center text-capitalize"> El valor no es el que se sugiere! </p>
        `;
        contenedorError.append(p);
    }
    else{
        p.innerHTML ="";
        traerUsuario(id);
    }
}

function traerUsuario(id) {
    $.ajax({
        type: "GET",
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
        // data: "data",
        // dataType: "dataType",
        success: function (res) {
            name.val(res.name);
            email.val(res.email);
            direccion.val(res.address.street + " " + res.address.zipcode);
            telefono.val(res.phone);
            web.val(res.website);
        }
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {

        if (jqXHR.status === 0) {
      
          alert('Not connect: Verify Network.');
      
        } else if (jqXHR.status == 404) {
      
          alert('Requested page not found [404]');
      
        } else if (jqXHR.status == 500) {
      
          alert('Internal Server Error [500].');
      
        } else if (textStatus === 'parsererror') {
      
          alert('Requested JSON parse failed.');
      
        } else if (textStatus === 'timeout') {
      
          alert('Time out error.');
      
        } else if (textStatus === 'abort') {
      
          alert('Ajax request aborted.');
      
        } else {
      
          alert('Uncaught Error: ' + jqXHR.responseText);
      
        }
      
      });
}


