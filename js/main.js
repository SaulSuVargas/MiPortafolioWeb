/* ========== Declaramos constantes ========= */
const navMenu = document.getElementById('nav-menu'),
      navTogle = document.getElementById('nav-togle'),
      navCerrar = document.getElementById('nav-cerrar')

/* === MOSTRAMOS MENU === */
/* SI DAMOS CLICK EN EL MENU, SE ABRIRA*/
if(navTogle) {
    navTogle.addEventListener('click', () => {
        navMenu.classList.add('mostrar-menu')
    })
}

/* === CERRAMOS MENU === */
/* SI DAMOS CLICK EN EL "X" SE CIERRA EL MENU*/
if(navCerrar) {
    navCerrar.addEventListener('click', () => {
        navMenu.classList.remove('mostrar-menu')
    })
}

/* === CERRAMOS EL MENU CUANDO SELECCIONAMOS UNA SECCION */
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // Cuando hacemos clic en cada enlace de navegación, cerramos el menu
    navMenu.classList.remove('mostrar-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* === ABRIR SKILLS (ACORDION) === */
const skilContent = document.getElementsByClassName('skil_contenido'),
      skilHeader = document.querySelectorAll('.skil_header')

function abrirSkil(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skilContent.length; i++){
        skilContent[i].className = 'skil_contenido skil_cerrar'
    }

    if(itemClass === 'skil_contenido skil_cerrar'){
        this.parentNode.className = 'skil_contenido skil_abrir'
    }
}

skilHeader.forEach((el) => {
    el.addEventListener('click', abrirSkil)
})

/* ===== CONFIGURAR LOS STABS DE TRAYECTORIA ====== */
const tabs = document.querySelectorAll('[data-target]'),
      tabContenidos = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContenidos.forEach(tabContenido =>{
            tabContenido.classList.remove('viaje_active')
        })
        target.classList.add('viaje_active')

        tab.forEach(tab =>{
            tab.classList.remove('viaje_active')
        })
        tab.classList.add('viaje_active')
    })
})

/* ===== CONFIGURAR EL MODEL DEL SERVICES =====*/
const modelVers = document.querySelectorAll('.servi_model'),
      modelBtns = document.querySelectorAll('.servi_boton'),
      modelCerrar = document.querySelectorAll('.services_model-cerrar')

let model = function(modelClick){
    modelVers[modelClick].classList.add('active-model')
}

modelBtns.forEach((modelBtn,i)=>{
    modelBtn.addEventListener('click', ()=> {
        model(i)
    })
})

modelCerrar.forEach((modelCerra)=>{
    modelCerra.addEventListener('click', () =>{
        modelVers.forEach((modelVer)=>{
            modelVer.classList.remove('active-model')
        })
    })
})

/* ==== LE AGREFAMOS COLOR A LAS SECCIONES =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CAMBIAR EL COLOR DEL HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== MOSTRAR EL SCROLL  ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* ====== TEMA OSCURO/CLARO ======*/
const themeButton = document.getElementById('tema-boton')
const darkTheme = 'modo-oscuro'
const iconTheme = 'uil-sun'

// Seleccionar Tema
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtenemos el tema seleccionado
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// Validamos si el usuario eligio el tema
if (selectedTheme) {
  // Si se cumple la validación, preguntamos cuál fue el problema para saber si activamos o desactivamos la oscuridad
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activar / desactivar el tema con el botón
themeButton.addEventListener('click', () => {
    // Agregar o eliminar el tema oscuro/icono
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Guardamos el tema/icono seleccionado
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* ==== CONFIGURAR EL FILTRO ===== */
let mixerPortafolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* ==== ACTIVAR COLOR DE LOS FILTROS ==== */
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener("click",activeWork))

/* ===== CONFIGURAR LOS CARDS DEL PORTAFOLIO ==== */
document.addEventListener('click', (e) => {
    if(e.target.classList.contains("work__button")){
        togglePortafolioPopup();
        portafolioItemDetails(e.target.parentElement);
    }
})

function togglePortafolioPopup(){
    document.querySelector(".portafolio__popup").classList.toggle("open");
}

document.querySelector(".portafolio__popup-close").addEventListener("click", togglePortafolioPopup)

function portafolioItemDetails(portafolioItem) {
    document.querySelector(".pp__thumbnail img").src = portafolioItem.querySelector(".work__img").src;
    document.querySelector(".portafolio__popup-subtitle span").innerHTML = portafolioItem.querySelector(".work__title").innerHTML;
    document.querySelector(".portafolio__popup-body").innerHTML = portafolioItem.querySelector(".portafolio__item-details").innerHTML;
}