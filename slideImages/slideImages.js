
const nextIndex = function(slide, offset) {
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    let activeIndex = Number(slide.dataset.active)
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

const bindEventSlide = function() {
    let selector = '.slide-button'
    bindAll(selector, 'click', function(event) {
        let button = event.target
        let slide = button.parentElement
        let offset = Number(button.dataset.offset)
        let index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

const showImageAtIndex = function(slide, index) {
    let nextIndex = index
    slide.dataset.active = String(nextIndex)
    let className = 'active'
    removeClassAll(className)

    let nextSelector = '#id-image-' + String(nextIndex)
    let img = e(nextSelector)
    img.classList.add(className)

    removeClassAll('white')
    let dotSelector = '#id-dot-' + String(nextIndex)
    let dot = e(dotSelector)
    dot.classList.add('white')
}

const bindEventDot = function() {
    let selector = '.slide-dot'
    bindAll(selector, 'click', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        let slide = self.closest('.slide')
        showImageAtIndex(slide, index)
    })

}

const bindEvents = function() {
    bindEventSlide()
    bindEventDot()
}

const playNextImage = function() {
    let slide = e('.slide')
    let index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    let clockId = null
    clockId = setInterval(function() {
        playNextImage()
    }, interval)

    let selector = '.slide-dot'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        clearInterval(clockId)
    })
    bindAll(selector, 'mouseout', function(event) {
        clockId = setInterval(function() {
            playNextImage()
        }, interval)
    })
}


const __main = function() {
    bindEvents()
    autoPlay()
}

__main()
