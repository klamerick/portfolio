document.addEventListener('DOMContentLoaded', function() {
  // ========== Background Animado ==========
  const bg = document.createElement('div');
  bg.className = 'animated-bg';
  document.body.insertBefore(bg, document.body.firstChild);
  
  const particleCount = 30;
  const particles = [];
  const colors = [
    'rgba(106, 13, 173, 0.7)',
    'rgba(154, 59, 182, 0.7)',
    'rgba(138, 43, 226, 0.7)',
    'rgba(155, 89, 182, 0.7)'
  ];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.filter = 'blur(1px)';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    
    const speedX = (Math.random() - 0.5) * 0.2;
    const speedY = (Math.random() - 0.5) * 0.2;
    
    particles.push({
      element: particle,
      x: parseFloat(particle.style.left),
      y: parseFloat(particle.style.top),
      speedX,
      speedY,
      size
    });
    
    bg.appendChild(particle);
  }
  
  function animateParticles() {
    for (const particle of particles) {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      if (particle.x > window.innerWidth || particle.x < 0) {
        particle.speedX *= -1;
      }
      if (particle.y > window.innerHeight || particle.y < 0) {
        particle.speedY *= -1;
      }
      
      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;
      
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.2;
      particle.element.style.transform = `scale(${scale})`;
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    bg.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });

  // ========== Botão Voltar ao Topo ==========
  const scrollTopBtn = document.createElement('div');
  scrollTopBtn.id = 'scrollTopBtn';
  scrollTopBtn.innerHTML = '↑';
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  });

  // ========== Animação de Seções ==========
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // ========== Scroll Suave para Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});