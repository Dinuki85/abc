export default function AboutPage() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">About EduConnect</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Our mission is to empower the next generation with world-class educational tools and a supportive community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Founded with the vision of bridging the gap between traditional education and modern technology, EduConnect has grown into a comprehensive platform trusted by educators, students, and parents worldwide.
            </p>
            <p>
              We believe that education should be accessible, interactive, and tailored to individual learning styles. Our team of educators, technologists, and designers work tirelessly to create an environment where learning thrives.
            </p>
            <p className="border-l-4 border-blue-500 pl-4 py-2 mt-8 italic text-slate-700 font-medium">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="bg-slate-100 rounded-3xl aspect-video w-full flex items-center justify-center overflow-hidden relative shadow-lg">
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
              {/* Placeholder for an image */}
              <div className="text-slate-400 font-medium text-lg flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0V20a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                </svg>
                About Us Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
