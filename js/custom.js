function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/*
var mixer = mixItUp(containerEl, {
    animation: {
        duration: 200
    }
});
*/

(function ($) {
    // Instantiate MixItUp:
    $('#Container').mixItUp({
        animation: {
            effects: 'fade rotateZ(-180deg)',
            duration: 1500
        }
    });

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


//ACCORDIONS
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

//SKILL BUTTONS
function openSkill(evt, skillName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("skills-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(skillName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



//SET DELAY ON HOME ANIMATIONS
setTimeout(function () {
    $('#my-animation').show();}, 1500
          );

