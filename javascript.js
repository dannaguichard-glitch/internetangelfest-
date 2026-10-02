// menu

function abrirMenu() {
    const menu = document.getElementById("menu");
    if (menu) menu.classList.toggle("abierto");
}

const menuEl = document.getElementById("menu");

if (menuEl) {
    menuEl.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => menuEl.classList.remove("abierto"));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") menuEl.classList.remove("abierto");
    });
}


// contador

const countdown = document.getElementById("countdown");

if (countdown) {
    const fechaLimite = new Date("nov 27, 2026 23:59:59").getTime();

    const actualizar = () => {
        const diferencia = fechaLimite - new Date().getTime();

        if (diferencia < 0) {
            clearInterval(x);
            countdown.innerHTML = "¡chau noob!";
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        countdown.innerHTML = dias + "d " + horas + "h " + minutos + "m " + segundos + "s ";
    };

    const x = setInterval(actualizar, 1000);
    actualizar();
}


// musiquita

const audio = document.getElementById("audio");
const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");

if (audio && btnPlay && btnPause) {
    btnPlay.addEventListener("click", () => audio.play());
    btnPause.addEventListener("click", () => audio.pause());
}

const SECCIONES_CON_GLITCH = [
  '.ubicacion h1',         
  '.about-title h1',        
  '.registro-caja h1',     
  '.section-title h2',       
  '.about-content h2',
  '.experience-text h2',
  '.community-content h2'
];

const LETRAS_GLITCH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>*+-_♱♡✦';

function glitchearTexto(elemento) {
  if (elemento.dataset.glitcheando === 'si') return;
  elemento.dataset.glitcheando = 'si';

  const textoFinal = elemento.dataset.textoFinal; 
  const pasos = 20;                               
  let paso = 0;

  elemento.style.minWidth = elemento.offsetWidth + 'px';
  elemento.classList.add('glitch-animando');

  const intervalo = setInterval(() => {
    const resueltas = Math.floor(paso / pasos * textoFinal.length); 
    let salida = '';

    for (let i = 0; i < textoFinal.length; i++) {
      if (i < resueltas || textoFinal[i] === ' ') {
        salida += textoFinal[i];                   
      } else {
        salida += LETRAS_GLITCH[Math.floor(Math.random() * LETRAS_GLITCH.length)];
      }
    }

    elemento.textContent = salida;
    paso++;

    if (paso > pasos) {
      clearInterval(intervalo);
      elemento.textContent = textoFinal;           
      elemento.classList.remove('glitch-animando');
      elemento.style.minWidth = '';
      elemento.dataset.glitcheando = 'no';
    }
  }, 40); 
}


const titulosGlitch = document.querySelectorAll(SECCIONES_CON_GLITCH.join(','));

titulosGlitch.forEach((titulo) => {
  titulo.dataset.textoFinal = titulo.textContent.trim(); 
  titulo.classList.add('glitch');                        
  titulo.addEventListener('mouseenter', () => glitchearTexto(titulo)); 
});


if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        glitchearTexto(entrada.target);
        observador.unobserve(entrada.target);        
      }
    });
  }, { threshold: 0.6 });

  titulosGlitch.forEach((titulo) => observador.observe(titulo));
}