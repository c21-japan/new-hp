<!-- 各ページの</body>直前で読む： -->
<script defer src="/assets/js/layout.js"></script>
// /assets/js/layout.js
async function inject(id, url){
  const mount = document.getElementById(id);
  if(!mount) return;
  const res = await fetch(url, { cache: "no-store" });
  mount.innerHTML = await res.text();
}

function setupHeaderInteractions(){
  const btn = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  if(btn && drawer){
    const toggle = (open) => {
      const willOpen = open ?? !drawer.classList.contains('open');
      drawer.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      drawer.setAttribute('aria-hidden', String(!willOpen));
      document.body.style.overflow = willOpen ? 'hidden' : '';
    };
    btn.addEventListener('click', ()=> toggle());
    window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') toggle(false); });
  }
}

function highlightActive(){
  const path = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  const links = document.querySelectorAll('.nav-links a, #drawer a');
  links.forEach(a=>{
    let href = a.getAttribute('href') || '';
    href = href.replace(/index\.html$/, '').replace(/\/$/, '');
    if(href && (href === path || (href !== '/' && path.startsWith(href)))){
      a.setAttribute('aria-current','page');
      a.classList.add('is-active');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await inject('site-header', '/partials/header.html');
  await inject('site-footer', '/partials/footer.html');
  setupHeaderInteractions();
  highlightActive();
});
