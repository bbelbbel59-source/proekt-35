const images = [
    "https://img.pikbest.com/wp/202345/golden-key-is-shown-in-the-background_9586336.jpg!bw800",
    "https://img.pikbest.com/ai/illus_our/20230427/2f5b319a3908dc9aa43011778a4ba7f8.jpg!bw800",
    "https://img.pikbest.com/wp/202346/surface-key-is-shown-on-a-black_9717460.jpg!bw800",
    "https://img.pikbest.com/wp/202346/golden-carved-silver-key-on-a-black-surface_9717434.jpg!f305cw"
];

const texts = [
    { title: "Oltin Kalit", desc: "Har bir eshikning siri bitta kalitda yashiringan." },
    { title: "Aqlli Kalit", desc: "Bir tugma bilan mashinangiz sizga bo'ysunadi." },
    { title: "Qadimiy Kalit", desc: "Asrlar davomida qal'alar sirini saqlab kelgan." },
    { title: "Raqamli Kalit", desc: "Kelajakda eshiklar sizni o'zi taniydi." }
];

const quotes = [
    "Bilim — har qanday eshikni ochuvchi kalit.",
    "Sabr — muvaffaqiyat kaliti.",
    "Mehnat — baxt eshigining kalitidir.",
    "Yaxshi so'z — yuraklar kaliti."
];

const loader = document.getElementById("loader");
const progress = document.getElementById("progress");
const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const heroImg = document.getElementById("heroImg");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const changeImgBtn = document.getElementById("changeImgBtn");
const changeTextBtn = document.getElementById("changeTextBtn");
const changeTextLabel = document.getElementById("changeTextLabel");
const dots = document.querySelectorAll(".dot");
const particles = document.getElementById("particles");
const quote = document.getElementById("quote");
const quoteBtn = document.getElementById("quoteBtn");
const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const faqItems = document.querySelectorAll(".faq-item");
const form = document.getElementById("form");
const sendLabel = document.getElementById("sendLabel");
const subscribe = document.getElementById("subscribe");
const toTop = document.getElementById("toTop");

let imgIndex = 0;
let textIndex = 0;
let quoteIndex = 0;

window.addEventListener("load", function () {
    setTimeout(function () {
        loader.classList.add("hide");
    }, 700);
});

for (let i = 0; i < 25; i++) {
    const p = document.createElement("span");
    const size = Math.random() * 5 + 2;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = Math.random() * 8 + 6 + "s";
    p.style.animationDelay = Math.random() * 6 + "s";
    particles.appendChild(p);
}

function animateText(element) {
    element.classList.remove("fade-up", "delay", "fade-text");
    void element.offsetWidth;
    element.classList.add("fade-text");
}

function showImage(index) {
    imgIndex = index;
    heroImg.classList.add("hide");
    setTimeout(function () {
        heroImg.src = images[imgIndex];
        heroImg.classList.remove("hide");
    }, 500);
    dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === imgIndex);
    });
}

changeImgBtn.addEventListener("click", function () {
    showImage((imgIndex + 1) % images.length);
});

dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
        showImage(i);
    });
});

changeTextBtn.addEventListener("click", function () {
    textIndex = (textIndex + 1) % texts.length;
    heroTitle.textContent = texts[textIndex].title;
    heroDesc.textContent = texts[textIndex].desc;
    heroTitle.style.animation = "none";
    void heroTitle.offsetWidth;
    heroTitle.style.animation = "fadeText 0.5s, shine 4s linear infinite";
    animateText(heroDesc);
    changeTextLabel.textContent = textIndex % 2 === 0 ? "Matnni almashtirish" : "Yana almashtirish";
});

quoteBtn.addEventListener("click", function () {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quote.textContent = quotes[quoteIndex];
    animateText(quote);
});

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("open");
    });
});

filters.forEach(function (button) {
    button.addEventListener("click", function () {
        filters.forEach(function (b) {
            b.classList.remove("active");
        });
        button.classList.add("active");
        const type = button.dataset.filter;
        galleryItems.forEach(function (item) {
            item.classList.toggle("hidden", type !== "all" && item.dataset.type !== type);
        });
    });
});

galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
        lightboxImg.src = item.querySelector("img").src;
        lightbox.classList.add("open");
    });
});

lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("open");
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.classList.remove("open");
    }
});

faqItems.forEach(function (item) {
    item.querySelector(".faq-question").addEventListener("click", function () {
        faqItems.forEach(function (other) {
            if (other !== item) {
                other.classList.remove("open");
            }
        });
        item.classList.toggle("open");
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendLabel.textContent = "Yuborildi ✓";
    form.reset();
    setTimeout(function () {
        sendLabel.textContent = "Yuborish";
    }, 2500);
});

subscribe.addEventListener("submit", function (event) {
    event.preventDefault();
    subscribe.querySelector("input").value = "";
    subscribe.querySelector("input").placeholder = "Rahmat! ✓";
});

window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollTop / height) * 100 + "%";
    header.classList.toggle("scrolled", scrollTop > 60);
    toTop.classList.toggle("show", scrollTop > 500);
});

toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function runCounter(counter) {
    const target = Number(counter.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 80);
    const timer = setInterval(function () {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = current + "+";
    }, 20);
}

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            const counter = entry.target.querySelector(".counter");
            if (counter && !counter.dataset.done) {
                counter.dataset.done = "true";
                runCounter(counter);
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(function (element) {
    observer.observe(element);
});