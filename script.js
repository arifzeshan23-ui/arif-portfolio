const typingText = document.getElementById('typingText');
const scrollTopButton = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const menuToggle = document.getElementById('menuToggle');
const navLinksPanel = document.getElementById('navLinks');
const loader = document.getElementById('loader');

const typingWords = [
  'Digital Marketing Associate',
  'Content Creator',
  'Gen AI Enthusiast',
  'Campaign Storyteller',
];
let currentWordIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeWriter() {
  const currentWord = typingWords[currentWordIndex];
  if (typingForward) {
    typingText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === currentWord.length) {
      typingForward = false;
      setTimeout(typeWriter, 1300);
      return;
    }
  } else {
    typingText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      typingForward = true;
      currentWordIndex = (currentWordIndex + 1) % typingWords.length;
    }
  }
  setTimeout(typeWriter, typingForward ? 100 : 60);
}

typeWriter();

function updateActiveLink() {
  const scrollPosition = window.scrollY + (window.innerHeight / 3);
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}

function handleScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight * 0.85) {
      el.classList.add('visible');
    }
  });
}

function handleScrollButton() {
  if (window.scrollY > 450) {
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
}

window.addEventListener('scroll', () => {
  updateActiveLink();
  handleScrollReveal();
  handleScrollButton();
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

menuToggle.addEventListener('click', () => {
  navLinksPanel.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksPanel.classList.remove('open');
  });
});

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    loader.style.display = 'none';
  }, 700);
  handleScrollReveal();
  updateActiveLink();
});
