/* main.js — unified behavior for all pages */
window.addEventListener("load", () => {
  const p = document.getElementById("preloader");
  setTimeout(() => { p.classList.add("fade-out"); }, 600);
  setTimeout(() => { p.remove(); }, 1600);
});

/* DOM ready */
document.addEventListener('DOMContentLoaded', ()=>{

  /* mobile menu */
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=> {
      nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    });
  }

  /* hero slideshow only if multiple slides present (not required on all) */
  (function(){
    const slides = document.querySelectorAll('.hero-slide');
    if(!slides.length) return;
    let idx = 0;
    slides[idx].classList.add('active');
    setInterval(()=>{
      slides[idx].classList.remove('active');
      idx = (idx+1) % slides.length;
      slides[idx].classList.add('active');
    },4200);
  })();

  /* lightbox for gallery images (.gallery-img) */
  document.querySelectorAll('.gallery-img').forEach(img=>{
    img.addEventListener('click', (e)=>{
      openLightbox(e.currentTarget.src);
    });
  });

  /* reusable lightbox element */
  function openLightbox(src){
    let lb = document.querySelector('.lightbox');
    if(!lb){
      lb = document.createElement('div'); lb.className='lightbox';
      lb.innerHTML = '<img src="" alt="zoom"><button class="lb-close" style="position:absolute;right:22px;top:18px;background:transparent;border:none;color:#fff;font-size:28px">×</button>';
      document.body.appendChild(lb);
      lb.querySelector('.lb-close').addEventListener('click', ()=> lb.style.display='none');
      lb.addEventListener('click', (ev)=> { if(ev.target === lb) lb.style.display='none'; });
    }
    lb.querySelector('img').src = src;
    lb.style.display = 'flex';
  }

  /* booking form: mailto + whatsapp fallback (if #bookingForm exists) */
  const bookingForm = document.getElementById('bookingForm');
  if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      const fd = new FormData(this);
      const name = fd.get('name') || '[no name]';
      const phone = fd.get('phone') || '';
      const service = fd.get('service') || '';
      const date = fd.get('date') || '';
      const time = fd.get('time') || '';
      const notes = fd.get('notes') || '';
      const body = `Name: ${name}%0AService: ${service}%0APhone: ${phone}%0ADate: ${date} ${time}%0ANotes: ${notes}`;
      // open mail client
      window.location.href = `mailto:ramokgoro.maubane@gmail.com?subject=Booking:${encodeURIComponent(service)}&body=${encodeURIComponent(body)}`;
      // WA fallback
      setTimeout(()=> window.open(`https://wa.me/27739528645?text=${encodeURIComponent(body)}`,'_blank'),600);
      alert('Booking sent — opening email client. WhatsApp will open as fallback.');
    });
  }

});
// SCROLL REVEAL
const revealEls = document.querySelectorAll(".reveal");

const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("reveal-visible");
    }
  });
},{threshold:0.15});

revealEls.forEach(el=>revealObs.observe(el));
// CHAT POPUP
const chatBtn = document.querySelector('.chat-btn');
const chatPopup = document.getElementById('chat-popup');
chatBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  chatPopup.style.display = (chatPopup.style.display === 'block' ? 'none' : 'block');
});
document.querySelectorAll('.chat-opt').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const msg = btn.dataset.msg;
    window.open(`https://wa.me/27739528645?text=${encodeURIComponent(msg)}`,"_blank");
  });
});
