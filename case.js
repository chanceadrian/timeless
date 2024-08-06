class Slideshow {
    constructor(sliderId, leftArrowId, rightArrowId, totalSlides) {
        this.slider = document.getElementById(sliderId);
        this.leftArrow = document.getElementById(leftArrowId);
        this.rightArrow = document.getElementById(rightArrowId);
        this.totalSlides = totalSlides;
        this.index = 0;
        this.holders = this.slider.querySelectorAll('holder');

        this.init();
    }

    init() {
        this.setIndex();
        this.leftArrow.addEventListener('click', () => {
            this.prevSlide();
            this.changeSvgFill(this.leftArrow);
        });
        this.rightArrow.addEventListener('click', () => {
            this.nextSlide();
            this.changeSvgFill(this.rightArrow);
        });
    }

    setIndex() {
        const transformPercentage = 100 / this.totalSlides;
        this.slider.style.transform = `translate(${this.index * -transformPercentage}%)`;

        this.holders.forEach((holder, idx) => {
            holder.classList.toggle('current', idx === this.index);
        });

        setTimeout(() => {
            this.updateArrowOpacity();
        }, 100);
    }

    nextSlide() {
        this.index = (this.index < this.totalSlides - 1) ? this.index + 1 : 0;
        this.setIndex();
    }

    prevSlide() {
        this.index = (this.index > 0) ? this.index - 1 : this.totalSlides - 1;
        this.setIndex();
    }

    changeSvgFill(button) {
        const svg = button.querySelector('svg');
        if (svg) {
            svg.style.fill = '#1D1E1F';
            setTimeout(() => {
                svg.style.fill = ''; 
            }, 100); 
        }
    }

    updateArrowOpacity() {
        this.leftArrow.style.opacity = (this.index === 0) ? 0.3 : 1;
        this.rightArrow.style.opacity = (this.index === this.totalSlides - 1) ? 0.3 : 1;
    }
}

// Instantiate the slideshow
document.addEventListener('DOMContentLoaded', () => {
    new Slideshow('Slider', 'leftSlide', 'rightSlide', 8);
    new Slideshow('Slider2', 'leftSlide2', 'rightSlide2', 5);
    new Slideshow('Slider3', 'leftSlide3', 'rightSlide3', 5);
    new Slideshow('Slider4', 'leftSlide4', 'rightSlide4', 3);
    new Slideshow('Slider5', 'leftSlide5', 'rightSlide5', 8);
    new Slideshow('Slider6', 'leftSlide6', 'rightSlide6', 5);
});











class BackgroundSlideshow {
    constructor(containerId, leftArrowId, rightArrowId, textId, totalSlides, imageDetails) {
        this.container = document.getElementById(containerId);
        this.leftArrow = document.getElementById(leftArrowId);
        this.rightArrow = document.getElementById(rightArrowId);
        this.textElement = document.getElementById(textId);
        this.totalSlides = totalSlides;
        this.imageDetails = imageDetails; // Array of objects { url, content }
        this.index = 0;

        this.init();
    }

    init() {
        this.updateBackground();
        this.updateText();

        this.leftArrow.addEventListener('click', () => {
            this.prevSlide();
            this.changeSvgFill(this.leftArrow);
        });
        this.rightArrow.addEventListener('click', () => {
            this.nextSlide();
            this.changeSvgFill(this.rightArrow);
        });
    }

    updateBackground() {
        const { url } = this.imageDetails[this.index];
        if (url) {
            this.container.style.backgroundImage = `url(${url})`;
        } else {
            console.error(`No image URL found for index ${this.index}`);
        }
    }

    updateText() {
        const { content } = this.imageDetails[this.index];
        if (content && this.textElement) {
            this.textElement.innerHTML = content;
        }
    }

    nextSlide() {
        this.index = (this.index < this.totalSlides - 1) ? this.index + 1 : 0;
        this.updateBackground();
        this.updateText();
        setTimeout(() => {
            this.updateArrowOpacity();
        }, 100);
    }

    prevSlide() {
        this.index = (this.index > 0) ? this.index - 1 : this.totalSlides - 1;
        this.updateBackground();
        this.updateText();
        setTimeout(() => {
            this.updateArrowOpacity();
        }, 100);
    }

    changeSvgFill(button) {
        const svg = button.querySelector('svg');
        if (svg) {
            svg.style.fill = '#1D1E1F';
            setTimeout(() => {
                svg.style.fill = '';
            }, 100); 
        }
    }

    updateArrowOpacity() {
        this.leftArrow.style.opacity = (this.index === 0) ? 0.3 : 1;
        this.rightArrow.style.opacity = (this.index === this.totalSlides - 1) ? 0.3 : 1;
    }
}

// Instantiate the background slideshow
document.addEventListener('DOMContentLoaded', () => {
    const cabinetImgs = [
        { url: 'Im/shelf/cabinet-0.webp', content: "<h7><span>Cabinet</span></h7><br>Add as fast as you think, from any and every shelf.<br><br>" },
        { url: 'Im/shelf/cabinet-1.webp', content: "<h7><span>Add from anywhere.</span></h7><br>Tap the cabinet to add, whether on the way to class, a first date, or simply lounging at home." },
        { url: 'Im/shelf/cabinet-2.webp', content: "<h7><span>Two colors. Zero limits.</span></h7><br>Quickly change the look of Shelf with just two colors, which paint every wall and item." },
        { url: 'Im/shelf/cabinet-3.webp', content: "<h7><span>Saved for later.</span></h7><br>Shelf's archive lets you browse and organize your items and bring them back whenever you're ready." },
    ];
    new BackgroundSlideshow('cabinet', 'leftArrow', 'rightArrow', 'cabinetText', cabinetImgs.length, cabinetImgs);
});








class ButtonBasedSlideshow {
    constructor(buttonContainerId, targetId) {
        this.buttonContainer = document.getElementById(buttonContainerId);
        this.target = document.getElementById(targetId);
        this.buttons = this.buttonContainer.querySelectorAll('button');

        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.updateSlide(button));
        });
        this.setDefaultBackground();
    }

    setDefaultBackground() {
        const currentButton = this.buttonContainer.querySelector('button.current');
        if (currentButton) {
            this.updateSlide(currentButton);
        } else if (this.buttons.length > 0) {
            this.updateSlide(this.buttons[0]);
        }
    }

    updateSlide(button) {
        const imageUrl = button.getAttribute('imageUrl');
        if (imageUrl) {
            this.target.style.backgroundImage = `url(${imageUrl})`;
            this.updateCurrentClass(button);
        } else {
            console.error(`No image URL found for button`);
        }
    }

    updateCurrentClass(activeButton) {
        this.buttons.forEach(button => {
            button.classList.remove('current');
        });
        activeButton.classList.add('current');
    }
}

// Instantiate the button-based slideshow
document.addEventListener('DOMContentLoaded', () => {
    new ButtonBasedSlideshow('buttonContainer', 'stand');
    new ButtonBasedSlideshow('colorContainer', 'family');
});

