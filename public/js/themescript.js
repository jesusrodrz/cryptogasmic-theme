{

  let options = {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: menuIcon,
    onOpenEnd: null,
    onCloseStart: menuIcon,
    onCloseEnd: null,
  };
  
  var elem = document.querySelector('.sidenav');
  var instance = M.Sidenav.init(elem, options);
}

function menuIcon(e) {
  const menuIcon = document.getElementById('menu-iconH'),
    instance = M.Sidenav.getInstance(e);  

  menuIcon.children[0].classList.toggle('menu-icon--active')
  menuIcon.children[1].classList.toggle('menu-icon--active')
  menuIcon.children[2].classList.toggle('menu-icon--active')

  // menuIcon.parentElement.addEventListener('click',function h(e) {
  menuIcon.addEventListener('click',function h(e) {
    e.stopPropagation()
    instance.close()

    menuIcon.removeEventListener('click', h)
  })

}

function myAcordion(elem,buttonsClass,divClass) {
  console.log(elem,buttonsClass,divClass)
  const buttons = [...document.getElementsByClassName(buttonsClass)],
    acordionElems = document.getElementsByClassName(divClass),
    acordionElemss = [...document.getElementsByClassName(divClass)],
    e = elem;
  
  const parent = e.target.closest('.signal-item'),
    button = parent.querySelector('.' + buttonsClass),
    div = parent.querySelector('.' + divClass);
  
    button.classList.toggle(buttonsClass + '--active')
    div.classList.toggle(divClass + '--active')      

    
}
{
  var elem = document.querySelector('.modal');
  if (elem) {
    
    var instance = M.Modal.init(elem, {
      startingTop: '0',
      endingTop:'0'
    });
  }
}
function myLightbox(imgs,index) {
  
  const pswpElement = document.querySelectorAll('.pswp')[0]

  const items = imgs.map((elem) => {
    const item = elem.getElementsByTagName('img')[0]
      width = item.getAttribute('data-w'),
      height = item.getAttribute('data-h'),
      source = item.getAttribute('src'),
      fig = {
        src: source,
        w: width,
        h: height
      };
    
    return fig
  }),
    options = {
      index: index,
      bgOpacity: .8,
      maxSpreadZoom: 9,
      closeOnScroll:false
    }
  gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();

}

function scriptSignals(elem, acordion,lightbox) {
  
  const container = document.getElementById(elem),
        upContainer = document.getElementById('cryptoupdate')

  if (upContainer) {
    upContainer.addEventListener('click', (e) => {
      if (e.target.closest('.' + lightbox.triggerClass)) {

        const parent = e.target.closest('.' + lightbox.parentClass),
          imgs = [...parent.getElementsByClassName(lightbox.triggerClass)]
        gallery = myLightbox(imgs,imgs.indexOf(e.target))         
        
      }
    })
  }

  if (container) {

    let gallery;

    // const imgs = [...document.getElementsByClassName(lightbox.triggerClass)]

    container.addEventListener('click', (e) => {
    
      if (e.target.closest('.' + acordion.buttonsClass) ) {
        
        myAcordion(e, acordion.buttonsClass, acordion.divClass)

      } else if ( e.target.closest('.' + acordion.updatesBtn)) {
        
        myAcordion(e, acordion.updatesBtn, acordion.updatesDiv)

      } else if (e.target.closest('.' + lightbox.triggerClass)) {

        const parent = e.target.closest('.' + lightbox.parentClass),
          imgs = [...parent.getElementsByClassName(lightbox.triggerClass)]
        gallery = myLightbox(imgs,imgs.indexOf(e.target))         
        
      }

    })
  }
}

scriptSignals('signals-container', {
    buttonsClass: 'signal-item__btn',
    divClass: 'signal-item__acordion',
    updatesDiv: 'signal-item__acordion-b',
    updatesBtn:'signal-item__updates'
  }, {
    modalClass: 'modal',
    triggerClass: 'signal-item__fig',
    parentClass:'signal-ligtbox',
    modalContainerId:'modalContainer'
  }
)




function setHeight(elem,newElem) {
  const style = window.getComputedStyle(elem),
  windowSize = window.innerWidth;
  let height = style.getPropertyValue('height');
  
  if (window.innerWidth>600) {

    height = (Number(height.slice(0,-2)) * 1.5).toString() + 'px';
  }
    newElem.style.height = height;
    
  
    
}


function scaleHeight(elemsClass, itemsClass, optionClass ='') {
      
  const elements = [...document.getElementsByClassName(elemsClass)],
    items = [...document.getElementsByClassName(itemsClass)];

  const object = elements.map((x, i) => {
    return{'item':x,'newItem':items[i]}
  })
  
  
  for (element of object) {
    if (!element.newItem.classList.contains(optionClass)) {
      setHeight(element.item, element.newItem);
    }
  }

  window.setTimeout(() => {
    for (element of object) {
      if (!element.newItem.classList.contains(optionClass)) {
        setHeight(element.item, element.newItem);
      }
    }
  }, 1000);

  window.addEventListener('resize', () => {
    for (element of object) {
      if (!element.newItem.classList.contains(optionClass)) {
        setHeight(element.item, element.newItem);
      }
    }
  })

}
scaleHeight('training__img','training__body','training__body--mobile-active');

function getTarget(e,elements) {
  for (const item of e.path) {

    if (item.classList.contains(elements.buttonsClass)) {
      
      return item;

    }
    else if (item.classList.contains(elements.itemsClass)) {
     
      return item;

    }
    else if (item === e.currentTarget) {
      return null;
    }
  }
}

function showVideo(e, elements) {  

  const target = e,
    btn = target.querySelector('.' + elements.buttosClass),
    body = target.querySelector('.' + elements.body),
    columns = [...target.getElementsByClassName(elements.columns)],
    video = document.createElement('div'),
    embedCode = target.getAttribute('data-embed')

  
  target.classList.toggle(elements.itemsClass+elements.activeClass)
    
  body.classList.toggle(elements.body + elements.activeClass)

  body.style.height='auto'

  columns[1].classList.toggle('s6')
  columns[0].classList.toggle('s6')
  columns[1].classList.toggle('s12')
  columns[0].classList.toggle('s12')


  video.classList.add('training__video')
  video.innerHTML = `<div class="video-container">${embedCode}</div>`;
  columns[0].appendChild(video)

  return target

}

function hideVideo(prevTarget,elements) {

  const btn = prevTarget.querySelector('.' + elements.buttosClass),
    body = prevTarget.querySelector('.' + elements.body),
    columns = [...prevTarget.getElementsByClassName(elements.columns)]
    
  prevTarget.classList.toggle(elements.itemsClass+elements.activeClass)
    
  body.classList.toggle(elements.body+elements.activeClass)

  columns[1].classList.toggle('s6')
  columns[0].classList.toggle('s6')
  columns[1].classList.toggle('s12')
  columns[0].classList.toggle('s12')

  columns[0].removeChild(columns[0].lastChild)
  scaleHeight('training__img','training__body','training__body--mobile-active');
}

function showVideos(videosContainer,elements) {
  const container = document.getElementById(videosContainer),
    items = [...document.getElementsByClassName(elements.itemsClass)]

  if (container) {

    let prevTarget;  


    container.addEventListener('click', (e) => {


      const windowSize = window.innerWidth;
      
      const target = e.target.closest('.'+elements.itemsClass);

      if (windowSize < 601) { 


        if (target && target!== prevTarget) {
          
          if (prevTarget) {
            hideVideo(prevTarget, elements);
          }
          prevTarget = showVideo(target, elements);
          
        }
      
      }

      else if (e.target.classList.contains(elements.buttonsClass) || e.target.classList.contains(elements.figClass)) {
        
        const divContainer = target.getElementsByClassName(elements.columns)[1],
          modal = document.createElement('div'),
          embedCode = target.getAttribute('data-embed'),
          title = target.getElementsByClassName(elements.itemsClass + '__title')[0],
          description = target.getElementsByClassName(elements.itemsClass + '__description')[0];
        modal.classList.add('modal');
        
        modal.innerHTML = `
          <div class="my-modal">
            <div class="video-container">${embedCode}</div>
            <div class="my-modal__divider"></div>
            <div class="my-modal__body">
                <p class="my-modal__title">${title.innerHTML}</p>
                <p class="my-modal__description">${description.innerHTML}</p>
            </div>
          </div>
        `
        divContainer.appendChild(modal);
        
        function closeM(params) {
          divContainer.removeChild(modal)
        }
        const options = {
          // onOpenStart: hola,
          onCloseStart: closeM,
          startingTop:'0',
          endingTop:'0'
        },
          modalIntance = M.Modal.init(modal, options)

        modalIntance.open();

        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            
            modalIntance.close();
          }
        })

      }
       
      
    })
  }

}
showVideos('trainigsContainer', {
  itemsClass: 'training',
  activeClass: '--mobile-active',
  columns: 'col',
  body:'training__body',
  buttonsClass: 'training__btn',
  figClass: 'training__fig',
  


})
