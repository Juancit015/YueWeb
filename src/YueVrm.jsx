import { useRef, useState, useEffect } from "react";

// ── Librerías locales (vendor) ────────────────────────────────────────────────
const LIBS = [
  { src: "/vendor/three.min.js",  check: () => window.THREE },
  { src: "/vendor/GLTFLoader.js", check: () => window.THREE?.GLTFLoader },
  { src: "/vendor/three-vrm.js",  check: () => window.THREE_VRM },
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function ensureLibs() {
  for (const lib of LIBS) {
    if (!lib.check()) await loadScript(lib.src);
  }
}

const COLOR_KEYS = ["map", "emissiveMap", "normalMap", "roughnessMap", "metalnessMap"];

function fixTextureColors(scene) {
  scene.traverse((obj) => {
    if (!obj.isMesh) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.forEach((m) => {
      if (!m) return;
      COLOR_KEYS.forEach((k) => {
        const tex = m[k];
        if (tex && tex.isTexture) {
          try {
            if ("colorSpace" in tex) tex.colorSpace = "srgb";
            else tex.encoding = window.THREE.sRGBEncoding;
          } catch (e) {}
          tex.needsUpdate = true;
        }
      });
      m.needsUpdate = true;
    });
  });
}

function damp(cur, target, lambda, dt) {
  return cur + (target - cur) * (1 - Math.exp(-lambda * dt));
}

export default function YueVrm({ className = "" }) {
  const hostRef = useRef(null);
  const [status, setStatus] = useState("loading");
  // Posición objetivo del ratón [-1,1]. Se resetea a 0,0 al salir de pantalla.
  const mouseRef = useRef({ x: 0, y: 0 });

  // Rastreo del cursor — sigue globalmente pero vuelve al centro al salir
  useEffect(() => {
    const handleMouseMove = (e) => {
      const host = hostRef.current;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    // Cuando el cursor sale de la ventana → volver a posición neutra
    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanupFns = [];

    const dispose = () => {
      if (disposed) return;
      disposed = true;
      cleanupFns.forEach((fn) => { try { fn(); } catch (e) {} });
      cleanupFns = [];
    };

    (async () => {
      try {
        await ensureLibs();
        if (disposed) return;

        const THREE = window.THREE;
        const THREE_VRM = window.THREE_VRM;

        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        host.appendChild(canvas);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);
        // Limitar pixel ratio a 1 para reducir carga de GPU
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputEncoding = THREE.sRGBEncoding;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 20);
        camera.lookAt(0, 1.15, 0);

        scene.add(new THREE.AmbientLight(0xffffff, 0.85));
        const dir = new THREE.DirectionalLight(0xffffff, 0.9);
        dir.position.set(2, 3, 3.5);
        scene.add(dir);
        const fill = new THREE.DirectionalLight(0xb388ff, 0.45);
        fill.position.set(-2.5, 1.2, 1.5);
        scene.add(fill);
        const rim = new THREE.DirectionalLight(0x7df9ff, 0.35);
        rim.position.set(0, 2.5, -3);
        scene.add(rim);

        const clock = new THREE.Clock();
        let vrm = null;
        let blinkT = 0;
        let nextBlink = 1.6 + Math.random() * 2;
        let blinkValue = 0;
        let currentRotY = 0;
        let currentHeadX = 0;
        let currentHeadY = 0;

        const loader = new THREE.GLTFLoader();
        loader.register((parser) => new THREE_VRM.VRMLoaderPlugin(parser));

        loader.load(
          "/models/yue.vrm",
          async (gltf) => {
            try {
              if (disposed) return;
              try { THREE_VRM.VRMUtils.removeUnnecessaryVertices(gltf.scene); } catch (e) {}
              try { THREE_VRM.VRMUtils.removeUnnecessaryJoints(gltf.scene); } catch (e) {}

              const loaded = gltf.userData?.vrm;
              if (!loaded) throw new Error("VRM no inicializado");
              vrm = loaded;
              vrm.scene.rotation.y = 0;
              fixTextureColors(vrm.scene);

              // Postura de brazos
              const hum = vrm.humanoid;
              if (hum) {
                const getBone = (name) => {
                  if (hum.getNormalizedBoneNode) return hum.getNormalizedBoneNode(name);
                  if (hum.getBoneNode) return hum.getBoneNode(name);
                  return hum.getBone?.(name)?.node ?? null;
                };
                const lUp  = getBone("leftUpperArm");
                const rUp  = getBone("rightUpperArm");
                const lLow = getBone("leftLowerArm");
                const rLow = getBone("rightLowerArm");
                if (lUp)  { lUp.rotation.z  = -1.48; lUp.rotation.x  = -0.35; }
                if (rUp)  { rUp.rotation.z  =  1.48; rUp.rotation.x  = -0.35; }
                if (lLow) { lLow.rotation.z = -0.12; }
                if (rLow) { rLow.rotation.z =  0.12; }
              }

              // Cámara: mostrar cuerpo hasta la mitad
              const getHead = () => {
                if (!hum) return null;
                if (hum.getNormalizedBoneNode) return hum.getNormalizedBoneNode("head");
                if (hum.getBoneNode) return hum.getBoneNode("head");
                return hum.getBone?.("head")?.node ?? null;
              };
              const head = getHead();
              if (head) {
                const p = new THREE.Vector3();
                head.getWorldPosition(p);
                camera.position.set(0, p.y - 0.3, 2.4);
                camera.lookAt(0, p.y - 0.45, 0);
              } else {
                camera.position.set(0, 0.9, 2.4);
              }

              scene.add(vrm.scene);
              setStatus("ok");
            } catch (e) {
              console.error("YUE VRM setup error:", e);
              setStatus("error");
            }
          },
          undefined,
          (err) => {
            console.error("YUE VRM load error:", err);
            setStatus("error");
          }
        );

        let rafId = 0;
        // Throttle a ~40fps para reducir carga
        let lastRender = 0;
        const TARGET_MS = 1000 / 40;

        const animate = (now) => {
          if (disposed) return;
          rafId = requestAnimationFrame(animate);

          if (now - lastRender < TARGET_MS) return;
          lastRender = now;

          const dt = Math.min(clock.getDelta(), 0.05);
          const t = clock.elapsedTime;

          if (vrm) {
            vrm.scene.position.y = Math.sin(t * 1.1) * 0.018;

            // Seguir cursor con retorno suave al centro
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            currentRotY = damp(currentRotY, mx * 0.4, 4.5, dt);
            vrm.scene.rotation.y = currentRotY;

            const hum = vrm.humanoid;
            if (hum) {
              const getBone = (name) => {
                if (hum.getNormalizedBoneNode) return hum.getNormalizedBoneNode(name);
                if (hum.getBoneNode) return hum.getBoneNode(name);
                return hum.getBone?.(name)?.node ?? null;
              };
              const headBone = getBone("head");
              if (headBone) {
                currentHeadY = damp(currentHeadY, mx * 0.25, 6, dt);
                currentHeadX = damp(currentHeadX, my * -0.2, 6, dt);
                headBone.rotation.y = currentHeadY;
                headBone.rotation.x = currentHeadX;
              }
              const neckBone = getBone("neck");
              if (neckBone) {
                neckBone.rotation.y = currentHeadY * 0.4;
                neckBone.rotation.x = currentHeadX * 0.4;
              }
            }

            // Parpadeo
            const em = vrm.expressionManager ?? vrm.blendShapeProxy;
            if (em) {
              const setExpr = (name, val) => {
                try { em.setValue?.(name, val); } catch (e) {}
              };
              ["happy", "angry", "sad", "relaxed", "surprised"].forEach((n) => setExpr(n, 0));
              blinkT += dt;
              let blinkTarget = 0;
              if (blinkT > nextBlink) {
                const phase = (blinkT - nextBlink) / 0.14;
                blinkTarget = phase < 0.5 ? phase * 2 : Math.max(0, (1 - phase) * 2);
                if (phase >= 1) { blinkT = 0; nextBlink = 1.8 + Math.random() * 3.4; }
              }
              blinkValue = damp(blinkValue, blinkTarget, 24, dt);
              setExpr("blink", blinkValue);
            }

            vrm.update(dt);
          }
          renderer.render(scene, camera);
        };
        rafId = requestAnimationFrame(animate);
        cleanupFns.push(() => cancelAnimationFrame(rafId));

        const resize = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);
        window.addEventListener("resize", resize);
        cleanupFns.push(() => {
          ro.disconnect();
          window.removeEventListener("resize", resize);
        });
        cleanupFns.push(() => {
          renderer.dispose();
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        });
      } catch (e) {
        console.error("YUE VRM init error:", e);
        if (!disposed) setStatus("error");
      }
    })();

    return dispose;
  }, []);

  return (
    <div ref={hostRef} className={"relative " + className}>
      {status !== "ok" && (
        <img
          src="/images/yue.png"
          alt="YUE"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-[#b388ff]/40 bg-[#0d0a1c]/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#b388ff] uppercase">
            Cargando a YUE…
          </span>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-[#e0567a]/40 bg-[#0d0a1c]/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#e0567a] uppercase">
            Modelo 3D no disponible
          </span>
        </div>
      )}
    </div>
  );
}