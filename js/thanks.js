$(function() {
  var timeOut;
  // Event binding.
  BrowserDetect.init();

  $('body').addClass(BrowserDetect.OS);
  $('body').addClass(BrowserDetect.browser);

});