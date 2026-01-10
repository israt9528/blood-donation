import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "Is blood donation safe?",
    answer:
      "Yes. Blood donation is completely safe. Sterile and disposable equipment is used for every donor.",
  },
  {
    question: "Does donating blood hurt?",
    answer:
      "You may feel a slight pinch when the needle is inserted, but the process is generally painless.",
  },
  {
    question: "How long does the blood donation process take?",
    answer:
      "The entire process usually takes about 30–45 minutes, including registration and rest time.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 3 months if you meet all eligibility requirements.",
  },
  {
    question: "Can women donate blood?",
    answer:
      "Yes. Women can donate blood if they meet the age, weight, and health criteria.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-slate-800">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Here are some common questions about blood donation through Pulse.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="bg-white rounded-xl shadow-sm"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left p-5"
              >
                <span className="text-base font-semibold text-slate-800">
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`text-xl text-slate-500 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
