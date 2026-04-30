/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Sparkles, 
  Star, 
  Sparkle, 
  User, 
  Check, 
  ArrowRight,
  ArrowLeft,
  Brain,
  Timer,
  Trophy,
  Columns4,
  Plus,
  Minus,
  Divide,
  X,
  Scale,
  Layout,
  ListTodo,
  AlertCircle,
  Gamepad2,
  Map,
  Settings,
  CircleUser,
  Wind,
  Volume2,
  VolumeX,
  Shield,
  CheckCircle,
  TrendingUp,
  Globe,
  Trash2,
  Lock
} from 'lucide-react';

const SOUNDS = {
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  CORRECT: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c350781734.mp3',
  WRONG: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3',
  SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
};

const playSound = (url: string, enabled: boolean) => {
  if (!enabled) return;
  const audio = new Audio(url);
  audio.volume = 0.5;
  audio.play().catch(e => console.log('Audio play blocked:', e));
};

const LEADERBOARD_DATA = [
  { id: 1, name: 'Komander Zikri', score: 4500, rank: 1, avatar: 1 },
  { id: 2, name: 'Siti Algebra', score: 4200, rank: 2, avatar: 5 },
  { id: 3, name: 'Robot X', score: 3800, rank: 3, avatar: 2 },
  { id: 4, name: 'Ali Bin Y', score: 3500, rank: 4, avatar: 3 },
  { id: 5, name: 'Sarah Sparkle', score: 3100, rank: 5, avatar: 4 },
];

const ACHIEVEMENTS = [
  { id: 1, name: 'Pioneer', icon: Rocket, desc: 'Selesaikan misi pertama', unlocked: false },
  { id: 2, name: 'Genius', icon: Brain, desc: 'Dapatkan 10 jawapan betul berturut-turut', unlocked: false },
  { id: 3, name: 'Star Master', icon: Star, desc: 'Kumpul 100 bintang', unlocked: false },
  { id: 4, name: 'Time Lord', icon: Timer, desc: 'Selesaikan kuiz dalam masa 2 minit', unlocked: false },
];

const AVATARS = [
  { id: 1, name: 'Angkasawan Muda', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGS9tMQLqh-LLAuAX_0rOUgX6gTsMG91CfhTY2B1MF96utLIPs1Du4klghCPoSd5PViVm_AcCJrzbejV5FHifWIN4Ip1s0gspAhwQrc2fuDIYvDj7AmdUqFFK01dtIfPpJUQGykslYeNQ6-dm0S_1mZkd3qTbk-UpiCwGvFmiH2ujypd4alMk7kfE2ijyV0VCvdHj_K90QLd1R3RXYADmES7CPTGkJCBxUd6K8zNGJxjg3e7ux7rsgolF_m1yS5JyiPvEB2NU-CGg' },
  { id: 2, name: 'Teman Robot', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbrXM4d1IXaCGVrr3rRp3roC3pJN-Mh77fkhlNdI3e6R3FUXaRD_ciTBJajQ05dAvd9njNNUjbudy3w4ti0SUs7E4FuDt8tqOromYabwabLncIGsQpKtVMWkFvrNfXvpGQbVsvflK7P7SNjzP1ECWbboe9G0N82zn1OuhZ6CbW5JCVV8m6Covq3JItNwpPibO0oerBllLJJGHnIfNd0CCXvvGiYJaHHKcJVJvpf8_urAjrb9GR0g0leIdXd35AiW3hTYSAocl1oSc' },
  { id: 3, name: 'Kucing Angkasa', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCkF2z99AUkgqkjP0bZjuHWBEva9mPg5OKE6bHtYMAC24Zstm7t2-4yadt2PEtdvIEMwH_PwPCIEMGElqRWabJ6iYcPej7Jp55hcIIjer5JwOM-hBY-SJePk_1bSvF9_tZJTO5Bp39NlVENowFnsUeU0c480IC6icFf28wq39zcxTqmjC-ftvj4DNI_kLY-FXq3S6lZSnH0oo6yhbkOzOeuBXiVtE6iF7Ci2V1spMfTklKLZHDIkrULH6HdeudNJ6cwEVUl4pGKf4' },
  { id: 4, name: 'Sarjana Makhluk Asing', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKRS2xMqDeo3kmVI0aemq8SEbpX13WBVyVBpeJAEGLx_KsGSLE6_VglybzwvtynVxc13lIFiRieM8Hl-2lbsgv06Xpfvb7nj8rfKcK5PbQ5YP_hORTC2bxlpvu4hw4VmMgvDkfXkf1gdw_mdI8wGWlbdLIXsxWOpeWOPi0xVlUBUJVKrEiDZBDVB-UTs9PnZWD64pBFLicEyR3NP_0MbdlEnWihyh9GgLP16p2ppguyNfWnqM1b8aO-NVRonshWv2HwRf9cQygBTI' },
  { id: 5, name: 'Gadis Angkasawan Comel', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtKAjH-x5emaXY4z8QCGbWeGSz4yAHSgqobQlcWx4-FQ_No6k1xaxsiQT2T0BzzW0OVAkA99FFSIoOY2SSl2VpvXLqM5UKYz2SA7XgfO4h4m-UjVbp9pY5wU3IIMbHa0iUtAxNXNTyJ42zKwXnjtujzLF2bNe_1lulEUhB97oGwyhc2T49j_xfgc8mRmRUUPSST2JJE1YTJeL6pxuVselAjk7bBTCsMWcEBZoRsSwm380XLu7iIfw14KVA0JyeV7uVTv5G_owAZzM' },
  { id: 6, name: 'Panda Angkasa', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghvlL4EXVT2X33zh8TRTJyFf2GnHv67Dt3rl_IwXY0mLKZd05xNJ60gUHUpprmUg7SKABCMmkNBTdKmlp3KSd4KfK1KoyWq-M736TU-L7QpisD0P-XgI4uCGdQJjy385a7-CujE-snPsSSagxR6eDfGThjoTF_pRbY23rGNwwzqCs2PYniONX8C6DOHolNVsi-NJTgJJUTwkk13NtLOfGw9AJDq5goxWQFfqV1XysilmdnIBrqJ2em4iZWwcpvgWfoNXXv8L9Vhc' },
];

const PRACTICE_QUESTIONS = [
  { id: 1, q: "Permudahkan: 5x + 3y - 2x + 4y", ans: "3x + 7y", hint: "Kumpulkan sebutan serupa (x dengan x, y dengan y)" },
  { id: 2, q: "Nilaikan 3p² - 2q jika p=3 dan q=5", ans: "17", hint: "Gantikan p dengan 3 dan q dengan 5, kemudian selesaikan" },
  { id: 3, q: "Permudahkan: (7a + 5b) - (3a - 2b)", ans: "4a + 7b", hint: "Berhati-hati dengan tanda negatif apabila membuka kurungan" },
  { id: 4, q: "Kembangkan: 4(2x - 3y) + 5x", ans: "13x - 12y", hint: "Darab masuk 4 ke dalam kurungan dahulu" },
  { id: 5, q: "Bahagikan: 24m²n ÷ 6mn", ans: "4m", hint: "Bahagikan nombor dengan nombor, pemboleh ubah dengan pemboleh ubah" },
  { id: 6, q: "Permudahkan: 3(2x + y) - 2(x - 2y)", ans: "4x + 7y", hint: "Kembangkan kedua-dua kurungan sebelum mempermudahkan" },
  { id: 7, q: "Nilaikan (12a / b) + 5 jika a=4, b=6", ans: "13", hint: "Ganti a dan b, selesaikan bahagian bahagi dahulu" },
  { id: 8, q: "Permudahkan: 2p × 3q × 4p ÷ 6pq", ans: "4p", hint: "Darab semua di atas kemudian bahagi dengan 6pq" },
  { id: 9, q: "Nilaikan (x+2)(x-1) jika x=4", ans: "18", hint: "Gantikan x=4 ke dalam setiap kurungan dahulu" },
  { id: 10, q: "Permudahkan sebutan serupa: 4x²y - 2xy² + 3x²y", ans: "7x²y - 2xy²", hint: "Hanya sebutan dengan kuasa pemboleh ubah yang sama boleh ditambah" },
];

export default function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('spacex_user_name', name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem('spacex_user_avatar', selectedAvatar?.toString() || '');
  }, [selectedAvatar]);
  const [puzzleInput, setPuzzleInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLearning, setIsLearning] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [isPractice, setIsPractice] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [learningStep, setLearningStep] = useState(0); // 0: Intro, 1: Variable, 2: Terms, 3: Add/Sub, 4: Mul/Div, 5: Summary
  const [gameScore, setGameScore] = useState(0);
  const [gameMultiplier, setGameMultiplier] = useState(1);
  const [gameLevel, setGameLevel] = useState(1);
  const [gameFeedback, setGameFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameQuestionIndex, setGameQuestionIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'finished'>('start');

  // Practice States
  const [practiceQuestionIndex, setPracticeQuestionIndex] = useState(0);
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceStatus, setPracticeStatus] = useState<'selecting' | 'playing' | 'finished'>('selecting');
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);

  const QUESTIONS_BY_LEVEL: Record<number, { q: string, val: string, ans: number, options: number[] }[]> = {
    1: [
      { q: "3x - 4", val: "x = 5", ans: 11, options: [11, 15, 19, 21] },
      { q: "2y + 7", val: "y = 3", ans: 13, options: [13, 10, 15, 6] },
      { q: "5a - 2", val: "a = 4", ans: 18, options: [18, 20, 22, 16] },
    ],
    2: [
      { q: "2x + 3y", val: "x=2, y=4", ans: 16, options: [16, 12, 14, 18] },
      { q: "5(a + 2)", val: "a=3", ans: 25, options: [25, 20, 15, 30] },
      { q: "12 - 2p", val: "p=5", ans: 2, options: [2, 4, 0, 10] },
    ],
    3: [
      { q: "x² + 4", val: "x=3", ans: 13, options: [13, 10, 7, 12] },
      { q: "3(2y - 1)", val: "y=4", ans: 21, options: [21, 24, 18, 27] },
      { q: "m / 2 + 5", val: "m=10", ans: 10, options: [10, 15, 5, 20] },
    ],
    4: [
      { q: "2(x + y) - z", val: "x=3,y=2,z=4", ans: 6, options: [6, 10, 8, 4] },
      { q: "a² - b²", val: "a=5, b=3", ans: 16, options: [16, 4, 8, 25] },
      { q: "3p² + 2p", val: "p=2", ans: 16, options: [16, 14, 12, 18] },
    ],
    5: [
      { q: "(x+2)(x-3)", val: "x=5", ans: 14, options: [14, 10, 12, 16] },
      { q: "√(25a²) + 1", val: "a=2", ans: 11, options: [11, 10, 21, 5] },
      { q: "3y³ / y", val: "y=2", ans: 12, options: [12, 8, 6, 24] },
    ]
  };

  const handleGameAnswer = (option: number) => {
    const currentQuestions = QUESTIONS_BY_LEVEL[gameLevel] || QUESTIONS_BY_LEVEL[1];
    const isCorrect = option === currentQuestions[gameQuestionIndex].ans;
    
    if (isCorrect) {
      playSound(SOUNDS.CORRECT, soundEnabled);
      setGameFeedback('correct');
      const points = 10 * gameMultiplier * gameLevel;
      setGameScore(prev => prev + points);
      setGameMultiplier(prev => prev + 1);
      
      setTimeout(() => {
        setGameFeedback(null);
        if (gameQuestionIndex < currentQuestions.length - 1) {
          setGameQuestionIndex(prev => prev + 1);
        } else {
          if (gameLevel < 5) {
            playSound(SOUNDS.SUCCESS, soundEnabled);
            setGameLevel(prev => prev + 1);
            setGameQuestionIndex(0);
          } else {
            playSound(SOUNDS.SUCCESS, soundEnabled);
            setGameStatus('finished');
          }
        }
      }, 1000);
    } else {
      playSound(SOUNDS.WRONG, soundEnabled);
      setGameFeedback('wrong');
      setGameMultiplier(1);
      setTimeout(() => {
        setGameFeedback(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    playSound(SOUNDS.CLICK, soundEnabled);
    if (step === 4) {
      setShowDashboard(true);
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  if (showDashboard) {
    if (isLearning) {
      return (
        <div className="bg-background min-h-screen pb-20 text-on-background">
          <header className="bg-surface/80 backdrop-blur-md text-primary font-bold text-lg tracking-tight shadow-sm flex items-center px-6 py-4 w-full sticky top-0 z-50 border-b-2 border-slate-800">
            <button 
              onClick={() => {
                playSound(SOUNDS.CLICK, soundEnabled);
                if (learningStep > 0) {
                  setLearningStep(learningStep - 1);
                } else {
                  setIsLearning(false);
                }
              }}
              className="mr-4 p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <span className="text-xl font-black text-blue-400 tracking-tighter">
                PEMBELA<span className="text-purple-400">JARAN</span>
              </span>
            </div>
            <div className="text-xs font-black text-slate-400 bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest border border-slate-700">
              Bahagian {learningStep + 1} / 7
            </div>
          </header>

          <main className="max-w-2xl mx-auto px-5 pt-8 pb-32">
            <AnimatePresence mode="wait">
              {learningStep === 0 && (
                <motion.div 
                  key="lesson0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary rounded-3xl mx-auto flex items-center justify-center shadow-xl rotate-3 shadow-primary/20">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-primary">Bab 5: Ungkapan Algebra</h1>
                    <p className="text-slate-400 italic">Misi anda hari ini: Menguasai bahasa rahsia matematik!</p>
                  </div>

                  <div className="bg-surface p-8 rounded-[32px] border-2 border-slate-800 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-white">Apa yang anda akan pelajari?</h2>
                    <ul className="space-y-4">
                      {[
                        { text: "Pemboleh Ubah (Tetap & Berubah)", color: "text-blue-400" },
                        { text: "Sebutan Serupa & Tidak Serupa", color: "text-purple-400" },
                        { text: "Operasi Penambahan & Penolakan", color: "text-green-400" },
                        { text: "Operasi Pendaraban & Pembahagian", color: "text-orange-400" }
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 font-bold text-slate-300">
                          <Check className={`w-5 h-5 ${item.color}`} />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setLearningStep(1);
                    }}
                    className="w-full bg-primary text-white py-6 rounded-[24px] font-black text-xl shadow-xl hover:translate-y-[-4px] transition-all"
                  >
                    MULA MISI SEKARANG!
                  </button>
                </motion.div>
              )}

              {learningStep === 1 && (
                <motion.div 
                  key="lesson1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">Bahagian 1</span>
                    <h2 className="text-3xl font-black text-white leading-tight">Pemboleh Ubah<br/>(Variables)</h2>
                  </div>

                  <div className="bg-blue-900/30 p-6 rounded-3xl border-l-8 border-blue-500">
                    <p className="text-blue-200 font-medium italic">
                      "Simbol (biasanya huruf) yang mewakili suatu kuantiti yang kita belum tahu nilainya."
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div className="bg-surface p-6 rounded-3xl border-2 border-slate-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-900/40 text-green-400 rounded-xl flex items-center justify-center">
                          <Check className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-white">Nilai Tetap</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Kuantiti yang <span className="font-bold text-white">TIDAK BERUBAH</span> pada bila-bila masa.
                      </p>
                      <div className="bg-slate-900/50 p-4 rounded-xl text-center font-bold text-slate-500 italic border border-slate-800">
                        Contoh: Bilangan hari dalam seminggu (Sentiasa 7).
                      </div>
                    </div>

                    <div className="bg-surface p-6 rounded-3xl border-2 border-slate-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-900/40 text-orange-400 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-white">Nilai Berubah</h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        Kuantiti yang <span className="font-bold text-white">SENTIASA BERUBAH</span> mengikut keadaan.
                      </p>
                      <div className="bg-slate-900/50 p-4 rounded-xl text-center font-bold text-slate-500 italic border border-slate-800">
                        Contoh: Bil elektrik rumah anda setiap bulan.
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setLearningStep(2);
                    }}
                    className="w-full bg-primary text-white py-5 rounded-[24px] font-black shadow-lg flex items-center justify-center gap-3"
                  >
                    Ke Bahagian Seterusnya
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </motion.div>
              )}

              {learningStep === 2 && (
                <motion.div 
                  key="lesson2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">Bahagian 2</span>
                    <h2 className="text-3xl font-black text-white leading-tight">Sebutan Algebra<br/>(Algebraic Terms)</h2>
                  </div>

                  <div className="grid gap-6">
                    <div className="bg-surface p-8 rounded-[32px] border-4 border-slate-800 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-900/20 rounded-bl-[64px] flex items-center justify-center">
                        <span className="text-purple-700 font-black text-4xl">1</span>
                      </div>
                      <h3 className="text-xl font-black text-purple-400 mb-2">Sebutan Serupa</h3>
                      <p className="text-slate-400 text-sm mb-6">Pemboleh ubah & kuasa yang SAMA.</p>
                      <div className="flex items-center justify-center gap-6 p-6 bg-purple-900/30 rounded-2xl border border-purple-500/20">
                        <div className="text-center">
                          <span className="text-2xl font-black text-white">2<span className="text-purple-400">x</span></span>
                        </div>
                        <div className="text-purple-700 font-black">&</div>
                        <div className="text-center">
                          <span className="text-2xl font-black text-white">-3<span className="text-purple-400">x</span></span>
                        </div>
                        <div className="ml-auto w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                          <Check className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-surface p-8 rounded-[32px] border-4 border-slate-800 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-900/20 rounded-bl-[64px] flex items-center justify-center">
                        <span className="text-orange-700 font-black text-4xl">2</span>
                      </div>
                      <h3 className="text-xl font-black text-orange-400 mb-2">Sebutan Tidak Serupa</h3>
                      <p className="text-slate-400 text-sm mb-6">Pemboleh ubah ATAU kuasa yang TIDAK SAMA.</p>
                      <div className="flex items-center justify-center gap-6 p-6 bg-orange-900/30 rounded-2xl border border-orange-500/20">
                        <div className="text-center">
                          <span className="text-2xl font-black text-white">2<span className="text-orange-400">x</span></span>
                        </div>
                        <div className="text-orange-700 font-black">vs</div>
                        <div className="text-center">
                          <span className="text-2xl font-black text-white">6<span className="text-orange-400">y</span></span>
                        </div>
                        <div className="ml-auto w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/20">
                          <X className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setLearningStep(3);
                    }}
                    className="w-full bg-primary text-white py-5 rounded-[24px] font-black shadow-lg flex items-center justify-center gap-3"
                  >
                    Jom Belajar Operasi!
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </motion.div>
              )}

              {learningStep === 3 && (
                <motion.div 
                  key="lesson3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-black text-green-400 uppercase tracking-[0.2em]">Bahagian 3</span>
                    <h2 className="text-3xl font-black text-white leading-tight">Tambah & Tolak<br/>(Addition & Subtraction)</h2>
                  </div>

                  <div className="bg-slate-800 p-4 rounded-2xl border-2 border-dashed border-slate-700">
                    <p className="text-center text-xs font-black text-slate-500 uppercase">Peraturan Emas</p>
                    <p className="text-center text-slate-300 font-bold">Hanya Sebutan Serupa boleh ditambah atau ditolak!</p>
                  </div>

                  <div className="space-y-12">
                    {/* Addition Model */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-600 text-white p-1 rounded-md"><Plus className="w-4 h-4" /></div>
                        <span className="font-black text-white text-lg">Contoh: 3x + 2x = 5x</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex gap-1 h-12">
                          <div className="bg-blue-900 w-12 rounded-lg flex items-center justify-center font-black text-blue-200 border border-blue-500/20">x</div>
                          <div className="bg-blue-900 w-12 rounded-lg flex items-center justify-center font-black text-blue-200 border border-blue-500/20">x</div>
                          <div className="bg-blue-900 w-12 rounded-lg flex items-center justify-center font-black text-blue-200 border border-blue-500/20">x</div>
                          <div className="flex items-center px-2 text-slate-600 font-black">+</div>
                          <div className="bg-orange-900 w-12 rounded-lg flex items-center justify-center font-black text-orange-200 border border-orange-500/20">x</div>
                          <div className="bg-orange-900 w-12 rounded-lg flex items-center justify-center font-black text-orange-200 border border-orange-500/20">x</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-700 rotate-90 mx-auto" />
                        <div className="flex gap-1 h-12 justify-center">
                          <div className="bg-green-900 w-12 rounded-lg flex items-center justify-center font-black text-green-200 border border-green-500/20">x</div>
                          <div className="bg-green-900 w-12 rounded-lg flex items-center justify-center font-black text-green-200 border border-green-500/20">x</div>
                          <div className="bg-green-900 w-12 rounded-lg flex items-center justify-center font-black text-green-200 border border-green-500/20">x</div>
                          <div className="bg-green-900 w-12 rounded-lg flex items-center justify-center font-black text-green-200 border border-green-500/20">x</div>
                          <div className="bg-green-900 w-12 rounded-lg flex items-center justify-center font-black text-green-200 border border-green-500/20">x</div>
                        </div>
                        <p className="text-[10px] text-center text-slate-500 font-black uppercase">Model Bar Visual</p>
                      </div>
                    </div>

                    {/* Subtraction Model */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-red-600 text-white p-1 rounded-md"><Minus className="w-4 h-4" /></div>
                        <span className="font-black text-white text-lg">Contoh: 12bc - 3bc = 9bc</span>
                      </div>
                      
                      <div className="bg-surface p-6 rounded-3xl border-2 border-slate-800 flex items-center justify-center gap-4 text-2xl font-black">
                        <div className="bg-blue-900/30 px-4 py-2 rounded-xl text-blue-400 border border-blue-500/10">12bc</div>
                        <Minus className="text-slate-600" />
                        <div className="bg-red-900/30 px-4 py-2 rounded-xl text-red-400 border border-red-500/10">3bc</div>
                        <div className="text-slate-600">=</div>
                        <div className="bg-green-600 px-4 py-2 rounded-xl text-white shadow-lg shadow-green-500/20">9bc</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setLearningStep(4);
                    }}
                    className="w-full bg-primary text-white py-5 rounded-[24px] font-black shadow-lg flex items-center justify-center gap-3"
                  >
                    Satu Lagi: Darab & Bahagi
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </motion.div>
              )}

              {learningStep === 4 && (
                <motion.div 
                  key="lesson4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-black text-orange-400 uppercase tracking-[0.2em]">Bahagian 4</span>
                    <h2 className="text-3xl font-black text-white leading-tight">Darab & Bahagi<br/>(Multiplication & Division)</h2>
                  </div>

                  <div className="space-y-10">
                    <div className="bg-surface p-8 rounded-[32px] border-4 border-orange-950/30 space-y-6 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-900/40 text-orange-400 rounded-xl flex items-center justify-center">
                          <X className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-white">Pendaraban</h3>
                      </div>
                      
                      <div className="bg-slate-900/50 p-6 rounded-2xl space-y-4 border border-slate-800">
                        <div className="text-center font-black text-2xl text-slate-500 italic">5mn × 2n</div>
                        <div className="flex justify-center text-xs font-black text-slate-600 uppercase tracking-widest">— LANGKAHNYA —</div>
                        <div className="space-y-2 flex flex-col items-center">
                          <div className="text-slate-300 font-bold">= (5 × 2) × m × (n × n)</div>
                          <ArrowRight className="w-5 h-5 text-slate-700 rotate-90" />
                          <div className="text-orange-400 text-3xl font-black drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]">10mn²</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-surface p-8 rounded-[32px] border-4 border-blue-950/30 space-y-6 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-900/40 text-blue-400 rounded-xl flex items-center justify-center">
                          <Divide className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-white">Pembahagian</h3>
                      </div>
                      
                      <div className="bg-slate-900/50 p-6 rounded-2xl flex flex-col items-center border border-slate-800">
                        <div className="flex items-center gap-4 text-2xl font-black text-slate-500 italic">
                          <div className="flex flex-col items-center">
                            <span>36pq</span>
                            <div className="w-full h-0.5 bg-slate-700"></div>
                            <span>4p</span>
                          </div>
                          <span>=</span>
                          <span className="text-blue-400 text-4xl drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">9q</span>
                        </div>
                        <p className="mt-4 text-[10px] text-slate-600 font-black uppercase">Batalkan (Cancel) pemboleh ubah yang sama!</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setLearningStep(5);
                    }}
                    className="w-full bg-primary text-white py-5 rounded-[24px] font-black shadow-lg"
                  >
                    CABARAN KBAT (KBAT CHALLENGE)
                  </button>
                </motion.div>
              )}

              {learningStep === 5 && (
                <motion.div 
                  key="lesson5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-black text-red-400 uppercase tracking-[0.2em]">Bahagian 5</span>
                    <h2 className="text-3xl font-black text-white leading-tight">Cabaran KBAT<br/>(Higher Order Thinking)</h2>
                  </div>

                  <div className="bg-surface p-8 rounded-[32px] border-4 border-red-950/30 space-y-6 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-900/40 text-red-400 rounded-xl flex items-center justify-center">
                        <Scale className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-white">Situasi Dunia Sebenar</h3>
                    </div>
                    
                    <div className="bg-slate-900/50 p-6 rounded-2xl border-2 border-slate-800 italic text-slate-300">
                      "Yusuf membeli <span className="font-black text-blue-400">3 kotak pensel</span> (RM x setiap satu) dan <span className="font-black text-purple-400">4 pemadam</span> (RM y setiap satu). Dia membayar dengan <span className="font-black text-green-400">RM 50</span>. Berapakah baki wangnya?"
                    </div>

                    <div className="space-y-6">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest text-center">Penyelesaian Langkah-Demi-Langkah:</p>
                      
                      {/* Step Visuals */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1 shadow-lg shadow-blue-500/20">1</div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-200">Cari kos pensel:</p>
                            <div className="flex gap-1 mt-2">
                              <div className="bg-blue-900/50 border border-blue-500/20 flex-1 h-8 rounded-md flex items-center justify-center text-[10px] font-black text-blue-300">x</div>
                              <div className="bg-blue-900/50 border border-blue-500/20 flex-1 h-8 rounded-md flex items-center justify-center text-[10px] font-black text-blue-300">x</div>
                              <div className="bg-blue-900/50 border border-blue-500/20 flex-1 h-8 rounded-md flex items-center justify-center text-[10px] font-black text-blue-300">x</div>
                            </div>
                            <p className="text-right text-xs font-black text-blue-400 mt-1">Total: 3x</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1 shadow-lg shadow-purple-500/20">2</div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-200">Cari kos pemadam:</p>
                            <div className="flex gap-1 mt-2">
                              {['y', 'y', 'y', 'y'].map((_, i) => (
                                <div key={i} className="bg-purple-900/50 border border-purple-500/20 flex-1 h-8 rounded-md flex items-center justify-center text-[10px] font-black text-purple-300">y</div>
                              ))}
                            </div>
                            <p className="text-right text-xs font-black text-purple-400 mt-1">Total: 4y</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1 shadow-lg shadow-green-500/20">3</div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-200">Bentukkan ungkapan baki:</p>
                            <div className="mt-4 p-4 bg-slate-950 rounded-2xl text-center shadow-inner border-2 border-slate-800">
                              <span className="text-white font-black text-2xl tracking-tighter">50 - <span className="text-blue-400">3x</span> - <span className="text-purple-400">4y</span></span>
                            </div>
                            <p className="text-center text-[10px] text-slate-500 font-bold mt-2 italic">Duit Mula - (Kos Pensel) - (Kos Pemadam)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setLearningStep(6);
                    }}
                    className="w-full bg-primary text-white py-5 rounded-[24px] font-black shadow-lg"
                  >
                    LIHAT RUMUSAN FINAL
                  </button>
                </motion.div>
              )}

              {learningStep === 6 && (
                <motion.div 
                  key="lesson6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <div className="inline-block px-4 py-1 bg-yellow-400 text-yellow-950 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-yellow-400/20">Syabas!</div>
                    <h2 className="text-4xl font-black text-white">Rumusan</h2>
                  </div>

                  {/* Summary Table Layout like the image */}
                  <div className="bg-surface border-4 border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
                    <div className="bg-primary text-white p-4 text-center font-black uppercase tracking-widest text-shadow-glow">
                      Peta Minda Ungkapan Algebra
                    </div>
                    <div className="p-1 space-y-1 bg-slate-900">
                      {/* Section 1: Pemboleh Ubah */}
                      <div className="grid grid-cols-12 gap-1 h-32">
                        <div className="col-span-3 bg-blue-600 text-white flex flex-col items-center justify-center p-2 rounded-lg text-center">
                          <span className="text-[10px] font-black uppercase opacity-50">Kategori</span>
                          <span className="font-black text-center text-xs">Pemboleh ubah</span>
                        </div>
                        <div className="col-span-9 space-y-1">
                          <div className="bg-surface p-3 rounded-lg flex items-center gap-3 h-[49%] border border-slate-800">
                            <div className="w-2 h-full bg-blue-500/30 rounded-full border border-blue-500/20"></div>
                            <div>
                              <p className="text-[10px] font-black text-blue-400 uppercase">Nilai Tetap</p>
                              <p className="text-[11px] text-slate-400 font-bold">Nilai yang tidak berubah mengikut masa.</p>
                            </div>
                          </div>
                          <div className="bg-surface p-3 rounded-lg flex items-center gap-3 h-[49%] border border-slate-800">
                            <div className="w-2 h-full bg-blue-500 rounded-full shadow-lg shadow-blue-500/20"></div>
                            <div>
                              <p className="text-[10px] font-black text-blue-400 uppercase">Nilai Berubah</p>
                              <p className="text-[11px] text-slate-400 font-bold">Nilai yang sentiasa berubah mengikut masa.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Sebutan */}
                      <div className="grid grid-cols-12 gap-1 h-32">
                        <div className="col-span-3 bg-purple-600 text-white flex flex-col items-center justify-center p-2 rounded-lg text-center">
                          <span className="text-[10px] font-black uppercase opacity-50">Kategori</span>
                          <span className="font-black text-xs">Sebutan algebra</span>
                        </div>
                        <div className="col-span-9 space-y-1">
                          <div className="bg-surface p-3 rounded-lg flex items-center gap-3 h-[49%] border border-slate-800">
                            <div className="w-2 h-full bg-purple-500/30 rounded-full border border-purple-500/20"></div>
                            <div>
                              <p className="text-[10px] font-black text-purple-400 uppercase">Sebutan Serupa</p>
                              <p className="text-[11px] text-slate-400 font-bold">Pemboleh ubah dan kuasa yang sama: <span className="font-black text-white">2x, -3x</span></p>
                            </div>
                          </div>
                          <div className="bg-surface p-3 rounded-lg flex items-center gap-3 h-[49%] border border-slate-800">
                            <div className="w-2 h-full bg-purple-500 rounded-full shadow-lg shadow-purple-500/20"></div>
                            <div>
                              <p className="text-[10px] font-black text-purple-400 uppercase">Sebutan Tidak Serupa</p>
                              <p className="text-[11px] text-slate-400 font-bold">Tidak sama: <span className="font-black text-white">2x, 6y</span> atau <span className="font-black text-white">2x, -7x²</span></p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Operations */}
                      <div className="bg-surface p-4 rounded-lg border border-slate-800">
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Operasi Asas</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-900/30 p-3 rounded-xl border border-green-500/20">
                            <p className="text-[10px] font-black text-green-400 uppercase">Tambah & Tolak</p>
                            <p className="text-xs font-bold text-green-200">5a + 6a = 11a</p>
                          </div>
                          <div className="bg-orange-900/30 p-3 rounded-xl border border-orange-500/20">
                            <p className="text-[10px] font-black text-orange-400 uppercase">Darab & Bahagi</p>
                            <p className="text-xs font-bold text-orange-200">5mn × 2n = 10mn²</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600 p-8 rounded-[40px] text-white space-y-6 text-center shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                      <Trophy className="w-16 h-16 mx-auto text-yellow-400 drop-shadow-lg" />
                      <h3 className="text-2xl font-black">TAHNIAH KOMANDER!</h3>
                      <p className="text-blue-100 font-medium">Anda telah tamat sesi pembelajaran asas.</p>
                    </div>
                    <button 
                      onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setIsLearning(false);
                    }}
                      className="relative z-10 w-full bg-blue-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-400 transition-colors border-b-4 border-blue-700"
                    >
                      KEMBALI KE DASHBOARD
                    </button>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Bottom Nav Hint */}
          <div className="fixed bottom-0 left-0 w-full p-4 flex justify-center pb-8">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 transition-all rounded-full ${learningStep === s ? 'w-8 bg-primary' : 'w-2 bg-slate-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (isGame) {
      const currentQuestions = QUESTIONS_BY_LEVEL[gameLevel] || QUESTIONS_BY_LEVEL[1];
      const currentQuestion = currentQuestions[gameQuestionIndex];

      if (gameStatus === 'start') {
        return (
          <div className="bg-slate-950 font-body-md text-white min-h-screen star-bg flex flex-col items-center justify-center p-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full space-y-8"
            >
              <div className="w-32 h-32 bg-blue-500/20 rounded-full mx-auto flex items-center justify-center border-4 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <Rocket className="w-16 h-16 text-blue-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white italic tracking-tighter">ALGEBRA NEBULA</h2>
                <p className="text-blue-200 font-medium">Misi: Selamatkan Kapal SpaceX daripada Kehabisan Oksigen!</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 text-left space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-black">1</div>
                  <p className="text-sm font-bold">5 Tahap Kesukaran Berbeza</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-black">2</div>
                  <p className="text-sm font-bold">Gandaan Skor (Multiplier) untuk jawapan berturut-turut</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-black">3</div>
                  <p className="text-sm font-bold">Selesaikan secepat mungkin!</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  playSound(SOUNDS.CLICK, soundEnabled);
                  setGameStatus('playing');
                }}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:bg-blue-500 transition-all active:scale-95"
              >
                MULAKAN MISI SEKARANG
              </button>
              <button 
                onClick={() => {
                  playSound(SOUNDS.CLICK, soundEnabled);
                  setIsGame(false);
                }}
                className="text-slate-500 font-bold hover:text-slate-300 transition-colors"
              >
                Kembali ke Dashboard
              </button>
            </motion.div>
          </div>
        );
      }

      if (gameStatus === 'finished') {
        return (
          <div className="bg-slate-950 font-body-md text-white min-h-screen star-bg flex flex-col items-center justify-center p-6 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full space-y-8"
            >
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white italic tracking-tighter">MISI SELESAI!</h2>
                <p className="text-green-400 font-bold">Kapal Berjaya Diselamatkan</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Skor Akhir</p>
                  <p className="text-3xl font-black text-white">{gameScore}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tahap</p>
                  <p className="text-3xl font-black text-white">MAX</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  playSound(SOUNDS.CLICK, soundEnabled);
                  setIsGame(false);
                  setGameStatus('start');
                  setGameScore(0);
                  setGameMultiplier(1);
                  setGameLevel(1);
                  setGameQuestionIndex(0);
                }}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 border-b-4 border-blue-800"
              >
                TAMAT & KEMBALI
              </button>
            </motion.div>
          </div>
        );
      }

      return (
        <div className={`bg-slate-950 font-body-md text-white min-h-screen star-bg overflow-hidden flex flex-col transition-colors duration-300 ${gameFeedback === 'correct' ? 'bg-green-950/20' : gameFeedback === 'wrong' ? 'bg-red-950/20' : ''}`}>
          {/* Top Navigation */}
          <header className="bg-slate-950 border-b-2 border-slate-800 z-50">
            <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
              <h1 className="font-lexend font-black text-2xl text-blue-400 tracking-tighter">Algebra Mission Control</h1>
              <div className="flex items-center gap-6">
                <div className="hidden md:flex space-x-6 items-center">
                  <button 
                    onClick={() => {
                      playSound(SOUNDS.CLICK, soundEnabled);
                      setIsGame(false);
                      setGameScore(0);
                      setGameMultiplier(1);
                      setGameQuestionIndex(0);
                      setGameStatus('start');
                    }}
                    className="text-blue-400 font-bold text-sm uppercase tracking-widest hover:text-blue-300 transition-colors"
                  >
                    Missions
                  </button>
                  <div className="flex space-x-4 ml-6">
                    <User className="text-slate-500 hover:text-blue-400 transition-colors cursor-pointer w-6 h-6" />
                    <Settings className="text-slate-500 hover:text-blue-400 transition-colors cursor-pointer w-6 h-6" />
                  </div>
                </div>
                {/* Score and Multiplier display */}
                <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score</p>
                    <p className="text-xl font-black text-yellow-400">{gameScore}</p>
                  </div>
                  {gameMultiplier > 1 && (
                    <motion.div 
                      key={gameMultiplier}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-black shadow-lg"
                    >
                      x{gameMultiplier}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow flex flex-col p-6 max-w-7xl mx-auto w-full relative">
            {/* Ship Integrity Bar */}
            <div className="w-full mb-8 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Ship Integrity</span>
                <span className="text-xs font-black text-green-400">{75 + (gameQuestionIndex * 5) + ((gameLevel - 1) * 5)}% Stabilized</span>
              </div>
              <div className="h-6 w-full bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                <motion.div 
                  initial={{ width: "75%" }}
                  animate={{ width: `${Math.min(100, 75 + (gameQuestionIndex * 5) + ((gameLevel - 1) * 5))}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-green-400 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] translate-x-[-10%]"></div>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-grow">
              {/* Left: Side Panel (Map) */}
              <div className="lg:w-1/4 flex flex-col gap-6">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 flex-grow border-2 border-magenta-500/30 shadow-[0_0_20px_rgba(232,121,249,0.1)]">
                  <div className="flex items-center gap-2 mb-4">
                    <Map className="text-fuchsia-400 w-5 h-5" />
                    <h2 className="font-black text-xs text-fuchsia-400 uppercase tracking-widest">Algebra Nebula</h2>
                  </div>
                  <div className="aspect-square w-full rounded-xl bg-slate-950 overflow-hidden relative border border-slate-800">
                    <img 
                      alt="Ship Map" 
                      className="w-full h-full object-cover opacity-40 grayscale" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDKwh_MyIZD4fWOsTWBAcWUsbdikhiDInIX4DKqZs2m4UWGSZtwNKN3RjYuVGX8gSgnXcvmpJFp_PsrbH3AxS3vPo9QL52hv733P9ow7yHYoUNYnOH3X-pyS2QPNkzhS3Z6-UBeiQnTelIR9nxGEmSzOVQ2Jyv0MBrIBz5RHGWLUptLk_fHf0G1ThWiVCGhpLAEL7LQTexH83vQFpskfUHpSXED5Z_JrqQETu564QOSLbuOcOimL5ac9ZsdPu2NAMVCq3MyJRetZc" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-fuchsia-500 rounded-full animate-ping"></div>
                      <div className="absolute bg-fuchsia-600/20 text-fuchsia-400 text-[10px] font-black px-2 py-1 rounded-full border border-fuchsia-500 mt-12 backdrop-blur-sm">SEKTOR {gameLevel}</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      <span className="text-blue-400 font-black">TAHAP {gameLevel}:</span> {gameLevel === 1 ? 'Ungkapan asas dikesan.' : gameLevel === 2 ? 'Berhati-hati, pemboleh ubah bertambah!' : gameLevel === 3 ? 'Kuasa dua dikesan dalam sistem!' : gameLevel === 4 ? 'Kunci keselamatan berlapis dikesan.' : 'Sektor Kritikal! Punca kuasa dua dikesan.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center: Task Terminal */}
              <div className={`lg:w-1/2 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center justify-center relative border-2 transition-all duration-300 ${gameFeedback === 'correct' ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : gameFeedback === 'wrong' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]'} overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Wind className="w-64 h-64 text-cyan-500" />
                </div>
                
                {gameFeedback && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 2, opacity: 1 }}
                    className="absolute z-20 pointer-events-none"
                  >
                    {gameFeedback === 'correct' ? (
                      <Check className="w-32 h-32 text-green-500 filter drop-shadow-lg" />
                    ) : (
                      <X className="w-32 h-32 text-red-500 filter drop-shadow-lg" />
                    )}
                  </motion.div>
                )}

                <div className={`text-center z-10 w-full max-w-md ${gameFeedback ? 'opacity-20 blur-sm' : ''} transition-all`}>
                  <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1 rounded-full mb-6">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Mission: Baiki Bekalan Oksigen</span>
                  </div>
                  
                  <h3 className="text-4xl font-black text-white mb-8 tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    Selesaikan: <span className="text-cyan-400 italic">{currentQuestion.q}</span>
                  </h3>
                  
                  <div className="bg-slate-950/80 border-2 border-slate-800 p-6 rounded-2xl mb-10 shadow-inner">
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">Nilai Semasa</p>
                    <span className="text-4xl font-black text-white italic">{currentQuestion.val}</span>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {currentQuestion.options.map((option) => (
                      <button 
                        key={option}
                        disabled={!!gameFeedback}
                        onClick={() => handleGameAnswer(option)}
                        className="bg-slate-950 hover:bg-cyan-500/20 border-2 border-slate-800 hover:border-cyan-500 text-white py-4 rounded-xl font-black transition-all hover:scale-105 active:scale-95 group shadow-lg"
                      >
                        <span className="group-hover:text-cyan-400 transition-colors uppercase">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decorative UI Corners */}
                <div className="absolute top-2 left-2 border-t-2 border-l-2 border-cyan-500/50 w-8 h-8 rounded-tl-lg"></div>
                <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-cyan-500/50 w-8 h-8 rounded-br-lg"></div>
              </div>

              {/* Right: Comms & Additional Controls */}
              <div className="lg:w-1/4 flex flex-col gap-6">
                {/* Comms Window */}
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border-2 border-blue-500/30 mt-auto relative shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <div className="absolute -top-4 -left-4 bg-blue-600 px-3 py-1 rounded-lg border-2 border-slate-950 shadow-lg">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">COMMS</span>
                  </div>
                  <div className="flex items-end gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-400 p-1 flex-shrink-0 overflow-hidden">
                      <img 
                        alt="Commander Avatar" 
                        className="w-full h-full object-cover rounded-full" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAADo1NFCsbRN5Zuve-cReTiuQn3CFSJBCMzrP_-d1dW3HxES-ai8KbHTQqxeL3tuYT2oa0OEiXEuMvGsln_MAdb2DK5qV7ROGhe-wDMw12z4xPDtupHv8Jf9qWdi-MYiwAJLpDQcPfzY_OMtIZRfrbpMJ5YYSUkUJ3AryPioS25Dadyq-qHLR36PSkbusjOKwdJC0J2O-RzDnAZYOAY4mq2sxGXqSs0w85EX6eHQCx6zSuk1fQUAe54z9lXBGP_AQmGnGf9co82sQ" 
                      />
                    </div>
                    <div className="flex-grow bg-slate-950/80 p-3 rounded-xl border border-blue-900/30">
                      <p className="text-blue-100 text-[11px] italic leading-relaxed">
                        {gameFeedback === 'correct' ? '"Syabas! Teruskan rentak kemenangan!"' : 
                         gameFeedback === 'wrong' ? '"Jangan berputus asa! Ingat aturan BODMAS."' : 
                         '"Hampir sampai, Komander! Kita perlukan oksigen secepat mungkin!"'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-[10px] uppercase font-black tracking-widest">Level {gameLevel}: {gameLevel === 1 ? 'Asas' : gameLevel === 2 ? 'Sederhana' : gameLevel === 3 ? 'Lanjutan' : gameLevel === 4 ? 'Komersial' : 'Pakar'}</span>
                    <span className="text-[10px] font-black">{String(gameQuestionIndex + 1).padStart(2, '0')} / {currentQuestions.length}</span>
                  </div>
                  <div className="flex gap-1 h-1.5">
                    {currentQuestions.map((_, i) => (
                      <div key={i} className={`flex-grow rounded-full ${i < gameQuestionIndex ? 'bg-green-500' : i === gameQuestionIndex ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Bottom Nav Shell (Mobile Only) */}
          <nav className="bg-slate-900 border-t-2 border-slate-800 h-20 md:hidden flex justify-around items-center px-4 pb-4 pt-2">
            <button 
              onClick={() => {
                setIsGame(false);
                setGameStatus('start');
              }}
              className="flex flex-col items-center justify-center text-slate-400 px-4 py-1 hover:text-blue-400 transition-all"
            >
              <Rocket className="w-6 h-6" />
              <span className="font-black text-[10px] uppercase tracking-wider mt-1">Missions</span>
            </button>
            <div className="flex flex-col items-center justify-center text-blue-400 bg-blue-900/20 rounded-xl px-4 py-1 border-b-4 border-blue-500">
              <Gamepad2 className="w-6 h-6" />
              <span className="font-black text-[10px] uppercase tracking-wider mt-1">Game</span>
            </div>
          </nav>

          {/* Space Dust Background */}
          <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full"></div>
          </div>
        </div>
      );
    }

    if (isCollection) {
      return (
        <div className="bg-slate-950 min-h-screen text-white pb-28">
          <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 p-6 sticky top-0 z-50 flex items-center justify-between">
            <button 
              onClick={() => {
                playSound(SOUNDS.CLICK, soundEnabled);
                setIsCollection(false);
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black tracking-widest flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              HUB PENCAPAIAN
            </h1>
            <div className="w-10"></div>
          </header>

          <main className="max-w-xl mx-auto p-6 space-y-8">
            {/* Progress Summary Card */}
            <section className="bg-blue-600 rounded-[32px] p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 space-y-4">
                <div>
                  <h2 className="text-2xl font-black italic uppercase leading-none">Hub Pencapaian Pilot</h2>
                  <p className="text-blue-100/70 text-sm mt-1">Menguasai hukum alam semesta, satu ungkapan pada satu masa.</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex-1 text-center border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Dikutip</p>
                    <p className="text-3xl font-black">0/30</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex-1 text-center border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Pangkat</p>
                    <p className="text-3xl font-black">Novis</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Badge 1: Unlocked */}
              <div className="bg-slate-900 border border-white/5 rounded-[40px] p-8 shadow-2xl group hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20">
                    <Rocket className="w-12 h-12 text-white" />
                    <Star className="absolute top-2 right-2 w-6 h-6 text-yellow-300 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black tracking-widest">DIBUKA</span>
                    <h3 className="text-2xl font-black tracking-tight">Variable Voyager</h3>
                    <p className="text-slate-400 text-sm">Menamatkan kursus pengenalan penerokaan 'x' dan 'y'.</p>
                  </div>
                </div>
              </div>

              {/* Badge 2: Unlocked */}
              <div className="bg-slate-900 border border-white/5 rounded-[40px] p-8 shadow-2xl group hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg shadow-purple-500/20">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black tracking-widest">DIBUKA</span>
                    <h3 className="text-2xl font-black tracking-tight">Constant Commander</h3>
                    <p className="text-slate-400 text-sm">Menyelesaikan 50 soalan tanpa menukar pemboleh ubah tetap.</p>
                  </div>
                </div>
              </div>

              {/* Badge 3: Locked */}
              <div className="bg-slate-900/50 border border-dashed border-white/10 rounded-[40px] p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                  <Lock className="w-8 h-8 text-slate-600" />
                </div>
                <div className="flex flex-col items-center text-center space-y-6 grayscale opacity-30">
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-slate-800">
                    <Sparkles className="w-12 h-12 text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block px-4 py-1 bg-slate-800 text-slate-500 rounded-full text-[10px] font-black tracking-widest">TERKUNCI</span>
                    <h3 className="text-2xl font-black tracking-tight">Expression Expert</h3>
                    <p className="text-slate-400 text-sm">Permudahkan 100 ungkapan algebra untuk buka orb ini.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <section className="space-y-4 pt-4">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] px-2">Pencapaian Terkini</h3>
              <div className="bg-slate-900/30 p-8 rounded-[32px] border-2 border-dashed border-slate-800 text-center">
                 <Sparkles className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                 <p className="text-slate-500 text-sm font-medium">Tiada pencapaian direkodkan lagi. Selesaikan misi pertama anda!</p>
              </div>
            </section>
          </main>
        </div>
      );
    }

    if (isSettings) {
      return (
        <div className="bg-slate-950 min-h-screen text-white pb-20">
          <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 p-6 sticky top-0 z-50 flex items-center justify-between">
            <button 
              onClick={() => {
                playSound(SOUNDS.CLICK, soundEnabled);
                setIsSettings(false);
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black tracking-widest flex items-center gap-2">
              <Settings className="w-6 h-6 text-slate-400" />
              TETAPAN
            </h1>
            <div className="w-10"></div>
          </header>

          <main className="max-w-xl mx-auto p-6 space-y-6">
            <section className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-2 overflow-hidden">
               <div className="p-4 flex items-center justify-between border-b border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold">Kesan Bunyi</span>
                  </div>
                  <button 
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-6 rounded-full relative transition-all ${soundEnabled ? 'bg-blue-600' : 'bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${soundEnabled ? 'left-7' : 'left-1'}`}></div>
                  </button>
               </div>
               <div className="p-4 flex items-center justify-between border-b border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="font-bold">Bahasa</span>
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase">Bahasa Melayu</span>
               </div>
               <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/20 rounded-lg text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold">Padam Data</span>
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm('Semua kemajuan akan hilang. Teruskan?')) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                    className="text-[10px] font-black text-red-400 uppercase tracking-widest bg-red-400/10 px-3 py-1 rounded-full"
                  >
                    Reset
                  </button>
               </div>
            </section>

            <div className="text-center pt-8">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">SpaceX Algebra v1.0.4</p>
              <p className="text-[10px] text-slate-700 mt-2">Dibuat dengan ❤️ untuk pelajar Malaysia</p>
            </div>
          </main>
        </div>
      );
    }

    if (isPractice) {
      const currentQuestion = PRACTICE_QUESTIONS[practiceQuestionIndex];

      return (
        <div className="bg-slate-950 min-h-screen text-white pb-20 overflow-hidden relative">
          <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 p-6 sticky top-0 z-50 flex items-center justify-between">
            <button 
              onClick={() => {
                playSound(SOUNDS.CLICK, soundEnabled);
                if (practiceStatus === 'playing') {
                  setPracticeStatus('selecting');
                } else {
                  setIsPractice(false);
                }
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black tracking-widest flex items-center gap-2">
              <Timer className="w-6 h-6 text-blue-400" />
              {practiceStatus === 'playing' ? `SOALAN ${practiceQuestionIndex + 1}/10` : 'LATIHAN PANTAS'}
            </h1>
            <div className="w-10"></div>
          </header>

          <main className="max-w-xl mx-auto p-6 space-y-8 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
            {practiceStatus === 'selecting' && (
              <>
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-blue-600/20 text-blue-400 rounded-3xl mx-auto flex items-center justify-center border-2 border-blue-500/30 animate-pulse">
                    <Brain className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">ASAH MINDA ALGEBRA!</h2>
                  <p className="text-slate-400">Pilih misi latihan anda untuk menguasai topik ini.</p>
                </div>

                <div className="grid w-full gap-4">
                  {[
                    { id: 'mixed', name: 'Misi Campuran (10 Soalan)', desc: 'Uji semua kemahiran algebra anda', icon: Sparkles, color: 'border-blue-500/30 bg-blue-900/20' },
                  ].map((topic) => (
                    <button 
                      key={topic.id}
                      onClick={() => {
                        playSound(SOUNDS.CLICK, soundEnabled);
                        setPracticeStatus('playing');
                        setPracticeQuestionIndex(0);
                        setPracticeScore(0);
                        setPracticeInput('');
                      }}
                      className={`w-full p-6 rounded-3xl border-2 ${topic.color} flex items-center gap-4 text-left group hover:scale-[1.02] transition-all relative overflow-hidden`}
                    >
                      <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 relative z-10">
                        <topic.icon className="w-6 h-6" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-black text-lg">{topic.name}</h3>
                        <p className="text-sm text-slate-400">{topic.desc}</p>
                      </div>
                      <ArrowRight className="ml-auto w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity relative z-10" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {practiceStatus === 'playing' && (
              <div className="w-full space-y-8">
                {/* Question Card */}
                <motion.div 
                  key={practiceQuestionIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900 p-8 rounded-[40px] border-4 border-slate-800 shadow-2xl relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-6 py-2 rounded-full font-black text-xs tracking-widest shadow-lg">
                    MISI {practiceQuestionIndex + 1}
                  </div>
                  
                  <div className="text-center py-8">
                    <h2 className="text-3xl font-black text-blue-400 mb-2">{currentQuestion.q}</h2>
                    <p className="text-slate-500 text-sm italic">Sila tulis jawapan akhir anda di bawah</p>
                  </div>

                  <div className="space-y-4">
                    <input 
                      type="text"
                      placeholder="Jawapan anda..."
                      value={practiceInput}
                      onChange={(e) => setPracticeInput(e.target.value)}
                      className={`w-full bg-slate-950 border-2 ${practiceFeedback === 'correct' ? 'border-green-500' : practiceFeedback === 'wrong' ? 'border-red-500' : 'border-slate-800'} p-5 rounded-2xl text-center text-xl font-bold focus:border-blue-500 outline-none transition-all`}
                    />
                    
                    <div className="flex gap-4">
                      {practiceFeedback === 'wrong' && (
                        <button 
                           onClick={() => {
                             playSound(SOUNDS.CLICK, soundEnabled);
                             setShowPracticeAnswer(!showPracticeAnswer);
                           }}
                           className="flex-1 bg-blue-900/40 py-4 rounded-2xl font-bold text-blue-400 hover:text-white transition-all border-b-4 border-slate-950 active:translate-y-1"
                        >
                           {showPracticeAnswer ? 'Tutup Jawapan' : 'Lihat Jawapan'}
                        </button>
                      )}
                      
                      {practiceFeedback === null && (
                        <button 
                           onClick={() => {
                             const isCorrect = practiceInput.toLowerCase().replace(/\s/g, '') === currentQuestion.ans.toLowerCase().replace(/\s/g, '');
                             if (isCorrect) {
                               playSound(SOUNDS.CORRECT, soundEnabled);
                               setPracticeFeedback('correct');
                               setPracticeScore(prev => prev + 1);
                             } else {
                               playSound(SOUNDS.WRONG, soundEnabled);
                               setPracticeFeedback('wrong');
                             }

                             const delay = isCorrect ? 1500 : 3500;

                             setTimeout(() => {
                               setPracticeFeedback(null);
                               setShowPracticeAnswer(false);
                               setPracticeInput('');
                               if (practiceQuestionIndex < 9) {
                                 setPracticeQuestionIndex(prev => prev + 1);
                               } else {
                                 setPracticeStatus('finished');
                               }
                             }, delay);
                           }}
                           className="flex-[2] bg-blue-600 py-4 rounded-2xl font-black text-white shadow-lg shadow-blue-900/40 border-b-4 border-blue-800 active:translate-y-1"
                        >
                           HANTAR JAWAPAN
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {showPracticeAnswer && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-blue-900/30 rounded-2xl border-2 border-blue-500/30 text-center">
                            <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Skema Jawapan</p>
                            <p className="text-xl font-black">{currentQuestion.ans}</p>
                            <p className="text-[10px] text-slate-400 mt-2 italic font-medium px-4">{currentQuestion.hint}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {practiceFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute -bottom-12 left-0 w-full text-center font-black text-2xl uppercase tracking-tighter ${practiceFeedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {practiceFeedback === 'correct' ? 'YAY! TEPAT SEKALI!' : 'ALAMAK! CUBA LAGI!'}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )}

            {practiceStatus === 'finished' && (
              <div className="text-center space-y-8 w-full max-w-sm mt-[-40px]">
                <div className="relative">
                  <div className="w-48 h-48 bg-yellow-400 rounded-full mx-auto flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(250,204,21,0.4)]">
                    <Trophy className="w-24 h-24 text-slate-900" />
                  </div>
                  <Sparkles className="absolute top-0 right-0 w-12 h-12 text-yellow-400 animate-pulse" />
                  <Sparkles className="absolute bottom-0 left-0 w-8 h-8 text-yellow-400 animate-pulse delay-700" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase">MISI SELESAI!</h2>
                  <p className="text-slate-400">Anda telah berjaya menamatkan latihan pantas hari ini.</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-[32px] border-4 border-slate-800">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                    <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Markah Penuh</span>
                    <span className="text-3xl font-black text-blue-400">{practiceScore}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Bonus XP</span>
                    <span className="text-2xl font-black text-yellow-400">+{practiceScore * 50} XP</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    playSound(SOUNDS.CLICK, soundEnabled);
                    setIsPractice(false);
                    setPracticeStatus('selecting');
                    setGameScore(prev => prev + (practiceScore * 50));
                  }}
                  className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                >
                  BALIK KE DASHBOARD
                </button>
              </div>
            )}
            
            {practiceStatus === 'selecting' && (
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 w-full mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-400 text-slate-900 rounded-lg">
                    <Star className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Selesaikan latihan untuk mendapat <span className="text-yellow-400 font-bold">+50 XP</span> setiap satu!</p>
                </div>
              </div>
            )}
          </main>
        </div>
      );
    }

    if (showLeaderboard) {
      return (
        <div className="bg-slate-950 min-h-screen text-white pb-20">
          <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 p-6 sticky top-0 z-50 flex items-center justify-between">
            <button 
              onClick={() => {
                playSound(SOUNDS.CLICK, soundEnabled);
                setShowLeaderboard(false);
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black tracking-widest flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              PENCAPAIAN & RANKING
            </h1>
            <div className="w-10"></div>
          </header>

          <main className="max-w-xl mx-auto p-6 space-y-8">
            {/* My Rank Card */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-xl border-2 border-white/10 relative overflow-hidden">
               <div className="relative z-10 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 p-1 backdrop-blur-sm border border-white/30">
                    <img 
                      src={AVATARS.find(a => a.id === selectedAvatar)?.src || AVATARS[0].src} 
                      className="w-full h-full object-cover rounded-xl" 
                      alt="My Avatar" 
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-black text-blue-200 uppercase tracking-[0.2em]">Peringkat Anda</p>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{name || 'Rekrut'}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-yellow-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Top 12%</span>
                      <span className="text-sm font-bold opacity-80">Rank #245</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-blue-200 uppercase tracking-widest">Kredit</p>
                    <p className="text-3xl font-black">{gameScore}</p>
                  </div>
               </div>
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </section>

            {/* Leaderboard Toggle */}
            <section className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Top Komander</h3>
                <span className="text-[10px] font-bold text-slate-600 uppercase">Season 1: Nebula</span>
              </div>
              
              <div className="space-y-2">
                {LEADERBOARD_DATA.map((user) => (
                  <motion.div 
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: user.rank * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${user.name.includes(name) ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-900 border-slate-800'}`}
                  >
                    <span className={`w-8 font-black text-center ${user.rank <= 3 ? 'text-yellow-400 text-xl' : 'text-slate-600'}`}>
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden">
                      <img src={AVATARS.find(a => a.id === user.avatar)?.src} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-sm tracking-tight">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user.score} XP</p>
                    </div>
                    {user.rank <= 3 && (
                      <div className="flex gap-1">
                         <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                         <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                         <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section className="space-y-4">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] px-2">Koleksi Lencana</h3>
              <div className="grid grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-3xl border-2 flex flex-col items-center text-center gap-3 transition-all ${achievement.unlocked ? 'bg-slate-900 border-slate-800 opacity-100 shadow-lg' : 'bg-slate-950 border-slate-900 opacity-40 grayscale'}`}
                  >
                    <div className={`p-4 rounded-2xl ${achievement.unlocked ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-600'}`}>
                      <achievement.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-black text-xs uppercase tracking-widest">{achievement.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Daily Challenge */}
            <section className="bg-purple-900/20 border-2 border-purple-500/30 p-6 rounded-3xl relative overflow-hidden group">
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Cabaran Harian</span>
                  <h4 className="text-lg font-black tracking-tight">Menawan Nebula X</h4>
                  <p className="text-xs text-slate-400">Selesaikan 5 soalan tahap pakar tanpa salah.</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-2xl shadow-lg shadow-purple-900/40">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-slate-950 rounded-full overflow-hidden border border-purple-500/10">
                <div className="h-full w-1/3 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              </div>
              <div className="mt-2 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                 <span>Progres: 2/5</span>
                 <span className="text-purple-400">+500 XP</span>
              </div>
            </section>
          </main>
        </div>
      );
    }

    return (
      <div className="bg-surface text-on-surface min-h-screen pb-32">
        {/* Top Navigation Bar */}
        <header className="bg-surface/80 backdrop-blur-md text-primary font-bold text-lg tracking-tight shadow-sm flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 border-b-2 border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-blue-400 tracking-tighter">
              Space<span className="bg-gradient-to-r from-fuchsia-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(192,38,211,0.6)]">X</span>-Algebra
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                playSound(SOUNDS.CLICK, !soundEnabled);
                setSoundEnabled(!soundEnabled);
              }}
              className="p-2 hover:bg-slate-800 transition-colors rounded-full group"
              title={soundEnabled ? "Padam Bunyi" : "Pasang Bunyi"}
            >
              {soundEnabled ? (
                <Volume2 className="w-6 h-6 text-slate-500 group-hover:text-blue-400" />
              ) : (
                <VolumeX className="w-6 h-6 text-slate-500 group-hover:text-red-400" />
              )}
            </button>
            <button 
              onClick={() => {
                playSound(SOUNDS.CLICK, soundEnabled);
                setShowLeaderboard(true);
              }}
              className="p-2 hover:bg-slate-800 transition-colors rounded-full group"
            >
              <Trophy className="w-6 h-6 text-slate-500 group-hover:text-yellow-400" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary-fixed">
              <img 
                alt="Student avatar" 
                className="w-full h-full object-cover" 
                src={AVATARS.find(a => a.id === selectedAvatar)?.src || AVATARS[0].src} 
              />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-5 pt-8 space-y-8">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 md:p-12 shadow-lg border-2 border-blue-500/20 shadow-blue-500/5">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs uppercase tracking-widest font-bold border border-white/10">TOPIK MATEMATIK TINGKATAN 1</span>
                <h1 className="text-4xl md:text-5xl font-black">Ungkapan Algebra</h1>
                <p className="text-lg opacity-90 max-w-md italic">Jom teroka bahasa rahsia matematik di mana huruf dan nombor bergabung untuk merungkai misteri!</p>
              </div>
              <div className="w-48 h-48 flex items-center justify-center bg-white/5 rounded-full backdrop-blur-sm border border-white/10 relative">
                <div className="relative">
                  <span className="text-6xl font-black tracking-tighter drop-shadow-lg">2x + 5</span>
                  <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-2 py-1 rounded-lg text-sm font-bold rotate-12 shadow-lg">Wow!</div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10"></div>
          </section>

          {/* Overview Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-surface p-8 rounded-[24px] border-2 border-slate-800 shadow-sm">
                <h2 className="text-2xl font-black text-primary mb-4 flex items-center gap-3">
                  <Brain className="w-8 h-8 text-orange-400" />
                  Apa itu Ungkapan Algebra?
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  Bayangkan anda mempunyai sebuah kotak misteri. Anda tidak tahu berapa banyak guli di dalamnya, jadi anda menamakannya sebagai <strong className="text-primary italic">x</strong>. 
                  Jika anda menambah 5 guli lagi ke dalam kotak itu, anda kini memiliki <strong className="text-secondary italic">x + 5</strong> guli. Itulah ungkapan algebra!
                </p>
              </div>

              {/* Bar Model Section */}
              <div className="bg-surface p-8 rounded-[24px] border-2 border-slate-800 shadow-sm">
                <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                  <Columns4 className="w-10 h-10 text-purple-400" />
                  Model Bar (Bar Model)
                </h2>
                <p className="text-slate-400 mb-6 font-medium italic">
                  Visualisasikan ungkapan algebra menggunakan bar untuk memudahkan pemahaman!
                </p>
                
                <div className="space-y-8">
                  {/* Example 1: x + 5 */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Contoh 1: x + 5</p>
                    <div className="flex w-full h-16 rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner">
                      <div className="flex-grow bg-blue-900/40 flex items-center justify-center border-r-2 border-slate-800">
                        <span className="text-2xl font-black text-blue-400">x</span>
                      </div>
                      <div className="w-1/3 bg-secondary/20 flex items-center justify-center">
                        <span className="text-2xl font-black text-secondary">5</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center font-bold">Jumlah panjang bar mewakili nilai keseluruhan.</p>
                  </div>

                  {/* Example 2: 2x + 3 */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Contoh 2: 2x + 3</p>
                    <div className="flex w-full h-16 rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner">
                      <div className="flex-1 bg-blue-900/40 flex items-center justify-center border-r-2 border-slate-800">
                        <span className="text-2xl font-black text-blue-400">x</span>
                      </div>
                      <div className="flex-1 bg-blue-900/40 flex items-center justify-center border-r-2 border-slate-800">
                        <span className="text-2xl font-black text-blue-400">x</span>
                      </div>
                      <div className="w-1/4 bg-secondary/20 flex items-center justify-center">
                        <span className="text-2xl font-black text-secondary">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-blue-900/30 p-6 rounded-[24px] border-2 border-blue-500/20 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white border border-blue-400/30">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-blue-400">Pemboleh Ubah</h3>
                  <p className="text-slate-400">Huruf (seperti x, y, z) yang mewakili nilai yang belum diketahui.</p>
                </div>
                <div className="bg-green-900/30 p-6 rounded-[24px] border-2 border-green-500/20 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white border border-green-400/30">
                    <Brain className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-secondary">Pemalar</h3>
                  <p className="text-slate-400">Nombor tetap yang nilainya tidak pernah berubah, seperti 5 atau 10.</p>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="bg-surface rounded-[24px] p-6 flex flex-col border-2 border-slate-800">
              <div className="space-y-4">
                <h3 className="text-xs text-slate-500 uppercase font-black tracking-widest">Statistik Pembelajaran</h3>
                <div className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <Timer className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-black">Masa Purata</p>
                    <p className="font-bold text-white">15 Minit</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <Rocket className="w-6 h-6 text-secondary" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-black">Tahap</p>
                    <p className="font-bold text-on-surface">Rendah, Sederhana & Tinggi</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <p className="text-xs text-center text-slate-500 font-bold uppercase">Disediakan untuk Tingkatan 1</p>
                <button 
                  onClick={() => {
                    playSound(SOUNDS.CLICK, soundEnabled);
                    setIsLearning(true);
                  }}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all shadow-primary/20"
                >
                  Mula Belajar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Anatomy Section */}
          <section className="bg-surface p-8 rounded-[32px] border-2 border-slate-800 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-black text-primary mb-8 text-center">Anatomi Ungkapan Algebra</h2>
            <div className="relative flex flex-col items-center justify-center py-16 bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800">
              <div className="text-7xl font-black tracking-tighter text-white flex items-baseline gap-4 relative z-10">
                <span className="text-primary">2</span>
                <span className="text-orange-500 italic">x</span>
                <span className="text-slate-600">+</span>
                <span className="text-secondary">5</span>
              </div>
              
              <div className="grid grid-cols-3 w-full max-w-lg mt-8 relative z-10">
                  <div className="flex flex-col items-center text-center">
                  <div className="w-0.5 h-12 bg-primary/20 mb-2"></div>
                  <span className="text-xs font-black text-primary uppercase">Pekali</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1 text-center">Nombor di hadapan huruf</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-0.5 h-12 bg-orange-500/20 mb-2"></div>
                  <span className="text-xs font-black text-orange-500 uppercase text-center">Pemboleh Ubah</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1 text-center">Huruf yang tidak diketahui</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-0.5 h-12 bg-secondary/20 mb-2"></div>
                  <span className="text-xs font-black text-secondary uppercase">Pemalar</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1 text-center">Nilai tetap</p>
                </div>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFRV0kBF_FCHbGX2EQvrL6VMaGhin6X0fay_ofycCMt8pYOdwfmy6KzTvueHsTBBLf57AvsOF2Ogpbui1vb8oIbs41I88C3iXthTOlXVqaJErT60dDsSuebNksyhS9sh5tQ6VA0UzkrW1SanVaPEg4wJIvinh7CmXyb_iwGKOQmjbdyTD5Huaz1h4feStzc3jmnCt0Qx95PH2DtYB9kK0Og7uNlDUQ-Fl-EcamtR4EBR0HHbWAdGgDUFlnDg2hxI02M3a_0-xwEOE" 
                className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none grayscale invert" 
                alt="Algebra Map"
              />
            </div>
          </section>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-surface rounded-t-[32px] border-t-2 border-slate-800 shadow-2xl">
          <div 
            onClick={() => {
              playSound(SOUNDS.CLICK, soundEnabled);
              setIsPractice(false);
              setIsGame(false);
              setIsCollection(false);
              setIsSettings(false);
              setShowLeaderboard(false);
              setIsLearning(false);
            }}
            className={`flex flex-col items-center justify-center transition-all px-5 py-2 rounded-2xl cursor-pointer ${(!isPractice && !isGame && !isCollection && !isSettings && !showLeaderboard && !isLearning) ? 'bg-blue-900/30 text-blue-400 border border-blue-500/20' : 'text-slate-600 hover:text-primary'}`}
          >
            <Brain className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase mt-1">Belajar</span>
          </div>
          <div 
            onClick={() => {
              playSound(SOUNDS.CLICK, soundEnabled);
              setIsPractice(true);
              setIsGame(false);
              setIsCollection(false);
              setIsSettings(false);
              setShowLeaderboard(false);
              setIsLearning(false);
            }}
            className={`flex flex-col items-center justify-center transition-all px-5 py-2 rounded-2xl cursor-pointer ${isPractice ? 'bg-blue-900/30 text-blue-400 border border-blue-500/20' : 'text-slate-600 hover:text-primary'}`}
          >
            <Timer className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase mt-1">Latihan</span>
          </div>
          <div 
            onClick={() => {
              playSound(SOUNDS.CLICK, soundEnabled);
              setIsGame(true);
              setGameStatus('start');
              setIsPractice(false);
              setIsCollection(false);
              setIsSettings(false);
              setShowLeaderboard(false);
              setIsLearning(false);
            }}
            className={`flex flex-col items-center justify-center transition-all px-5 py-2 rounded-2xl cursor-pointer ${isGame ? 'bg-blue-900/30 text-blue-400 border border-blue-500/20' : 'text-slate-600 hover:text-primary'}`}
          >
            <Gamepad2 className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase mt-1">Permainan</span>
          </div>
          <div 
            onClick={() => {
              playSound(SOUNDS.CLICK, soundEnabled);
              setIsCollection(true);
              setIsPractice(false);
              setIsGame(false);
              setIsSettings(false);
              setShowLeaderboard(false);
              setIsLearning(false);
            }}
            className={`flex flex-col items-center justify-center transition-all px-5 py-2 rounded-2xl cursor-pointer ${isCollection ? 'bg-blue-900/30 text-blue-400 border border-blue-500/20' : 'text-slate-600 hover:text-primary'}`}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase mt-1">Koleksi</span>
          </div>
          <div 
            onClick={() => {
              playSound(SOUNDS.CLICK, soundEnabled);
              setIsSettings(true);
              setIsPractice(false);
              setIsGame(false);
              setIsCollection(false);
              setShowLeaderboard(false);
              setIsLearning(false);
            }}
            className={`flex flex-col items-center justify-center transition-all px-5 py-2 rounded-2xl cursor-pointer ${isSettings ? 'bg-blue-900/30 text-blue-400 border border-blue-500/20' : 'text-slate-600 hover:text-primary'}`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase mt-1">Tetapan</span>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="space-bg-pattern min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Formula Elements */}
      <div className="fixed bottom-10 left-10 opacity-10 pointer-events-none hidden lg:block select-none">
        <div className="text-primary text-7xl font-black">x + y = z</div>
      </div>
      <div className="fixed top-20 right-10 opacity-10 pointer-events-none hidden lg:block select-none">
        <div className="text-primary text-6xl font-black italic">E=mc²</div>
      </div>
      <div className="fixed top-40 left-20 opacity-5 pointer-events-none hidden xl:block select-none">
        <div className="text-primary text-5xl font-bold">2x + 5 = 11</div>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full rounded-3xl shadow-2xl border-2 border-slate-800 overflow-hidden flex flex-col bg-surface relative z-10"
      >
        {/* Hero Illustration Header */}
        <div className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center overflow-hidden min-h-[280px] border-b border-slate-800">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-10 w-12 h-12 border-2 border-blue-500/30 rounded-lg rotate-12"></div>
            <div className="absolute bottom-8 right-12 w-16 h-16 border-2 border-blue-500/30 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-500/20 rounded-sm -rotate-45"></div>
          </div>
          
          <div className="relative z-10 text-center p-6">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative inline-block mb-2"
            >
              <Rocket className="w-24 h-24 text-secondary-fixed drop-shadow-[0_0_20px_rgba(110,231,183,0.6)]" />
            </motion.div>
            
            <div className="relative flex flex-col items-center">
              <div className="absolute -top-4 -left-8 animate-bounce delay-100">
                <Sparkles className="w-6 h-6 text-secondary-fixed" />
              </div>
              <div className="absolute -top-6 right-0 animate-pulse">
                <Star className="w-8 h-8 text-tertiary-fixed" />
              </div>
              <h1 className="text-4xl md:text-5xl tracking-tighter italic text-white font-bold leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-center">
                Selamat Datang ke <br/>
                <span className="text-5xl md:text-6xl uppercase font-black tracking-widest block mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  Space<span className="bg-gradient-to-r from-fuchsia-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(192,38,211,0.6)]">X</span>-Algebra!
                </span>
              </h1>
              <div className="absolute -bottom-2 -right-10 animate-bounce delay-300">
                <Sparkle className="w-6 h-6 text-secondary-fixed" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content Container */}
        <div className="p-6 md:p-10 space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <p className="text-lg text-white/90">Beritahu kami tentang diri anda untuk memulakan perjalanan matematik anda.</p>
                </div>

                {/* Input Section */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest px-1 text-slate-400 font-semibold" htmlFor="username-input">NAMA ANDA</label>
                  <div className="relative">
                    <input 
                      id="username-input"
                      className="w-full h-14 px-6 rounded-xl border-2 border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-900 text-white placeholder:text-slate-600 font-bold" 
                      placeholder="Masukkan nama anda" 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 w-6 h-6" />
                  </div>
                </div>

                {/* Avatar Selection Section */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest px-1 text-slate-400 font-semibold">Pilih Komander Anda</label>
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    {AVATARS.map((avatar) => (
                      <button 
                        key={avatar.id}
                        id={`avatar-choice-${avatar.id}`}
                        onClick={() => {
                          playSound(SOUNDS.CLICK, soundEnabled);
                          setSelectedAvatar(avatar.id);
                        }}
                        className={`aspect-square rounded-2xl p-1 border-2 transition-all group relative active:scale-95 ${selectedAvatar === avatar.id ? 'border-primary bg-primary/20 scale-105' : 'border-slate-800 hover:border-slate-600 bg-slate-900/50 grayscale hover:grayscale-0'}`}
                      >
                        <img 
                          alt={avatar.name} 
                          className={`w-full h-full object-cover rounded-xl transition-all ${selectedAvatar === avatar.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                          src={avatar.src} 
                        />
                        <div className={`absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center transition-opacity shadow-lg ${selectedAvatar === avatar.id ? 'opacity-100' : 'opacity-0'}`}>
                          <Check className="w-4 h-4 font-black" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Bersedia untuk Berlepas!</h2>
                  <p className="text-lg text-slate-300">Apakah tahap pengalaman anda dalam algebra?</p>
                </div>

                <div className="grid gap-4">
                  {[
                    { id: 'novice', title: 'Rekrut Angkasa', desc: 'Baru bermula dengan persamaan', icon: Brain },
                    { id: 'expert', title: 'Navigasi Galaksi', desc: 'Saya sudah kenal X dan Y', icon: Timer },
                    { id: 'master', title: 'Profesor Nebula', desc: 'Persamaan adalah jiwa saya', icon: Trophy }
                  ].map((level) => (
                    <button 
                      key={level.id}
                      onClick={() => playSound(SOUNDS.CLICK, soundEnabled)}
                      className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-800 bg-slate-900/50 text-left hover:bg-slate-800 hover:border-slate-600 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-900/40 flex items-center justify-center text-blue-400">
                        <level.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{level.title}</h3>
                        <p className="text-sm text-slate-500">{level.desc}</p>
                      </div>
                      <ArrowRight className="ml-auto w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
                
                <div className="p-4 rounded-xl bg-slate-950 border-2 border-slate-800">
                  <p className="text-sm text-slate-400 italic text-center">
                    "Falsafah semesta ditulis dalam bahasa matematik." - Galileo
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-8 text-center py-10"
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    className="absolute -inset-4 border-2 border-dashed border-white/20 rounded-full"
                  ></motion.div>
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-secondary-fixed relative z-10 mx-auto">
                    <img 
                      src={AVATARS.find(a => a.id === selectedAvatar)?.src || AVATARS[0].src} 
                      className="w-full h-full object-cover" 
                      alt="Ready Avatar" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-tight">MISI SEDIA!</h2>
                  <p className="text-xl text-secondary-fixed font-bold">Komander {name || 'Rekrut'}</p>
                  <p className="text-white/80 max-w-sm mx-auto">Pesawat anda telah diisi dengan bahan api persamaan. Destinasi seterusnya: Nebula Algebra!</p>
                </div>

                <div className="flex justify-center gap-4">
                  {[1, 2, 3].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ delay: i * 0.2, repeat: Infinity, duration: 2 }}
                    >
                      <Star className="w-8 h-8 text-tertiary-fixed" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src={AVATARS.find(a => a.id === selectedAvatar)?.src || AVATARS[0].src} 
                      className="w-12 h-12 rounded-full border-2 border-secondary-fixed" 
                      alt="Mini Avatar" 
                    />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-black">Komander</p>
                      <p className="text-sm font-bold text-white">{name || 'Rekrut'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase font-black">Tahap Bahan Api</p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`h-4 w-2 rounded-sm ${i <= (isSolved ? 5 : 2) ? 'bg-secondary-fixed shadow-[0_0_8px_rgba(110,231,183,0.4)]' : 'bg-slate-800'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-secondary-fixed">
                      <Brain className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-widest">Sektor Persamaan</span>
                    </div>
                    
                    <div className="text-center py-4">
                      <p className="text-slate-500 text-sm mb-2">Selesaikan untuk <span className="text-secondary-fixed font-bold italic">x</span> untuk melompat ke kelajuan cahaya:</p>
                      <h3 className="text-4xl font-black text-white tracking-widest">x + 15 = 42</h3>
                    </div>

                    <div className="relative">
                      <input 
                        type="number"
                        placeholder="?"
                        value={puzzleInput}
                        onChange={(e) => {
                          setPuzzleInput(e.target.value);
                          if (e.target.value === '27' && !isSolved) {
                            playSound(SOUNDS.CORRECT, soundEnabled);
                            setIsSolved(true);
                          }
                        }}
                        className={`w-full h-16 text-center text-3xl font-black rounded-2xl border-4 transition-all outline-none bg-slate-950 text-white ${isSolved ? 'border-secondary-fixed text-secondary-fixed' : 'border-slate-800 focus:border-blue-500'}`}
                      />
                      {isSolved && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-fixed"
                        >
                          <Check className="w-8 h-8" />
                        </motion.div>
                      )}
                    </div>
                    {isSolved && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-secondary-fixed text-sm font-bold animate-pulse"
                      >
                        TERAS STABIL! Sedia untuk lompatan cahaya!
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Action */}
          <div className="pt-4">
            <button 
              id="main-action-button"
              onClick={handleNext}
              disabled={(step === 1 && (!name || !selectedAvatar)) || (step === 4 && !isSolved)}
              className={`w-full h-16 rounded-full font-bold text-xl flex items-center justify-center gap-3 transition-all group border-2 border-white/10 shadow-[0_6px_0_rgba(0,0,0,0.4)] active:translate-y-[6px] active:shadow-none hover:translate-y-[2px] shadow-black/40 ${(step === 1 && (!name || !selectedAvatar)) || (step === 4 && !isSolved) ? 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed text-slate-500' : 'bg-primary text-white shadow-primary/20'}`}
            >
              {step === 3 ? "MULAKAN MISI" : step === 4 ? "KELAJUAN CAHAYA!" : "Jom Teroka!"}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-grow h-3 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
              <motion.div 
                initial={{ width: "25%" }}
                animate={{ width: `${(step / 4) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/10 blur-[1px]"></div>
              </motion.div>
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Langkah {step} daripada 4</span>
          </div>
        </div>
      </motion.main>
      
      {/* Background Starry Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
}
