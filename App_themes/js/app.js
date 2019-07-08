// init function
$(function() {
    /*pin header */
    window.onscroll = function() { windowScroll() };

    /*button action*/
    $("#button-search").on('click', btnClick);
    $("#button-menu").on('click', btnClick);
    $("#site-mask").on('click', siteMaskClick);
    $(".button-close").on('click', siteMaskClick);

    /*slider*/
    // hero index slide
    var heroCTApos;
    var currentCTA;
    var heroslider = $('.hero-zone .wrap').bxSlider({
        auto: 1,
        minSlides: 1,
        maxSlides: 1,
        slideMargin: 0,
        controls: false,
        pause: 5000,
        // customise dynamic position for pager
        onSliderLoad: function() {
            console.log('loaded slide');
            zonePos = $('.bx-viewport').parents('.hero-zone').offset().top;
            currentCTA = $(".bx-viewport .current:not([class='bx-clone'])").find('.cta');
            heroCTApos = currentCTA.offset().top + currentCTA.outerHeight();
            pagerPos = heroCTApos - zonePos;
            $('.hero-zone .bx-pager').css('top', pagerPos);
        },
        onSlideBefore: function() {
            console.log('before slide');
            $(".bx-viewport .item").removeClass('current');
            current = heroslider.getCurrentSlide() + 1;
            $(".bx-viewport .item:not([class='bx-clone'])").eq(current).addClass('current');
            console.log('current is ' + current);
            zonePos = $('.bx-viewport').parents('.hero-zone').offset().top;
            currentCTA = $(".bx-viewport .current:not([class='bx-clone'])").find('.cta');
            heroCTApos = currentCTA.offset().top + currentCTA.outerHeight();
            pagerPos = heroCTApos - zonePos;
            $('.hero-zone .bx-pager').css('top', pagerPos);
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
        pause: 20000
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

    mediumZoom('[data-zoomable]', {
        margin: 24,
        background: '#272727'
    });
});

function windowScroll() {
    var headerHeight = $("#site-header").height();
    if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
        $("#site-header").addClass('is-pinned');
    } else {
        $("#site-header").removeClass('is-pinned');
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
}

function siteMaskClick(e) {
    e.preventDefault();
    e.stopPropagation();
    removeSiteMask();
    $("div[id*='wrap-']").removeClass('is-active');
}