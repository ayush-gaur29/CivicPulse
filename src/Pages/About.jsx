import React from "react";
import { Info, Users, Target, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-12 px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Info className="mx-auto text-blue-600 dark:text-emerald-400" size={40} />
          <h1 className="text-4xl font-bold mt-4">About Our Initiative</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            Empowering citizens to create cleaner, safer, and smarter cities through
            technology.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
            <Target className="text-blue-600 dark:text-emerald-400 mb-3" size={32} />
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our mission is to build a community-driven platform that enables people
              to report civic issues such as road damage, garbage overflow, and
              water supply problems instantly. Every report helps authorities take
              faster action and improve the quality of urban living.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
            <ShieldCheck className="text-blue-600 dark:text-emerald-400 mb-3" size={32} />
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We envision a future where every citizen plays an active role in making
              their city smarter and more sustainable by collaborating with local
              authorities through technology and transparency.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-blue-600 dark:text-emerald-400" size={28} />
            <h2 className="text-2xl font-semibold">Meet the Team</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This platform is developed by passionate students and developers who
            believe in solving real-world problems using modern web technologies like
            React, Node.js, and Express.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <h3 className="font-semibold text-lg">Ayush Gaur</h3>
              <p className="text-sm text-gray-500">Frontend Developer</p>
            </div>

            

            
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 italic">
            “Technology empowers citizens — citizens empower cities.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
