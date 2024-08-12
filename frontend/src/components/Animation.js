import gsap from 'gsap';

export const SlideOpen = () => {
  gsap.to("#slide", {
    duration: 0.5,
    x: "-10%",
    ease: "back.inOut(1.7)",
    transformOrigin: "right center",
  });

  gsap.from("ul li", {
    duration: 0.5,
    stagger: 0.1
  });
};

export const SlideClose = () => {
  gsap.to("#slide", {
    duration: 0.5,
    x: "150%",
    ease: "back.inOut(1.7)",
    transformOrigin: "right center",
  });
};
