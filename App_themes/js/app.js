$(function(){window.onscroll=function(){windowScroll()};if(0<window.navigator.userAgent.toLowerCase().indexOf("chrome"))$("body").on("mousedown",".bx-viewport a",function(){$(this).attr("href")&&"#"!=$(this).attr("href")&&(window.location=$(this).attr("href"))});$("#button-search").on("click",btnClick);$("#button-menu").on("click",btnClick);$("#button-user").on("click",btnClick);$("#site-mask").on("click",siteMaskClick);$(".button-close").on("click",siteMaskClick);var a=$(".hero-zone .wrap").carousel({interval:5E3,
ride:"carousel"});a.on("slide.bs.carousel",function(){$(".hero-zone .carousel-indicators .active span").finish()});a.on("slid.bs.carousel",function(){$(".hero-zone .carousel-indicators li span").css("width","0px");$(".hero-zone .carousel-indicators .active span").animate({width:"64px"},5E3,"linear")});$(".hero-zone .carousel-indicators .active span").animate({width:"64px"},5E3,"linear");$(".top-listing.horizontal .wrap").carousel({interval:5E3,ride:"carousel"});$(".top-listing.vertical .wrap").carousel({interval:5E3,
ride:"carousel"});$(".f1-table .panel-title a").click(function(b){b.preventDefault();$(this).addClass("is-active");$(this).siblings().removeClass("is-active");b=$(this).attr("data-target");$(".panel-content .panel").not(b).css("display","none");$("#"+b).show()});$(".f1-table .panel > button").click(function(b){b.preventDefault();$(this).toggleClass("expand");$(this).siblings(".table-responsive").find(".f1-table-detail").toggleClass("is-active")});0<$(".page-detail").length&&(a=mediumZoom("[data-zoomable]",
{margin:8,background:"#272727"}),a.on("open",function(){$("body").append('<i class="medium-loading fas fa-circle-notch fa-spin" style="position: fixed; top: 50vh; left: 50vw; transform: translate(-50%,-50%) color: white; font-size: 56px; z-index:33; opacity:0.5;"></i> ')}),a.on("opened",function(){$(".medium-loading ").remove()}));$(".page-category").hasClass("user-page")&&($(".button-edit").on("click",function(){$(this).hide();$(this).parents(".form-group").find(".button-submit").show();$(this).parents(".form-wrap").find(".form-group").addClass("is-active");
$(this).parents(".form-wrap").find(".form-control").removeAttr("disabled")}),$(".button-cancel").on("click",function(){console.log("cancel");$(this).parents(".form-group").find(".button-submit").hide();$(this).parents(".form-wrap").find(".form-group").removeClass("is-active");$(this).parents(".form-wrap").find(".form-control").attr("disabled","disabled");$(this).parents(".form-group").find(".button-edit").show()}))});$("#button-search").on("click",searchClick);
function searchClick(a){$("#searchInput").focus()}$("#searchInput").focus(function(){$(".search-suggestion").show()});$("#searchInput").focusout(function(){});function windowScroll(){var a=$("#site-header").outerHeight();document.body.scrollTop>a||document.documentElement.scrollTop>a?($("#site-header").addClass("is-pinned"),$("#btnGotop").fadeIn("slow")):($("#site-header").removeClass("is-pinned"),$("#btnGotop").fadeOut("slow"))}
function openSiteMask(a){$("#site-mask").addClass("is-active");$("body").css("overflow","hidden")}function removeSiteMask(a){$("#site-mask").removeClass("is-active");$("body").removeAttr("style")}function btnClick(a){openSiteMask();a=$(this).attr("data-target");$("#"+a).addClass("is-active");"wrap-search"===a&&$("#searchInput").focus()}function siteMaskClick(a){a.preventDefault();a.stopPropagation();removeSiteMask();$("div[id*='wrap-']").removeClass("is-active")}
if(0<$(".lightgallery").length){var $lg=$(".lightgallery");$lg.lightGallery();$lg.on("onSlideClick.lg",function(a){$lg.data("lightGallery").destroy(!1)})}
if(0<$(".detail-car-page").length){var swapTab=function(a){$("a[data-target="+a+"]").closest(".tab-nav").find("a").removeClass("active");$("a[data-target="+a+"]").addClass("active");$("#"+a).siblings(".tab-pane").removeClass("active");$("#"+a).addClass("active")},navtabClick=function(a){a.preventDefault();a.stopPropagation();tab=$(this).attr("data-target");swapTab(tab);"car-sameprice"===tab&&samePriceSlider.reloadSlider();a=$(this).position().left;$(".tab-nav.detail__nav ul")[0].scrollLeft+=a-16};
$(".tab-nav a").on("click",navtabClick);var samePriceSlider=$(".top-listing.vertical .wrap").bxSlider({slideWidth:"260",minSlides:1,maxSlides:2,slideMargin:20,controls:!1,auto:!0,pause:2E4,onSliderLoad:function(){var a=Math.max.apply(null,$(".top-listing.vertical .wrap .item").map(function(){return $(this).outerHeight()}).get());$(".top-listing.vertical .wrap").height(a)}})}
$.fn.carouselHeights=function(){var a=$(this),b=[],c,d=function(){a.each(function(){b.push($(this).outerHeight())});c=Math.max.apply(null,b);a.each(function(){$(this).css("min-height",c+"px")})};d();$(window).on("resize orientationchange",function(){c=0;b.length=0;a.each(function(){$(this).css("min-height","0")});d()})};jQuery(function(a){a(window).on("load",function(){a("#topViewSlider .carousel-item").carouselHeights();a("#topCarSlider .carousel-item").carouselHeights()})});