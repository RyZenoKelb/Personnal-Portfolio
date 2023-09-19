window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  
  function scrollToElement(element, speed, easing) {
    
    var scrollTargetY = element.offsetTop;
  
    var scrollY = window.scrollY,
      scrollTargetY = scrollTargetY || 0,
      speed = speed || 2000,
      easing = easing || 'easeOutSine',
      currentTime = 0;
  
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));
  
    var PI_D2 = Math.PI / 2,
      easingEquations = {
        easeOutSine: function(pos) {
          return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function(pos) {
          return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },
        easeInOutQuint: function(pos) {
          if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 5);
          }
          return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
      };
  
    function tick() {
      currentTime += 1 / 60;
  
      var p = currentTime / time;
      var t = easingEquations[easing](p);
  
      if (p < 1) {
        requestAnimFrame(tick);
  
        window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
      } else {
        console.log('scroll done');
        window.scrollTo(0, scrollTargetY);
      }
    }
  
    tick();
  }
  
  
  // scroll it!
  var scrollLinks = document.querySelectorAll('.scroll-link');
  
  for (var i = 0; i < scrollLinks.length; i++) {
    scrollLinks[i].addEventListener('click', function( evt ) {
      var id = evt.target.getAttribute('data-element-id');
      var element = document.getElementById( id );
      scrollToElement( element, 1500, 'easeInOutQuint');
    });
  }
  