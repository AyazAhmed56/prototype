// faqData.js
const faqData = [
  {
    question: "groundwater levels in maharashtra",
    answer:
      "Here's the current groundwater status in Maharashtra. The state has 50% safe areas, 30% semi-critical, and 20% critical zones. Conservation efforts are needed in the critical regions.",
    chartType: "bar",
    chartTitle: "Groundwater Status in Maharashtra",
    chartData: [
      { label: "Safe", value: 50, color: "#10B981" },
      { label: "Semi-Critical", value: 30, color: "#F59E0B" },
      { label: "Critical", value: 20, color: "#EF4444" },
    ],
  },
  {
    question: "karnataka status",
    answer:
      "Karnataka's groundwater distribution shows 40% safe areas, 40% semi-critical, and 20% critical regions. The state needs to focus on recharge initiatives.",
    chartType: "pie",
    chartTitle: "Groundwater Distribution in Karnataka",
    chartData: [
      { label: "Safe", value: 40, color: "#10B981" },
      { label: "Semi-Critical", value: 40, color: "#F59E0B" },
      { label: "Critical", value: 20, color: "#EF4444" },
    ],
  },
  {
    question: "compare state groundwater",
    answer:
      "Here's a comparison of groundwater levels across major states. Maharashtra has higher safe areas while Karnataka has more semi-critical zones.",
    chartType: "bar",
    chartTitle: "State-wise Groundwater Comparison (Safe Areas)",
    chartData: [
      { label: "Maharashtra", value: 50, color: "#3B82F6" },
      { label: "Karnataka", value: 40, color: "#8B5CF6" },
      { label: "Tamil Nadu", value: 60, color: "#EC4899" },
      { label: "Uttar Pradesh", value: 35, color: "#F59E0B" },
    ],
  },
  {
    question: "trends in maharashtra",
    answer:
      "Groundwater trends in Maharashtra over the past 5 years show improvement in safe zones due to conservation efforts. The percentage of safe areas has increased from 35% to 50%.",
    chartType: "line",
    chartTitle: "5-Year Groundwater Trend in Maharashtra (Safe Areas)",
    chartData: [
      { label: "2018", value: 35 },
      { label: "2019", value: 38 },
      { label: "2020", value: 42 },
      { label: "2021", value: 46 },
      { label: "2022", value: 50 },
    ],
  },
  {
    question: "show me conservation methods",
    answer:
      "These are the effectiveness rates of different groundwater conservation methods. Artificial recharge shows the highest effectiveness at 85%.",
    chartType: "bar",
    chartTitle: "Effectiveness of Conservation Methods",
    chartData: [
      { label: "Rainwater Harvesting", value: 80, color: "#3B82F6" },
      { label: "Drip Irrigation", value: 75, color: "#10B981" },
      { label: "Watershed Management", value: 70, color: "#F59E0B" },
      { label: "Artificial Recharge", value: 85, color: "#8B5CF6" },
    ],
  },
  {
    question: "what is groundwater",
    answer:
      "Groundwater is the water found beneath the Earth's surface in soil pore spaces and in the fractures of rock formations.",
  },
  {
    question: "why is groundwater important",
    answer:
      "It is a vital source of drinking water and irrigation for agriculture, especially in regions with limited surface water.",
  },
  {
    question: "what is water recharge",
    answer:
      "Recharge is the process where water from rainfall or rivers infiltrates into the ground and replenishes aquifers.",
  },
  {
    question: "what does critical status mean",
    answer:
      "Critical status means groundwater is being used faster than it can be replenished, requiring immediate conservation measures.",
  },
];

export default faqData;
