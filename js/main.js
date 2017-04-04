$(function() {
  var timeOut;
  // Event binding.

  $('#menu a').hoverIntent(function(){
    clearTimeout(timeOut);
    menuSlideTo(this);
  }, function(){
    timeOut = setTimeout(function() {
      menuSlideTo($('#menu a.active'));
    }, 800);
  });

    setTimeout(function () {
        var action = 'https://formspree.io/daniel.beeke';
        action += '@';
        action += 'gma';
        action += 'il.com';
        $('form').attr('action', action)
    }, 700);

  // Init.
  menuSlideTo($('#menu a.active'));
  BrowserDetect.init();

  $('body').addClass(BrowserDetect.OS);
  $('body').addClass(BrowserDetect.browser);

  $('body').localScroll({
    offset: {top: -$('#menu-zone').height() - 30, left: 0},
    // hash: true
  });

  $('.mobile-menu-switcher').click(function() {
    $('#menu').toggleClass('menu-hidden-mobile');
    return false;
  });

  // // Leaflet
  // // create a map in the "map" div, set the view to a given place and zoom
  // var map = L.map('map', {
  //   attributionControl: false,
  //   zoomControl: false
  // }).setView([51.505, -0.09], 18);

  // // add an OpenStreetMap tile layer
  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

  // Window resize.
  $(window).resize(function() {
    clearTimeout(timeOut);

    timeOut = setTimeout(function() {
      menuSlideTo($('#menu a.active'));
    }, 100);
  });

  // Scroll spy
  $(window).scroll(function() {
    clearTimeout(timeOut);

    timeOut = setTimeout(function() {
      var mostInViewPort = 0;
      var mostInViewPortId = 0;

      clearTimeout(timeOut);

      $.each($('#content article'), function(index, article) {
        var windowHeight = $(window).height();

        var articleOffset = $(article).offset();
        var articleTop = articleOffset.top;
        var articleHeight = $(article).height();
        var articleBottom = articleTop + articleHeight;

        // Add the threshold
        var scrollTop = $(window).scrollTop() + ($('#menu-zone').height() + 10);
        var scrollBottom = scrollTop + windowHeight;

        var pixelsInViewport = 0;

        // Top part inside viewport
        if (articleTop > scrollTop && articleTop < scrollBottom) {
          pixelsInViewport = scrollBottom - articleTop;
        // Bottom part inside viewpart
        } else if (articleBottom < scrollBottom && articleBottom > scrollTop) {
          pixelsInViewport = articleBottom - scrollTop;
        // Full frontal
        } else if (articleTop < scrollTop && articleBottom > scrollBottom) {
          pixelsInViewport = windowHeight;
        }

        if (pixelsInViewport > mostInViewPort) {
          mostInViewPortId = $(article).attr('id');
          mostInViewPort = pixelsInViewport;
        }
      });
      menuSlideTo($('#menu a[href="#' + mostInViewPortId + '"]'));
    }, 100);
  });

  var clickOrTouch = (('ontouchend' in window)) ? 'touchend' : 'click';

  // Add active class to clicked item.
  $("#menu a").on(clickOrTouch, function() {
    setTimeout(function() {
      clearTimeout(timeOut);
    }, 300);

    setTimeout(function() {
      if ($('.mobile-menu-switcher:visible').length) {
        $('#menu').toggleClass('menu-hidden-mobile');
      }
    }, 700);

    menuSlideTo(this);
    var id = $(this).attr('href').substr(1);

    $("#menu a.active").removeClass('active');
    $(this).addClass('active');
  });

  // This is the animation function.
  function menuSlideTo(object) {
    if ($('#menu a:hover').length) {
      object = $('#menu a:hover');
    }
    if (!$(object).hasClass('slider-active') && $(window).width() > 960) {
      var left = $(object).position().left;
      var top = $(object).position().top;
      var width = $(object).width() + 20;

      // Remove old class.
      $('.slider-active').removeClass('slider-active');

      $('#menu-slider').stop().animate({
          'left': left,
          'top': top,
          'width': width
      }, 300, function() {
        $(object).addClass('slider-active');
      });
    }
    else {
      var left = $(object).position().left;
      var top = $(object).position().top;
      var width = $(object).width() + 20;
      $('#menu-slider').css({
          'left' : left,
          'top': top,
          'width' : width
      });
    }
  }
});