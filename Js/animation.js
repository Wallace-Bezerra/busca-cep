import gsap from "gsap";
function animation() {
    let tl = gsap.timeline()

    tl.fromTo(".logo",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power4.out", duration: .7 });

    tl.fromTo(".title",
        { x: -80, opacity: 0 },
        { x: 0, duration: .7, ease: "power1.out", opacity: 1 }), '-=0.5';

    tl.fromTo("form",
        { y: -60, opacity: 0 },
        { y: 0, duration: .7, ease: "power1.out", opacity: 1 }, '-=0.5');

    tl.fromTo("#linkedin img",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power", duration: .7 }, '-=0.5');

    tl.fromTo("#github img",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power", duration: .8 }, '-=0.5');
};

export { animation }



