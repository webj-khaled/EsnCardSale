import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight, FaSnowflake } from "react-icons/fa";

const TripBanner = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-800 via-red-900 to-green-800 relative overflow-hidden">
      {/* Hungarian-themed background glow - removed white middle */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/30 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-white/30 transition">
              <FaSnowflake className="text-white" />
              Winter Magic Adventure
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mb-6">
              Budapest <span className="text-red-200">Winter</span> Wonderland
            </h2>

            {/* Description */}
            <p className="text-lg text-white/95 mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
              Get ready for a magical winter adventure in Hungary's stunning capital! Join us for 3 unforgettable days exploring Christmas markets, ice skating under festive lights, and discovering Hungarian traditions.
            </p>

            {/* Detailed Program Section */}
          {/* Detailed Program Section */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-10 max-w-4xl mx-auto">
              <h3 className="text-white text-xl font-semibold mb-6 text-center">🎄 3-Day Winter Program Details</h3>
              <div className="grid md:grid-cols-3 gap-6 text-white/95">
                
                {/* Friday Column */}
                <div className="text-center">
                  <h4 className="font-semibold text-red-200 text-lg mb-4">Friday</h4>
                  <div className="space-y-3 text-sm">
                    <p className="font-semibold">🏛️ City Exploration & Nightlife</p>
                    <p>• Departure from Salzburg on Thursday night</p>
                    <p>• City tour in early afternoon</p>
                    <p>• Christmas markets (Vörösmarty, Bazilika)</p>
                    <p>• Dinner for everybody on their own</p>
                    <p>• Pub crawl</p>
                  </div>
                </div>

                {/* Saturday Column */}
                <div className="text-center">
                  <h4 className="font-semibold text-red-200 text-lg mb-4">Saturday</h4>
                  <div className="space-y-3 text-sm">
                    <p className="font-semibold">🎅 Activities & Hungarian Culture</p>
                    <p>• Morning: Ice skating OR thermal bath</p>
                    <p>• Free time for lunch</p>
                    <p>• 🚢 Danube boat tour (18:00-19:00)</p>
                    <p>• 🍽️ Traditional Hungarian dinner (19:45)</p>
                    <p>• party at Instant-fogas komplexum</p>
                  </div>
                </div>

                {/* Sunday Column */}
                <div className="text-center">
                  <h4 className="font-semibold text-red-200 text-lg mb-4">Sunday</h4>
                  <div className="space-y-3 text-sm">
                    <p className="font-semibold">🛍️ Final Day & Return</p>
                    <p>• Visit to Vásárcsarnok (Great Market Hall)</p>
                    <p>• Free time for last-minute souvenirs</p>
                    <p>• Departure from Budapest around 15:00/16:00</p>
                    <p>• Return to Salzburg</p>
                  </div>
                </div>

              </div>

              {/* Included Services */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="font-semibold text-red-200 text-lg mb-4 text-center">✅ What's Included</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-white/95">
                  <div className="space-y-2 text-center">
                    <p>• 🚌 Transportation</p>
                    <p>• 🏨 Accommodation</p>
                    <p>• 🚢 Boat tour</p>
                    <p>• Ice skating or thermal Baths</p>
                  </div>
                  <div className="space-y-2 text-center">
                    <p>• 🍽️ Hungarian dinner</p>
                    <p>• 🎄 Christmas market visits</p>
                    <p>• 🏛️ Guided city tour</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="flex justify-center mb-12">
              <div className="flex flex-col md:flex-row gap-6 justify-center items-start max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-64 shadow-xl hover:shadow-white/30 transition">
                  <div className="w-14 h-14 bg-gradient-to-tr from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <FaCalendarAlt className="text-white text-xl" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">When</h4>
                  <p className="text-white/95 font-medium">December 5-7, 2025</p>
                </div>
                
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-64 shadow-xl hover:shadow-white/30 transition">
                  <div className="w-14 h-14 bg-gradient-to-tr from-white to-gray-300 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <FaMapMarkerAlt className="text-red-800 text-xl" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">Where</h4>
                  <p className="text-white/95 font-medium">Budapest, Hungary</p>
                </div>
                
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-64 shadow-xl hover:shadow-white/30 transition">
                  <div className="w-14 h-14 bg-gradient-to-tr from-green-600 to-green-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-white text-xl font-bold">€</span>
                  </div>
                  <h4 className="text-white font-semibold mb-1">Price</h4>
                  <p className="text-white/95 font-medium">From €194</p>
                </div>
              </div>
            </div>

            {/* ESN Card Button */}
            <motion.a
              href="https://esn-salzburg-budapest-trip.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07, boxShadow: "0 0 20px rgba(255,255,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-700 via-white to-green-700 text-black font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] border border-white mb-6"
            >
              Register here
              <FaArrowRight className="text-sm" />
            </motion.a>

            {/* Limited Spots - Fixed visibility */}
            <p className="text-red-200 font-semibold text-sm mt-6 tracking-wide animate-pulse drop-shadow-[0_0_8px_rgba(255,100,100,0.8)]">
              ⚡ Limited spots available - Don't miss this winter adventure!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TripBanner;