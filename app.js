const videos = document.querySelectorAll('.video')
const seekbar = document.querySelector('.seekbar')
const handle = document.querySelector('.handle')

videos.forEach((item) => {
	let mousedown = false
	const video = item.querySelector('video')
	const fill = item.querySelector('.fill')
	const seekbar = item.querySelector('.seekbar')
	const handle = item.querySelector('.handle')
	const playPause = item.querySelector('.play-pause')
	// const positionFromTop = item.clientHeight + item.offsetTop
	const handleValue = (min, val, max) => {
		return Math.min(Math.max(min, val), max)
	}

	let getCurrentVal = (e) => {
		let value = (e.clientX - seekbar.offsetLeft) / seekbar.clientWidth
		let currentVal = handleValue(0, value, 1)
		return currentVal
	}

	window.addEventListener('scroll', () => {
		if (scrollY !== item.offsetTop && !video.paused) {
			item.querySelector('.play-icon').textContent = 'Play'
			video.pause()
		}
	})

	item.addEventListener('click', () => {
		scrollTo(0, item.offsetTop)
	})

	playPause.addEventListener('click', () => {
		if (scrollY === item.offsetTop) {
			if (video.paused) {
				item.querySelector('.play-icon').textContent = 'Pause'
				video.play()
			} else {
				item.querySelector('.play-icon').textContent = 'Play'
				video.pause()
			}
		}
	})

	video.addEventListener('timeupdate', function () {
		if (mousedown) return
		fill.style.width = (this.currentTime / this.duration) * 100 + '%'
		if (video.ended) {
			item.querySelector('.play-icon').textContent = 'Play'
			fill.style.width = 0
			return
		}
	})

	seekbar.addEventListener('mousedown', function (e) {
		mousedown = true
		handle.style.transform = 'scale(2.5)'
		fill.style.width = getCurrentVal(e) * 100 + '%'
	})

	window.addEventListener('mouseup', function (e) {
		if (mousedown) {
			mousedown = false
			handle.style.transform = 'scale(2)'
			video.currentTime = (getCurrentVal(e) * 100 * video.duration) / 100
		}
	})

	window.addEventListener('mousemove', function (e) {
		if (mousedown) {
			handle.style.transform = 'scale(2.5)'
			fill.style.width = getCurrentVal(e) * 100 + '%'
		}
	})
})
