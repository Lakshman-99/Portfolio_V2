// @ts-nocheck

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from "framer-motion";
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const skills = {
  frontend: [
    { name: "JavaScript", level: 95 }, { name: "TypeScript", level: 90 },
    { name: "React", level: 92 }, { name: "Next.js", level: 90 },
    { name: "Angular", level: 80 }, { name: "Redux", level: 85 },
    { name: "Zustand", level: 95 }, { name: "Tailwind CSS", level: 90 },
    { name: "Shadcn UI", level: 95 },
  ],
  backend: [
    { name: "Python", level: 90 }, { name: "Java", level: 95 },
    { name: "Go", level: 80 }, { name: "Node.js", level: 100 },
    { name: "Spring Boot", level: 85 }, { name: "Express.js", level: 85 },
    { name: "FastAPI", level: 85 }, { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 80 }, { name: "Redis", level: 80 },
  ],
  devops: [
    { name: "AWS", level: 85 }, { name: "Kubernetes", level: 85 },
    { name: "Docker", level: 85 }, { name: "Terraform", level: 80 },
    { name: "GitHub Actions", level: 80 }, { name: "Linux", level: 85 },
    { name: "Jenkins", level: 80 }, { name: "GCP", level: 75 },
  ],
  tools: [
    { name: "Git", level: 100 }, { name: "VS Code", level: 100 },
    { name: "IntelliJ", level: 90 }, { name: "Postman", level: 100 },
    { name: "Jupyter", level: 80 }, { name: "Selenium", level: 75 },
  ],
};

// Gradient color pairs for planets [color1, color2]
const planetGradients = {
  frontend: [0x00d4ff, 0x0051ff, 0xa855f7],
  backend: [0xff6b6b, 0xff00aa, 0xffa500],
  devops: [0x4ecdc4, 0x00ff88, 0x00a8ff],
  tools: [0xffe66d, 0xff6b6b, 0xff00aa],
};

// Moon gradient pairs
const moonGradients = {
  frontend: [
    [0x60a5fa, 0xa855f7], [0xa78bfa, 0xec4899], [0xf472b6, 0x8b5cf6],
    [0x34d399, 0x06b6d4], [0xfbbf24, 0xf97316], [0x38bdf8, 0x6366f1],
    [0xc084fc, 0xf43f5e], [0xfb7185, 0xa855f7]
  ],
  backend: [
    [0xfb923c, 0xf43f5e], [0xa3e635, 0x22d3ee], [0x2dd4bf, 0x818cf8],
    [0xe879f9, 0xf472b6], [0x60a5fa, 0x34d399], [0xf472b6, 0xfbbf24],
    [0xfbbf24, 0xef4444], [0x4ade80, 0x06b6d4], [0x38bdf8, 0xa855f7], [0xc084fc, 0x22d3ee]
  ],
  devops: [
    [0xf97316, 0xeab308], [0x84cc16, 0x22d3ee], [0x06b6d4, 0x8b5cf6],
    [0xd946ef, 0xf43f5e], [0x3b82f6, 0x06b6d4], [0xec4899, 0xa855f7],
    [0xeab308, 0x22c55e], [0x22c55e, 0x0ea5e9]
  ],
  tools: [
    [0xef4444, 0xf97316], [0x8b5cf6, 0xec4899], [0x14b8a6, 0x3b82f6],
    [0xf43f5e, 0xfbbf24], [0x6366f1, 0x06b6d4], [0x10b981, 0x84cc16]
  ],
};

const planetsData = {
  frontend: { name: "Frontend", radius: 1.2, orbit: 14, speed: 0.3 },
  backend: { name: "Backend", radius: 1.4, orbit: 22, speed: 0.2 },
  devops: { name: "DevOps", radius: 1.1, orbit: 28, speed: 0.45 },
  tools: { name: "Tools", radius: 1.0, orbit: 35, speed: 0.25 },
};

// Gradient shader
const gradientVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gradientFragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float time;
  varying vec3 vPosition;
  
  void main() {
    float mixVal = (vPosition.y + 1.0) / 2.0;
    vec3 gradient;
    if (mixVal < 0.5) {
      gradient = mix(color1, color2, mixVal * 2.0);
    } else {
      gradient = mix(color2, color3, (mixVal - 0.5) * 2.0);
    }
    // Add shimmer
    float shimmer = sin(vPosition.x * 10.0 + time) * 0.05 + 0.95;
    gl_FragColor = vec4(gradient * shimmer, 1.0);
  }
`;

export function SkillsSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const [view, setView] = useState('solar');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const sceneRef = useRef({});

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const createLabel = (text, fontSize = 64, color = '#ffffff') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
    return sprite;
  };

  const createGradientMaterial = (colors, time = 0) => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(colors[0]) },
        color2: { value: new THREE.Color(colors[1]) },
        color3: { value: new THREE.Color(colors[2] || colors[1]) },
        time: { value: time }
      },
      vertexShader: gradientVertexShader,
      fragmentShader: gradientFragmentShader,
    });
  };

  const zoomToPlanet = (key) => {
    if (transitioning || !sceneRef.current.planets) return;
    setTransitioning(true);
    setView(key);
    sceneRef.current.currentView = key;
    sceneRef.current.followPlanet = key;

    // Show moons, moon orbits and labels
    if (sceneRef.current.moons[key]) {
      sceneRef.current.moons[key].forEach(m => {
        m.visible = true;
        if (m.userData.label) m.userData.label.visible = true;
      });
    }
    if (sceneRef.current.moonOrbits[key]) {
      sceneRef.current.moonOrbits[key].forEach(o => o.visible = true);
    }

    // Hide other planets and show current
    Object.keys(planetsData).forEach(k => {
      const p = sceneRef.current.planets[k];
      if (p.label) p.label.visible = (k === key);
      if (p.orbitRing) p.orbitRing.visible = false;
    });
    if (sceneRef.current.sunLabel) sceneRef.current.sunLabel.visible = false;

    setTimeout(() => setTransitioning(false), 1000);
  };

  const zoomOut = () => {
    if (transitioning) return;
    setTransitioning(true);
    sceneRef.current.followPlanet = null;
    sceneRef.current.cameraOffset = { theta: 0.5, phi: 0.8, radius: 55 };

    Object.entries(sceneRef.current.moons || {}).forEach(([key, moons]) => {
      moons.forEach(m => {
        m.visible = false;
        if (m.userData.label) m.userData.label.visible = false;
      });
      if (sceneRef.current.moonOrbits[key]) {
        sceneRef.current.moonOrbits[key].forEach(o => o.visible = false);
      }
    });

    Object.values(sceneRef.current.planets).forEach(p => {
      if (p.label) p.label.visible = true;
      if (p.orbitRing) p.orbitRing.visible = true;
    });
    if (sceneRef.current.sunLabel) sceneRef.current.sunLabel.visible = true;

    sceneRef.current.targetCamPos.set(0, 35, 45);
    sceneRef.current.targetLookAt.set(0, 0, 0);
    sceneRef.current.currentView = 'solar';

    setTimeout(() => {
      setView('solar');
      setTransitioning(false);
    }, 1200);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight || 650;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.set(0, 35, 45);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    sceneRef.current = {
      scene, camera, renderer,
      currentView: 'solar',
      followPlanet: null,
      targetCamPos: new THREE.Vector3(0, 35, 45),
      targetLookAt: new THREE.Vector3(0, 0, 0),
      cameraOffset: { theta: 0.5, phi: 0.8, radius: 55 },
      planets: {},
      moons: {},
      moonOrbits: {},
      clickablePlanets: [],
      shaderMaterials: []
    };

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starsPos = new Float32Array(6000 * 3);
    for (let i = 0; i < 6000 * 3; i++) starsPos[i] = (Math.random() - 0.5) * 500;
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 })));

    // Sun with gradient
    const sunGroup = new THREE.Group();
    const sunMaterial = createGradientMaterial([0xffdd00, 0xffa500, 0xffdd00]);
    sceneRef.current.shaderMaterials.push(sunMaterial);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), sunMaterial);
    sunGroup.add(sun);

    [4.5, 6, 8, 10].forEach((r, i) => {
      sunGroup.add(new THREE.Mesh(
        new THREE.SphereGeometry(r, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffa500, transparent: true, opacity: 0.12 - i * 0.025, side: THREE.BackSide })
      ));
    });

    const coronaGeo = new THREE.BufferGeometry();
    const coronaPos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.5 + Math.random() * 3;
      coronaPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      coronaPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      coronaPos[i * 3 + 2] = r * Math.cos(phi);
    }
    coronaGeo.setAttribute('position', new THREE.BufferAttribute(coronaPos, 3));
    sunGroup.add(new THREE.Points(coronaGeo, new THREE.PointsMaterial({ color: 0xffdd44, size: 0.25, transparent: true, opacity: 0.9 })));
    scene.add(sunGroup);

    const sunLabel = createLabel('SKILLSETS', 56, '#FFA500');
    sunLabel.scale.set(8, 2, 1);
    sunLabel.position.set(0, 6, 0);
    scene.add(sunLabel);
    sceneRef.current.sunLabel = sunLabel;
    sceneRef.current.sun = sunGroup;

    // Create planets
    Object.entries(planetsData).forEach(([key, p]) => {
      const group = new THREE.Group();
      group.userData = { key, angle: Math.random() * Math.PI * 2, ...p };

      // Planet orbit ring
      const orbitRing = new THREE.Mesh(
        new THREE.RingGeometry(p.orbit - 0.08, p.orbit + 0.08, 128),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
      );
      orbitRing.rotation.x = -Math.PI / 2;
      scene.add(orbitRing);

      // Planet with gradient
      const planetMat = createGradientMaterial(planetGradients[key]);
      sceneRef.current.shaderMaterials.push(planetMat);
      const planet = new THREE.Mesh(new THREE.SphereGeometry(p.radius, 32, 32), planetMat);
      planet.userData = { key, isPlanet: true };

      // Glow
      const avgColor = planetGradients[key][1];
      planet.add(new THREE.Mesh(
        new THREE.SphereGeometry(p.radius * 1.6, 32, 32),
        new THREE.MeshBasicMaterial({ color: avgColor, transparent: true, opacity: 0.25, side: THREE.BackSide })
      ));

      // Ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(p.radius * 1.4, p.radius * 2, 64),
        new THREE.MeshBasicMaterial({ color: avgColor, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
      );
      ring.rotation.x = Math.PI / 2;
      planet.add(ring);

      group.add(planet);
      scene.add(group);

      const colorHex = '#' + avgColor.toString(16).padStart(6, '0');
      const label = createLabel(p.name.toUpperCase(), 48, colorHex);
      label.scale.set(5, 1.25, 1);
      scene.add(label);

      sceneRef.current.planets[key] = { group, planet, label, orbitRing };
      sceneRef.current.clickablePlanets.push(planet);

      // Moon orbits (smaller, relative to planet)
      const moonOrbitRings = [];
      const orbitRadii = [3, 4, 5];
      orbitRadii.forEach(r => {
        const moonOrbit = new THREE.Mesh(
          new THREE.RingGeometry(r - 0.03, r + 0.03, 64),
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
        );
        moonOrbit.rotation.x = -Math.PI / 2;
        moonOrbit.visible = false;
        scene.add(moonOrbit);
        moonOrbitRings.push(moonOrbit);
      });
      sceneRef.current.moonOrbits[key] = moonOrbitRings;

      // Moons
      const moons = [];
      skills[key].forEach((skill, i) => {
        const moonGroup = new THREE.Group();
        const moonSize = 0.2 + (skill.level / 100) * 0.15;
        const gradColors = moonGradients[key][i % moonGradients[key].length];
        
        const moonMat = createGradientMaterial([gradColors[0], gradColors[1], gradColors[0]]);
        sceneRef.current.shaderMaterials.push(moonMat);
        
        const moon = new THREE.Mesh(new THREE.SphereGeometry(moonSize, 20, 20), moonMat);
        moon.userData = { skill, isMoon: true, category: key, colors: gradColors };


        moonGroup.add(moon);

        const moonColorHex = '#' + gradColors[0].toString(16).padStart(6, '0');
        const moonLabel = createLabel(skill.name, 36, moonColorHex);
        moonLabel.scale.set(2.2, 0.55, 1);
        moonLabel.visible = false;
        scene.add(moonLabel);

        // Smaller orbit radii to avoid overlap
        const orbitRadius = orbitRadii[i % 3];
        moonGroup.userData = { 
          skill, 
          angle: (i / skills[key].length) * Math.PI * 2,
          orbitRadius,
          orbitTilt: (i % 3) * 0.15,
          speed: 0.6 - (orbitRadius * 0.1) + Math.random() * 0.1,
          planetKey: key,
          label: moonLabel,
          colors: gradColors
        };
        moonGroup.visible = false;
        scene.add(moonGroup);
        moons.push(moonGroup);
      });
      sceneRef.current.moons[key] = moons;
    });

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const getMousePos = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      return mouse;
    };

    const handleClick = (e) => {
      if (isDragging) return;
      if (sceneRef.current.currentView !== 'solar') return;
      getMousePos(e);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sceneRef.current.clickablePlanets, false);
      if (intersects.length > 0) {
        const key = intersects[0].object.userData.key;
        if (key) zoomToPlanet(key);
      }
    };

    const handleMouseDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
        container.style.cursor = 'grabbing';
        setShowControls(false);
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      container.style.cursor = 'crosshair';
    };

    const handleMouseMove = (e) => {
      if (isDragging && (e.ctrlKey || e.metaKey)) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        prevMouse = { x: e.clientX, y: e.clientY };

        const offset = sceneRef.current.cameraOffset;
        offset.theta -= deltaX * 0.005;
        offset.phi = Math.max(0.1, Math.min(Math.PI - 0.1, offset.phi - deltaY * 0.005));
        return;
      }

      getMousePos(e);
      raycaster.setFromCamera(mouse, camera);

      if (sceneRef.current.currentView === 'solar') {
        const intersects = raycaster.intersectObjects(sceneRef.current.clickablePlanets, false);
        if (intersects.length > 0) {
          const key = intersects[0].object.userData.key;
          setHoveredItem({ type: 'planet', data: planetsData[key], key, colors: planetGradients[key] });
          container.style.cursor = 'pointer';
        } else {
          setHoveredItem(null);
          if (!isDragging) container.style.cursor = 'crosshair';
        }
      } else {
        const currentMoons = sceneRef.current.moons[sceneRef.current.currentView] || [];
        const moonMeshes = currentMoons.filter(m => m.visible).map(m => m.children[0]);
        const intersects = raycaster.intersectObjects(moonMeshes, false);
        if (intersects.length > 0) {
          const moonData = intersects[0].object.userData;
          setHoveredItem({ type: 'moon', data: moonData.skill, category: moonData.category, colors: moonData.colors });
          container.style.cursor = 'pointer';
        } else {
          setHoveredItem(null);
          if (!isDragging) container.style.cursor = 'crosshair';
        }
      }
    };

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const offset = sceneRef.current.cameraOffset;
        offset.radius = Math.max(15, Math.min(100, offset.radius + e.deltaY * 0.05));
      }
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) setShowControls(true);
    };
    const handleKeyUp = (e) => {
      if (!e.ctrlKey && !e.metaKey) setShowControls(false);
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation
    let time = 0;
    let animationId;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.008;

      // Update shader time
      sceneRef.current.shaderMaterials.forEach(mat => {
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
      });

      // Sun
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      sunGroup.scale.set(pulse, pulse, pulse);
      sunGroup.rotation.y += 0.002;

      // Planets
      Object.entries(sceneRef.current.planets).forEach(([key, { group, label }]) => {
        const p = planetsData[key];
        group.userData.angle += p.speed * 0.006;
        group.position.x = Math.cos(group.userData.angle) * p.orbit;
        group.position.z = Math.sin(group.userData.angle) * p.orbit;
        group.children[0].rotation.y += 0.008;
        label.position.set(group.position.x, p.radius + 2.8, group.position.z);
      });

      // Moons & their orbit rings
      Object.entries(sceneRef.current.moons).forEach(([key, moons]) => {
        const planetPos = sceneRef.current.planets[key].group.position;
        
        // Update moon orbit ring positions
        if (sceneRef.current.moonOrbits[key]) {
          sceneRef.current.moonOrbits[key].forEach(ring => {
            ring.position.copy(planetPos);
          });
        }

        moons.forEach(moonGroup => {
          if (moonGroup.visible) {
            const ud = moonGroup.userData;
            ud.angle += ud.speed * 0.012;
            const r = ud.orbitRadius;
            moonGroup.position.x = planetPos.x + Math.cos(ud.angle) * r;
            moonGroup.position.z = planetPos.z + Math.sin(ud.angle) * r * Math.cos(ud.orbitTilt);
            moonGroup.position.y = Math.sin(ud.angle) * r * Math.sin(ud.orbitTilt) * 0.3;
            if (ud.label) ud.label.position.set(moonGroup.position.x, moonGroup.position.y + 0.9, moonGroup.position.z);
          }
        });
      });

      // Camera
      const offset = sceneRef.current.cameraOffset;
      if (sceneRef.current.followPlanet) {
        const planetPos = sceneRef.current.planets[sceneRef.current.followPlanet].group.position;
        sceneRef.current.targetLookAt.copy(planetPos);
        const camX = planetPos.x + offset.radius * 0.15 * Math.sin(offset.phi) * Math.cos(offset.theta);
        const camY = planetPos.y + offset.radius * 0.15 * Math.cos(offset.phi);
        const camZ = planetPos.z + offset.radius * 0.15 * Math.sin(offset.phi) * Math.sin(offset.theta);
        sceneRef.current.targetCamPos.set(camX, Math.max(camY, 2), camZ);
      } else {
        const camX = offset.radius * Math.sin(offset.phi) * Math.cos(offset.theta);
        const camY = offset.radius * Math.cos(offset.phi);
        const camZ = offset.radius * Math.sin(offset.phi) * Math.sin(offset.theta);
        sceneRef.current.targetCamPos.set(camX, Math.max(camY, 5), camZ);
      }

      camera.position.lerp(sceneRef.current.targetCamPos, 0.05);
      camera.lookAt(sceneRef.current.targetLookAt);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight || 650;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const currentPlanet = view !== 'solar' ? planetsData[view] : null;
  const getGradientCSS = (colors) => `linear-gradient(135deg, #${colors[0].toString(16).padStart(6,'0')}, #${colors[1].toString(16).padStart(6,'0')})`;

  return (
    <section ref={ref} id="skills" className="py-32 px-6 relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 relative z-10 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full">
          <span className="font-mono text-sm text-secondary">05.</span>
          <span className="font-mono text-sm text-muted-foreground">skills()</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-3">
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            {view === 'solar' ? 'The Skill System' : `${currentPlanet?.name} System`}
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          {view === 'solar' ? 'Click on any planet to explore its skill moons' : `Exploring ${skills[view]?.length} skills in the ${currentPlanet?.name} domain`}
        </p>

      </motion.div>

      {/* Controls hint */}
      {showControls && (
        <div className="absolute left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm animate-pulse">
          🖱️ Drag to rotate • Scroll to zoom
        </div>
      )}

      {/* Back Button */}
      {view !== 'solar' && (
        <button onClick={zoomOut} disabled={transitioning}
          className="absolute left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-full transition-all text-white disabled:opacity-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Skill System</span>
        </button>
      )}

      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-[750px]" style={{ cursor: 'crosshair' }} />

      {/* Hover Card */}
      {hoveredItem && !isMobile && (
        <div className={`absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none ${view === 'solar' ? 'left-6' : 'right-6'}`}>
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl min-w-[280px]">
            {hoveredItem.type === 'planet' ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 rounded-full animate-pulse" style={{ background: getGradientCSS(hoveredItem.colors), boxShadow: `0 0 20px #${hoveredItem.colors[0].toString(16).padStart(6,'0')}` }} />
                  <span className="text-white font-bold text-xl">{hoveredItem.data.name}</span>
                </div>
                <p className="text-gray-400 text-sm">{skills[hoveredItem.key]?.length} skills • Click to explore</p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: getGradientCSS(hoveredItem.colors), boxShadow: `0 0 15px #${hoveredItem.colors[0].toString(16).padStart(6,'0')}` }} />
                  <span className="text-white font-bold text-lg">{hoveredItem.data.name}</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-white font-mono">{hoveredItem.data.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${hoveredItem.data.level}%`, background: getGradientCSS(hoveredItem.colors) }} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      {view === 'solar' && !isMobile && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 space-y-3">
          {Object.entries(planetsData).map(([key, p]) => (
            <button key={key} onClick={() => zoomToPlanet(key)}
              className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/15 backdrop-blur border border-white/10 hover:border-white/30 rounded-full transition-all w-full group">
              <div className="w-4 h-4 rounded-full transition-transform group-hover:scale-125" style={{ background: getGradientCSS(planetGradients[key]) }} />
              <span className="text-white text-sm">{p.name}</span>
              <span className="text-gray-500 text-xs">({skills[key].length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Skills List */}
      {view !== 'solar' && !isMobile && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 max-h-[650px] overflow-y-auto pr-2 space-y-2">
          {skills[view]?.map((skill, i) => {
            const colors = moonGradients[view][i % moonGradients[view].length];
            return (
              <div key={skill.name} className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                <div className="w-3 h-3 rounded-full" style={{ background: getGradientCSS(colors) }} />
                <span className="text-white text-sm flex-1">{skill.name}</span>
                <span className="text-gray-400 text-xs font-mono">{skill.level}%</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Instructions */}
      <p className="absolute  left-1/2 -translate-x-1/2 text-gray-500 text-sm z-10">
        {view === 'solar' ? '🪐 Click planet to explore • Hold Ctrl + drag to orbit • Ctrl + scroll to zoom' : '🌙 Hover moons for details • Ctrl + drag/scroll to navigate'}
      </p>
    </section>
  );
}