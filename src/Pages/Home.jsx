import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4"
        >
          Empowering Communities with <span className="text-blue-600 dark:text-emerald-400">CivicPulse</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl text-lg mb-8"
        >
          Report local issues, track civic responses, and make your city a better place — all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex space-x-4"
        >
          <Link
            to="/report"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Report an Issue
          </Link>
          <button className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-emerald-400 dark:border-emerald-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
            How CivicPulse Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transition"
            >
              <AlertTriangle className="mx-auto text-blue-600 dark:text-emerald-400 mb-3" size={40} />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Report Issues</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Citizens can quickly report civic problems like potholes, broken lights, or garbage issues.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transition"
            >
              <MapPin className="mx-auto text-blue-600 dark:text-emerald-400 mb-3" size={40} />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Track Location</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Each issue is geo-tagged, allowing authorities and citizens to view problems nearby.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center transition"
            >
              <Users className="mx-auto text-blue-600 dark:text-emerald-400 mb-3" size={40} />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Community Impact</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Users can upvote issues, helping prioritize what matters most to their neighborhoods.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
