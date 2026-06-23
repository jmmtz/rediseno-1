import { useState } from 'react';
import { X } from 'lucide-react';

/* LA RUE GALLERY — La Rue salon work photos only. VALM model/logo images excluded. */
const galleryImages = [
  { src: '/IMG_4332.JPG', label: 'Uñas' },
  { src: '/IMG_4336.jpg', label: 'Peinado' },
  { src: '/IMG_4338.jpg', label: 'Cabello' },
  { src: '/IMG_4339.jpg', label: 'Cabello' },
  { src: '/IMG_4340.jpg', label: 'Maquillaje' },
  { src: '/IMG_4341.jpg', label: 'Peinado' },
  { src: '/IMG_4343.jpg', label: 'Corte' },
  { src: '/IMG_4344.jpg', label: 'Corte' },
  { src: '/IMG_4331.JPG', label: 'Interior' },
  { src: '/IMG_4330.JPG', label: 'Letrero' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="galeria" className="bg-[#F7F4EF] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#8A7A5C] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Nuestro trabajo</p>
          <h2 className="font-serif-display text-[#2B2823] text-4xl md:text-5xl font-normal tracking-tight mb-4">
            Galería <span className="italic">La Rue</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#2B2823] mx-auto" />
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl group relative shadow-sm"
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#2B2823]/0 group-hover:bg-[#2B2823]/20 transition-all duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2B2823]/50 px-2 py-1 rounded">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-[#2B2823]/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-[#2B2823] bg-[#2B2823]/40 rounded-full p-2" onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
