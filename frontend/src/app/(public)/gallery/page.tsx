export default function GalleryPage() {
  const images = [
    { src: 'Science Fair 2023', category: 'Events' },
    { src: 'Annual Sports Meet', category: 'Sports' },
    { src: 'Library Opening', category: 'Campus' },
    { src: 'Graduation Day', category: 'Ceremony' },
    { src: 'Art Exhibition', category: 'Arts' },
    { src: 'Robotics Workshop', category: 'Academic' }
  ];

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">Photo Gallery</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Glimpses of vibrant life, events, and activities at EduConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-slate-100 border border-slate-200 cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                <div className="flex flex-col items-center">
                  <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0V20a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                  </svg>
                  {img.src}
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">{img.category}</span>
                <h3 className="text-white text-xl font-bold mt-1">{img.src}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
