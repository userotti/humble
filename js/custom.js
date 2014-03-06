/* Add here all your JS customizations */
$("#mainMenu li > a, #mainMenu li > a").on("click", function(e) {

				/*if($(window).width() > 979) return;

				e.preventDefault();

				addActiveClass = $(this).parent().hasClass("resp-active");

				$("#mainMenu").find(".resp-active").removeClass("resp-active");

				if(!addActiveClass) {
					$(this).parents("li").addClass("resp-active");
				}

				return;*/

				//$(this).addClass("active");


				//console.log("fooooookkoff");

			});

$('.lightbox_register').click(function(e) {
     
    // Code that makes the lightbox appear
 	console.log("regis55ter");

	if ($('#lightbox').length > 0) { // #lightbox exists
	     
	    

	}
	else { //#lightbox does not exist 
	     
	    //create HTML markup for lightbox window
	    var lightbox = 
	    '<div id="lightbox">' +
	        '<p>Click to close</p>' +
	        '<div id="form">' + //insert clicked link's href into img src
	           
	        '</div>' +    
	    '</div>';
	         
	    //insert lightbox HTML into page
	    $('body').append(lightbox);
	}

	$('#lightbox').on('click', function() {
    	$('#lightbox').remove();
	});

});








