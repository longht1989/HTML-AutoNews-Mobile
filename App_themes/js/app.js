// init function
$(function() {
    /*pin header */
    window.onscroll = function() { windowScroll() };

    // fix URL click on bxslider
    if (window.navigator.userAgent.toLowerCase().indexOf("chrome") > 0) {
        $("body").on("mousedown", ".bx-viewport a", function() {
            if ($(this).attr("href") && $(this).attr("href") != "#") {
                window.location = $(this).attr("href");
            }
        });
    }

    /*button action*/
    $("#button-search").on('click', btnClick);
    $("#button-menu").on('click', btnClick);
    $("#site-mask").on('click', siteMaskClick);
    $(".button-close").on('click', siteMaskClick);

    /*slider*/
    // hero index slide
    var pause = 5000;
    var heroslider = $('.hero-zone .wrap').bxSlider({
        // stopAutoOnClick: 1,
        auto: 1,
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 0,
        controls: false,
        pause: pause,
        onSliderLoad: function() {
            $('.hero-zone .bx-pager-item .bx-pager-link').css('width', '0%');
            $('.hero-zone .bx-pager-item .active').animate({ width: '100%' }, pause, 'linear');
        },
        onSlideBefore: function() {
            $('.hero-zone .bx-pager-item .active').finish();
        },
        onSlideAfter: function() {
            heroslider.stopAuto();
            heroslider.startAuto();
            $('.hero-zone .bx-pager-item .bx-pager-link').css('width', '0%');
            $('.hero-zone .bx-pager-item .active').animate({ width: '100%' }, pause, 'linear');
        }
    });

    // best-selling-car slider
    $('.top-listing.horizontal .wrap').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 20,
        controls: false,
        auto: true,
        pause: 20000
    });

    // top view
    $('.top-listing.vertical .wrap').bxSlider({
        slideWidth: '260',
        minSlides: 1,
        maxSlides: 2,
        slideMargin: 20,
        controls: false,
        auto: true,
        pause: 20000,
        // set height for wrapper
        onSliderLoad: function() {
            var maxHeight = Math.max.apply(null, $(".top-listing.vertical .wrap .item").map(function() {
                return $(this).outerHeight();
            }).get());
            $('.top-listing.vertical .wrap').height(maxHeight);
        }
    });

    // > tab
    $(".f1-table .panel-title a").click(function(e) {
        e.preventDefault();
        $(this).addClass("is-active");
        $(this).siblings().removeClass("is-active");
        var t = $(this).attr("data-target");
        $(".panel-content .panel").not(t).css("display", "none");
        $("#" + t).show()
    });


    $(".f1-table .panel > button").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("expand");
        $(this).siblings('.table-responsive').find('.f1-table-detail').toggleClass("is-active");
    });

    const zoom = mediumZoom('[data-zoomable]', {
        margin: 8,
        background: '#272727',
    });

    zoom.on('open', function() {
        $('body').append('<i class="medium-loading fas fa-circle-notch fa-spin" style="position: fixed; top: 50vh; left: 50vw; transform: translate(-50%,-50%) color: white; font-size: 56px; z-index:33; opacity:0.5;"></i> ');
    })
    zoom.on('opened', function() {
        $('.medium-loading ').remove();
    })
});


// search click
$('#button-search').on('click', searchClick);

function searchClick(e) {
    $('#searchInput').focus();
}

$('#searchInput').focus(function() {
    $('.search-suggestion').show();
});

$('#searchInput').focusout(function() {
    // setTimeout(function() { $('.search-suggestion').hide(); }, 300);
});

// customise function
function windowScroll() {
    var headerHeight = $("#site-header").outerHeight();
    if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
        $("#site-header").addClass('is-pinned');
        $("#btnGotop").fadeIn('slow');
    } else {
        $("#site-header").removeClass('is-pinned');
        $("#btnGotop").fadeOut('slow');
    }
}

function openSiteMask(e) {
    $("#site-mask").addClass('is-active');
    $('body').css('overflow', 'hidden');
}

function removeSiteMask(e) {
    $("#site-mask").removeClass('is-active');
    $('body').removeAttr('style');
}

function btnClick(e) {
    openSiteMask();
    var idTarget = $(this).attr('data-target');
    $('#' + idTarget).addClass('is-active');
    if (idTarget === 'wrap-search') {
        $('#searchInput').focus();
    }
}

function siteMaskClick(e) {
    e.preventDefault();
    e.stopPropagation();
    removeSiteMask();
    $("div[id*='wrap-']").removeClass('is-active');
}

// light gallery
if ($(".lightgallery").length > 0) {
    var $lg = $('.lightgallery');
    $lg.lightGallery();
    $lg.on('onSlideClick.lg', function(event) {
        $lg.data('lightGallery').destroy(false);
    });
}

// detail car page
if ($(".detail-car-page").length > 0) {
    // swap tab function
    $('.tab-nav a').on('click', navtabClick);

    function navtabClick(e) {
        e.preventDefault();
        e.stopPropagation();
        tab = $(this).attr('data-target');
        swapTab(tab);
        if (tab === 'car-sameprice') {
            samePriceSlider.reloadSlider();
        }
        // scroll navbar to active tab
        var position = $(this).position().left;
        $('.tab-nav.detail__nav ul')[0].scrollLeft += (position - 16);
    }

    function swapTab(tab) {
        $("a[data-target=" + tab + "]").closest(".tab-nav").find('a').removeClass('active');
        $("a[data-target=" + tab + "]").addClass('active');
        $('#' + tab).siblings(".tab-pane").removeClass('active');
        $('#' + tab).addClass('active');
    }
    // slider in same price
    var samePriceSlider = $('.top-listing.vertical .wrap').bxSlider({
        slideWidth: '260',
        minSlides: 1,
        maxSlides: 2,
        slideMargin: 20,
        controls: false,
        auto: true,
        pause: 20000,
        // set height for wrapper
        onSliderLoad: function() {
            var maxHeight = Math.max.apply(null, $(".top-listing.vertical .wrap .item").map(function() {
                return $(this).outerHeight();
            }).get());
            $('.top-listing.vertical .wrap').height(maxHeight);
        }
    });
}