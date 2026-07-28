const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', event => {
    mx = event.clientX; my = event.clientY;
    cur.style.left = `${mx}px`; cur.style.top = `${my}px`;
  });
  const animateRing = () => {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
    requestAnimationFrame(animateRing);
  };
  animateRing();
}

const observer = new IntersectionObserver(entries => entries.forEach((entry, index) => {
  if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('in'), index * 70); observer.unobserve(entry.target); }
}), { threshold: .08 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
setTimeout(() => document.querySelectorAll('.hero .reveal').forEach((element, index) => setTimeout(() => element.classList.add('in'), index * 180 + 160)), 100);

const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
menuToggle?.addEventListener('click', () => navMobile.classList.toggle('active'));
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector(link.getAttribute('href'));
  if (target) { event.preventDefault(); navMobile.classList.remove('active'); target.scrollIntoView({ behavior: 'smooth' }); }
}));

function sendWhatsAppMessage(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactProject').value.trim();
  const text = `Olá, meu nome é ${name}.\nE-mail: ${email}\nNecessidade: ${message || 'Gostaria de solicitar um contato.'}`;
  window.open(`https://api.whatsapp.com/send?phone=5512992236923&text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}
