$(function() {
  var timeOut;

  // Event binding.
  $('#menu a').hoverIntent(function(){
    clearTimeout(timeOut);
    menuSlideTo(this);
  }, function(){
    timeOut = setTimeout(function() {
      menuSlideTo($('#menu a.active'));
    }, 1200);
  });

  // Init.
  menuSlideTo($('#menu a.active'));
  $('#content-wrapper').css('padding-top', $('#menu-zone').height());
  $('body').localScroll({
    offset: {top: -$('#menu-zone').height(), left: 0}
  });

  // Leaflet
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map('map', {
    attributionControl: false,
    zoomControl: false
  }).setView([51.505, -0.09], 18);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

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
      $.each($('#content article'), function(index, article) {
        var articleOffset = $(article).offset();
        var articleTop = articleOffset.top;
        var articleHeight = $(article).height();
        // Add the threshold
        var scrollTop = $(window).scrollTop() + ($('#menu-zone').height() + 10);

        if (scrollTop > articleTop && scrollTop < articleTop + articleHeight) {

          // Maybe it is better active the one that is the most visible.

          // console.log($(article).attr('id'));
          // console.log(scrollTop - articleTop);

          menuSlideTo($('#menu a[href="#' + $(article).attr('id') + '"]'));
        }
      });
    }, 700);
  });

  // Add active class to clicked item.
  $("#menu a").click(function() {
    setTimeout(function() {
      clearTimeout(timeOut);
    }, 300);

    menuSlideTo(this);
    var id = $(this).attr('href').substr(1);

    $("#menu a.active").removeClass('active');
    $(this).addClass('active');
  });

  // This is the animation function.
  function menuSlideTo(object) {
    if (!$(object).hasClass('slider-active')) {
      var left = $(object).position().left;
      var top = $(object).position().top;
      var width = $(object).width() + 20;

      // Remove old class.
      $('.slider-active').removeClass('slider-active');

      $('#menu-slider').stop().animate({
          'left': left,
          'top': top,
          'width': width
      }, function() {
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