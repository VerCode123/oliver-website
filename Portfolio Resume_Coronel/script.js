document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     NAVBAR SCROLL EFFECT
  ========================== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ==========================
     HAMBURGER MENU
  ========================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ==========================
     SCROLL ANIMATIONS
  ========================== */
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) observer.observe(aboutContent);

  document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });


  /* ==========================
     GALLERY MODAL
  ========================== */
  const carouselItems = document.querySelectorAll('.carousel-item');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.getElementById('closeBtn');

  if (carouselItems && modal && modalImg && closeBtn) {
    carouselItems.forEach(item => {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /* ==========================
     SMOOTH SCROLL ARROW
  ========================== */
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      const about = document.querySelector('#about');
      if (about) about.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const musicToggle = document.getElementById("musicToggle");
  const spotifyPlayer = document.getElementById("spotifyPlayer");
  const icon = musicToggle.querySelector("i");

  let isPlaying = false;

  musicToggle.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      spotifyPlayer.classList.add("show");
      icon.classList.remove("fa-volume-off");
      icon.classList.add("fa-volume-high");
    } else {
      spotifyPlayer.classList.remove("show");
      icon.classList.remove("fa-volume-high");
      icon.classList.add("fa-volume-off");
    }
  });

  /* ==========================
     CONTACT FORM
  ========================== */
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      successMessage.classList.add('show');
      contactForm.reset();
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
    });
  }

  /* ==========================
     HERO IMAGE ANIMATION
  ========================== */
  const heroImage = document.querySelector(".hero-image img");
  if (heroImage) {
    const heroObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroImage.classList.remove("animate");
          void heroImage.offsetWidth;
          heroImage.classList.add("animate");
        } else {
          heroImage.classList.remove("animate");
        }
      });
    }, { threshold: 0.5 });
    heroObserver.observe(heroImage);
  }

  /* ==========================
     HIRE ME BUTTON
  ========================== */
  const hireBtn = document.getElementById("hireBtn");
  if (hireBtn) {
    hireBtn.addEventListener("click", () => {
      window.open("Mark Oliver Coronel Resume (1).pdf", "_blank");
    });
  }

  /* ==========================
     INTRO SCREEN
  ========================== */
  document.body.classList.add("intro-active");
  const intro = document.getElementById("introScreen");
  const enterBtn = document.getElementById("enterSiteBtn");
  if (intro && enterBtn) {
    enterBtn.addEventListener("click", () => {
      document.body.classList.remove("intro-active");
      intro.classList.add("hide");
      const home = document.getElementById("home");
      if (home) home.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ==========================
     3D ANIMATED BACKGROUND (THREE.JS)
  ========================== */
  const canvas = document.getElementById("three-bg");
  if (canvas && typeof THREE !== "undefined") {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const ambient = new THREE.AmbientLight(0xf5e6cc, 1.5);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 10);
    scene.add(light);

    const spheres = [];
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

    for (let i = 0; i < 25; i++) {
      const color = new THREE.Color().setHSL(0.1 + Math.random() * 0.1, 0.4, 0.8);
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: 0xf5e6cc,
        emissiveIntensity: 0.6,
        metalness: 0.2,
        roughness: 0.3
      });

      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15
      );
      sphere.scale.setScalar(Math.random() * 0.8 + 0.3);
      scene.add(sphere);
      spheres.push(sphere);
    }

    camera.position.z = 8;

    function animate() {
      requestAnimationFrame(animate);
      spheres.forEach((s, i) => {
        s.rotation.y += 0.01;
        s.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

}); // END DOMContentLoaded
