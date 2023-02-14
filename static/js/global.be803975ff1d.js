 
document.addEventListener("DOMContentLoaded", function () {


  /**** 
   *** nav + burger ***
  */
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener("click", function () {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  // top menu path selector
  current_path = '/' + document.URL.split('/')[3] 
  htmx.takeClass(htmx.find("[hx-get='"+current_path+"']"), "is-active");

  
  /**** 
   *** End nav + burger ***
  */


  /**** 
   *** Modal Actions ***
  */

  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');
  
    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });

  /**** 
   *** End Modal Actions ***
  */

   
  //htmx error
  htmx.on('htmx:responseError', function(event) { 
    modal = document.querySelector('#htmx-error')
    modalContentTarget=document.querySelector('#htmx-error .box');
    modalContentTarget.innerHTML = `<p class="title is-4">${event.detail.xhr.status} - ${event.detail.xhr.statusText}</p>`;
    modalContentTarget.innerHTML += `<p>${event.detail.xhr.responseText}</p>`;
    openModal(modal)
    //console.log(event.detail.xhr); 
  });


});