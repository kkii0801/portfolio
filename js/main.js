window.addEventListener("load", () => {

	// lenis
	const lenis = new Lenis({

	duration: 1.5,
	easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	});

	function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	// #start

	let start=document.querySelector("#start");
	let header=document.querySelector("#start header");
	let navList=document.querySelectorAll("#start nav ul li");
	let section=document.querySelectorAll("section");
	let footer=document.querySelector("footer")

	let pageList=[start, ...section, footer]

	let tabBtn=document.querySelector("#start .tab");
	let Nav=document.querySelector("#start nav");
	let Body=document.querySelector("body");

	let isMobile;
	let subSwiper=null;

	function initSub(){
		subSwiper=new Swiper(".subSwiper", {
			slidesPerView: 3.5,
			spaceBetween: 20,
			slidesOffsetBefore: 10,
			slidesOffsetAfter: 140,
			breakpoints : {
				700: {
					spaceBetween: 10,
				}
			}
		});
	}

	function resizeRemove(){
		tabBtn.classList.remove("active");
		Nav.classList.remove("active");
		Body.classList.remove("fixed");
	}

	function Resize(){
		if(window.innerWidth > 900){
			if(isMobile != false){
				isMobile=false;
				if(subSwiper){
					subSwiper.destroy();
					subSwiper=null;
				}			
			}			
		}
		else{
			if (isMobile != true) {
				isMobile=true;
				if(!subSwiper){
					initSub();
				}
			}
		}
		resizeRemove();
		if(tabBtn.classList.contains("acitve")){
			tabBtn.classList.remove("active");
		}
		lenis.start()
	}

	Resize();

	window.addEventListener("resize", Resize);

	function hoverActive(item){
		item.addEventListener("mouseenter", () => {
			item.classList.add("active");
		})
		item.addEventListener("mouseleave", () => {
			item.classList.remove("active");
		})
	}

	// header

	let t=0;
	let prev=0;
	let next=0;
	let direction="";

	window.addEventListener("scroll", () => {

		t=window.scrollY;

		if(t > window.innerHeight){
			next=t;

			if(next > prev) {
				if(direction != "down"){
					direction="down"
					header.style.top=-100+"%"
					
				}
			}
			else{
				if(direction != "up"){
					direction="up"
					header.style.top=0
				}
			}
			prev=t;
		}
	});

	
	function controllMenu(i){
		navList.forEach((item, j) => {
			if(j==i){
				item.classList.add("active");
			}
			else{
				item.classList.remove("active");
			}
		});
	};

	pageList.forEach((item, i) => {
		const pageTl = gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top center",
				end: "bottom center",
				onEnter: function() {
					controllMenu(i);
				},
				onEnterBack: function() {
					controllMenu(i);
				}
			}
		});
	});
	
	navList.forEach((item, i) => {
		item.addEventListener("click", function(e){
			e.preventDefault();

			let target=pageList[i].offsetTop
			gsap.to(window, {scrollTo : target, duration: 0.4});

			if(isMobile){
				resizeRemove();
				lenis.start();
			}

		});
	});
	
	// tab

	tabBtn.addEventListener("click", e => {
		e.preventDefault();

		tabBtn.classList.toggle("active");
		Nav.classList.toggle("active");
		Body.classList.toggle("fixed");
		if(tabBtn.classList.contains("active")){
			lenis.stop();
		}
		else{
			lenis.start();
		}
	});

	// top 버튼
	// document.querySelector("footer .top").addEventListener("click", e => {
	// 	e.preventDefault();

	// 	let target=document.querySelector("#start").offsetTop
	// 	gsap.to(window, {scrollTo : target, duration: 0.4});
	// });

	// start GSAP

	let clover=document.querySelector("#start .deco");
	let startText=document.querySelector("#start .text .inner")

	const startTl=gsap.timeline({
	srollTrigger: {
		trigger: "#start",
		start: "top center",
		end: "bottom center"
	}
	})

	startTl.fromTo(startText.children[0], {y: 70, opacity: 0}, {y: 0, opacity: 1, duration: 0.5}, "a")
	startTl.fromTo(startText.children[1], {y: 70, opacity: 0}, {y: 0, opacity: 1, duration: 0.5}, "b")
	startTl.fromTo(startText.children[2], {y: 70, opacity: 0}, {y: 0, opacity: 1, duration: 0.5}, "c")
	startTl.fromTo(clover.children[0], {y: 70, opacity: 0}, {y: 0, opacity: 1, duration: 0.7}, "d")
	startTl.fromTo(clover.children[1], {y: 70, opacity: 0}, {y: 0, opacity: 1, duration: 1}, "d")
	
	gsap.utils.toArray(".deco img").forEach(particle => {
		gsap.to(particle, {
			rotation: 360,
			ease: "linear",
			duration: 2.5,
			scrollTrigger: {
			trigger: "#start",
			start: "top top",
			end: "bottom top",
			scrub: 1.5
			}
		});
	});

	// #page1 == About me

	let aboutText=document.querySelector("#page1 .text p")

	const aboutTl=gsap.timeline({
	scrollTrigger: {
		trigger: "#page1",
		start: "top center",
		end: "bottom center"
	}
	})

	aboutTl.fromTo(aboutText, {y: 40, opacity: 0}, {y: 0, opacity: 1, delay: 0.5 ,duration: 0.7})

	// #page2 == Skills
	
	let skillText=document.querySelectorAll("#page2 .text ul li");

	skillText.forEach(item => {
		const skillTl=gsap.timeline({
		scrollTrigger: {
			trigger: item,
			start: "top center",
			end: "bottom center",
		}
	})
		skillTl.fromTo(item, {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 0.6})
	})
	
	// #page3 == projects

	let img_bg=document.querySelectorAll("#page3 ul li");

	function backgroundAnimation(i){
		img_bg.forEach((item, j) => {
			if(j==i){
				item.classList.add("active");
			}
			else{
				item.classList.remove("active");
			}
		});
	}

	const mainSwiper=new Swiper(".mainSwiper", {
		speed: 800,
		loop: true,
		// autoplay: {
		// 	delay: 4000,
		// },
		breakpoints: {
			700: {
				slidesPerView: 1,
				spaceBetween: 30
			},
			900: {
				slidesPerView: 2.5,
				spaceBetween: 30
			}
		},
		on: {
			init: function(){
				backgroundAnimation(i);
			},
			slideChange: function(){
				i=this.realIndex;
				backgroundAnimation(i);
			}
		}
	});

	// let mainSlide=document.querySelectorAll("#page3 .swiper-slide" )
	let siteBtn=document.querySelector("#page3 .site")
	let reviewBtn=document.querySelectorAll("#page3 .review")

	reviewBtn.forEach((item, i) => {
		item.addEventListener("mouseenter", () => {
			item.classList.add("active");
		});
		item.addEventListener("mouseleave", () => {
			item.classList.remove("active");
		});
	});

	siteBtn.addEventListener("mouseenter", () => {
		siteBtn.classList.add("active");
	});
	siteBtn.addEventListener("mouseleave", () => {
		siteBtn.classList.remove("active");
	});



	// #page4 == Open Source

	let con4List=document.querySelectorAll("#page4 .content ul li");
	let page4Tl = null;

	function resetPositions() {
		con4List.forEach(item => {
			gsap.set(item, { yPercent: 0 });
		});
	}
	
	function page4Tlinit(){

		if(!isMobile){
			if (page4Tl) {
            page4Tl.kill();
			}

			resetPositions();

			page4Tl=gsap.timeline({
				scrollTrigger: {
					trigger: "#page4",
					start: "top center",
					end: "bottom-=50% top",
					scrub: true,
				}
			})

				page4Tl.from(con4List[0], { yPercent: 100 })
				page4Tl.from(con4List[1], { yPercent: 130 }, '-=100%')
				page4Tl.from(con4List[2], { yPercent: 160 }, '-=100%')
				page4Tl.from(con4List[3], { yPercent: 190 }, '-=100%')
				page4Tl.from(con4List[4], { yPercent: 220 }, '-=100%')
				page4Tl.from(con4List[5], { yPercent: 250 }, '-=100%')
		}
		else{
			if (page4Tl) {
            page4Tl.kill();
            page4Tl = null;
			}
			resetPositions();
		}	
	}
	
	page4Tlinit();
	
	window.addEventListener("resize", page4Tlinit);
});