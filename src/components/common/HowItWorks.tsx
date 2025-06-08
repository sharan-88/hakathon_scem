const steps = [
  {
    title: "Company Posts Job",
    description: "Companies post internship opportunities with detailed requirements and expectations.",
    icon: "📝"
  },
  {
    title: "College Verifies",
    description: "Partner colleges review and verify internships to ensure quality and legitimacy.",
    icon: "✅"
  },
  {
    title: "Student Applies",
    description: "Students can apply to verified internships with confidence.",
    icon: "🎓"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center text-3xl bg-indigo-100 rounded-full mb-6">
                {step.icon}
              </div>
              
              <div className="absolute -top-4 left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-600">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-indigo-300 text-4xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 