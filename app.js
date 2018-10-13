(function ($, window) {
  var isMobile = ('matchMedia' in window) && window.matchMedia("only screen and (max-width: 760px)").matches;
  
  if(!$) return;

  $(document).ready(function() {
    
    function arrow (gallery, direction) {
      return function (e) {
        e.preventDefault();
        gallery[direction]();
      }  
    }

    function update (thumbnails) {
      return function (e) {
        var idx = showcase.currentItem;
        var it = e.find('#item-' + idx + ' img');
        var url = new URL(it.data('path'));
        window.history.pushState({},"", url.pathname);
        thumbnails.goTo(idx);
      }
    }

    function galleryClick (gallery) {
      return function (e) {
        e.preventDefault();
        var idx = Number($(this).data('idx'));
        gallery.goTo(idx);
        return false
      }
    }

    var thumbnailsEl = $("#product_gallery").owlCarousel({
      items: 8,
      itemsDesktopSmall: [1025, 8],
      itemsMobile: [415, 3],
      itemsTablet: [737, 5],
      pagination: false,
      navigation: true,
      scrollPerPage: true
    });
    var thumbnails = thumbnailsEl.data('owlCarousel');
    
    var showcaseEl = $("#showcase_gallery").owlCarousel({
      singleItem: true,
      lazyLoad : true,
      navigation : false,
      pagination: false,
      afterMove: update(thumbnails),
    });
    var showcase = showcaseEl.data('owlCarousel');
    
    $('.arrow__next').on('click', arrow(showcase, 'next'));
    $('.arrow__prev').on('click', arrow(showcase, 'prev'));

    $('#product_gallery a').on('click', galleryClick(showcase));

    if(CURRENT_PRODUCT_INDEX) { 
      thumbnails.goTo(CURRENT_PRODUCT_INDEX);
      showcase.goTo(CURRENT_PRODUCT_INDEX);
    }
  });
})(window['$'], window);
