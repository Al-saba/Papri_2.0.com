/*------------------------------------------------------------------
    Developer     :    Ayatullah Al-Saba
    Website Name:    PAPRI — People Advancement Power Rural Institute 
    Version      :    1.0.0
-------------------------------------------------------------------*/

/***************************************************
==================== JS ======================
****************************************************
01. PRELOADER JS
03. STICKY HEADER JS
04. MOBILE MENU 
05. SCROLL MENU (SMOOTH SCROLL)
06. BACK TO TOP
08. Star Gallary JS (PORTFOLIO GRID)
09. Star Service JS (SERVICE CARDS & HOVER)
    -- Star Counter (GSAP ANIMATION)
10. LIGHTCASE JS
11. GSAP JS (HERO, SCROLL & PARALLAX ANIMATIONS)
    -- CUSTOM ACCORDION JS
12. START BLOG GALLERY JS 
13. START NICE SELECT JS
14. Star Home Slider JS 
15. START CATEGORIES JS 
****************************************************/

(function ($) {
    "use strict";

    /*--------------------------------------------------------------
    01. PRELOADER JS
    --------------------------------------------------------------*/
    $(window).on('load', function () {
        // Animate loader off screen
        $(".atf-preloader").addClass('loaded');
        $(".atf-preloader").delay(600).fadeOut();
    });

	/*--------------------------------------------------------------
	Header Search js
	--------------------------------------------------------------*/
	$('.atf-searching-btn').on('click', function(){
		$('.atf-searching-area').addClass('active');
	});

	 $('.atf-searching-close-btn').on('click', function(){
		$('.atf-searching-area').removeClass('active');
	  });
	/*--------------------------------------------------------------
	02.	ATTACHMENT IMAGE JS
	--------------------------------------------------------------*/
    var bg = $(".atf_attach_bg_1");
    bg.css("background-image", function () {
        var attach = "url(" + $(this).data("background") + ")";
        return attach;
    });
    /*--------------------------------------------------------------
	03.	STICKY HEADER JS
	--------------------------------------------------------------*/
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 400) {
				$(".atf-sticky-header").removeClass("atf-sticky-active");
			} else {
				$('.atf-sticky-header').addClass('atf-sticky-active');
			}
    });
    /*--------------------------------------------------------------
	04.	MOBILE MENU 
	--------------------------------------------------------------*/
    var atfHamburger = $(".atf-mobile-menu-active > ul").clone();
    var atfHamburgerMenu = $(".atf-hamburger-menu nav");
    atfHamburgerMenu.append(atfHamburger);
    if ($(atfHamburgerMenu).find(".sub-menu").length != 0) {
        $(atfHamburgerMenu).find(".sub-menu").parent().append('<button class="atf-menu-close"><i class="fas fa-chevron-right"></i></button>');
    }

    var atfSidebarMenu = $(".atf-hamburger-menu nav > ul > li button.atf-menu-close, .atf-hamburger-menu nav > ul li.menu-item-children > a, .atf-hamburger-menu nav > ul > li.atf-nav-item > a");
    $(atfSidebarMenu).on("click", function (e) {
        console.log(e);
        e.preventDefault();
        if (!$(this).parent().hasClass("active")) {
            $(this).parent().addClass("active");
            $(this).siblings(".sub-menu").slideDown();
        } else {
            $(this).siblings(".sub-menu").slideUp();
            $(this).parent().removeClass("active");
        }
    });
	

      // Hamburger open/close
	$(".atf-hamburger-toogle").on("click", function () {
		$(".atf-hamburger").addClass("atf-hamburger-open");
		$(".atf-hamburger-overlay").addClass("atf-hamburger-overlay-open");
		$("body").addClass("menu-open");
	});

	$(".atf-hamburger-close-toggle, .atf-hamburger-overlay").on("click", function () {
		$(".atf-hamburger").removeClass("atf-hamburger-open");
		$(".atf-hamburger-overlay").removeClass("atf-hamburger-overlay-open");
		$("body").removeClass("menu-open");
	});

	// Make Hamburger independently scrollable
	$(".atf-hamburger").on('wheel touchmove', function(e){
		e.stopPropagation(); // prevent Lenis from blocking
	});
	// Make Hamburger Onepage scrollable
	$(".atf-hamburger-menu nav > ul.atf-onepage-menu li a").on("click", function () {
        $(".atf-hamburger").removeClass("atf-hamburger-open");
        $(".atf-hamburger-overlay").removeClass("atf-hamburger-overlay-open");
    });


    /*--------------------------------------------------------------
	05.	SCROLL MENU
	--------------------------------------------------------------*/
	// Smooth Scroll on Click
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700, 'swing');
        }
    });
    /*--------------------------------------------------------------
    06. BACK TO TOP
    --------------------------------------------------------------*/
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('#scroll-top').addClass('show');
        } else {
            $('#scroll-top').removeClass('show');
        }
    });

    $('#scroll-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    /*--------------------------------------------------------------
    08. Star Gallary JS (PORTFOLIO)
    --------------------------------------------------------------*/
    // Staggered portfolio grid reveal
    ScrollTrigger.create({
        trigger: '.portfolio-grid',
        start: 'top 85%',
        once: true,
        onEnter: function () {
            gsap.to('.portfolio-item', {
                opacity: 1, scale: 1, duration: .6, stagger: .1, ease: 'power3.out'
            });
        }
    });
    gsap.set('.portfolio-item', { opacity: 0, scale: .93 });

    // Portfolio Card Individual Animations
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.portfolio-card',
            start: 'top 80%',
            once: true
        }
    });
    tl.to('.portfolio-card',     { opacity: 1, y: 0, duration: .75, ease: 'power3.out' }, 0)
      .to('.portfolio-category', { opacity: 1, y: 0, duration: .5,  ease: 'power3.out' }, 0.3)
      .to('.portfolio-title',    { opacity: 1, y: 0, duration: .6,  ease: 'power3.out' }, 0.45)
      .to('.portfolio-desc',     { opacity: 1, y: 0, duration: .55, ease: 'power3.out' }, 0.58)
      .to('.portfolio-link',     { opacity: 1, y: 0, duration: .5,  ease: 'back.out(1.4)' }, 0.72);

    /*--------------------------------------------------------------
    09. Star Service JS
    --------------------------------------------------------------*/
    // Staggered service cards reveal
    ScrollTrigger.create({
        trigger: '#services .row:first-child',
        start: 'top 85%',
        once: true,
        onEnter: function () {
            gsap.to('#services .service-card', {
                opacity: 1, y: 0, duration: .7, stagger: .15, ease: 'power3.out'
            });
        }
    });

    // Service Card Hover GSAP Effect
    $('.service-card').on('mouseenter', function () {
        gsap.to(this, { y: -7, boxShadow: '0 20px 60px rgba(0,0,0,.15)', duration: .3, ease: 'power2.out' });
    }).on('mouseleave', function () {
        gsap.to(this, { y: 0, boxShadow: '0 2px 12px rgba(0,0,0,.06)', duration: .3, ease: 'power2.out' });
    });

    /*--------------------------------------------------------------
    11. Star Client JS
    --------------------------------------------------------------*/
    $('.atf__client_slider_active').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        infinite: true,
        cssEase: 'linear',
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left-long" alt="Arrow Icon"></i></a>',
        nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right-long" alt="Arrow Icon"></i></a>',
        responsive: [
            {
                breakpoint: 1200,
                settings: { slidesToShow: 3, slidesToScroll: 1, arrows: false, dots: true }
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false, dots: true }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true }
            },
            {
                breakpoint: 580,
                settings: { arrows: false, dots: true, slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    });

    /*--------------------------------------------------------------
    -- Star Counter
    --------------------------------------------------------------*/
    var countersStarted = false;
    ScrollTrigger.create({
        trigger: '#stats .stat-grid',
        start: 'top 80%',
        once: true,
        onEnter: function () {
            if (countersStarted) return;
            countersStarted = true;
            $('.stat-number[data-target]').each(function () {
                var $el = $(this);
                var target = parseInt($el.data('target'));
                var suffix = $el.data('suffix') || '+';
                var obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2.2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        $el.text(Math.ceil(obj.val) + suffix);
                    }
                });
            });
        }
    });

    $('.counter-number').counterUp({
        delay: 15,
        time: 2000
    });

    /*--------------------------------------------------------------
    14. LIGHTCASE JS
    --------------------------------------------------------------*/
    const $lightcaseLinks = $("a[data-rel^=lightcase]");
    $lightcaseLinks.off('click.lightcase');
    $lightcaseLinks.lightcase({
        transition: "elastic",
        swipe: true,
        maxWidth: 1170,
        maxHeight: 600,
    });

    /*--------------------------------------------------------------
    16. GSAP JS (GLOBAL ANIMATIONS)
    --------------------------------------------------------------*/
    gsap.registerPlugin(ScrollTrigger);

    // Hero core animations
    var heroTl = gsap.timeline({ delay: .2 });
    heroTl
        .to('.hero-tag',     { opacity: 1, y: 0, duration: .7, ease: 'power3.out' })
        .to('.hero-heading', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.4')
        .to('.hero-desc',    { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.5')
        .to('.hero-actions', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.4')
        .to('.hero-img-wrap',{ opacity: 1, x: 0, duration: 1,  ease: 'power3.out' }, '-=.7')
        .to('.up-down-anim', { opacity: 1, y: 0, duration: .8, ease: 'back.out(1.4)' }, '-=.4');

    // Floating animation for hero card
    gsap.to('.up-down-anim', {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
    });

    // Scroll Reveal Classes (Fade In/Up/Left/Right/Scale)
    gsap.utils.toArray('.fade-up').forEach(function (el) {
        gsap.to(el, {
            opacity: 1, y: 0, duration: .9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });
    gsap.utils.toArray('.fade-left').forEach(function (el) {
        gsap.to(el, {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });
    gsap.utils.toArray('.fade-right').forEach(function (el) {
        gsap.to(el, {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });
    gsap.utils.toArray('.fade-in').forEach(function (el) {
        gsap.to(el, {
            opacity: 1, duration: .8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });
    gsap.utils.toArray('.scale-in').forEach(function (el) {
        gsap.to(el, {
            opacity: 1, scale: 1, duration: .9, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });

    // Staggered process steps
    ScrollTrigger.create({
        trigger: '.process-steps',
        start: 'top 85%',
        once: true,
        onEnter: function () {
            gsap.fromTo('.process-step',
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: .6, stagger: .12, ease: 'power2.out' }
            );
        }
    });

    // Blog Card Animations
    gsap.to('#bc1', {
        opacity: 1, y: 0, duration: .75, ease: 'power3.out',
        scrollTrigger: { trigger: '#bc1', start: 'top 85%', once: true }
    });
    gsap.to('#bc2', {
        opacity: 1, y: 0, duration: .75, ease: 'power3.out', delay: .12,
        scrollTrigger: { trigger: '#bc2', start: 'top 85%', once: true }
    });

    // Subtle float loop on FAQ stat card
    gsap.to('.faq-float-stat', {
        y: -8, duration: 2.5, repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: 1.2
    });

    // CTA Parallax Trigger
    gsap.to('.cta-inner::before', {
        backgroundPosition: '100% 50%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#cta-banner',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    /*--------------------------------------------------------------
    -- CUSTOM ACCORDION JS
    --------------------------------------------------------------*/
    $('.accordion-btn-custom').on('click', function () {
        var $btn = $(this);
        var targetId = $btn.data('target');
        var $body = $('#' + targetId);
        var isOpen = $btn.hasClass('open');

        $('.accordion-btn-custom').removeClass('open').find('.accordion-icon i').removeClass('bi-dash').addClass('bi-plus');
        $('.accordion-body-custom').slideUp(300);

        if (!isOpen) {
            $btn.addClass('open').find('.accordion-icon i').removeClass('bi-plus').addClass('bi-dash');
            $body.slideDown(300);
        }
    });
	/* --------------------------------------------------------
	12.START BLOG GALLERY JS 
	--------------------------------------------------------- */
	$('.atf__blog_slider_active').slick({
		arrows: true,
		dots: false,
		autoplay:false,
		infinite: true,
		speed: 300,
		slidesToShow:1,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left" alt=" Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right" alt="Icon"></i></a>',
	});
	/* --------------------------------------------------------
	END BLOG GALLERY JS 
	--------------------------------------------------------- */
	/* --------------------------------------------------------
	13.	START NICE SELECT JS
	--------------------------------------------------------- */
		$('select').niceSelect();	
	
	/* --------------------------------------------------------
	14.	Star Home Slider JS
	--------------------------------------------------------- */
	$('.atf-slick-slider-1').slick({
		arrows: true,
		autoplay:false,
		dots: false,
		infinite: true,
		speed: 500,
		loop: true,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		adaptiveHeight: true,
		slidesToScroll: 1,
		prevArrow: '<a class="slick-prev"><i class="fa-light fa-arrow-left-long" alt="Arrow Icon"></i></a>',
		nextArrow: '<a class="slick-next"><i class="fa-light fa-arrow-right-long" alt="Arrow Icon"></i></a>',
	});
	/* --------------------------------------------------------
	15. START CATEGORIES JS 
		--------------------------------------------------------- */
	$('.atf__categories_slider_active').slick({
		arrows: false,
		dots: false,
		autoplay:true,
		infinite: true,
		speed: 300,
		slidesToShow:4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1399,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					dots: false,
				}
			},
			{
				breakpoint: 580,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	/* --------------------------------------------------------
	END CATEGORIES JS 
	--------------------------------------------------------- */
			

})(jQuery);