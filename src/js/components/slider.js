const container = document.getElementById('container')
let width = container.firstElementChild.nextElementSibling.getBoundingClientRect().width
//el ancho del proximo hermano

container.firstElementChild.before(container.lastElementChild)
container.style.transform= `translateX(-${width}px)`
setInterval(() => {
    container.style.transform= `translateX(-${width*2}px)`
    container.classList.add('animation')
    container.append(container.firstElementChild)
    container.style.transform= `translateX(-${width}px)`
}, 15000);

container.addEventListener('animationend',() => container.classList.remove('animation'))
window.addEventListener('resize',()=>{
    width = container.firstElementChild.nextElementSibling.getBoundingClientRect().width
    container.style.transform= `translateX(-${width}px)`

})