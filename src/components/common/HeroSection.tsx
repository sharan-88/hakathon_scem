import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
          Launch Your Career with{' '}
          <span className="text-indigo-600">Verified Internships</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600 mb-12">
          Connect students with trusted companies through college-verified opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
          <Link 
            href="/register?role=student"
            className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Register as Student
          </Link>
          
          <Link 
            href="/register?role=college"
            className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Register as College
          </Link>
          
          <Link 
            href="/register?role=company"
            className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Register as Company
          </Link>
        </div>

        {/* Login Link */}
        <div className="mt-8">
          <Link
            href="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 