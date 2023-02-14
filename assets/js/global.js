var Modal = class{
  constructor(){
    this.mouse_events();
    this.keyboard_events();
  }

  open = function(elm){
    elm.classList.add("is-active");
  }
  
  close = function(elm){
    elm.classList.remove('is-active');
  }

  close_all = function(){
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      this.close($modal);
    });
  }

  mouse_events = function(){
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      $trigger.addEventListener('click', () => {
        this.open($target);
      });
    });

    // click to close a modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
    
      $close.addEventListener('click', () => {
        this.close($target);
      });
    });
  }


  keyboard_events = function() {
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      let key = event.key || event.code;
      if (key == 'Escape') {
        this.close_all();
      }
    });
  }

}


document.addEventListener("DOMContentLoaded", function () {

  var bootstrap_modal = new Modal();
  // htmx config
  //htmx.config.historyEnabled = true;
 
  //htmx error
  htmx.on('htmx:responseError', function(event) { 
    modal = document.querySelector('#htmx-error')
    modalContentTarget=document.querySelector('#htmx-error .box');
    modalContentTarget.innerHTML = `<p class="title is-4">${event.detail.xhr.status} - ${event.detail.xhr.statusText}</p>`;
    modalContentTarget.innerHTML += `<iframe id="error-message" width="100%" height="100%"></iframe>`;
    var doc = document.getElementById('error-message').contentWindow.document;
    doc.open(); doc.write(event.detail.xhr.responseText);doc.close();
    openModal(modal)
    //console.log(event.detail.xhr); 
  });

  htmx.on("htmx:xhr:loadend",function(event){
    //console.log(event);
    if(event.detail.elt.nodeName == "FORM"){
      path = event.detail.elt["htmx-internal-data"].path;
      if(path == "/accounts/login/" || path == "/accounts/logout/"){
        htmx.ajax('GET', '/primary-nav', {target:'#nav', swap:'outerHTML'});
        update_primary_nav();
      }
    }
    else{
        
    }

    var bootstrap_modal = new Modal();

  });

  htmx.on('htmx:pushedIntoHistory', function(event) {
    //console.log(event);
    update_primary_nav();
  });

  update_primary_nav();

});


 