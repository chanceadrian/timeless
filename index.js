class Slideshow {
  constructor(sliderId, leftArrowId, rightArrowId, indicatorParentId, totalSlides, slidePercentage) {
    this.slider = document.getElementById(sliderId);
    this.leftArrow = document.getElementById(leftArrowId);
    this.rightArrow = document.getElementById(rightArrowId);
    this.indicatorParents = document.getElementById(indicatorParentId);
    this.totalSlides = totalSlides;
    this.slidePercentage = slidePercentage;
    this.essayIndex = 0;

    // Check if all elements exist
    if (!this.slider) {
      console.error(`Slider element with ID ${sliderId} not found.`);
      return;
    }
    if (!this.leftArrow) {
      console.error(`Left arrow element with ID ${leftArrowId} not found.`);
      return;
    }
    if (!this.rightArrow) {
      console.error(`Right arrow element with ID ${rightArrowId} not found.`);
      return;
    }
    if (!this.indicatorParents) {
      console.error(`Indicator parent element with ID ${indicatorParentId} not found.`);
      return;
    }

    this.init();
  }

  init() {
    this.setIndex();
    this.leftArrow.addEventListener('click', () => this.prevSlide());
    this.rightArrow.addEventListener('click', () => this.nextSlide());
    document.querySelectorAll(`#${this.indicatorParents.id} indicator`).forEach((indicator, ind) => {
      indicator.addEventListener('click', () => {
        this.essayIndex = ind;
        this.setIndex();
      });
    });
  }

  setIndex() {
    const selected = this.indicatorParents.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    }
    this.slider.style.transform = `translate(${this.essayIndex * -this.slidePercentage}%)`;
    this.indicatorParents.children[this.essayIndex].classList.add('selected');
  }

  nextSlide() {
    this.essayIndex = (this.essayIndex < this.totalSlides - 1) ? this.essayIndex + 1 : 0;
    this.setIndex();
  }

  prevSlide() {
    this.essayIndex = (this.essayIndex > 0) ? this.essayIndex - 1 : this.totalSlides - 1;
    this.setIndex();
  }
}

// Instantiate the slideshows
document.addEventListener('DOMContentLoaded', () => {
  new Slideshow('writing', 'leftSlide', 'rightSlide', 'platter', 3, 33.33333);
  new Slideshow('heroes', 'leftSlide2', 'rightSlide2', 'platter2', 4, 25);
  new Slideshow('music', 'leftSlide3', 'rightSlide3', 'platter3', 3, 33.33333);
  new Slideshow('interests', 'leftSlide4', 'rightSlide4', 'platter4', 6, 16.66666);
});
