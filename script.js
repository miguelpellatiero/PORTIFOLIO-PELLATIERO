const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;

if(window.innerWidth>768){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cur.style.left=mx+'px';cur.style.top=my+'px';
  });

  function animRing(){
    rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('in'),i*80);
      obs.unobserve(e.target);
    }
  });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

setTimeout(()=>{
  document.querySelectorAll('.hero .reveal').forEach((el,i)=>{
    setTimeout(()=>el.classList.add('in'),i*200+200);
  });
},100);

const menuToggle=document.getElementById('menuToggle');
const navMobile=document.getElementById('navMobile');
if(menuToggle)menuToggle.addEventListener('click',()=>navMobile.classList.toggle('active'));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    navMobile.classList.remove('active');
    const t=document.querySelector(a.getAttribute('href'));
    if(t)t.scrollIntoView({behavior:'smooth'});
  });
});

function filterP(cat,btn){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.p-item').forEach(item=>{
    item.style.display=(cat==='todos'||item.dataset.cat===cat)?'':'none';
  });
  currentFilter=cat;
  updateModalItems();
}

let currentFilter='todos';
let currentModalIndex=0;
let visibleItems=[];
let touchStartX=0;
let touchEndX=0;

function getVisibleItems(includeHidden=false){
  return Array.from(document.querySelectorAll('.p-item')).filter(item=>{
    if(item.closest('.portfolio-modal')!==null) return false;
    if(currentFilter!=='todos' && item.dataset.cat!==currentFilter) return false;
    if(includeHidden) return true;
    const display=window.getComputedStyle(item).display;
    return display!=='none';
  });
}

function openPortfolioModal(item){
  visibleItems=getVisibleItems();
  currentModalIndex=visibleItems.indexOf(item);
  updateModalContent();
  document.getElementById('portfolioModal').classList.add('active');
  document.body.style.overflow='hidden';
}

function closePortfolioModal(){
  document.getElementById('portfolioModal').classList.remove('active');
  document.body.style.overflow='';
}

function updateModalContent(){
  if(visibleItems.length===0)return;
  const item=visibleItems[currentModalIndex];
  const overlay=item.querySelector('.p-overlay');
  const thumb=item.querySelector('.p-thumb-inner');
  const info=item.querySelector('.p-info');
  const backgroundUrl=thumb.style.backgroundImage.match(/url\(['"]?([^'"\)]+)['"]?\)/)?.[1]||'';
  
  document.getElementById('modalImage').src=backgroundUrl;
  document.getElementById('modalCat').textContent=overlay.querySelector('.p-cat').textContent;
  document.getElementById('modalTitle').textContent=overlay.querySelector('.p-title').textContent;
  document.getElementById('modalDesc').textContent=overlay.querySelector('.p-desc').textContent;
  document.getElementById('modalLabel').textContent=info.querySelector('.p-info-title').textContent;
  document.getElementById('modalType').textContent=info.querySelector('.p-info-cat').textContent;
  const link=info.querySelector('.p-link');
  document.getElementById('modalLink').textContent=link.textContent;
  document.getElementById('modalLink').href=link.href;
  
  document.getElementById('currentItem').textContent=currentModalIndex+1;
  document.getElementById('totalItems').textContent=visibleItems.length;
}

function nextPortfolioItem(){
  currentModalIndex=(currentModalIndex+1)%visibleItems.length;
  updateModalContent();
}

function prevPortfolioItem(){
  currentModalIndex=(currentModalIndex-1+visibleItems.length)%visibleItems.length;
  updateModalContent();
}

function updateModalItems(){
  visibleItems=getVisibleItems();
  if(currentModalIndex>=visibleItems.length)currentModalIndex=Math.max(0,visibleItems.length-1);
}

function openPortfolioGallery(){
  visibleItems=getVisibleItems(true);
  currentModalIndex=0;
  updateModalContent();
  document.getElementById('portfolioModal').classList.add('active');
  document.body.style.overflow='hidden';
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.p-item').forEach(item=>{
    if(item.closest('.portfolio-modal')===null){
      item.style.cursor='pointer';
      item.addEventListener('click',()=>openPortfolioModal(item));
    }
  });
});

document.getElementById('portfolioModal').addEventListener('click',e=>{
  if(e.target.id==='portfolioModal')closePortfolioModal();
});

document.addEventListener('keydown',e=>{
  if(document.getElementById('portfolioModal').classList.contains('active')){
    if(e.key==='ArrowRight')nextPortfolioItem();
    if(e.key==='ArrowLeft')prevPortfolioItem();
    if(e.key==='Escape')closePortfolioModal();
  }
});

const modalThumb=document.querySelector('.modal-thumb');
if(modalThumb){
  modalThumb.addEventListener('touchstart',e=>{
    touchStartX=e.changedTouches[0].screenX;
  });
  modalThumb.addEventListener('touchend',e=>{
    touchEndX=e.changedTouches[0].screenX;
    const diff=touchEndX-touchStartX;
    if(Math.abs(diff)>50){
      if(diff<0)nextPortfolioItem();
      else prevPortfolioItem();
    }
  });
}

function sendWhatsAppMessage(){
  const name=document.getElementById('contactName').value.trim();
  const email=document.getElementById('contactEmail').value.trim();
  const project=document.getElementById('contactProject').value.trim();
<<<<<<< HEAD
  const whatsappNumber='5512992236923';
=======
  const whatsappNumber='5511999999999';
>>>>>>> 2fa57d8b62e17fa5320e2a82d989ec40face9b76
  const messageParts=[];
  if(name) messageParts.push(`Nome: ${name}`);
  if(email) messageParts.push(`E-mail: ${email}`);
  messageParts.push(`Projeto: ${project||'Olá, quero conversar sobre um projeto.'}`);
  const text=messageParts.join('\n');
  const url=`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;
  window.open(url,'_blank');
}
