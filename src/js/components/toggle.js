let menuClick   = document.querySelector('.menu-click'),
     menuNav     = document.querySelector('.menu__nav');

menuClick.addEventListener('click',()=>{
    menuNav.classList.toggle('showMenu')
})
