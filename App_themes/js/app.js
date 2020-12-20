// init function
$(function() {
    /*pin header */
    window.onscroll = function() { windowScroll(); };

    /*button action*/
    $("#button-search").on('click', btnClick);
    $("#button-menu").on('click', btnClick);
    $("#button-user").on('click', btnClick);
    $("#site-mask").on('click', siteMaskClick);
    $(".button-close").on('click', siteMaskClick);

    /*slider*/
    // carousel slider for hero index
    var pause = 5000;

    var heroslider = $('.hero-zone .wrap').carousel({
        interval: 5000,
        ride: 'carousel'
    });
    // console.log('before slide');
    heroslider.on('slide.bs.carousel', function() {
        $('.hero-zone .carousel-indicators .active span').finish();
    });
    // console.log('after slide');
    heroslider.on('slid.bs.carousel', function() {
        $('.hero-zone .carousel-indicators li span').css('width', '0px');
        $('.hero-zone .carousel-indicators .active span').animate({ width: '64px' }, pause, 'linear');
    });
    // animate first time for the first indicator
    var firstSlider = 1;
    if (firstSlider) {
        $('.hero-zone .carousel-indicators .active span').animate({ width: '64px' }, pause, 'linear');
        firstSlider = 0;
    }

    // top view slider
    var horizontalSlider = $('.top-listing.horizontal .wrap').carousel({
        interval: 5000,
        ride: 'carousel'
    });

    // top car slider
    var horizontalSlider = $('.top-listing.vertical .wrap').carousel({
        interval: 5000,
        ride: 'carousel'
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

    // toggle edit in user settings
    if ($('.page-category').hasClass('user-page')) {
        $('.button-edit').on('click', function() {
            $(this).hide();
            $(this).parents('.form-group').find('.button-submit').show();
            $(this).parents('.form-wrap').find('.form-group').addClass('is-active');
            $(this).parents('.form-wrap').find('.form-control').removeAttr('disabled');
        })
        $('.button-cancel').on('click', function() {
            console.log('cancel')
            $(this).parents('.form-group').find('.button-submit').hide();
            $(this).parents('.form-wrap').find('.form-group').removeClass('is-active');
            $(this).parents('.form-wrap').find('.form-control').attr('disabled', 'disabled');
            $(this).parents('.form-group').find('.button-edit').show();
        })
    }

    $('.btn-toggle').on('click', toggleCarFilter);
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
        $("#btnGotop").show();
        $("#btnFilter").show();
    } else {
        $("#site-header").removeClass('is-pinned');
        $("#btnGotop").hide();
        $("#btnFilter").hide();
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
            $('#samePriceSlider .carousel-item').carouselHeights();
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
}

// Normalize Carousel Heights - pass in Bootstrap Carousel items.
$.fn.carouselHeights = function() {

    var items = $(this), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide

    var normalizeHeights = function() {

        items.each(function() { //add heights to array
            heights.push($(this).outerHeight());
        });
        tallest = Math.max.apply(null, heights); //cache largest value
        items.each(function() {
            $(this).css('min-height', tallest + 'px');
        });
    };

    normalizeHeights();

    $(window).on('resize orientationchange', function() {
        //reset vars
        tallest = 0;
        heights.length = 0;

        items.each(function() {
            $(this).css('min-height', '0'); //reset min-height
        });
        normalizeHeights(); //run it again 
    });
};

jQuery(function($) {
    $(window).on('load', function() {
        $('#topViewSlider .carousel-item').carouselHeights();
        $('#topCarSlider .carousel-item').carouselHeights();
        $('#samePriceSlider .carousel-item').carouselHeights();
    });
});

// button toggle for filter in car listing page
function toggleCarFilter(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).siblings('.row--extend').toggleClass('is-active');
    $(this).toggleClass('is-active');
}