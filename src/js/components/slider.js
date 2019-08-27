let clickContainer = document.querySelector('.click-container'),
    slider= document.querySelector('.slider-row'),
    counter=1,
    width=0;

clickContainer.addEventListener('click',(e)=>{
    width= document.querySelector('.slider').offsetWidth;
    if(e.target.classList.contains('click-1')){
        if(counter!=1){    
            slider.style.transform='translateX(0)'; 
            slider.classList.add('rebote-2');       
            counter=1;
        }
    }
    else if(e.target.classList.contains('click-2')){
        if(counter!=2){
            if(counter==1){
                slider.style.transform=`translateX(-${width}px)`;
                slider.classList.add('rebote'); 
                counter=2;
            } else if(counter==3){
                slider.style.transform=`translateX(-${width}px)`;
                slider.classList.add('rebote-3'); 
                counter=2;
            }
        }
    }
    else if (e.target.classList.contains('click-3')){
        if(counter!=3){
            slider.style.transform=`translateX(-${width*2}px)`;
            slider.classList.add('rebote');
            counter=3;
        }
    }
})
window.addEventListener('resize',()=>{
    width= document.querySelector('.slider').offsetWidth;
    if(counter==1){ slider.style.transform='translateX(0)' }      
    else if(counter==2){ slider.style.transform=`translateX(-${width}px)` }
    else if(counter==3){ slider.style.transform=`translateX(-${width*2}px)` }
})
slider.addEventListener('animationend', () => slider.classList.remove('rebote','rebote-2','rebote-3'))