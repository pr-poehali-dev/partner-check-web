import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

export default function CheckingAnimation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkValue, checkType } = location.state || {};
  
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (!checkValue) {
      navigate('/');
      return;
    }
  }, [checkValue, navigate]);

  const stages = [
    { text: 'Подключение к серверу...', duration: 7000 },
    { text: 'Поиск аккаунтов в соцсетях и на сайтах знакомств...', duration: 9000 },
    { text: 'Анализ активности в сети...', duration: 8000 },
    { text: 'Цифровой анализ мессенджеров...', duration: 9000 },
    { text: 'Определение геопозиции...', duration: 8000 },
    { text: 'Анализ скрытых интересов в сети...', duration: 9000 },
    { text: 'Поиск скрытых друзей...', duration: 8000 },
    { text: 'Обнаружение диалогов VK...', duration: 9000 },
    { text: 'Обнаружение диалогов WhatsApp...', duration: 8000 },
    { text: 'Выгрузка активности в соцсетях...', duration: 9000 },
    { text: 'Анализ цифровых поведений...', duration: 8000 },
    { text: 'Обнаружены удалённые аккаунты...', duration: 9000 },
    { text: 'Анализ обнаруженных скрытых профилей и аккаунтов...', duration: 10000 },
    { text: 'Финальная обработка результатов...', duration: 9000 },
  ];

  const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);

  const generateRandomCode = () => {
    const codeSnippets = [
      'SELECT * FROM user_activity WHERE user_id=',
      'ANALYZE: vk_messages_decrypt(',
      'CONNECT: messenger_api.whatsapp.decrypt(',
      'FETCH: geolocation_data(',
      'SCAN: dating_profiles(',
      'DECODE: hidden_friends_list(',
      'EXTRACT: deleted_accounts(',
      '0x7F3A9B2C 0x4E8D1F5A 0x2C9B7E41',
      'HASH: SHA-256 verification...',
      'KEY: AES-256-GCM decryption...',
      '[OK] Database connection established',
      '[PROCESSING] Neural network analysis...',
      '[FOUND] 127 data points extracted',
      '██████████ 87.3% complete',
    ];
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)] + ' ' + Math.random().toString(36).substring(7);
  };

  useEffect(() => {
    const codeInterval = setInterval(() => {
      setCodeLines(prev => {
        const newLines = [generateRandomCode(), ...prev].slice(0, 12);
        return newLines;
      });
    }, 400);

    const dataInterval = setInterval(() => {
      setShowData(prev => !prev);
    }, 1200);

    setTimeout(() => setShowCode(true), 1000);

    return () => {
      clearInterval(codeInterval);
      clearInterval(dataInterval);
    };
  }, []);

  useEffect(() => {
    let elapsed = 0;
    let stageIndex = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const currentProgress = (elapsed / totalDuration) * 100;
      setProgress(Math.min(currentProgress, 100));

      let cumulativeDuration = 0;
      for (let i = 0; i < stages.length; i++) {
        cumulativeDuration += stages[i].duration;
        if (elapsed <= cumulativeDuration) {
          stageIndex = i;
          break;
        }
      }
      setCurrentStage(stageIndex);

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/result', { state: { checkValue, checkType } });
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [navigate, checkValue, checkType, totalDuration]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
        
        {/* Matrix-style grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-900/30 to-blue-900/30 border border-red-500/30 rounded-lg px-6 py-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">
                {checkType === 'vk' ? 'Проверка по ВКонтакте' : 'Проверка по номеру телефона'}
              </span>
            </div>
            <div className="text-lg font-mono text-gray-400 bg-black/50 rounded px-4 py-2 inline-block border border-gray-700">
              {checkValue}
            </div>
          </div>

          {/* Code animation */}
          {showCode && (
            <div className="mb-8 bg-black/80 border border-gray-800 rounded-lg p-4 font-mono text-xs overflow-hidden">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-500 ml-2">system_analyzer.exe</span>
              </div>
              <div className="space-y-1 max-h-48 overflow-hidden">
                {codeLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="text-green-400 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <span className="text-gray-600">{'>'}</span> {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main status */}
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/50 rounded-2xl p-8 shadow-2xl shadow-red-500/20">
            {/* Stage indicator */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-800"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                    className="text-red-500 transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                  {Math.round(progress)}%
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                  Идет выгрузка цифровой информации
                </h2>
                <p className="text-sm text-gray-400">
                  Этап {currentStage + 1} из {stages.length}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <Progress value={progress} className="h-2 mb-6" />

            {/* Current stage */}
            <div className="bg-black/50 rounded-lg p-4 border border-gray-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-lg font-mono text-gray-200">
                  {stages[currentStage]?.text}
                </p>
              </div>
            </div>

            {/* Data blocks animation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className={`h-16 rounded border transition-all duration-300 ${
                    idx <= (currentStage * 8) / stages.length
                      ? 'bg-gradient-to-br from-red-900/30 to-blue-900/30 border-red-500/30'
                      : 'bg-gray-900/30 border-gray-800'
                  }`}
                >
                  {showData && idx <= (currentStage * 8) / stages.length && (
                    <div className="h-full flex items-center justify-center font-mono text-xs text-gray-500">
                      {Array.from({ length: 8 }, () => '█').join('')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Warning */}
            <div className="mt-6 flex items-start gap-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="text-yellow-500 text-xl">⚠️</div>
              <div className="flex-1 text-sm">
                <p className="text-yellow-200 font-semibold mb-1">Не закрывайте страницу</p>
                <p className="text-gray-400">
                  Идет глубокий анализ цифровой активности. Процесс занимает время для получения максимально полных данных.
                </p>
              </div>
            </div>
          </div>

          {/* Technical info */}
          <div className="mt-6 text-center text-xs text-gray-600 font-mono">
            <p>REQUEST_ID: {Math.random().toString(36).substring(2, 15)}</p>
            <p className="mt-1">CONNECTION: ENCRYPTED • SSL/TLS 1.3</p>
          </div>
        </div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-[slide-in-right_2s_infinite]"></div>
      </div>
    </div>
  );
}
