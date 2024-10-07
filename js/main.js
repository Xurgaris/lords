// Menu Hamburger
function clickMenu(){
    if(menu.style.display == "block"){
        menu.style.display = "none"
        menu.style.color = "#fff"
        
    }
    else{
        menu.style.display = "block"
        menu.style.color = "#fff"
    }
}

// Selecionar links do menu
const menuLinks = document.querySelectorAll('.main-meio a[href^="#"], .main-direito a[href^="#"]');

// Função para obter a distância do topo
function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

// Função de rolagem nativa suave
function nativeScroll(distanceFromTheTop) {
  window.scroll({
    top: distanceFromTheTop,
    behavior: "smooth",
  });
}

// Função de rolagem suave ao clicar
function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.currentTarget) - 90; // Compensação do header
  smoothScrollTo(0, distanceFromTheTop);
}

// Aplicar a função de clique para cada link do menu
menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

// Função de rolagem suave personalizada
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}
