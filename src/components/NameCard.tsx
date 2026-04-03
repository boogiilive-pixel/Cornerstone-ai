import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NameCard() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });

  useEffect(() => {
    // Particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = '';
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random() * 100}%;animation-duration:${6 + Math.random() * 10}s;animation-delay:${Math.random() * 8}s;width:${Math.random() > 0.7 ? 2 : 1}px;height:${Math.random() > 0.7 ? 2 : 1}px;`;
        particlesRef.current.appendChild(p);
      }
    }

    // QR Code
    if (qrCanvasRef.current) {
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const size = 42;
      const url = 'https://cornerstoneai.dev/digitalcard';
      
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
        
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
          ctx.drawImage(img, 0, 0, size, size);
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = '#E8D5A8';
          ctx.fillRect(0, 0, size, size);
          ctx.globalCompositeOperation = 'source-over';
        };
        img.onerror = function() {
          drawFallbackQR(ctx, size);
        };
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=42x42&data=${encodeURIComponent(url)}&bgcolor=1A1A2E&color=C8A96E&format=png&margin=1`;
      }
    }

    // Card tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / r.width;
        const dy = (e.clientY - r.top - r.height / 2) / r.height;
        cardRef.current.style.transform = `rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
        cardRef.current.style.animation = 'none';
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.transform = '';
        cardRef.current.style.animation = 'float 6s ease-in-out infinite';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const drawFallbackQR = (ctx: CanvasRenderingContext2D, size: number) => {
    const cell = size / 10;
    const pattern = [
      [1, 1, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1],
    ];
    ctx.fillStyle = '#C8A96E';
    pattern.forEach((row, r) => {
      row.forEach((cell_v, c) => {
        if (cell_v) {
          ctx.fillRect(c * cell + 1, r * cell + 1, cell - 0.5, cell - 0.5);
        }
      });
    });
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 2200);
  };

  const saveContact = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:L.Bolor-Erdene\nN:Bolor-Erdene;L.;;;\nTITLE:Founder & CEO\nORG:Cornerstone AI\nTEL;TYPE=CELL:+97695079599\nEMAIL:boogiilive@gmail.com\nURL:https://cornerstoneai.dev\nX-SOCIALPROFILE;type=facebook:https://www.facebook.com/pip.boogii\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Bolor-Erdene_CornerstoneAI.vcf';
    a.click();
    showToast('Контакт хадгалагдлаа ✓');
  };

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val).then(() => showToast('Хуулагдлаа ✓')).catch(() => {});
  };

  return (
    <div className="namecard-container">
      <style>{`
        .namecard-container {
          width: 100%; min-height: 100vh;
          background: #0A0A0F;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          position: relative;
          color: #F8F7F4;
        }

        .namecard-container::before {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(200,169,110,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(26,26,46,0.8) 0%, transparent 60%);
        }
        .namecard-container::after {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(200,169,110,0.03) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(200,169,110,0.03) 40px);
        }

        .scene {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; gap: 28px;
          padding: 40px 20px;
          width: 100%;
        }

        .card {
          width: 100%; max-width: 420px;
          position: relative;
          animation: float 6s ease-in-out infinite;
          cursor: default;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .card-front {
          width: 100%;
          background: linear-gradient(145deg, #12121E 0%, #1A1A2E 40%, #0F1628 100%);
          border: 1px solid rgba(200,169,110,0.2);
          border-radius: 16px;
          padding: 36px 36px 32px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 40px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(200,169,110,0.1),
            inset 0 1px 0 rgba(200,169,110,0.1);
        }
        .card-front::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 80px; height: 80px;
          border-top: 2px solid #C8A96E;
          border-left: 2px solid #C8A96E;
          border-radius: 16px 0 0 0;
          opacity: 0.6;
        }
        .card-front::after {
          content: '';
          position: absolute; bottom: 0; right: 0;
          width: 60px; height: 60px;
          border-bottom: 1px solid rgba(200,169,110,0.3);
          border-right: 1px solid rgba(200,169,110,0.3);
          border-radius: 0 0 16px 0;
        }
        .card-glow {
          position: absolute; top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .card-shine {
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%);
          animation: shine 8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shine {
          0% { left: -100%; }
          30%, 100% { left: 150%; }
        }

        .card-logo {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 28px;
        }
        .card-logo-icon {
          width: 28px; height: 28px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3px;
        }
        .logo-sq {
          border-radius: 2px; background: #C8A96E;
        }
        .logo-sq:nth-child(2) { opacity: 0.6; }
        .logo-sq:nth-child(3) { opacity: 0.4; }
        .logo-sq:nth-child(4) { opacity: 0.2; }
        .card-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 600;
          color: rgba(248,247,244,0.7); letter-spacing: 0.08em;
        }
        .card-logo-text span { color: #C8A96E; }

        .card-name-prefix {
          font-family: 'DM Mono', monospace;
          font-size: 11px; color: #C8A96E;
          letter-spacing: 0.2em; opacity: 0.7; margin-bottom: 4px;
        }
        .card-name h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 300;
          color: #F8F7F4; line-height: 1.0; letter-spacing: -0.01em;
          margin: 0;
        }
        .card-name h1 strong {
          font-weight: 700;
          background: linear-gradient(135deg, #C8A96E, #E8C98E);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .card-title-role {
          font-size: 12px; font-weight: 500;
          color: rgba(248,247,244,0.5);
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-top: 8px; margin-bottom: 24px;
        }
        .card-title-role span { color: #C8A96E; opacity: 0.8; margin: 0 8px; }

        .card-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #C8A96E, rgba(200,169,110,0.1));
          margin-bottom: 22px;
        }

        .card-contacts { display: flex; flex-direction: column; gap: 11px; }

        .contact-item {
          display: flex; align-items: center; gap: 14px;
          text-decoration: none;
          transition: transform 0.2s;
          cursor: pointer;
        }
        .contact-item:hover { transform: translateX(4px); }

        .contact-icon {
          width: 30px; height: 30px;
          border: 1px solid rgba(200,169,110,0.2);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .contact-item:hover .contact-icon {
          border-color: rgba(200,169,110,0.5);
          background: rgba(200,169,110,0.06);
        }
        .contact-icon svg { width: 13px; height: 13px; }
        .contact-icon.fb-icon { border-color: rgba(123,159,212,0.25); }
        .contact-item:hover .contact-icon.fb-icon {
          border-color: rgba(123,159,212,0.5);
          background: rgba(123,159,212,0.06);
        }

        .contact-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(248,247,244,0.25); margin-bottom: 2px;
        }
        .contact-value {
          font-family: 'DM Mono', monospace;
          font-size: 12.5px; color: rgba(248,247,244,0.75);
          letter-spacing: 0.02em; transition: color 0.2s;
        }
        .contact-item:hover .contact-value { color: #E8C98E; }
        .contact-value.fb-val { color: #7B9FD4; }
        .contact-item:hover .contact-value.fb-val { color: #A8C4E8; }

        .card-bottom {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          margin-top: 22px; padding-top: 18px;
          border-top: 1px solid rgba(200,169,110,0.08);
        }
        .card-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 13px;
          color: rgba(248,247,244,0.2); letter-spacing: 0.05em;
        }

        .qr-wrap {
          width: 52px; height: 52px;
          padding: 5px;
          border: 1px solid rgba(200,169,110,0.15);
          border-radius: 4px;
          background: rgba(248,247,244,0.04);
        }
        .qr-wrap canvas { display: block; }

        .actions {
          display: flex; gap: 12px; flex-wrap: wrap;
          justify-content: center;
          max-width: 420px; width: 100%;
        }
        .btn {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 20px; border-radius: 6px;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif; border: none;
          flex: 1;
          justify-content: center;
        }
        .btn-primary { background: #C8A96E; color: #0A0A0F; }
        .btn-primary:hover { background: #E8C98E; transform: translateY(-1px); }
        .btn-secondary {
          background: rgba(200,169,110,0.08); color: #C8A96E;
          border: 1px solid rgba(200,169,110,0.2);
        }
        .btn-secondary:hover { background: rgba(200,169,110,0.14); border-color: rgba(200,169,110,0.4); }
        .btn svg { width: 14px; height: 14px; }

        .footer-hint {
          font-size: 11px; color: rgba(248,247,244,0.12);
          letter-spacing: 0.1em; font-family: 'DM Mono', monospace;
        }

        .particles { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .particle {
          position: absolute; background: #C8A96E; border-radius: 50%;
          animation: drift linear infinite; opacity: 0;
        }
        @keyframes drift {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 0.4; } 90% { opacity: 0.2; }
          100% { transform: translateY(-20px); opacity: 0; }
        }

        .toast {
          position: fixed; bottom: 32px; left: 50%;
          transform: translateX(-50%) translateY(80px);
          background: rgba(200,169,110,0.95); color: #0A0A0F;
          padding: 10px 20px; border-radius: 100px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          z-index: 100; pointer-events: none; white-space: nowrap;
        }
        .toast.show { transform: translateX(-50%) translateY(0); }
      `}</style>

      <div className="particles" ref={particlesRef}></div>
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>

      <Link 
        to="/" 
        className="fixed top-6 left-6 flex items-center gap-2 text-white/40 hover:text-gold-500 transition-colors text-xs font-mono uppercase tracking-widest z-[100]"
      >
        <ArrowLeft className="w-4 h-4" />
        Вэбрүү буцах
      </Link>

      <div className="scene">
        <div className="card" ref={cardRef}>
          <div className="card-front">
            <div className="card-shine"></div>
            <div className="card-glow"></div>

            <div className="card-logo">
              <div className="card-logo-icon">
                <div className="logo-sq"></div><div className="logo-sq"></div>
                <div className="logo-sq"></div><div className="logo-sq"></div>
              </div>
              <div className="card-logo-text">Cornerstone<span>AI</span></div>
            </div>

            <div className="card-name">
              <div className="card-name-prefix">Built on Intelligence — Driven by Results</div>
              <h1>L.<strong>Bolor-Erdene</strong></h1>
            </div>
            <div className="card-title-role">Founder <span>·</span> CEO</div>

            <div className="card-divider"></div>

            <div className="card-contacts">
              <div className="contact-item" onClick={() => copyToClipboard('+976 9507 9599')}>
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01z"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Утас</div>
                  <div className="contact-value">+976 9507 9599</div>
                </div>
              </div>

              <div className="contact-item" onClick={() => copyToClipboard('boogiilive@gmail.com')}>
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Имэйл</div>
                  <div className="contact-value">boogiilive@gmail.com</div>
                </div>
              </div>

              <a href="https://cornerstoneai.dev" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Вэбсайт</div>
                  <div className="contact-value">cornerstoneai.dev</div>
                </div>
              </a>

              <a href="https://www.facebook.com/pip.boogii" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon fb-icon">
                  <svg viewBox="0 0 24 24" fill="#7B9FD4" stroke="none">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Facebook</div>
                  <div className="contact-value fb-val">Pip Boogii</div>
                </div>
              </a>
            </div>

            <div className="card-bottom">
              <div className="card-tagline">Built on Intelligence. Driven by Results.</div>
              <div className="qr-wrap">
                <canvas ref={qrCanvasRef} width="42" height="42"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <a href="tel:+97695079599" className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01z"/>
            </svg>
            Залгах
          </a>
          <button className="btn btn-secondary" onClick={saveContact}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
              <polyline points="17,21 17,13 7,13 7,21"/>
              <polyline points="7,3 7,8 15,8"/>
            </svg>
            Хадгалах
          </button>
        </div>

        <div className="footer-hint">cornerstoneai.dev/digitalcard</div>
      </div>
    </div>
  );
}
