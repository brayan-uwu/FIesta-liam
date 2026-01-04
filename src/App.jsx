import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Star, Moon, Sun, Clock, X } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Contador regresivo
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2026-02-07T17:45:00');
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateICS = () => {
    const event = {
      title: 'Presentación de Liam',
      description: 'Misa de Presentación - Brian Hernández Martínez y Yeimi Rocandio Ramos tienen el honor de invitarle',
      location: 'Parroquia Cristo Rey, Santa María Tulpetlac',
      start: '20260207T174500',
      end: '20260207T194500',
      alarm: '20260206T174500'
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Presentación Liam//ES
BEGIN:VEVENT
UID:${Date.now()}@presentacion-liam.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Recordatorio: Presentación de Liam mañana
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentacion-liam.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
        : 'bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50'
    }`}>
      {/* Modal de imagen en grande */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={32} className="text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Vista previa"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 p-3 rounded-full transition-all duration-300 z-40 ${
          darkMode 
            ? 'bg-amber-400 text-slate-900 hover:bg-amber-300' 
            : 'bg-slate-700 text-white hover:bg-slate-600'
        }`}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {darkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <Star
              key={i}
              size={Math.random() * 3 + 1}
              className="absolute text-amber-200 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12 relative">
          <div className={`inline-block px-8 py-3 rounded-full mb-6 ${
            darkMode 
              ? 'bg-amber-400/20 border-2 border-amber-400' 
              : 'bg-amber-100 border-2 border-amber-600'
          }`}>
            <span className={`text-4xl ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              🤠
            </span>
          </div>
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 transition-colors ${
            darkMode ? 'text-amber-300' : 'text-blue-800'
          }`} style={{ fontFamily: 'Georgia, serif' }}>
            Liam Hernández Rocandio
          </h1>
          <div className={`w-32 h-1 mx-auto rounded-full ${
            darkMode ? 'bg-amber-400' : 'bg-blue-600'
          }`}></div>
        </div>

        {/* Contador Regresivo */}
        <div className={`rounded-2xl shadow-xl mb-8 p-6 md:p-8 ${
          darkMode 
            ? 'bg-slate-800/80 backdrop-blur-sm border border-amber-400/30' 
            : 'bg-white/90 backdrop-blur-sm border border-blue-200'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className={darkMode ? 'text-amber-400' : 'text-blue-600'} size={24} />
            <h3 className={`font-bold text-xl ${
              darkMode ? 'text-amber-300' : 'text-blue-800'
            }`}>
              Faltan para el gran día
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-lg ${
              darkMode ? 'bg-slate-900/50' : 'bg-blue-50'
            }`}>
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              }`}>
                {timeLeft.days}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Días
              </div>
            </div>
            <div className={`text-center p-4 rounded-lg ${
              darkMode ? 'bg-slate-900/50' : 'bg-blue-50'
            }`}>
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              }`}>
                {timeLeft.hours}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Horas
              </div>
            </div>
            <div className={`text-center p-4 rounded-lg ${
              darkMode ? 'bg-slate-900/50' : 'bg-blue-50'
            }`}>
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              }`}>
                {timeLeft.minutes}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Min
              </div>
            </div>
            <div className={`text-center p-4 rounded-lg ${
              darkMode ? 'bg-slate-900/50' : 'bg-blue-50'
            }`}>
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              }`}>
                {timeLeft.seconds}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Seg
              </div>
            </div>
          </div>
        </div>

        {/* Card principal */}
        <div className={`rounded-3xl shadow-2xl overflow-hidden transition-colors duration-500 mb-8 ${
          darkMode 
            ? 'bg-slate-800/80 backdrop-blur-sm border border-amber-400/30' 
            : 'bg-white/90 backdrop-blur-sm border border-blue-200'
        }`}>
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className={`text-2xl md:text-3xl mb-6 transition-colors ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`} style={{ fontFamily: 'Georgia, serif' }}>
                Brian Hernández Martínez
                <br />
                Yeimi Rocandio Ramos
              </h2>
              
              <p className={`text-lg md:text-xl mb-6 leading-relaxed transition-colors ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Tienen el honor de invitar a usted y a su apreciable familia a la Misa con motivo de la Presentación de su hijo
              </p>

              <div className={`inline-block px-6 py-2 rounded-lg mb-8 ${
                darkMode 
                  ? 'bg-amber-400/20 border border-amber-400' 
                  : 'bg-amber-50 border border-amber-300'
              }`}>
                <span className="text-xl">🐴 👢 🌵</span>
              </div>
            </div>

            <div className={`rounded-2xl p-6 md:p-8 mb-8 ${
              darkMode 
                ? 'bg-slate-900/50 border border-amber-400/20' 
                : 'bg-blue-50/50 border border-blue-200'
            }`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Calendar className={`mt-1 flex-shrink-0 ${
                    darkMode ? 'text-amber-400' : 'text-blue-600'
                  }`} size={28} />
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      darkMode ? 'text-amber-300' : 'text-blue-800'
                    }`}>
                      Fecha y Hora
                    </h3>
                    <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      7 de Febrero de 2026
                      <br />
                      17:45 hrs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className={`mt-1 flex-shrink-0 ${
                    darkMode ? 'text-amber-400' : 'text-blue-600'
                  }`} size={28} />
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      darkMode ? 'text-amber-300' : 'text-blue-800'
                    }`}>
                      Lugar
                    </h3>
                    <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                      Parroquia Cristo Rey
                      <br />
                      Santa María Tulpetlac
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className={darkMode ? 'text-amber-400' : 'text-blue-600'} size={24} />
                <h3 className={`font-bold text-xl ${
                  darkMode ? 'text-amber-300' : 'text-blue-800'
                }`}>
                  Sus Padrinos
                </h3>
              </div>
              <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Karina Hernández Martínez
                <br />
                Israel Barrueta Reyes
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={generateICS}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  darkMode
                    ? 'bg-amber-400 text-slate-900 hover:bg-amber-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                📅 Agregar a mi Calendario
              </button>
              <p className={`mt-3 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Incluye recordatorio 24 horas antes
              </p>
            </div>
          </div>

          {/* Galería de Fotos */}
          <div className="px-8 md:px-12 pb-8">
            <h3 className={`text-center font-bold text-2xl mb-6 ${
              darkMode ? 'text-amber-300' : 'text-blue-800'
            }`}>
              Nuestro pequeño vaquero 🤠
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={`rounded-xl overflow-hidden aspect-square border-4 cursor-pointer ${
                  darkMode ? 'border-amber-400/30 hover:border-amber-400' : 'border-blue-200 hover:border-blue-400'
                } transition-colors`}
                onClick={() => setSelectedImage('/images/Liam1.jpeg')}
              >
                <img
                  src="/images/Liam1.jpeg"
                  alt="Liam 1"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div 
                className={`rounded-xl overflow-hidden aspect-square border-4 cursor-pointer ${
                  darkMode ? 'border-amber-400/30 hover:border-amber-400' : 'border-blue-200 hover:border-blue-400'
                } transition-colors`}
                onClick={() => setSelectedImage('/images/Liam2.jpeg')}
              >
                <img
                  src="/images/Liam2.jpeg"
                  alt="Liam 2"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div 
                className={`rounded-xl overflow-hidden aspect-square border-4 cursor-pointer ${
                  darkMode ? 'border-amber-400/30 hover:border-amber-400' : 'border-blue-200 hover:border-blue-400'
                } transition-colors`}
                onClick={() => setSelectedImage('/images/Liam3.png')}
              >
                <img
                  src="/images/Liam3.png"
                  alt="Liam 3"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <div className={`py-6 text-center border-t ${
            darkMode 
              ? 'bg-slate-900/30 border-amber-400/20' 
              : 'bg-blue-50/50 border-blue-200'
          }`}>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              ¡Esperamos contar con su presencia! 🤠
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className={`inline-flex gap-4 text-3xl ${darkMode ? 'opacity-70' : 'opacity-60'}`}>
            <span>⭐</span>
            <span>🐴</span>
            <span>⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;