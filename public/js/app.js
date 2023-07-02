$(document).ready(function () {
  $("body").on("contextmenu", "img", function (e) {
    e.preventDefault();
  });
  $("img").attr("draggable", false).attr("lazyload", true).css("user-select", "none");

  const changeThemeBtn = document.querySelector('#change-theme-btn');
  const changeThemeBtnLg = document.querySelector('#change-theme-btn-lg');
  const html = document.querySelector('html');

  changeThemeBtn.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
  });

  changeThemeBtnLg.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
  });

  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.theme;

  if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
    html.classList.add('dark');
    localStorage.theme = 'dark';
    changeThemeBtn.setAttribute('checked', 'checked');
    changeThemeBtnLg.setAttribute('checked', 'checked');
  } else {
    html.classList.remove('dark');
    localStorage.theme = 'light';
    changeThemeBtn.removeAttribute('checked');
    changeThemeBtnLg.removeAttribute('checked');
  }

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
      const phone = form.elements['phone'].value;
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

      if (phone.trim() === '') {
        showNotification('warning', 'Please enter your phone or whatsapp number.');
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
        body: JSON.stringify({ name: name, email: email, phone: phone, message: message })
      })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          sendBtn.innerHTML = `<span class="mr-2">Send</span>
                              <svg class="inline-block transform rotate-45" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                              </svg>`;
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
      color: localStorage.theme === 'dark' ? '#cbd5e1' : '#1e293b',
      background: localStorage.theme === 'dark' ? '#1e293b' : '#f0f8ff',
      showConfirmButton: false,
      showCloseButton: true,
      iconColor: iconColor,
      toast: true,
      timer: 5000,
    });
  }
});