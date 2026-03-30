import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    { title: "The Future of EdTech in Classrooms", date: "Oct 12, 2023", excerpt: "How integrating modern technology is reshaping the way students engage with complex subject matters.", author: "Dr. Sarah Jenkins" },
    { title: "10 Tips for Effective Exam Preparation", date: "Sep 28, 2023", excerpt: "Proven strategies to help students maximize their study time and reduce anxiety before big exams.", author: "Michael Chang" },
    { title: "Importance of Extracurricular Activities", date: "Sep 15, 2023", excerpt: "Why academics aren't the only piece of the puzzle for a well-rounded educational experience.", author: "Elena Rodriguez" },
    { title: "Parenting in the Digital Age", date: "Aug 30, 2023", excerpt: "A guide for parents navigating the challenges of screen time, online safety, and digital literacy.", author: "James Wilson" }
  ];

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">Our Blog</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Insights, news, and resources from our community of educators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-transform hover:-translate-y-1">
              <div className="flex items-center text-sm text-slate-500 mb-4 space-x-4">
                <span className="bg-slate-100 px-3 py-1 rounded-full">{post.date}</span>
                <span className="flex items-center">
                  By {post.author}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2">
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-600 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <Link href="#" className="text-blue-600 font-semibold inline-flex items-center group">
                Read full article
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
