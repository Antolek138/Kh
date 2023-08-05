const nav = document.querySelector('.nav')
const logo = document.querySelector('.nav__logo')
const bars = document.querySelector('.nav__bars')
const menu = document.querySelector('.nav__menu')
const navItems = document.querySelectorAll('.nav__items')
const footerYear = document.querySelector('.footer__year')

window.addEventListener('scroll', () => {
	if (window.scrollY >= 50) {
		nav.style.backgroundColor = 'rgb(0, 0, 0, 0.8)'
	} else {
		nav.style.backgroundColor = 'transparent'
	}
})

const handleNav = () => {
	menu.classList.toggle('nav__menu--active')
	bars.classList.toggle('nav__bars--active')

	navItems.forEach(item =>
		item.addEventListener('click', () => {
			menu.classList.remove('nav__menu--active')
			bars.classList.remove('nav__bars--active')
		})
	)
}

const valueDisplay = document.querySelectorAll('.kingHouse__num')
const interval = 4000

function isElementInViewport(el) {
	const rect = el.getBoundingClientRect()
	return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
}

function animateCounter(valueDisplay) {
	let startValue = 0
	const endValue = parseInt(valueDisplay.getAttribute('data-val'))
	const duration = Math.floor(interval / endValue)
	let animationFrame

	function updateValue() {
		startValue += 1
		valueDisplay.textContent = startValue

		if (startValue < endValue) {
			animationFrame = requestAnimationFrame(updateValue)
		}
	}

	animationFrame = requestAnimationFrame(updateValue)
}

// Sprawdź, czy element jest w widoku na początku
valueDisplay.forEach(valueDisplay => {
	if (isElementInViewport(valueDisplay)) {
		animateCounter(valueDisplay)
	}
})

// Po przewinięciu, sprawdź, czy element stał się widoczny i uruchom animację
window.addEventListener('scroll', () => {
	valueDisplay.forEach(valueDisplay => {
		if (!valueDisplay.animationStarted && isElementInViewport(valueDisplay)) {
			valueDisplay.animationStarted = true // Zapobiegaj ponownemu uruchomieniu
			animateCounter(valueDisplay)
		}
	})
})

function logoClose() {
	menu.classList.remove('nav__menu--active')
	bars.classList.remove('nav__bars--active')
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

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

handleCurrentYear()
bars.addEventListener('click', handleNav)
logo.addEventListener('click', logoClose)
