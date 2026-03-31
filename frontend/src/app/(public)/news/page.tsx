import Image from 'next/image';
import { 
  Calendar, 
  MapPin, 
  ArrowRight,
  Clock,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NewsPage() {
  const newsItems = [
    {
      title: "Big Match With Kimbulapitiya Jeyaraj Pranandupulle MV",
      img: "blog-1.jpg",
      date: "Upcoming Event",
      category: "Sports",
      desc: "The school Big Match is scheduled with the Brotherhood School WP/NP Kimbulapitiya Jeyaraj Pranandupulle Maha Vidhyalaya, Kimbulapitiya. School cricket team will participate to this event in near future."
    },
    {
      title: "Sinhala Hindu New Year Celebration",
      img: "blog-2.jpg",
      date: "09 April 2024",
      category: "Cultural",
      desc: "All the school academic, non-academic staff and student participate to celebration. Throughout the celebration, traditional games and activities bring communities together in joyous camaraderie."
    },
    {
      title: "Suramya Geya sanhitha 2024 Musical Program",
      img: "blog-3.jpg",
      date: "03 March 2024",
      category: "Aesthetic",
      desc: "An entertaining and educational classical music program was held at the school outdoor auditorium to enhance the aesthetic enjoyment of the children under the initiative of Mr. Rodney Warnakula."
    },
    {
      title: "Inter-School Athletic Championship",
      img: "blog-1.jpg",
      date: "15 February 2024",
      category: "Sports",
      desc: "Our students showcased exceptional talent and discipline at the zonal athletic meet, securing several podium finishes and bringing glory to AMV."
    },
    {
      title: "Annual Prize Giving Ceremony",
      img: "blog-2.jpg",
      date: "20 January 2024",
      category: "Academic",
      desc: "Celebrating the academic excellence and outstanding achievements of our students across all grades. A day of pride for parents and teachers alike."
    },
    {
      title: "Science & Technology Exhibition",
      img: "blog-3.jpg",
      date: "10 December 2023",
      category: "STEM",
      desc: "Students displayed innovative projects ranging from robotics to sustainable energy solutions, demonstrating their commitment to future technologies."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* 1. Header Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 h-full">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="border border-white/20 rounded-full w-12 h-12"></div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Latest News</h1>
          <p className="text-white/80 text-xl font-medium max-w-3xl mx-auto italic leading-relaxed">
            Stay updated with the latest happenings, achievements, and upcoming celebrations at Andiambalama Maha Vidyalaya.
          </p>
        </div>
      </section>

      {/* 2. News Grid */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-primary font-black uppercase tracking-widest text-sm italic">News & Events</span>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <h2 className="text-5xl font-black text-dark tracking-tight uppercase">Stories from our School</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsItems.map((item, i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
                <div className="relative h-72 overflow-hidden">
                  <Image 
                    src={`/img/${item.img}`} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-secondary text-dark font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-10 space-y-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                       <Calendar size={14} className="text-primary" /> {item.date}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-2">
                       <MapPin size={14} className="text-primary" /> AMV Campus
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-dark leading-tight uppercase tracking-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>

                  <div className="pt-4 mt-auto">
                    <Button variant="secondary" className="rounded-full border-2 border-primary text-primary font-black uppercase tracking-widest px-8 group-hover:bg-primary group-hover:text-white transition-all flex items-center gap-2">
                      Read Report <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-20 flex justify-center items-center gap-4">
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors border border-gray-100 text-dark font-black">1</button>
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors border border-gray-100 text-dark font-black">2</button>
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors border border-gray-100 text-dark font-black">3</button>
             <span className="text-gray-400 font-black">...</span>
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors border border-gray-100 text-dark font-black">NEXT</button>
          </div>
        </div>
      </section>

    </div>
  );
}
