// src/features/profile/SmartCookingMode.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SmartCookingMode.module.css';

const SmartCookingMode = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showTip, setShowTip] = useState(true); // ✅ تظهر فوراً عند الوصول للخطوة
  const [showTimerAlert, setShowTimerAlert] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const audioRef = useRef(null);
  const timerEndedRef = useRef(false);
  const tipShownForStepRef = useRef(-1); // ✅ تتبع الخطوة التي ظهرت فيها النصيحة

  const steps = recipe?.instructions || [];

  // 🎵 إنشاء الصوت
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 🎉 تشغيل صوت التهنئة
  const playCelebrationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 587.33, 659.25, 783.99];
      
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.value = freq;
          gainNode.gain.value = 0.2;
          oscillator.start();
          gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
          oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 200);
      });
      
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch {
      // Audio not supported - silent fail
    }
  }, []);

  // 🔊 تشغيل صوت التنبيه
  const playAlertSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.3;
      oscillator.start();
      
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
      
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 880;
        gain2.gain.value = 0.3;
        osc2.start();
        gain2.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
        osc2.stop(audioContext.currentTime + 0.3);
      }, 400);
      
      setTimeout(() => {
        const osc3 = audioContext.createOscillator();
        const gain3 = audioContext.createGain();
        osc3.connect(gain3);
        gain3.connect(audioContext.destination);
        osc3.frequency.value = 880;
        gain3.gain.value = 0.3;
        osc3.start();
        gain3.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3);
        osc3.stop(audioContext.currentTime + 0.3);
      }, 800);
      
      oscillator.stop(audioContext.currentTime + 0.3);
      
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch {
      // Audio not supported - silent fail
    }
  }, []);

  // 📢 إظهار إشعار المتصفح
  const showBrowserNotification = useCallback((message, isCelebration = false) => {
    if (Notification.permission === 'granted') {
      new Notification(isCelebration ? '🎉 Congratulations! 🎉' : '⏰ Smart Cooking Mode', {
        body: message,
        icon: 'https://cdn-icons-png.flaticon.com/512/190/190715.png',
        vibrate: [200, 100, 200]
      });
    }
  }, []);

  // ⏰ مؤقت العد التنازلي
  useEffect(() => {
    let interval = null;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining]);

  // ✅ معالجة انتهاء المؤقت
  useEffect(() => {
    if (timeRemaining === 0 && isTimerActive && !timerEndedRef.current) {
      timerEndedRef.current = true;
      
      playAlertSound();
      showBrowserNotification('Timer finished! Check your dish! 🍳');
      
      setIsTimerActive(false);
      setTimeRemaining(null);
      setShowTimerAlert(true);
    }
    
    if (timeRemaining !== null && timeRemaining > 0) {
      timerEndedRef.current = false;
    }
  }, [timeRemaining, isTimerActive, playAlertSound, showBrowserNotification]);

  // ✅ عرض النصيحة مرة واحدة فقط لكل خطوة
  useEffect(() => {
    // إذا كانت هذه الخطوة مختلفة عن آخر خطوة ظهرت فيها النصيحة
    if (tipShownForStepRef.current !== currentStep) {
      setShowTip(true); // إظهار النصيحة
      tipShownForStepRef.current = currentStep; // تسجيل أن النصيحة ظهرت لهذه الخطوة
      
      // إخفاء النصيحة بعد 5 ثواني
      const timer = setTimeout(() => {
        setShowTip(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // النصائح لكل خطوة
  const getTipForStep = useCallback((stepIndex) => {
    const tips = [
      "💡 Tip: Prep all ingredients before you start cooking!",
      "🔥 Tip: Keep your pan at medium heat for best results",
      "🧂 Tip: Season gradually, you can always add more",
      "⏰ Tip: Set a timer to avoid overcooking",
      "👨‍🍳 Tip: Taste as you go and adjust seasonings",
      "🔪 Tip: Keep your knife sharp for easier cutting",
      "🍳 Tip: Don't overcrowd the pan - cook in batches if needed",
      "🌿 Tip: Fresh herbs add more flavor at the end of cooking"
    ];
    return tips[stepIndex % tips.length];
  }, []);

  const startTimer = useCallback((minutes) => {
    timerEndedRef.current = false;
    setTimeRemaining(minutes * 60);
    setIsTimerActive(true);
  }, []);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsTimerActive(false);
      setTimeRemaining(null);
      timerEndedRef.current = false;
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsTimerActive(false);
      setTimeRemaining(null);
      timerEndedRef.current = false;
    }
  }, [currentStep]);

  const finishCooking = useCallback(() => {
    playCelebrationSound();
    showBrowserNotification(`Congratulations! You've mastered ${recipe.name}! 🎉`, true);
    setShowCongratulations(true);
  }, [playCelebrationSound, showBrowserNotification, recipe.name]);

  const closeCongratulations = useCallback(() => {
    setShowCongratulations(false);
    onClose();
  }, [onClose]);

  // طلب إذن الإشعارات
  useEffect(() => {
    if (Notification && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>
        
        <div className={styles.header}>
          <div className={styles['mode-icon']}>🧠</div>
          <h2>Smart Cooking Mode</h2>
          <p>{recipe.name}</p>
        </div>
        
        <div className={styles['step-progress']}>
          <div className={styles.progress}>
            <div 
              className={styles['progress-bar']} 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} 
            />
          </div>
          <span>Step {currentStep + 1} of {steps.length}</span>
        </div>
        
        <div className={styles['current-step']}>
          <h3>📖 Step {currentStep + 1}</h3>
          <p>{steps[currentStep]}</p>
        </div>
        
        {showTip && (
          <div className={styles['pro-tip']}>
            <span>💡 Pro Tip</span>
            <p>{getTipForStep(currentStep)}</p>
          </div>
        )}
        
        <div className={styles['timer-section']}>
          <h4>⏱️ Need a timer?</h4>
          <div className={styles['timer-buttons']}>
            <button onClick={() => startTimer(1)}>1 min</button>
            <button onClick={() => startTimer(5)}>5 min</button>
            <button onClick={() => startTimer(10)}>10 min</button>
            <button onClick={() => startTimer(15)}>15 min</button>
            <button onClick={() => startTimer(30)}>30 min</button>
          </div>
          {timeRemaining !== null && (
            <div className={styles['active-timer']}>
              <span>⏰ Timer: {formatTime(timeRemaining)}</span>
              <button onClick={() => setIsTimerActive(prev => !prev)}>
                {isTimerActive ? 'Pause' : 'Resume'}
              </button>
              <button onClick={() => { 
                setIsTimerActive(false); 
                setTimeRemaining(null);
                timerEndedRef.current = false;
              }}>
                Cancel
              </button>
            </div>
          )}
        </div>
        
        <div className={styles.actions}>
          <button onClick={prevStep} disabled={currentStep === 0}>
            ← Previous
          </button>
          {currentStep === steps.length - 1 ? (
            <button className={styles['finish-btn']} onClick={finishCooking}>
              🎉 Finish Cooking
            </button>
          ) : (
            <button onClick={nextStep}>
              Next Step →
            </button>
          )}
        </div>
        
        <div className={styles.reminder}>
          <span>📌</span>
          <p>Don't rush! Take your time and enjoy the cooking process.</p>
        </div>
      </div>

      {/* Modal تنبيه المؤقت */}
      {showTimerAlert && (
        <div className={styles['alert-overlay']} onClick={() => setShowTimerAlert(false)}>
          <div className={styles['alert-modal']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['alert-icon']}>⏰</div>
            <h3 className={styles['alert-title']}>Timer Finished!</h3>
            <p className={styles['alert-message']}>
              Your timer has completed. Check your dish!
            </p>
            <div className={styles['alert-buttons']}>
              <button 
                className={styles['alert-ok']}
                onClick={() => setShowTimerAlert(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎉 Modal التهنئة - Congratulations */}
      {showCongratulations && (
        <div className={styles['congrats-overlay']} onClick={closeCongratulations}>
          <div className={styles['congrats-modal']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['confetti']}>🎉</div>
            <div className={styles['congrats-icon']}>🏆</div>
            <h3 className={styles['congrats-title']}>Congratulations!</h3>
            <p className={styles['congrats-message']}>
              You've mastered <strong>{recipe?.name}</strong>!
            </p>
            <div className={styles['congrats-stats']}>
              <div className={styles['stat-item']}>
                <span>📖</span>
                <span>{steps.length} steps</span>
              </div>
              <div className={styles['stat-item']}>
                <span>⏱️</span>
                <span>{recipe?.prepTimeMinutes + recipe?.cookTimeMinutes || 0} min</span>
              </div>
              <div className={styles['stat-item']}>
                <span>⭐</span>
                <span>Great job!</span>
              </div>
            </div>
            <div className={styles['congrats-buttons']}>
              <button 
                className={styles['congrats-close']}
                onClick={closeCongratulations}
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartCookingMode;