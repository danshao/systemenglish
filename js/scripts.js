$(function(){

  window.setTimeout(function() { $("#main-nav").uqNav(); }, 500);


  var hash = window.location.hash,
      currentId = hash.substring(hash.indexOf("#") + 1);

  // select active link on load
  if(currentId.length)
    $('#main-nav').find('a[href^="#' + currentId + '"]').addClass('active');
    

  function elementInViewport(el, scroll) {
    var top = el.offsetTop - 50,
        height = $(el).outerHeight(),
        bottom = top + height;

    if($(el).get(0).id == 'section-register'){
      top = top - 600;
    }

    if((scroll >= top) && (scroll <= bottom)){
      return(el);
    }
  }


  function navScrollHandler(){
    if (Modernizr.touch && $(window).outerHeight() <= 480) return;
    if($('#main-nav').hasClass('top-fixed')) return;

    var anchors = $('#home, #about, #class, #teacher, #contact');

    $.each(anchors, function(){
      var currentSection = elementInViewport(this, $(window).scrollTop()),
          currentId = $(currentSection).attr('id'),
          currentNavItem = $('#nav').find('a[href^="#' + currentId + '"]');

      if(currentNavItem.length){
        if(!currentNavItem.hasClass('active')){
          $.each($('#main-nav').find('a'), function(){
            $(this).removeClass('active');
            currentNavItem.addClass('active');
          });
        }
      }
    });
  }

  $(window).bind('scroll.active-nav', function(){
    navScrollHandler();
  });
    

  var sOffset;

  /* Scrolling */
  if( $(window).outerWidth() <= 768 ){
    sOffset = 0;
  } else {
    sOffset = -83;
  }
  

  $.localScroll({
    target: 'body',
    queue:true,
    duration:1000,
    hash:true,
    offset: sOffset,
    onBefore:function( e, anchor, $target ){
      $(window).unbind('scroll.active-nav');
			if (($(anchor).attr('id') == 'about') || Modernizr.touch) {
				this.offset = 0;
			} else {
				this.offset = -83;
			}
			
			if(Modernizr.touch){
				this.offset = this.offset - 80;
			}
    },
    onAfter:function( anchor, settings ){
      $(window).bind('scroll.active-nav', function(){
        navScrollHandler();
      });
    }
  });

  function headerScale(){
    var headerMap = $('#header-map');
    var headerContent = $('#header-content');

    var wWidth = $(window).outerWidth();
    var wHeight = $(window).outerHeight();
    var headerContentHeight = $('#header-content .container').outerHeight();
    var contentPadding = (wHeight - headerContentHeight) / 2;

    var mapHeight, contentHeight, mapPadding, iframeHeight;

    if (Modernizr.touch) {
      $('#main-nav').prependTo('#home');
    }

    var registrationForm = $('#contact-form');

    if(wWidth <= 480) {
      mapHeight = 415;
      contentHeight = 380;
      contentPadding = 50;
      iframeHeight = 980;
    }
    if((wWidth > 480) && (wWidth <= 768)){
      contentHeight = wHeight - contentPadding;
			contentPadding = (wHeight - headerContentHeight) / 2;
      iframeHeight = 980;
			if(Modernizr.touch){
	      mapHeight = wHeight;
			} else {
				mapHeight = wHeight - 54;
			}
    }
    if(wWidth > 768) {
      contentHeight = wHeight - contentPadding; // subtract nav height
			contentPadding = (wHeight - headerContentHeight) / 2;

      iframeHeight = 640;
			if(Modernizr.touch){
	      mapHeight = wHeight;
				contentPadding = contentPadding + 50;
			} else {
				mapHeight = wHeight - 83;
			}
    }

    headerMap.css({
      width: wWidth,
      height: mapHeight,
    });

    headerContent.css({
      paddingTop: mapPadding,
      width: wWidth,
      height: contentHeight,
      paddingTop: contentPadding
    }).addClass('map-fixed');

    registrationForm.css({
      height: iframeHeight
    });

  }

  headerScale();

	function initSliders(){
		if($(window).outerWidth() <= 767){
			$('.slide-up').addClass('large');
		}
		
		// if($(window).outerWidth() >= 978 && !Modernizr.touch){
			$.each($('.slide-up'), function(){
				var self = this,
						button = $('<div />').addClass('toggle').append('<span></span>'),
						shortHeight = ( $(this).hasClass('large') ) ? 74 : 94,
						contentHeight;
						
				$(self).wrapInner('<div class="content-fix"></div>');

				button.click(function(){
					contentHeight = $(self).find('.content-fix').outerHeight(true) + 30;
					if($(self).attr('data-toggle') == 'closed'){
						$(self).animate({
							height: contentHeight
						});
						button.addClass('open');
						$(self).removeClass('closed').attr('data-toggle', 'open');
					} else {
						$(self).animate({
							height: shortHeight
						});
						button.removeClass('open').addClass('closed');
						$(self).attr('data-toggle', 'closed');
					}
				});

				$(this).after(button);

				$(this).css({
					height: shortHeight
				});

				$(this).attr('data-toggle', 'closed');

			  $(window).resize(function() {

					if($(window).outerWidth() <= 767){
						$('.slide-up').addClass('large');
					} else {
						$('.slide-up').removeClass('large');
					}

					if($(self).attr('data-toggle') == 'open'){
						contentHeight = $(self).find('.content-fix').outerHeight(true) + 30;
						$(self).css({
							height: contentHeight
						});
					}
			  });


			});
		// }
	}
	window.setTimeout(function() {
		initSliders();
	}, 100);


  $(window).resize(function() {
		headerScale();
  });

	$('body').bind('orientationchange', function(){
		headerScale();
	});

  function initialize() {
      var images = [ "img/photos/frontpage_banner1.jpg", "img/photos/frontpage_banner2.jpg", "img/photos/frontpage_banner3.jpg", "img/photos/frontpage_banner4.jpg", "img/photos/frontpage_banner5.jpg", "img/photos/frontpage_banner6.jpg" ];
      var currentImage = 0;

      function changeBackground() {
          $('#slider').attr("src", images[ ++currentImage ]);
          if (currentImage >= images.length - 1) {
              currentImage -= images.length;
          }
      }

      setInterval(changeBackground, 5000);
  }
  initialize();

});

    /*
   var mapOptions = {
      zoom: 11,
      center: new google.maps.LatLng(36.175574,-115.392151),
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      panControl:false,
      zoomControl:false,
      mapTypeControl:false,
      scaleControl:false,
      streetViewControl:false,
      overviewMapControl:false,
      rotateControl:false
    };

    var map = new google.maps.Map(document.getElementById('header-map'), mapOptions);
    */