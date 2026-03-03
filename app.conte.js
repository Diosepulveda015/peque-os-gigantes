const bancoPreguntas = {
    matematicas: [
        { q: "¿Cuánto es 5 + 3?", a: ["7", "8", "9", "6"], correct: "8", hint: "Cuenta tus dedos." },
        { q: "¿Qué sigue del 19?", a: ["18", "20", "21", "22"], correct: "20", hint: "Dos decenas." }
    ],
    ciencias: [
        { q: "¿Cuál es un animal que vive en el agua?", a: ["Perro", "Pez", "Gato", "Vaca"], correct: "Pez", hint: "Tiene escamas y nada." },
        { q: "¿Qué parte de la planta está bajo la tierra?", a: ["Hoja", "Flor", "Raíz", "Fruto"], correct: "Raíz", hint: "Por ahí toman agua." }
    ],
    espanol: [
        { q: "¿Cuál palabra empieza con A?", a: ["Oso", "Avión", "Elefante", "Uva"], correct: "Avión", hint: "Vuela por el cielo." },
        { q: "¿Cuántas vocales hay?", a: ["3", "5", "7", "10"], correct: "5", hint: "A, E, I, O, U." }
    ],
    sociales: [
        { q: "¿Cuál es la capital de Colombia?", a: ["Medellín", "Cali", "Bogotá", "Cartagena"], correct: "Bogotá", hint: "Es la ciudad más grande." },
        { q: "¿Cuáles son los colores de nuestra bandera?", a: ["Verde y Rojo", "Amarillo, Azul y Rojo", "Blanco y Negro", "Azul y Blanco"], correct: "Amarillo, Azul y Rojo", hint: "Tres colores." }
    ],
    // Añadimos Inglés vacía para que no crashee si no hay preguntas
    ingles: [
        { q: "¿How do you say 'Hola'?", a: ["Bye", "Hello", "Please", "Thanks"], correct: "Hello", hint: "Es un saludo." }
    ]
};

let puntosTotales = 0;
let materiaActual = ""; // Variable para saber qué materia se está jugando

function abrirMateria(materia) {
    materiaActual = materia; // Guardamos la materia activa
    document.getElementById('menu-principal').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    document.getElementById('titulo-materia').innerText = materia.toUpperCase();
    
    // Reiniciamos los puntos al entrar a una materia
    puntosTotales = 0;
    document.getElementById('global-pts').innerText = "0";

    const container = document.getElementById('contenido-pregunta');
    container.innerHTML = "";

    // Verificamos si hay preguntas para esta materia
    if (!bancoPreguntas[materia] || bancoPreguntas[materia].length === 0) {
        container.innerHTML = "<p>¡Próximamente más contenido para esta materia!</p>";
        return;
    }

    bancoPreguntas[materia].forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "pregunta-box";
        div.innerHTML = `
            <p><strong>${index + 1}. ${item.q}</strong></p>
            <div class="opciones">
                ${item.a.map(op => `<button class="opcion-btn" onclick="validar(this, '${op}', '${item.correct}', 'f-${materia}-${index}', '${item.hint}')">${op}</button>`).join('')}
            </div>
            <div id="f-${materia}-${index}" class="feedback" style="display:none"></div>
        `;
        container.appendChild(div);
    });
}

function validar(btn, elegida, correcta, feedbackId, pista) {
    const f = document.getElementById(feedbackId);
    if (elegida === correcta) {
        f.innerHTML = "¡Excelente! 🌟";
        f.style.display = "block";
        f.style.backgroundColor = "#c8e6c9";
        btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
        puntosTotales++;
        document.getElementById('global-pts').innerText = puntosTotales;
    } else {
        f.innerHTML = "Casi... Pista: " + pista;
        f.style.display = "block";
        f.style.backgroundColor = "#ffcdd2";
    }
}

function irAlMenu() {
    // --- INICIO DE LÓGICA DE GUARDADO ---
    if (materiaActual) {
        const totalPreguntas = bancoPreguntas[materiaActual] ? bancoPreguntas[materiaActual].length : 0;
        
        if (totalPreguntas > 0) {
            // Calcular porcentaje
            const porcentaje = Math.round((puntosTotales / totalPreguntas) * 100);
            
            // Guardar en el navegador
            localStorage.setItem('progreso_' + materiaActual, porcentaje + '%');
            localStorage.setItem('ultima_' + materiaActual, 'Lección 1');
            
            console.log("Progreso guardado:", materiaActual, porcentaje + "%");
        }
    }
    // --- FIN DE LÓGICA DE GUARDADO ---
    window.location.href = "menu.html";
}

document.addEventListener("DOMContentLoaded", function() {
    // Este script lee la URL para abrir la materia automáticamente
    const params = new URLSearchParams(window.location.search);
    const materia = params.get('materia');

    if (materia) {
        document.getElementById('titulo-materia').innerText = materia.toUpperCase();
        abrirMateria(materia);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const materias = ['matematicas', 'espanol', 'ciencias', 'ingles', 'sociales'];
    
    materias.forEach(materia => {
    const elemento = document.querySelector('.' + materia);
    if(elemento){
        // 1. Obtener datos guardados
        const progreso = localStorage.getItem('progreso_' + materia) || '0%';
        const ultimaAct = localStorage.getItem('ultima_' + materia) || 'Sin actividad';
        
        // 2. Calcular nivel y estrellas (lógica simple)
        let pct = parseInt(progreso);
        let nivel = Math.ceil(pct / 20); 
        let estrellas = "★".repeat(nivel) + "☆".repeat(5 - nivel);
        
        // 3. Actualizar HTML
        elemento.querySelector('.nivel').innerText = `Nivel ${nivel} - ${progreso}`;
        elemento.querySelector('.nivel').classList.add(pct > 50 ? 'verde' : 'rojo'); // Ejemplo de color
        elemento.querySelector('p').innerText = `Última actividad: ${ultimaAct}`;
        elemento.querySelector('.estrellas').innerText = estrellas;
    }
    });
});