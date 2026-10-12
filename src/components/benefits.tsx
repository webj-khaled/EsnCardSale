import { motion } from "framer-motion";
import { FaPlane, FaBus, FaGift, FaGlassCheers, FaExternalLinkAlt } from "react-icons/fa";
const container = (delay: number) => ({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay },
  },
});

const Benefits = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          variants={container(0)}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Exclusive Partner Benefits
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Ryanair Benefit */}
          <motion.div
            variants={container(0.2)}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaPlane className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Ryanair</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• 10% discount on 4 single flights (or 2 return flights)</li>
              <li>• Free 20kg check-in luggage on each flight</li>
              <li>• Weekly travel offers for Erasmus students</li>
              <li>• Tailored in-journey offers on mobile app</li>
            </ul>
          </motion.div>

          {/* FlixBus Benefit */}
          <motion.div
            variants={container(0.4)}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FaBus className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">FlixBus</h3>
            </div>
            <p className="text-gray-700">
              Enjoy 10% off on all FlixBus journeys across Europe. Travel sustainably with green buses and enjoy comfortable rides between cities.
            </p>
          </motion.div>

          {/* Eurosender Benefit */}
          <motion.div
            variants={container(0.6)}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <FaGift className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Eurosender</h3>
            </div>
            <p className="text-gray-700">
              10% off for door-to-door shipping packages and luggage transportation around Europe. Perfect for students moving between countries.
            </p>
          </motion.div>

          {/* Salzburg Bars Benefit */}
          <motion.div
            variants={container(0.8)}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <FaGlassCheers className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Salzburg Bars</h3>
            </div>
            <p className="text-gray-700 mb-3">
              25% discount on selected drinks at our partner bars in Salzburg:
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>• Shamrock Irish Pub</li>
              <li>• Lux Bar</li>
              <li>• Roses Bar</li>
              <li>• O'Malley's Pub</li>
            </ul>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={container(1)}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">More Benefits Available!</h3>
          <p className="mb-6 text-blue-100">
            Your ESNcard gives you access to hundreds of discounts across Europe in transportation, 
            accommodation, food, culture, and entertainment.
          </p>
          
          {/* Link Button */}
          <motion.a
            href="https://esncard.org"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Discover All Benefits
            <FaExternalLinkAlt className="text-sm" />
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container(1.2)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center"
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600">40+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Cities</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600">30+</div>
            <div className="text-gray-600">Partners</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;