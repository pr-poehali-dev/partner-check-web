import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ReportDeliveryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkValue, checkType, orderNumber, transactionId } = location.state || {};

  useEffect(() => {
    if (!orderNumber) {
      navigate('/');
    }
  }, [orderNumber, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#4a0e0e] to-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
              <Icon name="Shield" className="text-white" size={36} />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">Верность-Про</h1>
              <p className="text-sm text-gray-400">Профессиональный Онлайн-сервис</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-2 border-red-500/50 shadow-2xl shadow-red-500/20 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 animate-scale-in shadow-lg shadow-green-500/50">
                <Icon name="CheckCircle" size={56} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-blue-500 animate-fade-in">
                Ваш отчет успешно сформирован!
              </h2>
            </div>

            {/* Order Info */}
            <div className="bg-black/50 rounded-lg p-6 mb-8 border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Номер заказа</p>
                  <p className="font-mono font-bold">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">ID транзакции</p>
                  <p className="font-mono text-xs">{transactionId}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Тип проверки</p>
                  <p className="font-semibold">{checkType === 'vk' ? 'ВКонтакте' : 'Номер телефона'}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Статус</p>
                  <p className="font-semibold text-green-400">Оплачено ✓</p>
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-red-900/30 via-purple-900/30 to-blue-900/30 rounded-lg p-6 mb-6 border border-red-500/30">
                <p className="text-xl md:text-2xl font-bold mb-4 text-white">
                  Для получения отчёта, перейдите по ссылке
                </p>
                <Button
                  onClick={() => window.open('https://t.me/VernostProffiBot', '_blank')}
                  className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-600 hover:from-green-700 hover:via-green-800 hover:to-green-700 h-16 text-lg font-bold animate-pulse shadow-lg shadow-green-500/30"
                  size="lg"
                >
                  <Icon name="Download" className="mr-2" size={24} />
                  Получить отчет
                </Button>
              </div>

              {/* Warning */}
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
                  <div className="text-left">
                    <p className="font-semibold text-yellow-200 mb-2">Важная информация</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Повторная подача заявки не требуется, отчет уже сформирован</li>
                      <li>• В целях обеспечения конфиденциальности и анонимности, мы удаляем отчет сразу после получения вами</li>
                      <li>• Повторная отправка отчета будет недоступна</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex gap-3 p-4 bg-black/30 rounded-lg border border-gray-800">
                <Icon name="Shield" className="text-purple-500 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold mb-1 text-sm">Полная конфиденциальность</p>
                  <p className="text-xs text-gray-400">Данные защищены и удаляются после получения</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-black/30 rounded-lg border border-gray-800">
                <Icon name="Lock" className="text-red-500 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold mb-1 text-sm">100% Анонимность</p>
                  <p className="text-xs text-gray-400">Никто не узнает о проверке</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-black/30 rounded-lg border border-gray-800">
                <Icon name="FileText" className="text-blue-500 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold mb-1 text-sm">Детальный отчет</p>
                  <p className="text-xs text-gray-400">Полная информация о цифровой активности</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-black/30 rounded-lg border border-gray-800">
                <Icon name="CheckCircle" className="text-green-500 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold mb-1 text-sm">Проверенные данные</p>
                  <p className="text-xs text-gray-400">Только актуальная информация</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Info" className="text-blue-400" size={20} />
                Что дальше?
              </h3>
              <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                <li>Нажмите кнопку "Получить отчет" выше</li>
                <li>Вы будете перенаправлены в Telegram</li>
                <li>Отчет будет отправлен вам автоматически</li>
                <li>Изучите информацию и примите взвешенное решение</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Additional CTA */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 mb-3">Остались вопросы? Свяжитесь с нашей службой поддержки</p>
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800 text-gray-300"
            onClick={() => window.open('https://t.me/VernostOnlineSupportBot', '_blank')}
          >
            <Icon name="MessageCircle" className="mr-2" size={18} />
            Служба поддержки 24/7
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-black/80 border-t border-gray-800 py-4 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          <p>© 2025 ВерностьПро. Все права защищены. Сервис предназначен для проверки отношений исключительно в законных целях.</p>
        </div>
      </footer>
    </div>
  );
}
