import { useState, useEffect } from 'react';
import { Scissors, Sparkles, Hand, Heart, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Service, Promotion } from '../../types';

const categoryIcons: Record<string, React.ReactNode> = {
  hair: <Scissors size={18} />,
  nails: <Hand size={18} />,
  spa: <Heart size={18} />,
  makeup: <Sparkles size={18} />,
  general: <Sparkles size={18} />,
};

const categoryLabels: Record<string, string> = {
  hair: 'Cabello',
  nails: 'Uñas',
  spa: 'Spa & Bienestar',
  makeup: 'Maquillaje',
};

interface ServicesProps {
  onBookService: (service: Service) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    supabase.from('services').select('*').eq('is_active', true).then(({ data }) => {
      if (data) setServices(data);
    });
    supabase.from('promotions').select('*').eq('is_active', true).then(({ data }) => {
      if (data) setPromotions(data);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(services.map((s) => s.category)))];
  const filtered = activeCategory === 'all' ? services : services.filter((s) => s.category === activeCategory);

  const getDayOfWeek = () => new Date().getDay();
  const currentHour = new Date().getHours();
  const activePromos = promotions.filter((p) => {
    const dayMatch = p.applicable_days.includes(getDayOfWeek() === 0 ? 7 : getDayOfWeek());
    if (!dayMatch) return false;
    if (p.start_time && p.end_time) {
      const start = parseInt(p.start_time.split(':')[0]);
      const end = parseInt(p.end_time.split(':')[0]);
      return currentHour >= start && currentHour < end;
    }
    return true;
  });

  return (
    <section id="servicios" className="bg-[#F7F4EF] py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#8A7A5C] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Lo que ofrecemos</p>
          <h2 className="font-serif-display text-[#2B2823] text-4xl md:text-5xl font-normal tracking-tight mb-4">
            Nuestros <span className="italic">Servicios</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#2B2823] mx-auto" />
        </div>

        {/* Active promotions banner */}
        {activePromos.length > 0 && (
          <div className="mb-10 space-y-3">
            {activePromos.map((promo) => (
              <div key={promo.id} className={`rounded-xl px-6 py-4 flex items-start gap-3 ${
                promo.promo_type === 'happy_hour'
                  ? 'bg-[#F0E8DA] border border-[#2B2823]'
                  : 'bg-[#FBFBF9] border border-gray-200'
              }`}>
                <Tag size={16} className="text-[#8A7A5C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{promo.title}</p>
                  <p className="text-gray-500 text-sm">{promo.description}
                    {promo.promo_type === 'combo' && promo.original_price > 0 && (
                      <span className="ml-2">
                        <span className="line-through text-gray-400">${promo.original_price.toLocaleString()}</span>
                        <span className="text-[#8A7A5C] font-bold ml-1">${promo.promo_price.toLocaleString()} MXN</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#2B2823] text-white shadow-sm'
                  : 'border border-[#e8e4de] text-[#2B2823]/60 hover:border-[#2B2823] hover:text-[#2B2823] bg-[#FBFBF9]'
              }`}
            >
              {cat === 'all' ? 'Todos' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((service) => {
            const happyHourPromo = activePromos.find((p) =>
              p.promo_type === 'happy_hour' && p.discount_type === 'percent' && service.category === 'hair'
            );
            const discountedMin = happyHourPromo
              ? service.price_min * (1 - happyHourPromo.discount_value / 100)
              : null;

            return (
              <div
                key={service.id}
                className="group bg-[#FBFBF9] border border-[#e8e4de] hover:border-[#2B2823] rounded-2xl p-6 transition-all duration-300 hover:shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#F0E8DA] flex items-center justify-center text-[#8A7A5C]">
                    {categoryIcons[service.category] || categoryIcons.general}
                  </div>
                  {happyHourPromo && (
                    <span className="text-xs bg-[#2B2823] text-white font-bold px-2 py-0.5 rounded-full">
                      HAPPY HOUR
                    </span>
                  )}
                </div>
                <h3 className="text-gray-900 font-semibold text-base mb-2">{service.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{service.description}</p>
                <div className="flex items-end justify-between">
                  <div>
                    {happyHourPromo && discountedMin ? (
                      <div>
                        <p className="text-gray-400 text-xs line-through">${service.price_min.toLocaleString()}+</p>
                        <p className="text-gray-900 font-bold text-lg">${Math.round(discountedMin).toLocaleString()}+</p>
                      </div>
                    ) : (
                      <p className="text-gray-900 font-bold text-lg">
                        ${service.price_min.toLocaleString()}
                        {service.price_max > service.price_min && (
                          <span className="text-sm text-gray-400 font-normal"> – ${service.price_max.toLocaleString()}</span>
                        )}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-0.5">{service.duration_minutes} min</p>
                  </div>
                  <button
                    onClick={() => onBookService(service)}
                    className="bg-[#2B2823] hover:bg-[#3A362F] text-white text-xs font-medium px-4 py-2 rounded-full uppercase tracking-wide transition-colors active:scale-95"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
