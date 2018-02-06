/*---------------------------------------------------------------------
            LUMIERE FICTIONAL WEBSITE SCRIPT FILE
---------------------------------------------------------------------*/


/*---------------------------------------------------------------------
                        MOBILE DEVICES MENU SCRIPT
---------------------------------------------------------------------*/

    $("span.navBtn").click(function() {

        $("#mainMenu").slideToggle();
    });


   /* $(window).resize(function() {

        if ( $(window).width() > 768 ) {

            $("#mainMenu").removeAttr("style");
        }
    });*/
$("#mainMenu li").on("click", function(){
        
        if ( $(window).width() < 1024 ) {
        $("span.navBtn").click();
        }
    });


/*---------------------------------------------------------------------
                        SMOOTH SCROLLING OF ALL LINKS
---------------------------------------------------------------------*/

$(function() {
        $('.navC a, .actionB a, .logoC a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 100
            }, 1000);
            event.preventDefault();
        });
    });


/*---------------------------------------------------------------------
                        THE MODAL SCRIPT
---------------------------------------------------------------------*/

        // Get the modal
        var theModal = document.getElementById('myModal');

        // Get the button that opens the modal

        var modalButton = document.getElementById("register");

        modalButton.addEventListener("click", openModel, false);

        function openModel() {

            theModal.style.display = "block";
        }


        // Get the <span> element that closes the modal
        var theClose = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        theClose.onclick = function() {
            theModal.style.display = "none";
        }


        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == theModal) {
                theModal.style.display = "none";
            }
        }

        
 

/*---------------------------------------------------------------------
                        GOOGLE MAP SCRIPT
---------------------------------------------------------------------*/
        
 function initMap() {
    
        // Creating a new variable to hold my lat and lng
          var officeLocation = {lat: 51.51234617, lng: -0.0752784};
    
        // Create a map object and specify the DOM element for display.
          map = new google.maps.Map(document.getElementById("map"), {
          center: officeLocation,
          scrollwheel : false,
          zoom: 16
        });
          var marker = new google.maps.Marker({
          position: officeLocation,
          map: map,
          title: 'Find us here!'
        });
    
          var popupAddress = "The Vintage Apparel Company, 2nd Floor<br />";
              popupAddress += "St. Clare House<br />";
              popupAddress += "30-33 Minories<br />";
              popupAddress += "London EC3N 1DD<br />";
          
              
          var infowindow = new google.maps.InfoWindow({
          content: popupAddress,
          maxWidth: 300
        });
          marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

      }    

            

/*---------------------------------------------------------------------
                        DRAG AND DROP SCRIPT
---------------------------------------------------------------------*/

