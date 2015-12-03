define([
    'jquery',
    'Module',
    'jquery.camera',
    'jquery.easing',
    'jquery.mixitup',
    'jquery.magnific-popup',
    'jquery.fliplightbox'
], function ($, M) {
    M("render_index", {
        init: function () {
            var content = this;

            content.loadCamera();
            content.loadFilterList();
            content.loadMagnificPopup();
            $('body').flipLightBox();
        },
        loadCamera: function () {
            $('#camera_wrap_2').camera({
                loader: 'bar',
                pagination: false,
                thumbnails: false
            });
        },
        loadFilterList: function () {
            var filterList = {
                init: function () {
                    // MixItUp plugin
                    // http://mixitup.io
                    $('#gallerylist').mixitup({
                        targetSelector: '.portfolio',
                        filterSelector: '.filter',
                        effects: ['fade'],
                        easing: 'snap',
                        // call the hover effect
                        onMixEnd: filterList.hoverEffect()
                    });
                },
                hoverEffect: function () {
                    // Simple parallax effect
                    $('#gallerylist .portfolio').hover(
                        function () {
                            $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                            $(this).find('img').stop().animate({top: -30}, 500, 'easeOutQuad');
                        },
                        function () {
                            $(this).find('.label').stop().animate({bottom: -40}, 200, 'easeInQuad');
                            $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');
                        }
                    );
                }
            };
            // Run the show!
            filterList.init();
        },
        loadMagnificPopup: function () {
            $('.popup-with-zoom-anim').magnificPopup({
                type: 'inline',
                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            });
        }
    });
});
