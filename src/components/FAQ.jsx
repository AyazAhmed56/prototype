import React, { useState } from "react";

const faqData = [
  {
    question: "What is groundwater?",
    answer:
      "Groundwater is water stored beneath Earth’s surface in soil and rock layers.",
  },
  {
    question: "Why is groundwater important in India?",
    answer:
      "It provides nearly 60% of irrigation and 50% of drinking water in India.",
  },
  {
    question: "Which states face critical groundwater stress?",
    answer: "Punjab, Haryana, Rajasthan, Tamil Nadu, and parts of UP.",
  },
  {
    question: "What is groundwater recharge?",
    answer:
      "Recharge is the process where rainwater infiltrates into the soil to replenish aquifers.",
  },
  {
    question: "What does over-exploited mean?",
    answer: "When groundwater extraction exceeds natural recharge capacity.",
  },
  {
    question: "How can we conserve groundwater?",
    answer:
      "By rainwater harvesting, efficient irrigation, recycling wastewater, etc.",
  },
  {
    question: "What is groundwater salinity?",
    answer:
      "Salinity occurs when groundwater has excessive dissolved salts, making it unsafe.",
  },
  {
    question: "Can polluted groundwater be treated?",
    answer:
      "Yes, using filtration, reverse osmosis, and proper treatment techniques.",
  },
  {
    question: "What is semi-critical groundwater status?",
    answer:
      "Areas where extraction is nearing recharge limit but not yet overused.",
  },
  {
    question: "How is groundwater monitored in India?",
    answer: "By the Central Ground Water Board (CGWB) and state agencies.",
  },
  {
    question: "What are safe groundwater zones?",
    answer: "Regions where extraction is well below recharge capacity.",
  },
  {
    question: "What are the main groundwater contaminants?",
    answer: "Fluoride, arsenic, nitrates, and industrial pollutants.",
  },
  {
    question: "Why is Punjab facing groundwater depletion?",
    answer: "Due to overuse of tubewells for water-intensive crops like rice.",
  },
  {
    question: "How does climate change affect groundwater?",
    answer: "Reduced rainfall and higher evaporation lower recharge levels.",
  },
  {
    question: "What is the role of aquifers?",
    answer:
      "Aquifers store and transmit groundwater for human and ecological use.",
  },
  {
    question: "What is artificial recharge?",
    answer:
      "Techniques like check dams and percolation tanks that improve groundwater storage.",
  },
  {
    question: "What is dynamic groundwater resource?",
    answer: "It’s the annually replenishable groundwater available in an area.",
  },
  {
    question: "Which city in India has critical groundwater issues?",
    answer: "Chennai and Bengaluru have reported severe water shortages.",
  },
  {
    question: "What are rainwater harvesting methods?",
    answer: "Rooftop harvesting, recharge pits, trenches, and farm ponds.",
  },
  {
    question: "What is groundwater regulation law in India?",
    answer:
      "Many states follow the Model Bill for Groundwater Regulation 2011.",
  },
];

export default function FAQ() {
  const [search, setSearch] = useState("");

  const filtered = faqData.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-teal-700">
        Frequently Asked Questions
      </h2>
      <input
        type="text"
        placeholder="Search question..."
        className="border p-2 w-full rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-3">
        {filtered.map((f, i) => (
          <div key={i} className="p-3 border rounded-md hover:shadow">
            <h3 className="font-semibold text-teal-800">{f.question}</h3>
            <p className="text-gray-700">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
