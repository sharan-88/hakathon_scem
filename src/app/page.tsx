import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto text-center">
            <h1 className="text-8xl md:text-6xl font-bold mb-6 leading-tight">
              Launch Your Career with Premium Internships
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
              Connect students with trusted companies through college-verified opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              <Link 
                href="/register?role=student" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Register as Student
              </Link>
              <Link 
                href="/register?role=college"
                className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 transform hover:scale-105 transition-all duration-200 border-2 border-white/20 shadow-lg backdrop-blur-sm"
              >
                Register as College
              </Link>
              <Link 
                href="/register?role=company"
                className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 transform hover:scale-105 transition-all duration-200 border-2 border-white/20 shadow-lg backdrop-blur-sm"
              >
                Register as Company
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center relative">
              <div className="bg-blue-600 w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:rotate-[30deg] transition-transform duration-300">
                <span className="text-3xl font-bold text-white -rotate-45">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Company Posts Job</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Companies share detailed internship opportunities with requirements and expectations
              </p>
              {/* Connector line - visible only on desktop */}
              <div className="hidden md:block absolute top-10 left-[calc(100%_-_2rem)] w-[calc(100%_-_4rem)] h-0.5 bg-blue-200"></div>
            </div>
            
            <div className="text-center relative">
              <div className="bg-blue-600 w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:rotate-[30deg] transition-transform duration-300">
                <span className="text-3xl font-bold text-white -rotate-45">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">College Verifies</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Partner colleges review and validate internship opportunities for their students
              </p>
              {/* Connector line - visible only on desktop */}
              <div className="hidden md:block absolute top-10 left-[calc(100%_-_2rem)] w-[calc(100%_-_4rem)] h-0.5 bg-blue-200"></div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:rotate-[30deg] transition-transform duration-300">
                <span className="text-3xl font-bold text-white -rotate-45">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Student Applies</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Students apply to verified internships with confidence through their college portal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Our Platform Section */}
      <section className="py-24 bg-white" aria-labelledby="benefits-heading">
        <div className="container mx-auto px-4">
          <h2 id="benefits-heading" className="text-3xl md:text-5xl font-bold text-center mb-16">
            Why Use Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Students Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6 text-blue-600">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M12 14l9-5-9-5-9 5 9 5m0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222">
                  </path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Students</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Verified internships and better job-fit
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>College-verified opportunities</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Personalized job matches</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Streamlined applications</span>
                </li>
              </ul>
            </div>

            {/* Colleges Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6 text-blue-600">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                  </path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Colleges</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Control over student internships
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Quality assurance</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Student progress tracking</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Company partnerships</span>
                </li>
              </ul>
            </div>

            {/* Companies Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6 text-blue-600">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">For Companies</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Get quality applicants from verified institutions
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Pre-screened candidates</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Direct college connections</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Efficient hiring process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16" aria-labelledby="footer-heading">
        <div className="container mx-auto px-4">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We connect students with quality internships through trusted college partnerships, ensuring the best opportunities for career growth.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span>contact@internportal.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>(555) 123-4567</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Intern Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
