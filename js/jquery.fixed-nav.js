(function($) {

$.widget("ui.uqNav", {
  options: {
    onWelcome: true,
    welcomeHeight: null
  },
  _create: function() {
    var self = this,
        o = self.options,
        homeHeight = $('header').outerHeight();

    if(homeHeight > 0)
      o.welcomeHeight = homeHeight;

    $(window).bind('resize', function(){
      homeHeight = $('header').outerHeight();
      if(homeHeight > 0)
        o.welcomeHeight = homeHeight;
    });

    if(self.element.hasClass('top-fixed')) return;

    // position nav
    this.positionNav();

    // show on load; use opacity so that element
    // is immediately displayed and has position
    self.element.delay(1000).animate({
      opacity: 1
    }, 1000);

    // store the original position of the nav
    o.navOffset = self.element.offset().top; /* factor in padding */
    
    // if you are scrolled below the original nav position
    // or, in the case that you advanced the slideshow, 
    // below the header, fix the nav at the top
    if($(window).scrollTop() >= self.getThreshold()){
      self.fixNav();
    }

    $(window).bind('scroll', function(){
      self.positionNav();
    });
  },
  positionNav: function(){
    var self = this,
        o = self.options;

    var belowThreshold = ($(window).scrollTop() >= self.getThreshold());
    // check if below the threshold
    if(belowThreshold){
      self.fixNav();
      if(!$(self.element).is(':visible'))
        self.showNav();
    } else if(!belowThreshold && !o.onWelcome){
      self.hideNav();
    } else {
      self.unfixNav();
    }

    self.toggleHeader();

  },
  toggleHeader: function(){
    var self = this,
        o = self.options;

    // show watermark only below the header
    if($(window).scrollTop() >= (o.welcomeHeight - 48)){
      $('.wordmark').fadeIn(500);
      $('#nav .soc-tw').fadeIn(500);
      $('#nav .soc-rs').fadeIn(500);
      self.element.addClass('bg');
    } else {
      $('.wordmark').fadeOut(100);
      $('#nav .soc-tw').fadeOut(100);
      $('#nav .soc-rs').fadeOut(100);
      self.element.removeClass('bg');
    }
  },
  showNav: function(){
    this.element.fadeIn(600);
  },
  hideNav: function(){
    this.element.fadeOut(600);
    this.element.removeClass('shadow');
  },
  fixNav: function(){
    // if(Modernizr.touch) return;
    this.element.addClass('fixed');
  },
  unfixNav: function(){
    this.element.removeClass('fixed');
  },
  getThreshold: function(){
    if(this.options.onWelcome){
      return this.options.navOffset;
    } else {
      return this.options.welcomeHeight;
    }
  },
  setCurrentSlide: function(x){
    var self = this;
    // check if the current slide is the welcome slide
    if(x == 0){
      this.options.onWelcome = true;

      window.setTimeout(function() {
        self.showNav()
      }, 1000);

    } else {
      this.options.onWelcome = false;
      this.hideNav();
    }
    this.positionNav();
  }

});

})(jQuery);