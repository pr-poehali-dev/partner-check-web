import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkValue, checkType } = location.state || {};
  const [showCardError, setShowCardError] = useState(false);

  useEffect(() => {
    if (!checkValue) {
      navigate('/');
    }
  }, [checkValue, navigate]);

  const orderNumber = 'ВП-' + Math.floor(100000 + Math.random() * 900000);
  const currentDate = new Date().toLocaleDateString('ru-RU');
  const operators = ['Вероника', 'Александр', 'Виктория', 'Александра'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  const testimonials = [
    { text: 'С ума сходил от чувства, что от меня что-то скрывают... Проверил свою девушку и очень рад, что ничего не нашёл.', author: 'Дмитрий, 28 лет' },
    { text: 'Парень ушёл в армию, я переживала... Решила проверить через сервис. Парня у меня больше нет, но лучше так, чем жить с обманом.', author: 'Анна, 24 года' },
    { text: 'Брат стал скрытным, я переживала... Проверила и вздохнула с облегчением — у него появилась подружка!', author: 'Мария, 32 года' },
  ];

  const faqItems = [
    { q: 'Как работает проверка?', a: 'Наша система анализирует цифровую активность: соцсети, мессенджеры, сайты знакомств. Мы используем легальные методы сбора открытых данных.' },
    { q: 'Узнает ли проверяемый человек?', a: 'Нет, проверка полностью анонимна. Мы не связываемся с проверяемым лицом и не оставляем следов.' },
    { q: 'Что входит в отчет?', a: 'Анализ переписки, активность в соцсетях, скрытые профили, аккаунты на сайтах знакомств, геолокация, история изменений профиля ВК.' },
    { q: 'Это законно?', a: 'Да, мы работаем только с открытыми данными и соблюдаем законодательство РФ.' },
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
            <div>
              <h1 className="text-lg font-bold">Верность-Про</h1>
              <p className="text-xs text-gray-400">Профессиональный Онлайн-сервис</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 animate-scale-in">
            <Icon name="CheckCircle" size={48} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
            Проверка успешно завершена!
          </h2>
          <p className="text-gray-400">Отчет с результатами готов к отправке</p>
        </div>

        {/* Order Info */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/50 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Тип проверки</p>
                <p className="font-semibold">{checkType === 'vk' ? 'ВКонтакте' : 'Номер телефона'}</p>
                <p className="text-gray-400 text-xs mt-1">{checkValue}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Номер заказа</p>
                <p className="font-semibold font-mono">{orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Дата</p>
                <p className="font-semibold">{currentDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Message */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 mb-6">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Личный оператор: {operator}</h3>
                <p className="text-gray-400 text-sm">Специалист по проверкам на верность</p>
              </div>
            </div>

            <div className="bg-black/50 rounded-lg p-6 mb-6 border border-gray-800">
              <h4 className="text-lg font-bold mb-4 text-green-400">Отчет сформирован!</h4>
              <p className="text-gray-300 mb-4 leading-relaxed">
                В готовом отчете содержится подробная информация о цифровой жизни вашей второй половинки, а именно ответы на важные вопросы, по которым системе удалось найти данные:
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-gray-300">Информация о цифровой активности с пользователями ВК, WhatsApp и Telegram за последние 2 месяца — узнаете, к кому проявляет максимальную активность</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-gray-300">Активность в сообществах ВК и группах Telegram — узнаете скрытые интересы за последние 3 месяца</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-gray-300">Все существующие аккаунты в соцсетях и мессенджерах, профили на сайтах знакомств (включая удаленные)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-gray-300">Скрытые друзья ВК с расшифровкой совместной цифровой активности</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-gray-300">Геолокация — часто посещаемые места за последний месяц (⚠️ возможны технические сбои при выгрузке точных локаций)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-gray-300">История изменений страницы ВКонтакте с момента создания</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm text-gray-300">Как ваш партнер записан в телефонах других людей — это может многое сказать</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-red-900/30 to-blue-900/30 rounded-lg p-4 border border-red-500/30 mb-6">
                <p className="text-center text-lg font-semibold mb-2">
                  Узнайте правду о цифровой жизни своей второй половинки прямо сейчас!
                </p>
                <p className="text-center text-sm text-gray-400">
                  Без нарушения личного пространства и риска раскрыть себя
                </p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="inline-flex items-baseline gap-2 mb-2">
                  <span className="text-2xl line-through text-gray-500">2499₽</span>
                  <span className="text-4xl font-bold text-green-400">1999₽</span>
                </div>
                <div className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block">
                  Скидка 500₽! Успейте воспользоваться!
                </div>
              </div>

              {/* Payment buttons */}
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-400 mb-3">Выберите удобный способ оплаты:</p>
                <Button
                  onClick={() => navigate('/payment', { state: { checkValue, checkType, orderNumber } })}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-14 text-lg font-bold"
                >
                  <Icon name="Smartphone" className="mr-2" size={20} />
                  СБП (Система Быстрых Платежей)
                </Button>
                <Button
                  onClick={() => setShowCardError(true)}
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-gray-800 h-14 text-lg"
                >
                  <Icon name="CreditCard" className="mr-2" size={20} />
                  Оплата картой
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
            Отзывы клиентов
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                <CardContent className="p-4">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={14} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 mb-3 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="text-xs text-gray-500 font-semibold">{testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Guarantees */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
            Наши гарантии
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 p-4 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800">
              <Icon name="ShieldCheck" className="text-green-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold mb-1">100% Конфиденциальность</h4>
                <p className="text-sm text-gray-400">Все данные удаляются после получения отчета</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800">
              <Icon name="Award" className="text-blue-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold mb-1">Высокое качество</h4>
                <p className="text-sm text-gray-400">Профессиональный анализ от экспертов</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800">
              <Icon name="Lock" className="text-purple-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold mb-1">Полная анонимность</h4>
                <p className="text-sm text-gray-400">Проверяемый не узнает о проверке</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800">
              <Icon name="Zap" className="text-yellow-500 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold mb-1">Быстрая доставка</h4>
                <p className="text-sm text-gray-400">Отчет сразу после оплаты</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h3 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
            Часто задаваемые вопросы
          </h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg px-4 md:px-6"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:text-red-500">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p className="mb-2">Мы гарантируем полную конфиденциальность и безопасность при проведении проверок.</p>
          <p>© 2025 ВерностьПро. Все права защищены.</p>
        </div>
      </footer>

      {/* Card Error Dialog */}
      <Dialog open={showCardError} onOpenChange={setShowCardError}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500">Способ оплаты недоступен</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">
            Данный способ оплаты на данный момент не работает. Попробуйте позже или выберите другой способ оплаты.
          </p>
          <Button onClick={() => setShowCardError(false)} className="bg-red-600 hover:bg-red-700">
            Понятно
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
