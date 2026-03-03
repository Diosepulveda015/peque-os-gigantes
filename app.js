  /* ============================
    PLAN
  ============================ */

function seleccionarPlan(plan) {

    // Guardamos el plan seleccionado
    localStorage.setItem("planSeleccionado", plan);

    // Ocultamos los planes
    document.querySelectorAll(".plan-card").forEach(card => {
        card.style.display = "none";
    });

    // Mostramos el formulario
    document.getElementById("formularioRegistro").style.display = "block";

    // Opcional: mostrar qué plan eligió arriba del formulario
    const titulo = document.createElement("h3");
    titulo.innerText = "Plan elegido: " + plan;
    titulo.style.textAlign = "center";
    titulo.style.marginBottom = "20px";

    document.getElementById("formularioRegistro")
        .insertBefore(titulo, document.getElementById("formularioRegistro").firstChild);
}

document.addEventListener("DOMContentLoaded", function() {

  /* ============================
VALIDACIÓN FORMULARIO
  ============================ */

  const registroForm = document.getElementById('registroForm');

  if (registroForm) {

    registroForm.addEventListener('submit', function(event) {

      const errores = document.querySelectorAll('.error');
      errores.forEach(error => error.textContent = '');

      let hayErrores = false;

      const nombre = document.getElementById('nombre').value.trim();
      const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

      if (nombre === '' || !regexNombre.test(nombre) || nombre.length < 2) {
        document.getElementById('errorNombre').textContent =
          'Ingresa un nombre válido.';
        hayErrores = true;
      }

      const edad = parseInt(document.getElementById('edad').value);
      if (isNaN(edad) || edad < 4 || edad > 12) {
        document.getElementById('errorEdad').textContent =
          'La edad debe estar entre 4 y 12 años.';
        hayErrores = true;
      }

      const sexo = document.getElementById('sexo').value;
      if (sexo === '') {
        document.getElementById('errorSexo').textContent =
          'Selecciona una opción.';
        hayErrores = true;
      }

      const grado = document.getElementById('grado').value;
      if (grado === '') {
        document.getElementById('errorGrado').textContent =
          'Selecciona un grado.';
        hayErrores = true;
      }

      const contrasena = document.getElementById('contrasena').value;

      if (!validarContrasena(contrasena)) {
        document.getElementById('errorContrasena').textContent =
          'Contraseña insegura.';
        hayErrores = true;
      }

      const confirmar = document.getElementById('confirmar').value;
      if (confirmar !== contrasena) {
        document.getElementById('errorConfirmar').textContent =
          'Las contraseñas no coinciden.';
        hayErrores = true;
      }

      if (hayErrores) {
        event.preventDefault();
      }
    });

  }

  /* ============================
    BOTONES PERFIL
  ============================ */

  const btnEditar = document.getElementById("btnEditar");
  const btnPassword = document.getElementById("btnPassword");
  const btnCerrar = document.getElementById("btnCerrar");

  if (btnEditar) {
    btnEditar.addEventListener("click", function() {
      window.location.href = "editar-perfil.html";
    });
  }

  if (btnPassword) {
    btnPassword.addEventListener("click", function() {
      window.location.href = "cambiar-contrasena.html";
    });
  }

  if (btnCerrar) {
    btnCerrar.addEventListener("click", function() {
      window.location.href = "login.html";
    });
  }

});


/* ============================
  FUNCIONES GENERALES
============================ */

function validarContrasena(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}
