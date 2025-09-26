// About.jsx
export default function About() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6 animate-fadeIn">
      <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
        About INGRES Virtual Assistant
      </h2>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 mb-6 leading-relaxed">
          INGRES (Intelligent Groundwater Resource System) is an AI-driven
          platform that provides real-time monitoring, analysis, and management
          solutions for groundwater resources. It helps communities and
          policymakers make informed decisions for sustainable water usage.
        </p>

        <div className="bg-cyan-50 p-6 rounded-xl mb-6 border-l-4 border-cyan-500">
          <h3 className="text-xl font-semibold text-cyan-700 mb-4">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "AI ChatBOT",
                desc: "Interactive assistant with multilingual & voice support",
              },
              {
                title: "Region Selection",
                desc: "Precise location-based groundwater analysis",
              },
              {
                title: "Smart Alerts",
                desc: "Real-time notifications for critical conditions",
              },
              {
                title: "Community Feedback",
                desc: "Crowdsourced groundwater issue reporting",
              },
              {
                title: "Comparative Analysis",
                desc: "Visual data comparison across regions",
              },
              {
                title: "Water Budget",
                desc: "Personalized water usage calculator",
              },
              {
                title: "Knowledge + Action",
                desc: "Actionable insights based on groundwater status",
              },
              {
                title: "Decision Dashboard",
                desc: "Policy-maker focused analytics and reporting",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:scale-[1.02] duration-300"
              >
                <h4 className="font-semibold text-cyan-700 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-cyan-700 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-700">
            To empower communities, policymakers, and environmental
            organizations with intelligent tools that promote sustainable
            groundwater management through technology-driven insights and
            collaborative engagement.
          </p>
        </div>
      </div>
    </div>
  );
}
