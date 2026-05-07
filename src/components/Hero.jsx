import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    let mouseX = W / 2, mouseY = H / 2;
    let eyeOffX = 0, eyeOffY = 0;
    let blinkT = 0, blinkOpen = 1;
    let antennaGlow = 0;
    let hovered = false;
    let armWave = 0;
    let armDir = 1;
    let t = 0;
    let animId;

    const particles = Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      r: 60 + Math.random() * 40,
      speed: 0.012 + Math.random() * 0.01,
      size: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? '#7B2FF7' : '#F107A3'
    }));

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
      hovered = true;
      const cx = W / 2, cy = 160;
      const dx = (mouseX - cx) / W;
      const dy = (mouseY - cy) / H;
      eyeOffX = dx * 6;
      eyeOffY = dy * 4;
      armDir = dx > 0 ? 1 : -1;
    };

    const onMouseLeave = () => {
      hovered = false;
      eyeOffX = 0;
      eyeOffY = 0;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    function drawRoundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.02;
      blinkT += 0.02;
      antennaGlow = 0.5 + 0.5 * Math.sin(t * 2);

      const bobY = Math.sin(t) * 5;
      const cx = W / 2;
      const bodyY = 100 + bobY;

      // Background glow
      const bg1 = ctx.createRadialGradient(cx, bodyY + 60, 0, cx, bodyY + 60, 200);
      bg1.addColorStop(0, 'rgba(123,47,247,0.08)');
      bg1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bg1;
      ctx.fillRect(0, 0, W, H);

      // Particles
      particles.forEach(p => {
        p.angle += p.speed * (hovered ? 1.8 : 1);
        const px = cx + Math.cos(p.angle) * p.r;
        const py = bodyY + 60 + Math.sin(p.angle) * p.r * 0.4;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Shadow
      const shadow = ctx.createRadialGradient(cx, bodyY + 155, 5, cx, bodyY + 155, 70);
      shadow.addColorStop(0, 'rgba(123,47,247,0.18)');
      shadow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.ellipse(cx, bodyY + 155, 70, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      [-22, 22].forEach((lx, i) => {
        ctx.fillStyle = i === 0 ? '#2a1060' : '#1e0a45';
        drawRoundRect(cx + lx - 12, bodyY + 120, 24, 38, 6);
        ctx.fill();
        ctx.fillStyle = '#7B2FF7';
        drawRoundRect(cx + lx - 14, bodyY + 150, 28, 10, 5);
        ctx.fill();
      });

      // Arms
      if (hovered) {
        armWave += 0.12 * armDir;
        if (Math.abs(armWave) > 0.5) armDir *= -1;
      } else {
        armWave *= 0.9;
      }

      [-1, 1].forEach(side => {
        const wave = side === 1 ? armWave : -armWave * 0.3;
        ctx.save();
        ctx.translate(cx + side * 44, bodyY + 30);
        ctx.rotate(wave);
        ctx.fillStyle = '#2a1060';
        drawRoundRect(-10, 0, 20, 50, 8);
        ctx.fill();
        ctx.fillStyle = '#7B2FF7';
        ctx.beginPath();
        ctx.arc(0, 54, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Body
      const bodyGrad = ctx.createLinearGradient(cx - 50, bodyY, cx + 50, bodyY + 120);
      bodyGrad.addColorStop(0, '#1a0840');
      bodyGrad.addColorStop(1, '#0d0525');
      ctx.fillStyle = bodyGrad;
      drawRoundRect(cx - 50, bodyY, 100, 120, 14);
      ctx.fill();
      ctx.strokeStyle = '#7B2FF7';
      ctx.lineWidth = 1.5;
      drawRoundRect(cx - 50, bodyY, 100, 120, 14);
      ctx.stroke();

      // Chest panel
      ctx.fillStyle = 'rgba(123,47,247,0.12)';
      drawRoundRect(cx - 32, bodyY + 18, 64, 50, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(123,47,247,0.4)';
      ctx.lineWidth = 0.8;
      drawRoundRect(cx - 32, bodyY + 18, 64, 50, 8);
      ctx.stroke();

      // Chest dots
      const pulse = 0.5 + 0.5 * Math.sin(t * 3);
      [[cx - 16, bodyY + 36], [cx, bodyY + 36], [cx + 16, bodyY + 36]].forEach(([dx, dy], i) => {
        const colors = ['#F107A3', '#7B2FF7', '#00d4ff'];
        const op = i === 0 ? 0.5 + 0.5 * Math.sin(t * 3 + 1) : i === 1 ? pulse : 0.5 + 0.5 * Math.sin(t * 3 + 2);
        ctx.beginPath();
        ctx.arc(dx, dy, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = op;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Battery bar
      const battFill = 0.5 + 0.5 * Math.sin(t * 0.5);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      drawRoundRect(cx - 28, bodyY + 54, 56, 8, 3);
      ctx.fill();
      const barGrad = ctx.createLinearGradient(cx - 28, 0, cx + 28, 0);
      barGrad.addColorStop(0, '#7B2FF7');
      barGrad.addColorStop(1, '#F107A3');
      ctx.fillStyle = barGrad;
      drawRoundRect(cx - 28, bodyY + 54, 56 * battFill, 8, 3);
      ctx.fill();

      // Neck
      ctx.fillStyle = '#150630';
      drawRoundRect(cx - 14, bodyY - 16, 28, 18, 5);
      ctx.fill();

      // Head
      const headY = bodyY - 80;
      const headGrad = ctx.createLinearGradient(cx - 42, headY, cx + 42, headY + 76);
      headGrad.addColorStop(0, '#1f0a55');
      headGrad.addColorStop(1, '#0a0320');
      ctx.fillStyle = headGrad;
      drawRoundRect(cx - 42, headY, 84, 76, 16);
      ctx.fill();
      ctx.strokeStyle = '#7B2FF7';
      ctx.lineWidth = 1.5;
      drawRoundRect(cx - 42, headY, 84, 76, 16);
      ctx.stroke();

      // Eyes
      blinkOpen = Math.abs(Math.sin(blinkT * 0.4)) < 0.05
        ? Math.max(0, 1 - (0.05 - Math.abs(Math.sin(blinkT * 0.4))) * 40)
        : 1;

      [-20, 20].forEach(ex => {
        const eyeX = cx + ex + eyeOffX;
        const eyeY = headY + 28 + eyeOffY;
        ctx.save();
        ctx.shadowColor = '#7B2FF7';
        ctx.shadowBlur = hovered ? 20 : 10;
        ctx.fillStyle = '#0d0525';
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, 14, 14 * blinkOpen, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#7B2FF7';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = hovered ? '#F107A3' : '#7B2FF7';
        ctx.beginPath();
        ctx.ellipse(eyeX, eyeY, 8, 8 * blinkOpen, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(eyeX + 2, eyeY - 2, 3, 3 * blinkOpen, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Mouth
      const mouthY = headY + 56;
      ctx.strokeStyle = hovered ? '#F107A3' : '#7B2FF7';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      if (hovered) {
        ctx.arc(cx, mouthY - 2, 14, 0.15 * Math.PI, 0.85 * Math.PI);
      } else {
        ctx.moveTo(cx - 14, mouthY);
        ctx.lineTo(cx + 14, mouthY);
      }
      ctx.stroke();

      // Antenna
      const antH = headY - 22;
      ctx.strokeStyle = '#7B2FF7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx, antH);
      ctx.stroke();
      ctx.save();
      ctx.shadowColor = '#F107A3';
      ctx.shadowBlur = 15 * antennaGlow;
      ctx.fillStyle = `rgba(241,7,163,${0.6 + 0.4 * antennaGlow})`;
      ctx.beginPath();
      ctx.arc(cx, antH, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-gradient-bg"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-line">Innovate.</span>
            <span className="hero-line">Build.</span>
            <span className="hero-line">Scale.</span>
          </h1>
          <p className="hero-subtitle">
            Empowering businesses with cutting-edge technology solutions.
            From web applications to AI-powered systems, we transform your vision into reality.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline" onClick={scrollToServices}>
              Explore Services
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <canvas
            ref={canvasRef}
            width={480}
            height={320}
            className="robot-canvas"
          />
        </div>
      </div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
    </section>
  );
};

export default Hero;