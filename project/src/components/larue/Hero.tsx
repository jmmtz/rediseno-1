interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2B2823]">
      {/* Background — La Rue interior photo (salon reception) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/IMG_4331.JPG')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B2823]/70 via-[#2B2823]/30 to-[#2B2823]/85" />

      {/* Decorative beige line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8A7A5C] to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* LA RUE LOGO HERO — Replace img src with official logo when available */}
        <div className="mb-8 flex justify-center">
          <img
            src="/IMG_4563.PNG"
            alt="La Rue Salon & Spa"
            className="h-24 md:h-36 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        <p className="text-white/60 uppercase tracking-[0.4em] text-xs md:text-sm font-light mb-4">
          Torreón, Coahuila
        </p>
        <h1 className="font-serif-display text-white text-4xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight mb-6">
          Donde el estilo<br />
          <span className="text-white/80 italic">se convierte en arte</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Experiencias de belleza de lujo, personalizadas para ti. Cabello, uñas, spa y maquillaje en un solo lugar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBookClick}
            className="bg-[#E8DFD0] hover:bg-[#DDD0BC] text-[#2B2823] font-medium px-10 py-4 text-sm tracking-wide uppercase rounded-full transition-all duration-300 active:scale-95"
          >
            Agendar Cita
          </button>
          <a
            href="#servicios"
            className="border border-white/40 hover:border-white/70 text-white/85 hover:text-white font-medium px-10 py-4 text-sm tracking-wide uppercase rounded-full transition-all duration-300"
          >
            Nuestros Servicios
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-[#8A7A5C] to-transparent" />
      </div>
    </section>
  );
}
