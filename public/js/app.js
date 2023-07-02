$(document).ready(function () {
  $("body").on("contextmenu", "img", function (e) {
    e.preventDefault();
  });
  $("img").attr("draggable", false).attr("lazyload", true).css("user-select", "none");

  const header = $("header");
  const hamburger = $("#hamburger");
  
  const navMenu  = $("#nav-menu"); 
  const navLinks = $("#nav-menu .nav-link");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      header.addClass("navbar-fixed");
    } else {
      header.removeClass("navbar-fixed");
    }
  });

  hamburger.on("click", function () {
    hamburger.toggleClass("hamburger-active");
    navMenu.toggleClass("hidden");
  });

  navLinks.each(function () {
    $(this).on("click", function () {
      hamburger.removeClass("hamburger-active");
      navMenu.addClass("hidden");
    });
  });

  $(document).on('click', function(event) {
    if (!event.target.closest('#hamburger') && !event.target.closest('#nav-menu')) {
      hamburger.removeClass("hamburger-active");
      navMenu.addClass("hidden");
    }
  });

  const backToTopBtn = $("#back-to-top-btn");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      backToTopBtn.addClass("show-back-to-top-btn");
    } else {
      backToTopBtn.removeClass("show-back-to-top-btn");
    }
  });
  
  backToTopBtn.on("click", function () {
    window.scrollTo({ top: 0 });
  });

  const scriptURL = 'https://formsubmit.co/ajax/farhannsrllh177@gmail.com';
  const form = document.forms['personal-contact-form'];
  const sendBtn = document.querySelector('#contact-form-btn');

  if (form == null) {
    return;
  } else {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.elements['name'].value;
      const email = form.elements['email'].value;
      const message = form.elements['message'].value;

      if (name.trim() === '') {
        showNotification('warning', 'Please enter your name.');
        return;
      }

      if (email.trim() === '') {
        showNotification('warning', 'Please enter your email.');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('warning', 'Please enter a valid email.');
        return;
      }

      if (message.trim() === '') {
        showNotification('warning', 'Please enter your message.');
        return;
      }

      sendBtn.innerHTML = '<div class="w-[20px] h-[20px] border-4 border-white border-t-4 border-t-transparent rounded-full animate-spin"></div> <span class="ml-2">Sending...</span>';

      fetch(scriptURL, { 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, message: message })
      })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          sendBtn.innerHTML = '<svg class="w-6 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Minutemailer</title><path d="M17.187 19.181L24 4.755 0 12.386l9.196 1.963.043 4.896 2.759-2.617-2.147-2.076 7.336 4.63z"/></svg> <span class="ml-2">Send</span>';
          showNotification('success', 'Your message has been sent successfully.');
          sendBtn.blur();
        } else {
          throw new Error('Request failed: ' + response.statusText);
        }
      })
      .catch(function (error) {
        sendBtn.innerHTML = 'Send <i class="fa fa-send"></i>';
        console.error('Error!', error.message);
        showNotification('error', 'Oops! There was a problem submitting your form.');
        sendBtn.blur();
      });
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showNotification(icon, title) {
    let iconColor = '';
    if (icon === 'success') {
      iconColor = 'hsl(189, 100%, 63%)';
    } else if (icon === 'warning') {
      iconColor = '#ffb700';
    } else if (icon === 'error') {
      iconColor = '#ff0000';
    }

    Swal.fire({
      position: 'top-end',
      width: 450,
      icon: icon,
      title: title,
      background: '#f0f8ff',
      showConfirmButton: false,
      showCloseButton: true,
      iconColor: iconColor,
      toast: true,
      timer: 5000,
    });
  }
});