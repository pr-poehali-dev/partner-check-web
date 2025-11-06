import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Index() {
  const navigate = useNavigate();
  const [checkValue, setCheckValue] = useState('');
  const [checkType, setCheckType] = useState<'vk' | 'phone' | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const validateVK = (value: string) => {
    return value.includes('vk.com/') || value.includes('vkontakte.ru/') || /^[a-zA-Z0-9_]+$/.test(value);
  };

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  };

  const handleStart = () => {
    if (!checkValue.trim()) {
      toast.error('Введите ссылку ВК или номер телефона');
      return;
    }

    const isVK = validateVK(checkValue);
    const isPhone = validatePhone(checkValue);

    if (!isVK && !isPhone) {
      toast.error('Некорректный формат. Введите ссылку ВК или номер телефона');
      return;
    }

    const type = isVK ? 'vk' : 'phone';
    navigate('/checking', { state: { checkValue, checkType: type } });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const benefits = [
    { icon: 'Shield', title: 'Геолокация', desc: 'Проверка по геопозиции за последний месяц' },
    { icon: 'MessageSquare', title: 'Анализ переписки', desc: 'С кем общается и кому уделяет внимание в соцсетях' },
    { icon: 'Activity', title: 'Активность', desc: 'Отслеживание в мессенджерах и соцсетях' },
    { icon: 'UserSearch', title: 'Скрытые аккаунты', desc: 'Поиск дополнительных и удаленных профилей' },
    { icon: 'Heart', title: 'Сайты знакомств', desc: 'Поиск анкет, включая удаленные' },
    { icon: 'Eye', title: 'Скрытые интересы', desc: 'Цифровой анализ действий в сети' },
  ];

  const testimonials = [
    { text: 'С ума сходил от чувства, что от меня что-то скрывают... Проверил свою девушку и очень рад, что ничего не нашёл. Не жаль потратить деньги на сервис ради спокойствия.', author: 'Дмитрий, 28 лет' },
    { text: 'Парень ушёл в армию, и я просто не находила себе места... Переживала, не общается ли он за моей спиной. Решила проверить через сервис. Парня у меня больше нет, но лучше так, чем жить с обманом.', author: 'Анна, 24 года' },
    { text: 'Брат стал скрытным, я переживала, что он связался с плохой компанией... Проверила и вздохнула с облегчением — у него появилась подружка! Очень мило смотреть, как он смущается.', author: 'Мария, 32 года' },
    { text: 'Девушка уехала учиться в другой город, мы отдалялись... Я боялся, что она встретила другого, а она лишь отшучивалась. Проверил — и не зря. В любовь больше не верю.', author: 'Алексей, 26 лет' },
    { text: 'Муж стал пропадать на работе, поздно приходить, казалось, меня обманывают. Проверила — он не врал. Сервис стоит своих денег.', author: 'Елена, 35 лет' },
    { text: 'Сомнения разъедали изнутри. Благодаря вам я получила конкретные факты и смогла принять взвешенное решение. Рекомендую!', author: 'Ольга, 29 лет' },
  ];

  const faqItems = [
    { q: 'Как работает проверка?', a: 'Наша система анализирует цифровую активность: соцсети, мессенджеры, сайты знакомств. Мы используем легальные методы сбора открытых данных и технологии цифрового анализа.' },
    { q: 'Узнает ли проверяемый человек?', a: 'Нет, проверка полностью анонимна. Мы не связываемся с проверяемым лицом и не оставляем следов.' },
    { q: 'Сколько длится проверка?', a: 'В среднем 5-10 минут. Вы получите детальный отчет сразу после завершения анализа.' },
    { q: 'Что входит в отчет?', a: 'Анализ переписки, активность в соцсетях, скрытые профили, аккаунты на сайтах знакомств, геолокация, история изменений профиля ВК, скрытые друзья и их активность.' },
    { q: 'Это законно?', a: 'Да, мы работаем только с открытыми данными и соблюдаем законодательство РФ.' },
    { q: 'Гарантируете ли вы результат?', a: 'Мы гарантируем проведение проверки и предоставление всех найденных данных. Объем информации зависит от цифровой активности проверяемого.' },
    { q: 'Можно ли получить повторно отчет?', a: 'Нет, в целях конфиденциальности отчет удаляется сразу после получения вами.' },
    { q: 'Какие способы оплаты?', a: 'СБП (Система Быстрых Платежей) и оплата картой.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-red-900/30 sticky top-0 z-50 backdrop-blur-sm bg-black/90">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Shield" className="text-white" size={24} />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold">Верность-Про</h1>
              <p className="text-xs text-gray-400">Профессиональный Онлайн-сервис</p>
            </div>
            <div className="md:hidden">
              <h1 className="text-base font-bold">Верность-Про</h1>
            </div>
          </div>
          <div className="flex gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs md:text-sm text-gray-300 hover:text-white"
              onClick={() => window.open('https://vernost-pro-scanner.lovable.app/report-example', '_blank')}
            >
              <span className="hidden md:inline">Примеры проверок</span>
              <span className="md:hidden">Примеры</span>
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-xs md:text-sm"
              onClick={() => window.open('https://t.me/VernostProBot', '_blank')}
            >
              Консультация
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-blue-500 animate-fade-in">
              Проверка на верность онлайн
            </h2>
            <p className="text-lg md:text-2xl text-gray-300 mb-6 md:mb-8 animate-fade-in">
              Узнайте всю правду о цифровой жизни вашей второй половины
            </p>

            {/* Stats */}
            <div className="hidden md:grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
              <div className="bg-gradient-to-br from-red-900/30 to-transparent p-4 rounded-lg border border-red-500/30">
                <div className="text-2xl md:text-4xl font-bold text-red-500 mb-2">3000+</div>
                <div className="text-xs md:text-sm text-gray-400">успешных проверок</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-transparent p-4 rounded-lg border border-blue-500/30">
                <div className="text-2xl md:text-4xl font-bold text-blue-500 mb-2">5 минут</div>
                <div className="text-xs md:text-sm text-gray-400">среднее время</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-transparent p-4 rounded-lg border border-purple-500/30">
                <div className="text-2xl md:text-4xl font-bold text-purple-500 mb-2">100%</div>
                <div className="text-xs md:text-sm text-gray-400">конфиденциальности</div>
              </div>
            </div>

            {/* Form */}
            <div ref={formRef} className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Начните проверку прямо сейчас</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Введите ссылку ВК или номер телефона"
                  value={checkValue}
                  onChange={(e) => setCheckValue(e.target.value)}
                  className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 h-12 md:h-14 text-base md:text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                />
                <Button
                  onClick={handleStart}
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 h-12 md:h-14 text-base md:text-lg font-bold animate-pulse"
                  size="lg"
                >
                  <Icon name="Search" className="mr-2" size={20} />
                  Начать проверку
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  Полная анонимность • Без уведомлений • Быстрый результат
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
            Что вы получите от проверки
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, idx) => (
              <Card 
                key={idx} 
                className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={scrollToForm}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={benefit.icon as any} className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-2">{benefit.title}</h4>
                  <p className="text-sm md:text-base text-gray-400">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
            Почему выбирают нас
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4 p-4 md:p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
              <Icon name="Lock" className="text-red-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-2">100% Анонимность</h4>
                <p className="text-sm md:text-base text-gray-400">Никто не узнает о проверке. Полная конфиденциальность гарантирована.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 md:p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
              <Icon name="Zap" className="text-blue-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-2">Быстрый результат</h4>
                <p className="text-sm md:text-base text-gray-400">Получите детальный отчет уже через 5-10 минут после оплаты.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 md:p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
              <Icon name="CheckCircle" className="text-green-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-2">Гарантия качества</h4>
                <p className="text-sm md:text-base text-gray-400">Мы предоставляем только проверенную информацию с подтверждением.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 md:p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
              <Icon name="ShieldCheck" className="text-purple-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-2">Легальность</h4>
                <p className="text-sm md:text-base text-gray-400">Работаем только с открытыми данными в рамках закона РФ.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
              3000+ положительных отзывов
            </h3>
            <p className="text-base md:text-lg text-gray-400">Реальные истории наших клиентов</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.slice(0, window.innerWidth < 768 ? 2 : 6).map((testimonial, idx) => (
              <Card key={idx} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                <CardContent className="p-4 md:p-6">
                  <div className="flex mb-3 md:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-gray-300 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="text-xs md:text-sm text-gray-500 font-semibold">{testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
            Часто задаваемые вопросы
          </h3>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-4 md:px-6"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-red-500">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-gray-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 md:py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" className="text-white" size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Верность-Про</h4>
                  <p className="text-xs text-gray-400">Онлайн сервис</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">Профессиональный сервис для проверки на верность. Анонимно, быстро, конфиденциально.</p>
              <p className="text-sm text-gray-500">Контакты: <a href="mailto:info@vernostpro.ru" className="text-blue-400 hover:underline">info@vernostpro.ru</a></p>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 text-white">Связь с оператором 24/7</h5>
              <Button 
                variant="outline"
                className="w-full mb-2 border-red-500/50 hover:bg-red-500/10 text-white"
                onClick={() => window.open('https://t.me/VernostProBot', '_blank')}
              >
                Консультация специалиста
              </Button>
              <p className="text-xs text-gray-500 mt-2">Получить консультацию 24/7</p>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-white">Информация</h5>
              <div className="space-y-2 text-sm">
                <div>
                  <button 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => window.open('https://vernost-pro-scanner.lovable.app/report-example', '_blank')}
                  >
                    Примеры результатов проверки
                  </button>
                </div>
                <div>
                  <button 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => window.open('https://t.me/VernostOnlineSupportBot', '_blank')}
                  >
                    Служба поддержки 24/7
                  </button>
                  <p className="text-xs text-gray-600">Для обращений по любым вопросам</p>
                </div>
                <div>
                  <button 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => window.open('https://vernost-pro-scanner.lovable.app/privacy', '_blank')}
                  >
                    Политика конфиденциальности
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-500">
            <p className="mb-2">Мы гарантируем полную конфиденциальность и безопасность при проведении проверок.</p>
            <p>© 2025 ВерностьПро. Все права защищены. Сервис предназначен для проверки отношений исключительно в законных целях.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
