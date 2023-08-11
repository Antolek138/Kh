const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	loop: true,

	pagination: {
		el: '.swiper-pagination',
	},

	effect: 'coverflow',
	coverflowEffect: {
		rotate: 30,
		slideShadows: false,
	},
})