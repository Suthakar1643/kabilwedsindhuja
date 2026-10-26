/**
 * Royal Digital Wedding Invitation - Interactive Script
 * Couple: T.A. Kabilan ITI. & A. Indhuja B.Sc.
 * 100% Real Couple Photos, Video Player, Audio Player, Canvas Petals, 32+ Album
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PETAL CANVAS ANIMATION
  initPetalCanvas();

  // 2. LIVE COUNTDOWN TIMER (11.11.2026, 09:00 AM)
  initCountdown();

  // 3. SOOTHING WEDDING INSTRUMENTAL (WEB AUDIO SYNTHESIZER)
  initAudioPlayer();

  // 4. BILINGUAL LANGUAGE SWITCHER (EN <-> TA)
  initLanguageSwitcher();

  // 5. PERSONALIZED GUEST URL PARSER
  initGuestPersonalization();

  // 6. ADD TO CALENDAR (.ICS DOWNLOAD FOR 11.11.2026)
  initCalendarAction();

  // 7. RSVP VIA WHATSAPP & BLESSINGS WALL
  initRsvpHandler();

  // 8. SHARE & HOST TOOLS
  initShareAndHostTools();

  // 9. 32-PHOTO REAL COUPLE ALBUM & FULLSCREEN LIGHTBOX
  initPhotoGallery();

  // 10. CINEMATIC VIDEO INVITATION STUDIO (Canvas Animated Video & Video Download)
  initCinematicVideoStudio();

  // 11. ROYAL WAX-SEALED ENVELOPE OPENING EXPERIENCE
  initRoyalEnvelope();

  // 12. THEME MOOD SWITCHER (Maroon, Emerald, Purple)
  initThemeMoodSwitcher();
});

/* ==========================================================================
   1. Flower Petals & Gold Sparkles Animation (Canvas)
   ========================================================================== */
function initPetalCanvas() {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = window.innerWidth < 600 ? 20 : 40;
  const colors = [
    { r: 255, g: 183, b: 77, alpha: 0.8 },  // Marigold Orange
    { r: 255, g: 215, b: 0, alpha: 0.85 },  // Auspicious Gold
    { r: 255, g: 192, b: 203, alpha: 0.7 }, // Soft Rose Pink
    { r: 255, g: 248, b: 220, alpha: 0.9 }, // Jasmine White
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.1 + 0.7;
      this.speedX = Math.random() * 1 - 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.03;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.8 + this.speedX;
      this.angle += this.angularSpeed;
      this.flip += this.flipSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(Math.sin(this.flip), 1);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size, -this.size * 0.8, this.size * 1.5, this.size * 0.8, 0, this.size * 2);
      ctx.bezierCurveTo(-this.size * 1.5, this.size * 0.8, -this.size, -this.size * 0.8, 0, 0);

      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Auspicious Muhurtham Countdown Timer (11th November 2026, 09:00 AM IST)
   ========================================================================== */
function initCountdown() {
  const weddingDate = new Date('2026-11-11T09:00:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. Soothing Wedding Carnatic Melody (Web Audio API Synthesizer)
   ========================================================================== */
function initAudioPlayer() {
  const musicBtn = document.getElementById('music-toggle-btn');
  const equalizer = document.getElementById('equalizer');
  if (!musicBtn) return;

  let isPlaying = false;
  let audioCtx = null;
  let melodyTimer = null;

  // Auspicious Carnatic Raga Mohanam (Sa, Ri2, Ga3, Pa, Dha2)
  const mohanamNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 293.66];
  let currentNoteIdx = 0;

  function playNote(freq, duration = 0.8) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      const now = audioCtx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  function startMelody() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = true;
    musicBtn.classList.add('playing');
    const musicIcon = document.getElementById('music-icon');
    if (musicIcon) musicIcon.classList.add('playing');
    if (equalizer) equalizer.classList.add('playing');
    showToast('🎵 Playing Auspicious Wedding Instrumental');

    melodyTimer = setInterval(() => {
      const freq = mohanamNotes[currentNoteIdx];
      playNote(freq, 0.95);
      currentNoteIdx = (currentNoteIdx + 1) % mohanamNotes.length;
    }, 900);
  }

  function stopMelody() {
    isPlaying = false;
    musicBtn.classList.remove('playing');
    const musicIcon = document.getElementById('music-icon');
    if (musicIcon) musicIcon.classList.remove('playing');
    if (equalizer) equalizer.classList.remove('playing');
    if (melodyTimer) clearInterval(melodyTimer);
    showToast('Audio Paused');
  }

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  });
}

/* ==========================================================================
   ROYAL ENVELOPE UNBOXING EXPERIENCE
   ========================================================================== */
function initRoyalEnvelope() {
  const overlay = document.getElementById('royal-envelope-overlay');
  const openBtn = document.getElementById('open-envelope-btn');
  const waxSeal = document.getElementById('wax-seal-btn');
  const musicBtn = document.getElementById('music-toggle-btn');

  function openEnvelope() {
    if (!overlay) return;
    overlay.classList.add('opened');
    showToast('✨ மங்களகரமான திருமண நல்வரவு! ✨');

    // Trigger music automatically upon opening royal invitation
    if (musicBtn && !musicBtn.classList.contains('playing')) {
      musicBtn.click();
    }
  }

  if (openBtn) openBtn.addEventListener('click', openEnvelope);
  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
}

/* ==========================================================================
   ROYAL THEME MOOD SWITCHER (Maroon, Emerald, Purple)
   ========================================================================== */
function initThemeMoodSwitcher() {
  const moodBtns = document.querySelectorAll('.mood-btn');
  if (!moodBtns.length) return;

  const themeNames = {
    maroon: '🔴 ராஜ கம்பீர மெரூன் & தங்க தீம் (Royal Maroon Gold)',
    emerald: '🟢 கோவில் மரகதப் பட்டு & தங்க தீம் (Temple Emerald Gold)',
    purple: '🟣 மாலை வரவேற்பு லாவெண்டர் தீம் (Reception Lilac Purple)',
  };

  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.getAttribute('data-theme');
      document.body.classList.remove('theme-maroon', 'theme-emerald', 'theme-purple');

      if (theme !== 'maroon') {
        document.body.classList.add(`theme-${theme}`);
      }

      showToast(themeNames[theme] || 'Theme Updated');
    });
  });
}

/* ==========================================================================
   4. Bilingual Switcher (English <-> Tamil)
   ========================================================================== */
function initLanguageSwitcher() {
  const langBtn = document.getElementById('lang-toggle-btn');
  if (!langBtn) return;

  let currentLang = 'en';

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ta' : 'en';

    const translatableElements = document.querySelectorAll('[data-en][data-ta]');
    translatableElements.forEach((el) => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    if (currentLang === 'ta') {
      langBtn.querySelector('.lang-badge').textContent = 'ENG';
      langBtn.querySelector('.btn-label').textContent = 'English';
      showToast('தமிழ் மொழிக்கு மாற்றப்பட்டது 🌸');
    } else {
      langBtn.querySelector('.lang-badge').textContent = 'தமிழ்';
      langBtn.querySelector('.btn-label').textContent = 'Tamil';
      showToast('Switched to English 🌸');
    }
  });
}

/* ==========================================================================
   5. Personalized Guest Greeting via URL (?guest=FamilyName)
   ========================================================================== */
function initGuestPersonalization() {
  const banner = document.getElementById('guest-welcome-banner');
  const guestNameText = document.getElementById('guest-name-text');
  if (!banner || !guestNameText) return;

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('guest') || urlParams.get('to');

  if (guestParam) {
    const formattedGuest = decodeURIComponent(guestParam).replace(/\+/g, ' ');
    guestNameText.textContent = `A Warm Welcome to ${formattedGuest}!`;
    banner.classList.remove('hidden');

    const rsvpNameInput = document.getElementById('guest-name');
    if (rsvpNameInput) {
      rsvpNameInput.value = formattedGuest;
    }
  }
}

/* ==========================================================================
   6. Add to Calendar Action (.ICS for 11th Nov 2026)
   ========================================================================== */
function initCalendarAction() {
  const calBtn = document.getElementById('btn-add-calendar');
  if (!calBtn) return;

  calBtn.addEventListener('click', () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kabilan and Indhuja//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:Wedding of T.A. Kabilan & A. Indhuja',
      'DESCRIPTION:Sacred Wedding Ceremony at Sri Vaithiyalingaswami Annai Yogambigai Temple, Aladipatti.',
      'LOCATION:Sri Vaithiyalingaswami Annai Yogambigai Thirukoil, Aladipatti',
      'DTSTART:20261111T033000Z', // 9:00 AM IST is 03:30 UTC
      'DTEND:20261111T053000Z',   // 11:00 AM IST
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Kabilan_Indhuja_Wedding_Invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📅 Calendar Invite Downloaded!');
  });
}

/* ==========================================================================
   7. RSVP via WhatsApp & Live Wishes Wall
   ========================================================================== */
function initRsvpHandler() {
  const form = document.getElementById('rsvp-form');
  const blessingsList = document.getElementById('blessings-list');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guest-name').value.trim();
    const attendance = document.getElementById('rsvp-attendance').value;
    const members = document.getElementById('guest-count').value;
    const message = document.getElementById('blessing-message').value.trim();

    if (!name) {
      showToast('Please enter your name');
      return;
    }

    if (blessingsList) {
      const newCard = document.createElement('div');
      newCard.className = 'blessing-item';
      newCard.innerHTML = `
        <div class="blessing-author">${escapeHtml(name)}</div>
        <div class="blessing-text">${escapeHtml(message || 'Hearty congratulations to Kabilan & Indhuja!')}</div>
        <div class="blessing-time">Just now • ${escapeHtml(attendance)}</div>
      `;
      blessingsList.prepend(newCard);
    }

    const whatsappText = encodeURIComponent(
      `🙏 வணக்கம்!\n\n` +
      `*Wedding RSVP for T.A. Kabilan & A. Indhuja*\n` +
      `👤 *பெயர் (Name):* ${name}\n` +
      `✨ *வருகை (Status):* ${attendance}\n` +
      `👥 *நபர்கள் (Members):* ${members}\n` +
      (message ? `💌 *வாழ்த்து (Blessing):* "${message}"\n\n` : `\n`) +
      `மணமக்களுக்கு மனமார்ந்த நல்வாழ்த்துகள்! 🌸🪔`
    );

    const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');

    showToast('🎉 Thank you for your RSVP & Blessings!');
  });
}

/* ==========================================================================
   8. Share & Host Tools
   ========================================================================== */
function initShareAndHostTools() {
  const shareBtn = document.getElementById('share-btn');
  const createLinkBtn = document.getElementById('btn-create-guest-link');
  const customGuestInput = document.getElementById('custom-guest-input');
  const linkDisplay = document.getElementById('generated-link-display');
  const generatedUrlSpan = document.getElementById('generated-url');
  const copyBadge = document.getElementById('copy-badge');

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Wedding Invitation: T.A. Kabilan & A. Indhuja',
        text: 'Join us in celebrating the wedding of T.A. Kabilan & A. Indhuja at Aladipatti on 11.11.2026!',
        url: window.location.href.split('?')[0],
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          copyToClipboard(shareData.url);
        }
      } else {
        copyToClipboard(shareData.url);
      }
    });
  }

  if (createLinkBtn && customGuestInput) {
    createLinkBtn.addEventListener('click', () => {
      const name = customGuestInput.value.trim();
      if (!name) {
        showToast('Please enter guest name');
        return;
      }

      const baseUrl = window.location.href.split('?')[0];
      const customUrl = `${baseUrl}?guest=${encodeURIComponent(name)}`;

      if (generatedUrlSpan) generatedUrlSpan.textContent = customUrl;
      if (linkDisplay) linkDisplay.classList.remove('hidden');

      copyToClipboard(customUrl);
      if (copyBadge) {
        copyBadge.textContent = 'Copied!';
        setTimeout(() => {
          copyBadge.textContent = 'Copy';
        }, 3000);
      }
    });
  }
}

/* ==========================================================================
   9. 32-PHOTO ALBUM OF REAL COUPLE PHOTOS & FULLSCREEN LIGHTBOX
   Every single image is 100% KABILAN & INDHUJA's authentic photography!
   ========================================================================== */
function initPhotoGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const tabs = document.querySelectorAll('.gallery-tab');
  if (!galleryGrid) return;

  // Real photos source list:
  const P_CLOSEUP = 'assets/photo_closeup.jpg';
  const P_STANDING = 'assets/photo_standing.jpg';
  const P_DUO = 'assets/photo_duo.jpg';

  // Curated 32 Distinct Photographic Perspectives of Kabilan & Indhuja
  const album = [
    { id: 1, src: P_CLOSEUP, category: 'prewedding', filter: '', crop: 'crop-smile', tag: 'Master Portrait', title: 'The Radiant Smiles', desc: 'T.A. Kabilan & A. Indhuja smiling joyfully in traditional wedding attire.' },
    { id: 2, src: P_STANDING, category: 'prewedding', filter: '', crop: 'crop-full', tag: 'Full Portrait', title: 'Royal Standing Pose', desc: 'Kabilan & Indhuja in festive elegance against the open terrace.' },
    { id: 3, src: P_DUO, category: 'reception', filter: '', crop: 'crop-full', tag: 'Special Grace', title: 'Graceful Duo', desc: 'Indhuja gracefully draped in the contrast zari silk pallu alongside Kabilan.' },
    { id: 4, src: P_CLOSEUP, category: 'temple', filter: 'filter-warm', crop: 'crop-face', tag: 'Warm Glow', title: 'Eyes of Devotion', desc: 'Gentle warmth highlighting the traditional jasmine garlands.' },
    { id: 5, src: P_STANDING, category: 'temple', filter: 'filter-golden', crop: 'crop-saree', tag: 'Auspicious Silk', title: 'Pink Kanchipuram Grandeur', desc: 'Intricate golden zari mango motifs woven into the auspicious silk saree.' },
    { id: 6, src: P_CLOSEUP, category: 'prewedding', filter: 'filter-bw', crop: 'crop-face', tag: 'Monochrome Fine Art', title: 'Timeless Classic B&W', desc: 'Dramatic black and white capture celebrating their authentic connection.' },
    { id: 7, src: P_DUO, category: 'prewedding', filter: 'filter-sepia', crop: 'crop-face', tag: 'Vintage Heritage', title: 'Heritage Portrait', desc: 'Sepia toned classic Tamil wedding photographic print.' },
    { id: 8, src: P_STANDING, category: 'reception', filter: 'filter-cinematic', crop: 'crop-smile', tag: 'Cinematic', title: 'The Joyful Bond', desc: 'Rich cinematic contrast enhancing the vibrant festive colors.' },
    { id: 9, src: P_CLOSEUP, category: 'temple', filter: '', crop: 'crop-hands', tag: 'Sacred Gold', title: 'Traditional Gold Jewellery', desc: 'Detailed close-up of intricate traditional necklaces and gold chain.' },
    { id: 10, src: P_STANDING, category: 'prewedding', filter: 'filter-soft', crop: 'crop-face', tag: 'Groom Elegance', title: 'Kabilan’s Regal Charm', desc: 'Warm portrait highlighting groom Kabilan with tilak and bright smile.' },
    { id: 11, src: P_DUO, category: 'temple', filter: 'filter-golden', crop: 'crop-smile', tag: 'Bride Elegance', title: 'Indhuja’s Serenity', desc: 'Bride Indhuja radiating joy with traditional malli poo in hair.' },
    { id: 12, src: P_CLOSEUP, category: 'haldi', filter: 'filter-golden', crop: 'crop-face', tag: 'Festive Amber', title: 'Auspicious Amber Glow', desc: 'Golden festive tones reflecting celebration and blessings.' },
    { id: 13, src: P_STANDING, category: 'reception', filter: 'filter-warm', crop: 'crop-hands', tag: 'Hand in Hand', title: 'United For Life', desc: 'Standing strong and supportive hand in hand ready for life’s journey.' },
    { id: 14, src: P_DUO, category: 'haldi', filter: 'filter-warm', crop: 'crop-saree', tag: 'Vibrant Silk', title: 'Rich Silk Hues', desc: 'Close-up of the bright magenta pink and contrasting peacock green.' },
    { id: 15, src: P_CLOSEUP, category: 'prewedding', filter: 'filter-cinematic', crop: 'crop-smile', tag: 'Editorial Close-up', title: 'Pure Happiness', desc: 'Natural, unfiltered happiness of the loving couple.' },
    { id: 16, src: P_STANDING, category: 'temple', filter: 'filter-bw', crop: 'crop-full', tag: 'Fine Art B&W', title: 'Classic Couple Silhouette', desc: 'Stunning black and white framing of their full length portrait.' },
    { id: 17, src: P_DUO, category: 'reception', filter: 'filter-soft', crop: 'crop-smile', tag: 'Pastel Dream', title: 'Soft Romantic Mood', desc: 'Subtle highlights creating a dreamy pastel mood.' },
    { id: 18, src: P_CLOSEUP, category: 'haldi', filter: 'filter-golden', crop: 'crop-face', tag: 'Marigold Hues', title: 'Golden Haldi Radiance', desc: 'Warm yellow tones symbolizing prosperity and joy.' },
    { id: 19, src: P_STANDING, category: 'prewedding', filter: 'filter-sepia', crop: 'crop-smile', tag: 'Vintage Love', title: 'Vintage Keepsake', desc: 'Nostalgic antique photograph effect for everlasting memories.' },
    { id: 20, src: P_DUO, category: 'temple', filter: 'filter-warm', crop: 'crop-face', tag: 'Divine Blessing', title: 'Blessed Togetherness', desc: 'Ready for the sacred ceremonies at Aladipatti temple.' },
    { id: 21, src: P_CLOSEUP, category: 'reception', filter: 'filter-cinematic', crop: 'crop-face', tag: 'Royal Night', title: 'Reception Warmth', desc: 'Rich contrast capturing the regal celebration mood.' },
    { id: 22, src: P_STANDING, category: 'haldi', filter: 'filter-golden', crop: 'crop-face', tag: 'Festive Cheer', title: 'Joyful Laughter', desc: 'Candid smiles reminding everyone of the celebration to come.' },
    { id: 23, src: P_DUO, category: 'prewedding', filter: 'filter-bw', crop: 'crop-face', tag: 'Timeless Duo', title: 'Soulmates in Monochrome', desc: 'High-contrast black & white highlighting authentic expressions.' },
    { id: 24, src: P_CLOSEUP, category: 'temple', filter: 'filter-golden', crop: 'crop-saree', tag: 'Bangles & Ornaments', title: 'Traditional Glass Bangles', desc: 'Colorful auspicious glass bangles worn for the wedding festivities.' },
    { id: 25, src: P_STANDING, category: 'reception', filter: 'filter-soft', crop: 'crop-full', tag: 'Festive Attire', title: 'Matching Elegance', desc: 'The rich wine shirt paired with the festive Kanchipuram silk.' },
    { id: 26, src: P_DUO, category: 'prewedding', filter: 'filter-cinematic', crop: 'crop-full', tag: 'High Romance', title: 'The Perfect Match', desc: 'T.A. Kabilan & A. Indhuja posing together proudly.' },
    { id: 27, src: P_CLOSEUP, category: 'haldi', filter: 'filter-warm', crop: 'crop-smile', tag: 'Sandalwood Glow', title: 'Chandan & Kumkum', desc: 'Sacred tilak on their foreheads representing auspicious beginnings.' },
    { id: 28, src: P_STANDING, category: 'temple', filter: 'filter-golden', crop: 'crop-face', tag: 'Gopuram Vibes', title: 'Sacred Temple Hues', desc: 'Warm illumination mirroring the divine atmosphere of Aladipatti.' },
    { id: 29, src: P_DUO, category: 'reception', filter: 'filter-sepia', crop: 'crop-full', tag: 'Heritage Memories', title: 'Preserved Forever', desc: 'A timeless visual tribute for family and future generations.' },
    { id: 30, src: P_CLOSEUP, category: 'prewedding', filter: 'filter-soft', crop: 'crop-smile', tag: 'Pure Love', title: 'Two Hearts, One Soul', desc: 'Kabilan & Indhuja celebrating their lifelong promise.' },
    { id: 31, src: P_STANDING, category: 'temple', filter: 'filter-cinematic', crop: 'crop-smile', tag: 'The Auspicious Muhurtham', title: 'Waiting for 11.11.2026', desc: 'Counting down the days until the sacred Muhurtham ceremony.' },
    { id: 32, src: P_DUO, category: 'reception', filter: 'filter-warm', crop: 'crop-smile', tag: 'Grand Celebration', title: 'Welcome to Our Big Day!', desc: 'Eagerly waiting to receive and welcome all friends and families.' },
  ];

  let currentCategory = 'all';

  function renderGallery() {
    galleryGrid.innerHTML = '';
    const filtered = currentCategory === 'all' ? album : album.filter(item => item.category === currentCategory);

    filtered.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.setAttribute('data-id', photo.id);

      card.innerHTML = `
        <img src="${photo.src}" alt="${escapeHtml(photo.title)}" class="gallery-card-img ${photo.filter} ${photo.crop}" loading="lazy">
        <span class="gallery-tag-pill">${escapeHtml(photo.tag)}</span>
        <div class="gallery-card-overlay">
          <h4 class="gallery-card-title">${escapeHtml(photo.title)}</h4>
          <p class="gallery-card-desc">${escapeHtml(photo.desc)}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(filtered, index);
      });

      galleryGrid.appendChild(card);
    });
  }

  // Filter Tab Clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter');
      renderGallery();
    });
  });

  renderGallery();

  // LIGHTBOX LOGIC
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let activeList = [];
  let activeIndex = 0;

  function openLightbox(list, idx) {
    activeList = list;
    activeIndex = idx;
    updateLightbox();
    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = activeList[activeIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.className = `lightbox-img ${item.filter}`;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightboxCounter.textContent = `Photo ${activeIndex + 1} of ${activeList.length} • Real Couple Photo`;
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + activeList.length) % activeList.length;
      updateLightbox();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % activeList.length;
      updateLightbox();
    });
  }

  // Close on backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        activeIndex = (activeIndex - 1 + activeList.length) % activeList.length;
        updateLightbox();
      }
      if (e.key === 'ArrowRight') {
        activeIndex = (activeIndex + 1) % activeList.length;
        updateLightbox();
      }
    }
  });
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      showToast('🔗 Link copied to clipboard!');
    },
    () => {
      showToast('Unable to copy automatically');
    }
  );
}

function showToast(msg) {
  let toast = document.getElementById('toast-message');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.remove('hidden');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   10. CINEMATIC VIDEO INVITATION STUDIO
   Renders an Ultra-HD 9:16 Animated Wedding Video Story on Canvas
   With Real Couple Photos, Animated Tamil Typography, Garlands, and MP4/WebM Export!
   ========================================================================== */
function initCinematicVideoStudio() {
  const canvas = document.getElementById('cinema-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const overlay = document.getElementById('cinema-overlay');
  const bigPlayBtn = document.getElementById('cinema-play-big-btn');
  const playBtn = document.getElementById('v-play-btn');
  const playIcon = document.getElementById('v-play-icon');
  const playText = document.getElementById('v-play-text');
  const replayBtn = document.getElementById('v-replay-btn');
  const soundBtn = document.getElementById('v-sound-btn');
  const soundIcon = document.getElementById('v-sound-icon');
  const fullscreenBtn = document.getElementById('v-fullscreen-btn');
  const downloadBtn = document.getElementById('v-download-btn');
  const audioTrack = document.getElementById('wedding-audio-track');
  const progressSegments = document.querySelectorAll('.scene-progress-bar .progress-segment');

  // Load Couple Images into Image Objects
  const imgCloseup = new Image();
  imgCloseup.src = 'assets/photo_closeup.jpg';

  const imgStanding = new Image();
  imgStanding.src = 'assets/photo_standing.jpg';

  const imgDuo = new Image();
  imgDuo.src = 'assets/photo_duo.jpg';

  let isPlaying = false;
  let isMuted = false;
  let currentTime = 0; // In seconds
  const totalDuration = 28; // Total video duration in seconds
  let lastFrameTime = performance.now();
  let animationFrameId = null;

  // Scene timing definitions (5 scenes)
  const scenes = [
    { start: 0, duration: 5.5, id: 'invitation' },  // Scene 0: Divine Opening & Toranam
    { start: 5.5, duration: 6.5, id: 'couple' },      // Scene 1: Kabilan & Indhuja Portrait
    { start: 12.0, duration: 5.5, id: 'muhurtham' },  // Scene 2: Muhurtham & Temple
    { start: 17.5, duration: 5.5, id: 'reception' },  // Scene 3: Evening Reception
    { start: 23.0, duration: 5.0, id: 'blessing' },   // Scene 4: Heartfelt Welcome
  ];

  // Floating Sparkles for the Video
  const videoSparkles = Array.from({ length: 35 }, () => ({
    x: Math.random() * 720,
    y: Math.random() * 1280,
    r: Math.random() * 3 + 1.5,
    speed: Math.random() * 1.5 + 0.8,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  // Initial First Frame Render
  drawFrame(0);

  function drawFrame(time) {
    ctx.clearRect(0, 0, 720, 1280);

    // 1. Royal Dark Velvet Gradient Background
    const bgGrad = ctx.createRadialGradient(360, 400, 50, 360, 640, 720);
    bgGrad.addColorStop(0, '#2e0712');
    bgGrad.addColorStop(0.7, '#150308');
    bgGrad.addColorStop(1, '#080103');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 720, 1280);

    // 2. Ornate Gold Border & Corner Embellishments
    drawGoldBorder(ctx);

    // 3. Falling Gold Sparkles
    drawSparkles(ctx);

    // 4. Render Active Scene
    if (time < 5.5) {
      renderScene0_Opening(ctx, time);
      updateActiveSegment(0);
    } else if (time < 12.0) {
      renderScene1_Couple(ctx, time - 5.5);
      updateActiveSegment(1);
    } else if (time < 17.5) {
      renderScene2_Muhurtham(ctx, time - 12.0);
      updateActiveSegment(2);
    } else if (time < 23.0) {
      renderScene3_Reception(ctx, time - 17.5);
      updateActiveSegment(3);
    } else {
      renderScene4_Blessing(ctx, time - 23.0);
      updateActiveSegment(4);
    }
  }

  function updateActiveSegment(sceneIdx) {
    progressSegments.forEach((seg, i) => {
      if (i < sceneIdx) {
        seg.className = 'progress-segment completed';
      } else if (i === sceneIdx) {
        seg.className = 'progress-segment active';
      } else {
        seg.className = 'progress-segment';
      }
    });
  }

  /* --- Scene 0: Divine Invocation & Bells --- */
  function renderScene0_Opening(c, t) {
    const fade = Math.min(1, t / 0.8);
    c.save();
    c.globalAlpha = fade;

    // Floral Garland Toranam at Top
    drawToranam(c, t);

    // Auspicious Invocation
    c.textAlign = 'center';
    c.font = '600 24px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('|| சுபமஸ்து • ஓம் சரவணபவ ||', 360, 240);

    // Lord Murugan & Peacock Divine Emblem
    drawPeacockEmblem(c, 360, 390, t);

    // Grand Animated Title: "திருமண அழைப்பிதழ்"
    const titleScale = 1 + Math.sin(t * 1.5) * 0.02;
    c.save();
    c.translate(360, 560);
    c.scale(titleScale, titleScale);

    c.font = 'bold 52px "Cinzel Decorative", "Mukta Malar", serif';
    c.fillStyle = '#fbeea4';
    c.shadowColor = 'rgba(212, 175, 55, 0.8)';
    c.shadowBlur = 20;
    c.fillText('திருமண அழைப்பிதழ்', 0, 0);

    c.font = '300 22px "Outfit", sans-serif';
    c.shadowBlur = 0;
    c.fillStyle = '#e8d7cf';
    c.fillText('WEDDING INVITATION', 0, 44);
    c.restore();

    // Welcome subtitle
    c.font = '500 24px "Mukta Malar", sans-serif';
    c.fillStyle = '#f3e5ab';
    c.fillText('இறைவனின் திருவருளாலும்,', 360, 720);
    c.fillText('பெரியோர்களின் நல்லாசிகளுடனும்...', 360, 765);

    // Divine Brass Lamps (Kuthuvilakku)
    drawKuthuvilakku(c, 110, 940, t);
    drawKuthuvilakku(c, 610, 940, t);

    c.restore();
  }

  /* --- Scene 1: Kabilan & Indhuja Royal Portrait --- */
  function renderScene1_Couple(c, t) {
    const fade = Math.min(1, t / 0.8);
    c.save();
    c.globalAlpha = fade;

    // "மணமக்கள்" Title
    c.textAlign = 'center';
    c.font = '600 28px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.shadowColor = 'rgba(212, 175, 55, 0.6)';
    c.shadowBlur = 10;
    c.fillText('✨ மணமக்கள் ✨', 360, 140);

    // Couple Portrait in Royal Arch with Ken-Burns Camera Zoom
    const zoom = 1 + (t / 6.5) * 0.08;
    const archW = 460;
    const archH = 580;
    const archX = 360 - archW / 2;
    const archY = 190;

    // Glowing Arch Frame
    c.save();
    c.beginPath();
    c.roundRect(archX, archY, archW, archH, [180, 180, 24, 24]);
    c.strokeStyle = '#d4af37';
    c.lineWidth = 6;
    c.shadowColor = '#d4af37';
    c.shadowBlur = 25;
    c.stroke();
    c.clip();

    if (imgCloseup.complete) {
      c.save();
      c.translate(360, archY + archH / 2);
      c.scale(zoom, zoom);
      c.drawImage(imgCloseup, -archW / 2, -archH / 2, archW, archH);
      c.restore();
    }
    c.restore();

    // Groom & Bride Names in Grand Tamil Calligraphy
    c.textAlign = 'center';
    c.shadowBlur = 15;
    c.shadowColor = 'rgba(0,0,0,0.8)';

    c.font = 'bold 42px "Mukta Malar", "Cinzel Decorative", sans-serif';
    c.fillStyle = '#fff';
    c.fillText('T.A. கபிலன்', 360, 840);

    c.font = '600 20px "Outfit", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('ITI.,', 360, 875);

    c.font = 'italic 34px "Great Vibes", cursive';
    c.fillStyle = '#d4af37';
    c.fillText('&', 360, 925);

    c.font = 'bold 42px "Mukta Malar", "Cinzel Decorative", sans-serif';
    c.fillStyle = '#fff';
    c.fillText('A. இந்துஜா', 360, 985);

    c.font = '600 20px "Outfit", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('B.Sc.,', 360, 1020);

    // Auspicious tagline
    c.font = '400 22px "Mukta Malar", sans-serif';
    c.fillStyle = '#e5d3c8';
    c.fillText('இணைபிரியா தம்பதிகளாக இல்லறம் சிறக்க...', 360, 1100);

    c.restore();
  }

  /* --- Scene 2: Sacred Muhurtham & Aladipatti Temple --- */
  function renderScene2_Muhurtham(c, t) {
    const fade = Math.min(1, t / 0.8);
    c.save();
    c.globalAlpha = fade;

    // Header Badge
    drawBadge(c, 360, 120, 'புனித மணநாள் முகூர்த்தம்');

    // Date Card
    c.textAlign = 'center';
    c.font = 'bold 84px "Outfit", serif';
    c.fillStyle = '#fbeea4';
    c.shadowColor = 'rgba(212, 175, 55, 0.8)';
    c.shadowBlur = 20;
    c.fillText('11', 360, 240);

    c.font = '600 32px "Mukta Malar", sans-serif';
    c.shadowBlur = 8;
    c.fillStyle = '#fff';
    c.fillText('நவம்பர் 2026 (11.11.2026)', 360, 290);

    c.font = '500 26px "Mukta Malar", sans-serif';
    c.fillStyle = '#f3e5ab';
    c.fillText('புதன்கிழமை', 360, 335);

    // Time Box
    c.fillStyle = 'rgba(212, 175, 55, 0.15)';
    c.strokeStyle = '#d4af37';
    c.lineWidth = 1.5;
    c.beginPath();
    c.roundRect(140, 365, 440, 60, 30);
    c.fill();
    c.stroke();

    c.font = 'bold 24px "Mukta Malar", sans-serif';
    c.fillStyle = '#fff';
    c.fillText('⏰ காலை 9.00 முதல் 10.00 வரை', 360, 404);

    // Circular Photo of Standing Couple
    c.save();
    c.beginPath();
    c.arc(360, 620, 150, 0, Math.PI * 2);
    c.strokeStyle = '#fbeea4';
    c.lineWidth = 5;
    c.shadowColor = '#d4af37';
    c.shadowBlur = 20;
    c.stroke();
    c.clip();
    if (imgStanding.complete) {
      c.drawImage(imgStanding, 210, 470, 300, 300);
    }
    c.restore();

    // Venue Box
    c.font = '600 24px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('🛕 திருமண இடம்:', 360, 830);

    c.font = 'bold 28px "Mukta Malar", sans-serif';
    c.fillStyle = '#fff';
    c.fillText('ஸ்ரீ வைத்தியலிங்கசுவாமி', 360, 885);
    c.fillText('அன்னை யோகாம்பிகை திருக்கோவில்', 360, 930);

    c.font = 'bold 32px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('ஆலடிப்பட்டி', 360, 985);

    c.restore();
  }

  /* --- Scene 3: Evening Reception Ceremony --- */
  function renderScene3_Reception(c, t) {
    const fade = Math.min(1, t / 0.8);
    c.save();
    c.globalAlpha = fade;

    drawBadge(c, 360, 120, 'மகிழ்ச்சி நிறைந்த மாலை வரவேற்பு');

    // Date & Time
    c.textAlign = 'center';
    c.font = 'bold 42px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.shadowColor = 'rgba(212, 175, 55, 0.7)';
    c.shadowBlur = 15;
    c.fillText('11.11.2026 புதன்கிழமை', 360, 210);

    c.font = 'bold 30px "Mukta Malar", sans-serif';
    c.fillStyle = '#fff';
    c.fillText('மாலை 6.00 மணிக்கு மேல்', 360, 265);

    // Arch Photo of Duo
    c.save();
    c.beginPath();
    c.roundRect(160, 310, 400, 480, 24);
    c.strokeStyle = '#d4af37';
    c.lineWidth = 4;
    c.shadowColor = '#d4af37';
    c.shadowBlur = 20;
    c.stroke();
    c.clip();
    if (imgDuo.complete) {
      c.drawImage(imgDuo, 160, 310, 400, 480);
    }
    c.restore();

    // Mandapam Venue
    c.font = '600 24px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('🏛️ வரவேற்பு அரங்கம்:', 360, 850);

    c.font = 'bold 28px "Mukta Malar", sans-serif';
    c.fillStyle = '#fff';
    c.fillText('ஸ்ரீ வைத்தியலிங்கசுவாமி கோவில் கீழ்', 360, 905);
    c.fillText('திருமண மண்டபம்', 360, 950);

    c.font = 'bold 32px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('ஆலடிப்பட்டி', 360, 1005);

    c.font = '400 22px "Mukta Malar", sans-serif';
    c.fillStyle = '#e8d5cb';
    c.fillText('சுவையான இரவு விருந்து உபசரிப்பு உண்டு', 360, 1070);

    c.restore();
  }

  /* --- Scene 4: Heartfelt Invitation & Welcome --- */
  function renderScene4_Blessing(c, t) {
    const fade = Math.min(1, t / 0.8);
    c.save();
    c.globalAlpha = fade;

    drawToranam(c, t);

    c.textAlign = 'center';
    c.font = 'bold 34px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.shadowColor = 'rgba(212, 175, 55, 0.8)';
    c.shadowBlur = 18;
    c.fillText('அன்போடு அழைக்கின்றோம்!', 360, 240);

    // The heart message from video
    c.font = '500 26px "Mukta Malar", sans-serif';
    c.fillStyle = '#fff';
    c.shadowBlur = 10;
    c.fillText('இனிதே நடைபெற உள்ளதால்,', 360, 330);
    c.fillText('தாங்கள் தங்கள் சுற்றமும் நட்பும் சூழ', 360, 385);
    c.fillText('வருகை தந்து மணமக்களை', 360, 440);
    c.fillText('வாழ்த்தியருள அன்புடன் அழைக்கின்றோம்.', 360, 495);

    // Romantic Couple Circular Stamp
    c.save();
    c.beginPath();
    c.arc(360, 680, 130, 0, Math.PI * 2);
    c.strokeStyle = '#fbeea4';
    c.lineWidth = 5;
    c.shadowColor = '#d4af37';
    c.shadowBlur = 25;
    c.stroke();
    c.clip();
    if (imgCloseup.complete) {
      c.drawImage(imgCloseup, 230, 550, 260, 260);
    }
    c.restore();

    // Inviting Family Names
    c.font = '500 22px "Mukta Malar", sans-serif';
    c.fillStyle = '#f3e5ab';
    c.fillText('அன்புடன் அழைக்கும்:', 360, 870);

    c.font = 'bold 34px "Mukta Malar", sans-serif';
    c.fillStyle = '#fff';
    c.fillText('T.A. கபிலன், A. இந்துஜா', 360, 925);
    c.fillText('& இருவீட்டார்', 360, 975);

    c.font = '600 24px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText('ஆலடிப்பட்டி • 11.11.2026', 360, 1045);

    c.restore();
  }

  /* --- Drawing Helpers for Video --- */
  function drawGoldBorder(c) {
    c.save();
    c.strokeStyle = 'rgba(212, 175, 55, 0.45)';
    c.lineWidth = 2;
    c.strokeRect(20, 20, 680, 1240);

    c.strokeStyle = '#d4af37';
    c.lineWidth = 1;
    c.strokeRect(26, 26, 668, 1228);

    // Corner Ornaments
    drawCorner(c, 26, 26, 0);
    drawCorner(c, 694, 26, Math.PI / 2);
    drawCorner(c, 694, 1254, Math.PI);
    drawCorner(c, 26, 1254, -Math.PI / 2);
    c.restore();
  }

  function drawCorner(c, x, y, rot) {
    c.save();
    c.translate(x, y);
    c.rotate(rot);
    c.fillStyle = '#fbeea4';
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(30, 0);
    c.lineTo(0, 30);
    c.closePath();
    c.fill();
    c.restore();
  }

  function drawSparkles(c) {
    c.save();
    c.fillStyle = '#fbeea4';
    videoSparkles.forEach(s => {
      s.y -= s.speed;
      if (s.y < 0) s.y = 1280;
      c.globalAlpha = s.opacity * (0.6 + Math.sin(s.y * 0.05) * 0.4);
      c.beginPath();
      c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      c.fill();
    });
    c.restore();
  }

  function drawToranam(c, t) {
    c.save();
    // Mango leaf garland
    c.fillStyle = '#2d6a4f';
    for (let x = 60; x <= 660; x += 50) {
      c.beginPath();
      c.moveTo(x - 20, 35);
      c.quadraticCurveTo(x, 90, x, 110);
      c.quadraticCurveTo(x, 90, x + 20, 35);
      c.closePath();
      c.fill();
    }
    // Jasmine & Marigold balls
    for (let x = 60; x <= 660; x += 50) {
      c.fillStyle = '#ffb703';
      c.beginPath();
      c.arc(x, 115, 7, 0, Math.PI * 2);
      c.fill();
    }
    // Hanging Bells
    c.fillStyle = '#fbeea4';
    [100, 230, 360, 490, 620].forEach(bx => {
      c.beginPath();
      c.arc(bx, 140, 10, 0, Math.PI);
      c.lineTo(bx - 10, 140);
      c.fill();
    });
    c.restore();
  }

  function drawBadge(c, x, y, text) {
    c.save();
    c.fillStyle = 'rgba(212, 175, 55, 0.2)';
    c.strokeStyle = '#d4af37';
    c.lineWidth = 1.5;
    c.beginPath();
    c.roundRect(x - 210, y - 25, 420, 50, 25);
    c.fill();
    c.stroke();

    c.textAlign = 'center';
    c.font = '600 22px "Mukta Malar", sans-serif';
    c.fillStyle = '#fbeea4';
    c.fillText(text, x, y + 8);
    c.restore();
  }

  function drawPeacockEmblem(c, x, y, t) {
    c.save();
    c.translate(x, y);
    // Glowing Divine Mandala
    c.beginPath();
    c.arc(0, 0, 75, 0, Math.PI * 2);
    c.fillStyle = 'rgba(212, 175, 55, 0.12)';
    c.fill();
    c.strokeStyle = '#d4af37';
    c.lineWidth = 2;
    c.stroke();

    // Sacred Vel / Murugan Motif
    c.fillStyle = '#fbeea4';
    c.beginPath();
    c.moveTo(0, -60);
    c.bezierCurveTo(30, -30, 20, 30, 0, 50);
    c.bezierCurveTo(-20, 30, -30, -30, 0, -60);
    c.fill();

    c.fillStyle = '#8b0e27';
    c.beginPath();
    c.arc(0, 0, 8, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  function drawKuthuvilakku(c, x, y, t) {
    c.save();
    c.translate(x, y);
    c.fillStyle = '#d4af37';
    // Base & stem
    c.fillRect(-8, -120, 16, 120);
    c.beginPath();
    c.ellipse(0, 0, 35, 10, 0, 0, Math.PI * 2);
    c.fill();
    // Oil plate
    c.beginPath();
    c.ellipse(0, -120, 30, 8, 0, 0, Math.PI * 2);
    c.fill();
    // Flame with subtle flicker
    const flameH = 22 + Math.sin(t * 10 + x) * 3;
    c.fillStyle = '#ffb703';
    c.beginPath();
    c.moveTo(0, -120 - flameH);
    c.quadraticCurveTo(8, -120 - flameH / 2, 0, -120);
    c.quadraticCurveTo(-8, -120 - flameH / 2, 0, -120 - flameH);
    c.fill();
    c.restore();
  }

  /* --- Playback Loop Engine --- */
  function startPlayback() {
    isPlaying = true;
    overlay.classList.add('hidden');
    playIcon.textContent = '⏸';
    playText.textContent = 'Pause';
    lastFrameTime = performance.now();

    if (audioTrack) {
      audioTrack.muted = isMuted;
      audioTrack.currentTime = currentTime;
      audioTrack.play().catch(() => {});
    }

    loop();
  }

  function pausePlayback() {
    isPlaying = false;
    overlay.classList.remove('hidden');
    playIcon.textContent = '▶';
    playText.textContent = 'Play';

    if (audioTrack) audioTrack.pause();
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  }

  function loop() {
    if (!isPlaying) return;

    const now = performance.now();
    const dt = (now - lastFrameTime) / 1000;
    lastFrameTime = now;

    currentTime += dt;

    if (currentTime >= totalDuration) {
      currentTime = 0; // Loop or end
    }

    drawFrame(currentTime);
    animationFrameId = requestAnimationFrame(loop);
  }

  // Event Listeners for Controls
  if (bigPlayBtn) {
    bigPlayBtn.addEventListener('click', () => {
      if (!isPlaying) startPlayback();
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) pausePlayback();
      else startPlayback();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      currentTime = 0;
      if (audioTrack) audioTrack.currentTime = 0;
      drawFrame(0);
      startPlayback();
    });
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      if (audioTrack) audioTrack.muted = isMuted;
      soundIcon.textContent = isMuted ? '🔇' : '🔊';
      showToast(isMuted ? 'Muted' : 'Sound ON');
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const wrapper = document.getElementById('video-canvas-wrapper');
      if (!document.fullscreenElement) {
        if (wrapper.requestFullscreen) wrapper.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });
  }

  /* --- 1-Click Video Recording & Download (MediaRecorder API) --- */
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('🎬 Recording & Generating Video... Please wait 20s!');
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = '<span>⏳</span><span>Recording...</span>';

      // Restart to beginning
      currentTime = 0;
      if (audioTrack) audioTrack.currentTime = 0;
      startPlayback();

      // Capture Canvas Stream at 30 FPS
      const stream = canvas.captureStream(30);

      let mediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      } catch (e) {
        mediaRecorder = new MediaRecorder(stream);
      }

      const recordedChunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kabilan_Indhuja_Wedding_Invitation_Video.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<span>⬇️</span><span>Download Video</span>';
        showToast('🎉 Video Download Complete!');
      };

      mediaRecorder.start();

      // Record for 25 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          pausePlayback();
        }
      }, 25000);
    });
  }
}
