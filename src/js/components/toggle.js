let navtoggle   = document.getElementById('navtoggle'),
     mainMenu     = document.getElementById('main-menu');

navtoggle.addEventListener('click',()=>{
    mainMenu.classList.toggle('show')
    mainMenu.classList.contains('show')
        ?	navtoggle.innerHTML = '<span>Ocultar</span>'
				:	navtoggle.innerHTML = '<i class="fa fa-bars"></i>'
})
