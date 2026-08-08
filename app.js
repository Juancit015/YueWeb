(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  const avatarStage = document.querySelector("[data-avatar-stage]");
  const avatarFrame = document.querySelector("[data-avatar-frame]");
  const delayMessage = document.querySelector("[data-avatar-delay]");
  const cta = document.querySelector(".primary-cta");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = !navLinks.classList.contains("is-open");
      navLinks.classList.toggle("is-open", open);
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navLinks.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
      }
    });
  }

  function avatarCall(code) {
    if (!avatarFrame || !avatarFrame.contentWindow) return;
    try {
      avatarFrame.contentWindow.eval(code);
    } catch (_error) {
      // El iframe puede seguir cargando o estar en fallback.
    }
  }

  function setEmotion(name, intensity, duration) {
    avatarCall(`if(window.setEmotion)setEmotion(${JSON.stringify(name)}, ${intensity}, ${duration})`);
  }

  function lookAt(x, y) {
    avatarCall(`if(window.lookAt)lookAt(${x.toFixed(3)}, ${y.toFixed(3)})`);
  }

  function playGesture(name, gain) {
    avatarCall(`if(window.playGestureExt)playGestureExt(${JSON.stringify(name)}, ${gain})`);
  }

  if (avatarStage && avatarFrame) {
    const fallbackTimer = window.setTimeout(() => {
      avatarStage.classList.add("is-fallback");
    }, 14000);

    window.setTimeout(() => {
      if (!avatarStage.classList.contains("is-ready") && !avatarStage.classList.contains("is-fallback") && delayMessage) {
        delayMessage.hidden = false;
      }
    }, 8500);

    avatarFrame.addEventListener("load", () => {
      window.setTimeout(() => {
        let title = "";
        try {
          title = avatarFrame.contentDocument ? avatarFrame.contentDocument.title : "";
        } catch (_error) {
          title = "";
        }

        if (title === "VRM_ERROR") {
          avatarStage.classList.add("is-fallback");
          return;
        }

        window.clearTimeout(fallbackTimer);
        avatarStage.classList.add("is-ready");
        if (delayMessage) delayMessage.hidden = true;
        setEmotion("happy", 0.86, 5200);
        window.setTimeout(() => playGesture("asentir", 0.55), 600);
      }, 1800);
    });
  }

  if (!reduceMotion) {
    window.addEventListener("pointermove", (event) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const x = Math.max(-0.8, Math.min(0.8, (event.clientX - cx) / cx * 0.45));
      const y = Math.max(-0.6, Math.min(0.6, (cy - event.clientY) / cy * 0.32));
      lookAt(x, y);
    }, { passive: true });

    const observedSections = document.querySelectorAll("[data-emotion]");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const emotion = visible.target.getAttribute("data-emotion") || "neutral";
      setEmotion(emotion, emotion === "focused" ? 0.62 : 0.78, 4200);
    }, { threshold: [0.38, 0.58, 0.78] });

    observedSections.forEach((section) => observer.observe(section));
  }

  if (cta) {
    cta.addEventListener("mouseenter", () => {
      setEmotion("love", 0.88, 3600);
      playGesture("asentir", 0.45);
    });
    cta.addEventListener("focus", () => {
      setEmotion("love", 0.88, 3600);
    });
  }
})();
