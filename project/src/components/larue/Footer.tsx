import { MapPin, Phone, Instagram, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2B2823] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img src="/IMG_4562.PNG" alt="La Rue Salon & Spa" className="h-10 w-auto object-contain mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              El salón y spa de lujo en Torreón donde el estilo cobra vida. Expertos en cabello, uñas, spa y maquillaje.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-medium mb-4">Contacto</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-white/50 mt-0.5 shrink-0" />
                <p className="text-white/50 text-sm">Torreón, Coahuila, México</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/50 shrink-0" />
                <a href="tel:+528710000000" className="text-white/50 text-sm hover:text-white transition-colors">
                  (871) 000-0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={16} className="text-white/50 shrink-0" />
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/50 text-sm hover:text-white transition-colors">
                  @larue.salonyspa
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-medium mb-4">Horario</p>
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-white/50 mt-0.5 shrink-0" />
              <div className="text-gray-400 text-sm space-y-1">
                <p>Lunes – Viernes: 9:00 – 20:00</p>
                <p>Sábado: 9:00 – 18:00</p>
                <p>Domingo: Bajo cita previa</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© 2026 La Rue Salon & Spa. Todos los derechos reservados.</p>
          <p className="text-white/25 text-xs">Torreón, Coahuila, México</p>
        </div>
      </div>
    </footer>
  );
}
