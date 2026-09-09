/*
|-----------------------------------------------------
| Website Name: PAPRI — People Advancement Power Rural Institute 
| Developer: Ayatullah Al-Saba
|-----------------------------------------------------
*/
/***************************************************
==================== JS ======================
****************************************************
00. Configuration Check
01. GSAP Plugin Registration
02.	LENIS SMOOTH SCROLLING
03. GSAP Custom Cursor Implementation
04. GSAP Text Split Animation
05. GSAP SplitText Animation for Slick Slider
06. GSAP Image Spread / Reveal Animation


****************************************************/

(function ($) {
    "use strict";

	$(window).on("load", function () {
		initCustomCursor();
        initSplitTextAnimations();
        initSlickSplitText();
		setTimeout(() => {
		  initImageSpreadAnimations();
		}, 500);
		
		console.log("All PAPRI animations initialized successfully.");
	});

    // 00. Configuration Check
    if (typeof gsap === 'undefined' || typeof jQuery === 'undefined' || typeof Lenis === 'undefined') {
        console.error("Required libraries (GSAP, jQuery, or Lenis) are not loaded. Skipping all animations.");
        return; 
    }
	
    // 01. GSAP Plugin Registration
    if (typeof SplitText !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, SplitText); 
    } else {
        console.warn("GSAP plugins (SplitText or ScrollTrigger) are not loaded. Some animations may be skipped.");
    }
    
    // ----------------------------------------------------------------------------------
    // 02. LENIS SMOOTH SCROLLING
    // ----------------------------------------------------------------------------------
	const lenis = new Lenis({
		smooth: true
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
    // ----------------------------------------------------------------------------------
    // 03. GSAP Custom Cursor Implementation
    // ----------------------------------------------------------------------------------
    function initCustomCursor() {
        const cIn = document.querySelector('.cursor-in');
        const cOut = document.querySelector('.cursor-out');

        if (cIn && cOut) {
            document.addEventListener('mousemove', e => {
                gsap.to([cIn, cOut], {
                    x: e.clientX,
                    y: e.clientY,
                    stagger: { each: 0.03 },
                    duration: 0.25,
                    ease: "power2.out"
                });
            });

            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cOut, { scale: 1.5, opacity: 0, duration: 0.4, ease: "power2.out" });
                    gsap.to(cIn, { scale: 0.6, duration: 0.2, ease: "power1.out" });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(cOut, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.inOut" });
                    gsap.to(cIn, { scale: 1, duration: 0.3, ease: "power1.inOut" });
                });
            });
        } else {
            console.info("Cursor elements not found. Skipping GSAP cursor animation.");
        }
    }

    // ----------------------------------------------------------------------------------
    // 04. GSAP SplitText Animations Handles various text reveal effects (Fade, Up, Rotate, Scale).
    // ----------------------------------------------------------------------------------

	function initSplitTextAnimations() {
		setTimeout(function () {

			/* Text Effect Animation */
			function initHeadingAnimation() {
				
				if($('.text-effect').length) {
					var textheading = $(".text-effect");

					if(textheading.length === 0) return; gsap.registerPlugin(SplitText); textheading.each(function(index, el) {
						
						el.split = new SplitText(el, { 
							type: "lines,words,chars",
							linesClass: "split-line"
						});
						
						if( $(el).hasClass('text-effect') ){
							gsap.set(el.split.chars, {
								opacity: .3,
								x: "-7",
							});
						}
						el.anim = gsap.to(el.split.chars, {
							scrollTrigger: {
								trigger: el,
								start: "top 92%",
								end: "top 60%",
								markers: false,
								scrub: 1,
							},

							x: "0",
							y: "0",
							opacity: 1,
							duration: .7,
							stagger: 0.2,
						});
						
					});
				}
				
				if ($('.anime-style-1').length) {
					let staggerAmount 	= 0.05,
						translateXValue = 0,
						delayValue 		= 0.5,
					   animatedTextElements = document.querySelectorAll('.anime-style-1');
					
					animatedTextElements.forEach((element) => {
						let animationSplitText = new SplitText(element, { type: "chars, words" });
							gsap.from(animationSplitText.words, {
							duration: 1,
							delay: delayValue,
							x: 20,
							autoAlpha: 0,
							stagger: staggerAmount,
							scrollTrigger: { trigger: element, start: "top 85%" },
							});
					});		
				}
				
				if ($('.anime-style-2').length) {				
					let	 staggerAmount 		= 0.03,
						 translateXValue	= 20,
						 delayValue 		= 0.1,
						 easeType 			= "power2.out",
						 animatedTextElements = document.querySelectorAll('.anime-style-2');
					
					animatedTextElements.forEach((element) => {
						let animationSplitText = new SplitText(element, { type: "chars, words" });
							gsap.from(animationSplitText.chars, {
								duration: 1,
								delay: delayValue,
								x: translateXValue,
								autoAlpha: 0,
								stagger: staggerAmount,
								ease: easeType,
								scrollTrigger: { trigger: element, start: "top 85%"},
							});
					});		
				}
				
				if ($('.anime-style-3').length) {		
					let	animatedTextElements = document.querySelectorAll('.anime-style-3');
					
					 animatedTextElements.forEach((element) => {
						//Reset if needed
						if (element.animation) {
							element.animation.progress(1).kill();
							element.split.revert();
						}

						element.split = new SplitText(element, {
							type: "lines,words,chars",
							linesClass: "split-line",
						});
						gsap.set(element, { perspective: 400 });

						gsap.set(element.split.chars, {
							opacity: 0,
							x: "50",
						});

						element.animation = gsap.to(element.split.chars, {
							scrollTrigger: { trigger: element,	start: "top 90%" },
							x: "0",
							y: "0",
							rotateX: "0",
							opacity: 1,
							duration: 1,
							ease: Back.easeOut,
							stagger: 0.02,
						});
					});		
				}
			}
			
			if (document.fonts && document.fonts.ready) {
				document.fonts.ready.then(() => {
					initHeadingAnimation();
				});
			} else {
				window.addEventListener("load", initHeadingAnimation);
			}
		}, 200); // Slight delay to ensure fonts/layout are loaded
	}

	// ----------------------------------------------------------------------------------
	// 05. GSAP SplitText Animation for Slick Slider
	// ----------------------------------------------------------------------------------
	function initSlickSplitText() {
		const $slider = $('.atf-slick-slider-1');

		function animateSlickTitle(currentSlide) {

			let titleElement = currentSlide.find('.atf-slider-content h1.slider-title')[0];
			if (!titleElement) return;

			// Reset previous animation (important)
			if (titleElement.animation) {
				titleElement.animation.kill();
			}

			if (titleElement.split) {
				titleElement.split.revert();
			}

			// Ensure visible
			gsap.set(titleElement, { visibility: 'visible', opacity: 1 });

			// Create SplitText
			let split = new SplitText(titleElement, {
				type: "chars, words",
			});

			titleElement.split = split;

			// 👉 anime-style-3 style animation
			gsap.set(split.chars, {
				opacity: 0,
				x: 50,
				rotationX: -90,
				transformOrigin: "50% 50% -50"
			});

			// Animation
			titleElement.animation = gsap.to(split.chars, {
				opacity: 1,
				x: 0,
				rotationX: 0,
				duration: 1,
				stagger: 0.03,
				ease: "back.out(1.7)"
			});
		}

		// Slider init
		$slider.on('init', function (event, slick) {
			let firstSlide = $(slick.$slides[0]);
			animateSlickTitle(firstSlide);
		});

		// Slide change
		$slider.on('afterChange', function (event, slick, currentSlideIndex) {
			let currentSlide = $(slick.$slides[currentSlideIndex]);
			animateSlickTitle(currentSlide);
		});
	}
	// ----------------------------------------------------------------------------------
    // 06.GSAP Image Spread / Reveal Animation Handles clip-path reveals and container spreading effects.
    // ----------------------------------------------------------------------------------
	function initImageSpreadAnimations() {
		// 1. Left Reveal Animation (Clip-Path)
		gsap.utils.toArray(".atf-thumb-anim-left").forEach((img) => {
			gsap.to(img, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				duration: 1.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: img,
					start: "top 85%",
					toggleActions: "play none none reverse",
				},
			});
		});

		// 2. Right Reveal Animation (Right Corner Clip-Path)
		gsap.utils.toArray(".atf-thumb-anim-right").forEach((img) => {
			gsap.fromTo(img, 
				{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }, 
				{
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					duration: 1.2,
					ease: "power2.out",
					scrollTrigger: {
						trigger: img,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				}
			);
		});

		// 3. GSAP Image Spread / Zoom Animations
		document.querySelectorAll(".spread").forEach((container) => {

			let img = container.querySelector("img");
			if (!img) return;

			// Hero section zoom fix
			if (container.closest(".hero-content") && container.classList.contains("zoom-out")) {

				gsap.set(img, { scale: 1 });

				gsap.from(img, {
					scale: 1.4,
					duration: 1.2,
					ease: "power2.out"
				});

				return;
			}

			// Normal Scroll Animation
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top 80%",
				}
			});

			tl.set(container, { autoAlpha: 1 });

			//  ZOOM OUT
			if (container.classList.contains("zoom-out")) {
				tl.from(img, { scale: 1.4, duration: 1.5, ease: "power2.out" });
			}

			//  START / END 
			else if (container.classList.contains("start") || container.classList.contains("end")) {

				let x = container.classList.contains("start") ? -100 : 100;

				tl.from(container, { xPercent: x, duration: 1.5, ease: "power2.out" });

				tl.from(img, {
					xPercent: -x,
					duration: 1.5,
					ease: "power2.out"
				}, "-=1.5");
			}

		});
		
	}

})(jQuery);