"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import * as Icons from "lucide-react";

const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSghXrCscVDsTuy7FDhRuhnISUHp9Rui6H3xXXQ0KzVepCQv8pzSE_3tGw_ft-nEtbB_KjcR_I1uLOn/pub?output=csv";

// ============================================================
// 🎨 BACKGROUND POP ART (VERSÃO LEVE - 12 CORES)
// ============================================================
const PopArtBackground = ({ themeColor, highlightColor }: { themeColor: string; highlightColor: string }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const popColors = [
    "#FF3366", "#FFD700", "#00D4FF", "#9B59B6", 
    "#FF6B35", "#00E676", "#FF1744", "#7C4DFF",
    "#FF9800", "#E040FB", "#00BCD4", "#F44336"
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "#0a0a0f" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-red-950/20 to-pink-950/30" />

      {/* Raios geométricos (12 raios) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-1/2 left-1/2 origin-center pointer-events-none"
          style={{
            width: "250%",
            height: i % 3 === 0 ? "2px" : "1px",
            background: `linear-gradient(90deg, transparent, ${popColors[i % popColors.length]}30, transparent)`,
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            rotate: [i * 30, i * 30 + 360],
          }}
          transition={{ duration: 20 + i * 3, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
        />
      ))}

      {/* Círculos flutuantes (8 círculos) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full border-2 border-opacity-20 pointer-events-none"
          style={{
            width: 80 + Math.random() * 150,
            height: 80 + Math.random() * 150,
            borderColor: popColors[i],
            left: `${10 + (i * 10)}%`,
            top: `${10 + (i * 8)}%`,
            background: `${popColors[i]}05`,
            boxShadow: `0 0 40px ${popColors[i]}15, inset 0 0 40px ${popColors[i]}08`,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -20, 15, -25, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.08, 0.95, 1.03, 1],
          }}
          transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      {/* Polka dots (Benday dots) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${themeColor} 2px, transparent 2px)`,
          backgroundSize: "25px 25px",
        }}
      />

      {/* Mouse light */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${themeColor}15, transparent 70%)`, left: `${mousePos.x - 25}%`, top: `${mousePos.y - 25}%` }}
        transition={{ type: "spring", stiffness: 25, damping: 10 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${highlightColor}12, transparent 70%)`, left: `${100 - mousePos.x - 15}%`, top: `${100 - mousePos.y - 15}%` }}
        transition={{ type: "spring", stiffness: 20, damping: 8 }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

// ============================================================
// 🖼️ HERO SECTION (COM ANÉIS GIRATÓRIOS)
// ============================================================
const HeroSection = ({ config, themeColor, highlightColor }: any) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => setIsGlowing((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative w-full mb-10" onMouseMove={handleMouseMove}>
      {config.heroBackground && (
        <div className="absolute inset-0 rounded-3xl blur-3xl opacity-30" style={{ backgroundImage: `url(${config.heroBackground})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      )}

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 80 }} className="relative flex flex-col items-center">
        <motion.div
          className="relative rounded-full p-1.5"
          animate={{
            boxShadow: isGlowing
              ? [`0 0 30px ${themeColor}50, 0 0 60px ${themeColor}30`, `0 0 60px ${highlightColor}50, 0 0 100px ${highlightColor}30`, `0 0 30px ${themeColor}50, 0 0 60px ${themeColor}30`]
              : [`0 0 60px ${highlightColor}50, 0 0 100px ${highlightColor}30`, `0 0 30px ${themeColor}50, 0 0 60px ${themeColor}30`, `0 0 60px ${highlightColor}50, 0 0 100px ${highlightColor}30`],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: `perspective(500px) rotateY(${(mousePos.x / 200) - 0.5}deg) rotateX(${0.5 - (mousePos.y / 200)}deg)` }}
        >
          <motion.div className="absolute -inset-3 rounded-full border-2 border-dashed opacity-30" style={{ borderColor: themeColor }} animate={{ rotate: [0, 360] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute -inset-1.5 rounded-full border border-dotted opacity-20" style={{ borderColor: highlightColor }} animate={{ rotate: [360, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 relative z-10" style={{ borderColor: themeColor }}>
            <img src={config.heroImage || config.avatar} alt={config.title} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <h1
          className="text-5xl md:text-7xl font-black tracking-tighter mt-6 text-center leading-none"
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${highlightColor}, ${themeColor})`,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientShift 3s ease infinite",
          }}
        >
          {config.title}
        </h1>

        {config.subtitle && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-sm tracking-[0.4em] uppercase mt-3 font-light text-white/50 text-center">
            {config.subtitle}
          </motion.p>
        )}

        {config.badges && config.badges.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-3 mt-5 flex-wrap justify-center">
            {config.badges.map((badge: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                className="px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
                style={{ background: `linear-gradient(135deg, ${themeColor}25, ${highlightColor}15)`, borderColor: `${themeColor}50`, borderWidth: "1px", borderStyle: "solid", color: themeColor, boxShadow: `0 0 15px ${themeColor}20` }}
              >
                {badge}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <style jsx>{`
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      `}</style>
    </div>
  );
};

// ============================================================
// 📝 BIOGRAFIA
// ============================================================
const BioCard = ({ bio, stats, themeColor, highlightColor }: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.User size={20} style={{ color: themeColor }} /></div>
          <div><h3 className="text-white font-bold text-xl">Biografia</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">Conheça o artista</p></div>
        </div>
        <div className="relative">
          <p className={`text-white/70 text-sm leading-relaxed ${!expanded ? "line-clamp-4" : ""}`}>{bio}</p>
          {!expanded && bio && bio.length > 200 && <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1a1a2e] to-transparent pointer-events-none" />}
        </div>
        {bio && bio.length > 200 && (
          <button onClick={() => setExpanded(!expanded)} className="text-xs mt-3 font-medium flex items-center gap-1" style={{ color: themeColor }}>
            {expanded ? <><Icons.ChevronUp size={14} /> VER MENOS</> : <><Icons.ChevronDown size={14} /> VER MAIS</>}
          </button>
        )}
      </div>

      {stats && stats.length > 0 && (
        <div className="px-5 pb-5">
          <div className="grid gap-3 rounded-xl p-4 mt-2" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, background: `${themeColor}08`, borderColor: `${themeColor}15`, borderWidth: "1px", borderStyle: "solid" }}>
            {stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <motion.p className="text-2xl font-black" style={{ color: themeColor }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1, type: "spring" }}>{stat.value}</motion.p>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ============================================================
// 🚀 PRÓXIMOS LANÇAMENTOS
// ============================================================
const UpcomingReleases = ({ releases, themeColor, highlightColor }: any) => {
  const [timeLeft, setTimeLeft] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!releases?.length) return;
    const timer = setInterval(() => {
      const newTimeLeft: Record<string, any> = {};
      releases.forEach((release: any) => {
        const target = new Date(release.date).getTime();
        const now = new Date().getTime();
        const distance = target - now;
        if (distance > 0) {
          newTimeLeft[release.id] = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [releases]);

  if (!releases?.length) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.Rocket size={20} style={{ color: themeColor }} /></div>
          <div><h3 className="text-white font-bold text-xl">Próximos Lançamentos</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">Não perca nenhuma novidade</p></div>
        </div>
        <div className="space-y-4">
          {releases.map((release: any, i: number) => {
            const tl = timeLeft[release.id];
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex gap-4 items-center p-3 rounded-xl" style={{ background: `${themeColor}05`, borderColor: `${themeColor}15`, borderWidth: "1px", borderStyle: "solid" }}>
                {release.image ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"><img src={release.image} alt={release.title} className="w-full h-full object-cover" /></div>
                ) : (
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.Music size={24} style={{ color: themeColor }} /></div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm truncate">{release.title}</h4>
                  <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: themeColor }}>{release.type}</p>
                  {tl && (
                    <div className="flex gap-2 mt-2">
                      {[
                        { label: "D", value: tl.days },
                        { label: "H", value: tl.hours },
                        { label: "M", value: tl.minutes },
                        { label: "S", value: tl.seconds },
                      ].map((unit, j) => (
                        <div key={j} className="text-center">
                          <div className="rounded-md px-2 py-1 min-w-[40px]" style={{ background: `${themeColor}15` }}><span className="text-sm font-bold font-mono" style={{ color: themeColor }}>{String(unit.value).padStart(2, "0")}</span></div>
                          <p className="text-[8px] text-white/30 mt-0.5">{unit.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {release.presaveLink && (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open(release.presaveLink, "_blank")} className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0" style={{ background: `linear-gradient(135deg, ${themeColor}, ${highlightColor})`, color: "#fff", boxShadow: `0 4px 15px ${themeColor}30` }}>
                    PRÉ-SAVE
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 🎬 VÍDEO EM DESTAQUE
// ============================================================
const FeaturedVideo = ({ videoUrl, themeColor, highlightColor }: any) => {
  if (!videoUrl) return null;
  const getYouTubeId = (url: string) => { const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/); return match ? match[1] : ""; };
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.Video size={20} style={{ color: themeColor }} /></div>
          <div><h3 className="text-white font-bold text-xl">Vídeo em Destaque</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">Assista agora</p></div>
        </div>
        <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(videoUrl)}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ border: "none" }} />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 🎵 LYRICS CARD
// ============================================================
const LyricsCard = ({ lyrics, themeColor, highlightColor }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  if (!lyrics?.text) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.Music size={20} style={{ color: themeColor }} /></div>
            <div><h3 className="text-white font-bold text-xl">{lyrics.title || "Letra em Destaque"}</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">{lyrics.artist || ""}</p></div>
          </div>
          {lyrics.audioUrl && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleAudio} className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}, ${highlightColor})`, boxShadow: `0 0 25px ${themeColor}40` }}>
              {isPlaying ? <Icons.Pause size={20} fill="#fff" color="#fff" /> : <Icons.Play size={20} fill="#fff" color="#fff" />}
            </motion.button>
          )}
          {lyrics.audioUrl && <audio ref={audioRef} src={lyrics.audioUrl} onEnded={() => setIsPlaying(false)} />}
        </div>
        <div className="relative rounded-xl p-5 overflow-hidden" style={{ background: `${themeColor}05`, borderColor: `${themeColor}15`, borderWidth: "1px", borderStyle: "solid" }}>
          <Icons.Quote size={40} className="absolute top-2 left-2 opacity-10" style={{ color: themeColor }} />
          <p className="text-white/80 text-sm leading-relaxed italic relative z-10 whitespace-pre-line">{lyrics.text}</p>
          <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full" style={{ background: `linear-gradient(to bottom, ${themeColor}, ${highlightColor})` }} />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 📸 GALERIA DE FOTOS
// ============================================================
const GallerySection = ({ images, themeColor, highlightColor }: any) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images?.length) return null;

  const handleNext = () => { const next = (currentIndex + 1) % images.length; setCurrentIndex(next); setSelectedImage(images[next]); };
  const handlePrev = () => { const prev = (currentIndex - 1 + images.length) % images.length; setCurrentIndex(prev); setSelectedImage(images[prev]); };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.Image size={20} style={{ color: themeColor }} /></div>
            <div><h3 className="text-white font-bold text-xl">Galeria</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">Fotos e bastidores</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {images.slice(0, 4).map((image: any, i: number) => (
              <motion.div key={image.id || i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65 + i * 0.05 }} whileHover={{ scale: 1.02 }} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group" onClick={() => { setSelectedImage(image); setCurrentIndex(i); }}>
                <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><p className="text-white text-xs font-medium truncate">{image.title}</p></div>
              </motion.div>
            ))}
          </div>
          {images.length > 4 && (
            <motion.button whileHover={{ scale: 1.02 }} className="w-full mt-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2" style={{ background: `${themeColor}10`, borderColor: `${themeColor}30`, borderWidth: "1px", color: themeColor }} onClick={() => { setSelectedImage(images[0]); setCurrentIndex(0); }}>
              <Icons.GalleryHorizontal size={12} /> Ver todas ({images.length})
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"><Icons.X size={24} /></button>
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full rounded-2xl" />
              <div className="mt-4 text-center"><h4 className="text-white font-bold">{selectedImage.title}</h4>{selectedImage.description && <p className="text-white/60 text-sm mt-1">{selectedImage.description}</p>}</div>
              {images.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"><Icons.ChevronLeft size={20} className="text-white" /></button>
                  <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"><Icons.ChevronRight size={20} className="text-white" /></button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================
// 💬 FAN WALL
// ============================================================
const FanWall = ({ testimonials, themeColor, highlightColor }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!testimonials?.length) return null;
  useEffect(() => { const interval = setInterval(() => setActiveIndex((prev) => (prev + 1) % testimonials.length), 5000); return () => clearInterval(interval); }, [testimonials.length]);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.Heart size={20} style={{ color: themeColor }} /></div>
          <div><h3 className="text-white font-bold text-xl">Fan Wall</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">O que os fãs dizem</p></div>
        </div>
        <div className="relative overflow-hidden" style={{ minHeight: "160px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="rounded-xl p-5" style={{ background: `${themeColor}05`, borderColor: `${themeColor}15`, borderWidth: "1px", borderStyle: "solid" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: `linear-gradient(135deg, ${themeColor}40, ${highlightColor}30)`, color: themeColor }}>{testimonials[activeIndex].name?.charAt(0) || "?"}</div>
                <div><p className="text-white font-bold text-sm">{testimonials[activeIndex].name}</p><p className="text-white/30 text-[10px]">{testimonials[activeIndex].location || ""}</p></div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (<Icons.Star key={i} size={12} fill={i < (testimonials[activeIndex].stars || 5) ? themeColor : "none"} color={i < (testimonials[activeIndex].stars || 5) ? themeColor : `${themeColor}30`} />))}
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic">&ldquo;{testimonials[activeIndex].text}&rdquo;</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_: any, i: number) => (<button key={i} onClick={() => setActiveIndex(i)} className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: i === activeIndex ? themeColor : `${themeColor}30`, transform: i === activeIndex ? "scale(1.5)" : "scale(1)" }} />))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// ✉️ NEWSLETTER
// ============================================================
const NewsletterSection = ({ newsletterUrl, themeColor, highlightColor }: any) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !newsletterUrl) return;
    setStatus("loading");
    try { await new Promise(resolve => setTimeout(resolve, 1000)); setStatus("success"); setEmail(""); setTimeout(() => setStatus("idle"), 3000); }
    catch (error) { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
  };

  if (!newsletterUrl) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.Mail size={20} style={{ color: themeColor }} /></div>
          <div><h3 className="text-white font-bold text-xl">Newsletter</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">Receba novidades em primeira mão</p></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="email" placeholder="Seu melhor e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-all" style={{ borderColor: `${themeColor}30` }} required />
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={status === "loading"} className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all" style={{ background: `linear-gradient(135deg, ${themeColor}, ${highlightColor})`, boxShadow: `0 0 20px ${themeColor}40` }}>
            {status === "loading" ? <Icons.Loader2 size={16} className="animate-spin" /> : status === "success" ? <><Icons.Check size={16} /> INSCRITO!</> : status === "error" ? <><Icons.X size={16} /> ERRO - TENTE NOVAMENTE</> : <><Icons.Send size={16} /> INSCREVER-SE</>}
          </motion.button>
        </form>
        <p className="text-white/30 text-[9px] text-center mt-3">Ao se inscrever, você concorda com nossa política de privacidade</p>
      </div>
    </motion.div>
  );
};

// ============================================================
// 🎟️ TOUR DATES (ADICIONADO!)
// ============================================================
const TourDates = ({ tourDates, themeColor, highlightColor }: any) => {
  const [expanded, setExpanded] = useState(false);
  if (!tourDates?.length) return null;
  const displayedDates = expanded ? tourDates : tourDates.slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.MapPin size={20} style={{ color: themeColor }} /></div>
          <div><h3 className="text-white font-bold text-xl">Tour Dates</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">Próximos shows</p></div>
        </div>
        <div className="space-y-3">
          {displayedDates.map((date: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: `${themeColor}05`, borderColor: `${themeColor}15`, borderWidth: "1px", borderStyle: "solid" }}>
              <div className="text-center flex-shrink-0 w-14">
                <p className="text-2xl font-black leading-none" style={{ color: themeColor }}>{new Date(date.date).getDate()}</p>
                <p className="text-[9px] text-white/40 uppercase mt-1">{new Date(date.date).toLocaleString("pt-BR", { month: "short" }).replace(".", "")}</p>
              </div>
              <div className="flex-1 min-w-0"><h4 className="text-white font-bold text-sm truncate">{date.city}</h4><p className="text-white/40 text-xs truncate">{date.venue}</p></div>
              {date.ticketLink && (
                <motion.a href={date.ticketLink} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0" style={{ background: `linear-gradient(135deg, ${themeColor}, ${highlightColor})`, color: "#fff", boxShadow: `0 4px 15px ${themeColor}30` }}>TICKETS</motion.a>
              )}
            </motion.div>
          ))}
        </div>
        {tourDates.length > 3 && (
          <button onClick={() => setExpanded(!expanded)} className="w-full mt-3 py-2 text-xs font-medium flex items-center justify-center gap-1 rounded-lg" style={{ color: themeColor, background: `${themeColor}08` }}>
            {expanded ? <><Icons.ChevronUp size={14} /> VER MENOS</> : <><Icons.ChevronDown size={14} /> VER MAIS ({tourDates.length - 3} shows)</>}
          </button>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================
// 🛍️ MERCH STORE (ADICIONADO!)
// ============================================================
const MerchStore = ({ merchItems, themeColor, highlightColor }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!merchItems?.length) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="w-full rounded-2xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 8px 32px ${themeColor}10` }}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)` }}><Icons.ShoppingBag size={20} style={{ color: themeColor }} /></div>
            <div><h3 className="text-white font-bold text-xl">Merch Store</h3><p className="text-white/30 text-[10px] uppercase tracking-wider">Produtos oficiais</p></div>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setActiveIndex((prev) => (prev - 1 + merchItems.length) % merchItems.length)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${themeColor}15` }}><Icons.ChevronLeft size={16} style={{ color: themeColor }} /></button>
            <button onClick={() => setActiveIndex((prev) => (prev + 1) % merchItems.length)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${themeColor}15` }}><Icons.ChevronRight size={16} style={{ color: themeColor }} /></button>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <motion.div className="flex" animate={{ x: `-${activeIndex * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 15 }}>
            {merchItems.map((item: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="rounded-xl overflow-hidden" style={{ background: `${themeColor}05`, borderColor: `${themeColor}15`, borderWidth: "1px", borderStyle: "solid" }}>
                  <div className="relative w-full h-48 overflow-hidden">
                    {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}20, ${highlightColor}10)` }}><Icons.Shirt size={48} style={{ color: themeColor, opacity: 0.5 }} /></div>}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: themeColor, color: "#fff" }}>{item.price}</div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <p className="text-white/40 text-xs mt-1 line-clamp-2">{item.description}</p>
                    {item.buyLink && (
                      <motion.a href={item.buyLink} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${themeColor}, ${highlightColor})`, color: "#fff", boxShadow: `0 4px 15px ${themeColor}30` }}>
                        <Icons.ShoppingCart size={14} /> COMPRAR
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {merchItems.map((_: any, i: number) => (<button key={i} onClick={() => setActiveIndex(i)} className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: i === activeIndex ? themeColor : `${themeColor}30`, transform: i === activeIndex ? "scale(1.5)" : "scale(1)" }} />))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 🎴 POP CARD
// ============================================================
const PopCard = ({ item, themeColor, highlightColor }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const getIcon = (iconName: string) => { if (!iconName) return <Icons.Sparkles size={20} />; const name = iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase(); const Icon = (Icons as any)[name]; return Icon ? <Icon size={20} /> : <Icons.Sparkles size={20} />; };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02, y: -3 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} className="relative group w-full cursor-pointer" onClick={() => item.url && window.open(item.url, "_blank")}>
      <div className="relative rounded-2xl transition-all duration-500 overflow-hidden p-4" style={{ background: isHovered ? `linear-gradient(135deg, ${themeColor}15, ${highlightColor}08)` : `linear-gradient(135deg, ${themeColor}08, ${highlightColor}04)`, backdropFilter: "blur(20px)", borderColor: isHovered ? `${themeColor}60` : `${themeColor}25`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: isHovered ? `0 0 40px ${themeColor}40` : `0 4px 15px ${themeColor}10` }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-3/4 transition-all duration-500 rounded-r-full" style={{ background: `linear-gradient(to bottom, ${themeColor}, ${highlightColor})` }} />
        <div className="relative z-10 flex items-center gap-4 pl-2">
          <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }} className="relative">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${themeColor}30, ${highlightColor}20)`, boxShadow: isHovered ? `0 0 20px ${themeColor}40` : "none" }}><span style={{ color: themeColor }}>{getIcon(item.icon)}</span></div>
          </motion.div>
          <div className="flex-1"><h3 className="font-bold text-white text-base">{item.label}</h3>{item.description && <p className="text-white/50 text-xs mt-0.5">{item.description}</p>}</div>
          <motion.div animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.5 }} transition={{ duration: 0.2 }}><Icons.ArrowRight size={18} style={{ color: isHovered ? themeColor : undefined }} className="text-white/30" /></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 🎵 STREAMING CARD
// ============================================================
const StreamingCard = ({ platform, url, themeColor }: any) => {
  const icons: any = { spotify: Icons.Music, youtube: Icons.YoutubeIcon, apple: Icons.Apple, soundcloud: Icons.Cloud, tidal: Icons.Waves, deezer: Icons.Headphones, amazon: Icons.ShoppingBag };
  const colors: any = { spotify: "#1DB954", youtube: "#FF0000", apple: "#FA2B5E", soundcloud: "#FF5500", tidal: "#000000", deezer: "#A238FF", amazon: "#FF9900" };
  const Icon = icons[platform?.toLowerCase()] || Icons.PlayCircle;
  const platformColor = colors[platform?.toLowerCase()] || themeColor;
  return (
    <motion.a href={url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }} className="block">
      <div className="rounded-xl p-3.5 transition-all duration-300 flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${platformColor}20, ${platformColor}10)`, borderColor: `${platformColor}40`, borderWidth: "1px", borderStyle: "solid", boxShadow: `0 4px 15px ${platformColor}10` }}>
        <span style={{ color: platformColor }}><Icon size={20} /></span>
        <span className="text-white font-bold text-sm">{platform}</span>
      </div>
    </motion.a>
  );
};

// ============================================================
// 🔗 SOCIAL LINK
// ============================================================
const SocialLink = ({ link, themeColor }: any) => {
  const getIcon = (iconName: string) => { const name = iconName?.charAt(0).toUpperCase() + iconName?.slice(1).toLowerCase(); const Icon = (Icons as any)[name]; return Icon ? <Icon size={20} /> : <Icons.Link size={20} />; };
  return (
    <motion.a href={link.url} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, scale: 1.15 }} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1 group">
      <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: `linear-gradient(135deg, ${link.color || themeColor}15, ${link.color || themeColor}08)`, borderColor: `${link.color || themeColor}40`, borderWidth: "1.5px", borderStyle: "solid", boxShadow: `0 0 15px ${link.color || themeColor}20` }}>
        <div className="transition-all duration-300 group-hover:scale-110" style={{ color: link.color || themeColor }}>{getIcon(link.icon)}</div>
      </div>
      <span className="text-[9px] text-white/40 group-hover:text-white/70 transition-colors">{link.label}</span>
    </motion.a>
  );
};

// ============================================================
// 🏠 COMPONENTE PRINCIPAL
// ============================================================
export default function PopCulturePage() {
  const [mainItems, setMainItems] = useState<any[]>([]);
  const [streamingLinks, setStreamingLinks] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [releases, setReleases] = useState<any[]>([]);
  const [tourDates, setTourDates] = useState<any[]>([]);
  const [merchItems, setMerchItems] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [lyrics, setLyrics] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_CSV);
        const text = await response.text();
        const data = Papa.parse(text, { header: true, skipEmptyLines: true }).data;

        if (data && data.length > 0) {
          const primeiraLinha = data[0] as any;

          const mainList: any[] = [];
          const streamingList: any[] = [];
          const socialList: any[] = [];
          const releasesList: any[] = [];
          const tourList: any[] = [];
          const merchList: any[] = [];
          const galleryList: any[] = [];
          const testimonialList: any[] = [];
          const statsList: any[] = [];
          let lyricsData: any = null;

          data.forEach((row: any) => {
            if (row.pop_main_label?.trim()) mainList.push({ label: row.pop_main_label, url: row.pop_main_url || "#", icon: row.pop_main_icon || "Sparkles", description: row.pop_main_description || "" });
            if (row.pop_streaming_platform?.trim()) streamingList.push({ platform: row.pop_streaming_platform, url: row.pop_streaming_url || "#" });
            if (row.pop_social_label?.trim()) socialList.push({ label: row.pop_social_label, url: row.pop_social_url || "#", icon: row.pop_social_icon || "Instagram", color: row.pop_social_color || "" });
            if (row.pop_release_title?.trim()) releasesList.push({ id: `release_${releasesList.length}`, title: row.pop_release_title, type: row.pop_release_type || "Single", date: row.pop_release_date, image: row.pop_release_image || "", presaveLink: row.pop_release_presave || "" });
            if (row.pop_tour_city?.trim()) tourList.push({ city: row.pop_tour_city, venue: row.pop_tour_venue || "", date: row.pop_tour_date, ticketLink: row.pop_tour_ticket || "" });
            if (row.pop_merch_name?.trim()) merchList.push({ name: row.pop_merch_name, description: row.pop_merch_description || "", price: row.pop_merch_price || "$0", image: row.pop_merch_image || "", buyLink: row.pop_merch_link || "" });
            if (row.pop_gallery_url?.trim()) galleryList.push({ url: row.pop_gallery_url, title: row.pop_gallery_title || "", description: row.pop_gallery_description || "" });
            if (row.pop_testimonial_text?.trim()) testimonialList.push({ name: row.pop_testimonial_name || "Fã", location: row.pop_testimonial_location || "", text: row.pop_testimonial_text, stars: parseInt(row.pop_testimonial_stars || "5") });
            if (row.pop_stat_label?.trim()) statsList.push({ label: row.pop_stat_label, value: row.pop_stat_value || "0" });
            if (row.pop_lyrics_text?.trim()) lyricsData = { title: row.pop_lyrics_title || "Letra", artist: row.pop_lyrics_artist || "", text: row.pop_lyrics_text, audioUrl: row.pop_lyrics_audio || "" };
          });

          setConfig({
            title: primeiraLinha.pop_title || "LOULIFE",
            subtitle: primeiraLinha.pop_subtitle || "CHOOSE WISELY",
            mainCta: primeiraLinha.pop_main_cta || "STREAM NOW",
            themeColor: primeiraLinha.pop_theme_color || "#FF1744",
            highlightColor: primeiraLinha.pop_highlight_color || "#7C4DFF",
            avatar: primeiraLinha.pop_avatar || "",
            heroImage: primeiraLinha.pop_hero_image || primeiraLinha.pop_avatar,
            heroBackground: primeiraLinha.pop_hero_background || "",
            bio: primeiraLinha.pop_bio || "",
            featuredVideo: primeiraLinha.pop_featured_video || "",
            newsletterUrl: primeiraLinha.pop_newsletter_url || "",
            badges: primeiraLinha.pop_badges ? primeiraLinha.pop_badges.split(",") : [],
          });

          setMainItems(mainList);
          setStreamingLinks(streamingList);
          setSocialLinks(socialList);
          setReleases(releasesList);
          setTourDates(tourList);
          setMerchItems(merchList);
          setGalleryImages(galleryList);
          setTestimonials(testimonialList);
          setStats(statsList);
          setLyrics(lyricsData);
        }
      } catch (error) { console.error("Erro:", error); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <motion.div className="w-16 h-16 border-4 border-t-transparent rounded-full mx-auto mb-6" style={{ borderColor: `${config?.themeColor || "#FF1744"}40`, borderTopColor: config?.themeColor || "#FF1744" }} animate={{ rotate: [0, 360] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <p className="text-white/40 text-sm tracking-wider">CARREGANDO EXPERIÊNCIA...</p>
        </div>
      </div>
    );
  }

  const themeColor = config?.themeColor || "#FF1744";
  const highlightColor = config?.highlightColor || "#7C4DFF";

  return (
    <div className="min-h-screen relative">
      <PopArtBackground themeColor={themeColor} highlightColor={highlightColor} />

      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-4 z-30 w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${themeColor}, ${highlightColor})`, boxShadow: `0 0 20px ${themeColor}40` }}
          >
            <Icons.ChevronUp size={24} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center px-6 pt-8 pb-40 max-w-md mx-auto">
        <HeroSection config={config} themeColor={themeColor} highlightColor={highlightColor} />
        
        {config.bio && <BioCard bio={config.bio} stats={stats} themeColor={themeColor} highlightColor={highlightColor} />}
        {releases.length > 0 && <UpcomingReleases releases={releases} themeColor={themeColor} highlightColor={highlightColor} />}
        {tourDates.length > 0 && <TourDates tourDates={tourDates} themeColor={themeColor} highlightColor={highlightColor} />}
        {merchItems.length > 0 && <MerchStore merchItems={merchItems} themeColor={themeColor} highlightColor={highlightColor} />}
        {mainItems.length > 0 && <div className="w-full space-y-3 mb-6">{mainItems.map((item, index) => <PopCard key={index} item={item} themeColor={themeColor} highlightColor={highlightColor} />)}</div>}
        {lyrics && <LyricsCard lyrics={lyrics} themeColor={themeColor} highlightColor={highlightColor} />}
        {config.featuredVideo && <FeaturedVideo videoUrl={config.featuredVideo} themeColor={themeColor} highlightColor={highlightColor} />}
        {galleryImages.length > 0 && <GallerySection images={galleryImages} themeColor={themeColor} highlightColor={highlightColor} />}
        {testimonials.length > 0 && <FanWall testimonials={testimonials} themeColor={themeColor} highlightColor={highlightColor} />}
        {config.newsletterUrl && <NewsletterSection newsletterUrl={config.newsletterUrl} themeColor={themeColor} highlightColor={highlightColor} />}
        
        {streamingLinks.length > 0 && (
          <div className="w-full mb-6">
            <div className="flex items-center justify-center gap-2 mb-4"><Icons.Headphones size={16} style={{ color: themeColor }} /><h3 className="text-xs font-bold uppercase tracking-widest text-white/50">{config.mainCta || "STREAM NOW"}</h3></div>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(streamingLinks.length, 3)}, 1fr)` }}>{streamingLinks.map((link, index) => <StreamingCard key={index} platform={link.platform} url={link.url} themeColor={themeColor} />)}</div>
          </div>
        )}
      </div>

      {socialLinks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`fixed bottom-0 left-0 right-0 z-20 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl border-t border-white/5" : "bg-transparent"}`}>
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex justify-center gap-6 flex-wrap">{socialLinks.map((link, index) => <SocialLink key={index} link={link} themeColor={themeColor} />)}</div>
            <div className="w-24 h-0.5 rounded-full mx-auto mt-4" style={{ background: `linear-gradient(to right, ${themeColor}, ${highlightColor}, ${themeColor})` }} />
          </div>
        </motion.div>
      )}
    </div>
  );
}