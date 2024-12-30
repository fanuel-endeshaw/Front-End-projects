const slide = document.querySelectorAll(".slide");
const left = document.querySelector(".slider__btn--left");
const right = document.querySelector(".slider__btn--right");
const lastSlide = 4;
slide.forEach((el, i) => (el.style.transform = `translateX(${100 * i}%)`));
let cur = 0;
right.addEventListener("click", function () {
  if (cur === lastSlide) {
    cur = 0;
  } else {
    cur++;
  }
  slide.forEach(
    (el, i) => (el.style.transform = `translateX(${100 * (i - cur)}%)`)
  );
});
left.addEventListener("click", function () {
  if (cur === 0) {
    cur = 4;
  } else {
    cur--;
  }
  slide.forEach(
    (el, i) => (el.style.transform = `translateX(${100 * (i - cur)}%)`)
  );
});
