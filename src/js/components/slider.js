import Swiper, { Autoplay } from "swiper";
Swiper.use([Autoplay]);
const swiper = new Swiper(".hero__lm__slider", {
  slidesPerView: 1,
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 400,
    disableOnInteraction: false,
  },
});
