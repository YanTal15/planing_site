 //Бургер-меню
 let menuBtn = document.querySelector('.menu')
 let menu = document.querySelector('.menu__open')
 let closeBtn = document.querySelector('.close')
 let body = document.querySelector('body')
 let unlock = false

 menuBtn.addEventListener('click', open)
 closeBtn.addEventListener('click', close)
 function open (){
    menu.classList.remove('nav__close')
    setTimeout (function(){
      unlock = true
    }, 100)
 }
 function close (){
    menu.classList.add('nav__close')
    setTimeout (function(){
      unlock = false
    }, 100)
 }
 body.addEventListener('click', function(e){
   if(!menu.contains(e.target) && unlock){
     close ()
   }
 })

//Выпадающий текст

let itemAsk = document.querySelectorAll('.asked__item')
 for(i = 0; i < itemAsk.length; i++){
   let open = itemAsk[i]
   open.querySelector('.asked__item-head').addEventListener('click', function(){
   open.querySelector('.asked__item-head').classList.toggle('asked-close')
   open.querySelector('.asked__vector').classList.toggle('vector-close')
   open.querySelector('.asked__item-block').classList.toggle('d-none')
 })}

 //Карусель

let carusel = document.querySelectorAll('.blog__carusel-body')
let caruselBtnLeft =document.querySelectorAll('.arrow-wrap')[0]
let caruselBtnRight =document.querySelectorAll('.arrow-wrap')[1]
let step = 0;
let unlockCarusel = true
let caruselStep = document.querySelector('.carusel__step').querySelectorAll('svg')

function slider(x = step){
  carusel[x].classList.toggle('d-flex')
  carusel[x].classList.toggle('d-none')
  caruselStep[x].classList.toggle('carusel__step-active')
}
slider()

function sliderLeft(){
  carusel[step].classList.add('right')
  if(unlockCarusel){
  function test (){
    unlockCarusel = false
        let turn = step - 1
        if(turn < 0){turn = carusel.length - 1}
        carusel[turn].classList.add('left')
        slider(turn)
        setTimeout(function(){
          carusel[turn].classList.remove('left')
        }, 30)
      }
      test()
    setTimeout(function(){
      carusel[step].classList.remove('right')
      slider()
      step--
      if(step < 0){step = carusel.length - 1}
      }, 500)
      setTimeout(function(){
        unlockCarusel = true
      }, 500)}
}

function sliderRight(){
  if(unlockCarusel){
    unlockCarusel = false
  carusel[step].classList.add('left')
  function test (){
        let turn = step + 1
        if(turn >= carusel.length){turn = 0}
        carusel[turn].classList.add('right')
        slider(turn)
        setTimeout(function(){
          carusel[turn].classList.remove('right')
        }, 30)
      }
      test()
    setTimeout(function(){
      carusel[step].classList.remove('left')
      slider()
      step++
      if(step >= carusel.length){step = 0}
      }, 300)
      setTimeout(function(){
        unlockCarusel = true
      }, 500)}
}
caruselBtnLeft.addEventListener('click', sliderLeft)
caruselBtnRight.addEventListener('click', sliderRight)
for(i = 0; i < caruselStep.length; i++){
  let index = i
  caruselStep[i].addEventListener('click', function(){
    let draw = index - step
    let times = 0
    if (draw == -2){
          sliderRight()
    }else if (draw == 2){
    for (; times < draw; times++){
      sliderLeft()
    }}else if (draw < 0){
      draw = step - index
      for (; times < draw; times++){
      sliderLeft()
      }
    }
    else{
    for (; times < draw; times++){
      sliderRight()
    }}
  })
}

//якорные ссылки

let anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors){
  anchor.addEventListener('click', function(e){
    e.preventDefault();

    let anchorID = anchor.getAttribute('href')
    console.log(anchorID)
    document.querySelector(anchorID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

//Плывущие облака
let cloudNum = 50

let height = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)/10
let width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)/10
console.log(width)
for(i = 0; i < cloudNum; i++){
  let cloud = document.createElement('div')
  cloud.classList.add('cloud')
  let cloudWidth = Math.random() * 10 + 1
  let cloudHeight = cloudWidth / 2
  let cloudTop = Math.random() * height
  let cloudLeft = Math.random() * width
  
  console.log(cloudTop)
  cloud.style.width = cloudWidth + 'rem'
  cloud.style.height = cloudHeight + 'rem'
  cloud.style.top = cloudTop + 'rem'
  cloud.style.left = cloudLeft + 'rem'
  document.body.appendChild(cloud);
}
let clouds = document.querySelectorAll('.cloud')
for (let cloud of clouds){

    let cloudWidth = cloud.offsetWidth/10

  let start = Date.now(); // запомнить время начала

  let timer = setInterval(function() {
    // сколько времени прошло с начала анимации?
    let timePassed = 1;

    /*if (timePassed >= 1000000) {
      clearInterval(timer); // закончить анимацию через 2 секунды
      return;
    }*/

    // отрисовать анимацию на момент timePassed, прошедший с начала анимации
    draw(timePassed);

  }, 50);
  function draw(timePassed) {

    cloud.style.left = parseFloat(cloud.style.left) + 0.12 + 'rem';
    if(parseFloat(cloud.style.left) > width +  cloudWidth){
        cloud.style.left = -cloudWidth + 'rem';
    }
}  
}