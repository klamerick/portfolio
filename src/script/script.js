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

    // Posição inicial em pixels, não vw/vh para facilitar o cálculo na animação
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const speedX = (Math.random() - 0.5) * 0.2;
    const speedY = (Math.random() - 0.5) * 0.2;

    particles.push({
      element: particle,
      x,
      y,
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

      // Inverte a velocidade se bater nas bordas da janela
      if (particle.x > window.innerWidth - particle.size || particle.x < 0) {
        particle.speedX *= -1;
      }
      if (particle.y > window.innerHeight - particle.size || particle.y < 0) {
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

  // Movimento leve do background conforme o mouse
  document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // ajustei para centralizar o movimento
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    bg.style.transform = `translate(${x}px, ${y}px)`;
  });

  // ========== Botão Voltar ao Topo ==========
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
      setTimeout(() => {
        scrollTopBtn.style.display = 'none';
      }, 300);
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
