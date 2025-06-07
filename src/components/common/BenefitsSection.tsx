const benefits = [
  {
    title: "For Students",
    description: "Verified internships and better job-fit",
    icon: "👨‍🎓",
    color: "bg-blue-50",
    iconBg: "bg-blue-100",
    borderColor: "border-blue-200"
  },
  {
    title: "For Colleges",
    description: "Control over student internships",
    icon: "🏛️",
    color: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    borderColor: "border-indigo-200"
  },
  {
    title: "For Companies",
    description: "Get quality applicants from verified institutions",
    icon: "🏢",
    color: "bg-purple-50",
    iconBg: "bg-purple-100",
    borderColor: "border-purple-200"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          Why Use Our Platform?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          A trusted ecosystem that benefits all participants
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`${benefit.color} rounded-2xl p-8 border ${benefit.borderColor} transition-transform hover:scale-105 duration-300`}
              role="article"
            >
              <div className={`${benefit.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                <span className="text-3xl" role="img" aria-label={benefit.title}>
                  {benefit.icon}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>

              <p className="text-lg text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 