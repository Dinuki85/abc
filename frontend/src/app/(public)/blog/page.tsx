import Image from 'next/image';
import { 
  Trophy, 
  MessageCircle, 
  User, 
  Search, 
  Calendar,
  ChevronRight,
  Quote
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SportsPage() {
  const sports = [
    {
      name: "Cricket",
      inCharge: "Ms. Gayani",
      coach: "Mr. Sampath",
      img: "detail.jpg",
      desc: "Sri Lankan school cricket is deeply ingrained in the country's sporting culture, serving as a crucial platform for nurturing young talent. It's a vibrant and competitive scene, with numerous schools across the island participating in various tournaments and leagues. Schools like St. Joseph's College, Royal College, and Trinity College have historically been powerhouse teams. The schools cricket season typically runs from September to April, featuring both traditional formats and limited-overs cricket. Many Sri Lankan cricket stars, including Muttiah Muralitharan and Kumar Sangakkara, honed their skills playing school cricket before making it to the national team."
    },
    {
      name: "Elle",
      img: "blog-1.jpg",
      desc: "Sri Lankan school Elle, also known as \"Lankarama,\" is a traditional game deeply rooted in the island's culture. It's a team sport resembling a mix of baseball and cricket, played with a ball made of stitched coconut husk and a bat called a \"wambey.\" The objective is to hit the ball thrown by the opposing team and score runs by running between two designated points. Elle is often played in schoolyards and open spaces, fostering teamwork, coordination, and physical fitness among participants."
    },
    {
      name: "Volleyball",
      img: "blog-2.jpg",
      desc: "Sri Lankan school volleyball is a prominent fixture within the country's sports landscape, offering a platform for young athletes to showcase their talents and passion for the game. Volleyball enjoys widespread popularity across schools in Sri Lanka, with both boys' and girls' teams participating in various competitions at local, regional, and national levels."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* 1. Header Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[20px] border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic">Our Sports</h1>
          <p className="text-white/80 text-xl font-medium max-w-3xl mx-auto italic leading-relaxed">
            Nurturing athletic excellence and sportsmanship through diversity in sports and dedicated coaching.
          </p>
        </div>
      </section>

      {/* 2. Main content with Sidebar */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column: Sports Detail */}
            <div className="lg:w-2/3 space-y-20">
               {sports.map((sport, i) => (
                 <div key={i} className="space-y-8">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-1 bg-primary"></div>
                          <span className="text-primary font-black uppercase tracking-widest text-sm italic">AMV Sports</span>
                       </div>
                       <h2 className="text-5xl font-black text-dark tracking-tight uppercase leading-none">{sport.name}</h2>
                       {sport.inCharge && (
                         <div className="flex items-center gap-6 text-gray-400 font-black text-xs uppercase tracking-widest pb-4">
                            <span className="flex items-center gap-2"><User size={14} className="text-primary" /> {sport.inCharge} (TIC)</span>
                            {sport.coach && <span className="flex items-center gap-2"><User size={14} className="text-secondary" /> {sport.coach} (Coach)</span>}
                         </div>
                       )}
                    </div>

                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gray-100 group">
                       <Image 
                         src={`/img/${sport.img}`} 
                         alt={sport.name} 
                         width={1200} 
                         height={600} 
                         className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                       />
                    </div>

                    <div className="prose prose-xl max-w-none text-gray-500 font-medium leading-loose space-y-6">
                       <p>{sport.desc}</p>
                    </div>
                    {i < sports.length - 1 && <hr className="border-gray-100" />}
                 </div>
               ))}

               {/* Teacher Incharge Message */}
               <div className="bg-light p-12 rounded-[3rem] border border-gray-100 space-y-8 relative overflow-hidden">
                  <Quote className="absolute top-8 right-12 text-primary opacity-10" size={120} />
                  <div className="flex items-center gap-6">
                     <Image 
                       src="/img/user.jpg" 
                       alt="TIC Message" 
                       width={100} 
                       height={100} 
                       className="rounded-full shadow-lg ring-4 ring-white"
                     />
                     <div>
                        <h4 className="text-2xl font-black text-dark leading-none uppercase">Ms. Gayani Udarika</h4>
                        <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">Sports Teacher Incharge</p>
                     </div>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <h3 className="text-3xl font-black text-dark italic leading-tight uppercase tracking-tight">"Congratulations to our phenomenal Karate team"</h3>
                    <p className="text-gray-500 font-medium text-lg italic leading-relaxed">
                      "Congratulations to our phenomenal karate team for clinching the prestigious 1st place title at The Island School Karate Championship! Your dedication, discipline, and sheer determination have led us to this incredible victory. Each punch, kick, and block symbolizes your unwavering commitment to excellence, and your triumph today is a testament to your hard work and perseverance. Well done, champions!"
                    </p>
                  </div>
               </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3 space-y-12">
               {/* Search */}
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-black text-dark uppercase tracking-tight border-b border-gray-100 pb-4">Search Sports</h4>
                  <div className="relative">
                     <input type="text" placeholder="Search..." className="w-full bg-light border-none rounded-xl py-4 px-6 font-bold text-dark focus:ring-2 focus:ring-primary outline-none" />
                     <Search className="absolute right-6 top-4 text-gray-300" />
                  </div>
               </div>

               {/* Categories */}
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-black text-dark uppercase tracking-tight border-b border-gray-100 pb-4">Categories</h4>
                  <div className="space-y-2">
                     {[
                       { name: 'Cricket', count: 150 },
                       { name: 'Netball', count: 131 },
                       { name: 'Volleyball', count: 78 },
                       { name: 'Taekwondo', count: 56 },
                       { name: 'Karate', count: 98 },
                     ].map(cat => (
                        <div key={cat.name} className="flex items-center justify-between p-4 hover:bg-light rounded-xl transition-colors cursor-pointer font-bold group">
                           <span className="text-gray-500 group-hover:text-primary transition-colors">{cat.name}</span>
                           <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full">{cat.count}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Tag Cloud */}
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-black text-dark uppercase tracking-tight border-b border-gray-100 pb-4">Tag Cloud</h4>
                  <div className="flex flex-wrap gap-2">
                     {['Athletics', 'Indoor', 'National', 'Champions', 'Fitness', 'Teamwork'].map(tag => (
                        <span key={tag} className="px-4 py-2 border-2 border-primary/20 text-primary text-xs font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer">{tag}</span>
                     ))}
                  </div>
               </div>

               {/* Recent Event Snapshot */}
               <div className="bg-dark p-10 rounded-[2rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16"></div>
                  <h4 className="text-xl font-black uppercase italic tracking-tight">Recent Post</h4>
                  <div className="space-y-6">
                     {[
                       { title: 'New Year Festival', date: 'April 2024' },
                       { title: 'Student Parliament', date: 'March 2024' },
                       { title: 'Reading Competition', date: 'Feb 2024' }
                     ].map(post => (
                        <div key={post.title} className="flex gap-4 group cursor-pointer">
                           <div className="w-16 h-16 bg-white/10 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10 group-hover:ring-primary transition-all"></div>
                           <div className="space-y-1">
                              <h5 className="font-extrabold text-sm uppercase group-hover:text-secondary transition-colors">{post.title}</h5>
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-1"><Calendar size={10} /> {post.date}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
