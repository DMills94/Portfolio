function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

(function ($) {
    // Instantiate MixItUp:
    $('#Container').mixItUp();

    // Add smooth scrolling to all links in navbar + footer link
    $(".sidenav a").on('click', function(event) {
        var hash = this.hash;
        if( hash ) {
          event.preventDefault();
          $('html, body').animate({
              scrollTop: $(hash).offset().top
          }, 900, function(){
              window.location.hash = hash;
          });
        }

    });
    
})(jQuery);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}