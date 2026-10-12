import { motion } from "framer-motion";
import { FaArrowRight, FaGift, FaTicketAlt, FaPlane } from "react-icons/fa";
import esnCard from "../assets/esn_g_card.png";

const container = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  return (
<div className="min-h-screen flex items-center justify-center pt-20 pb-8 mt-16">
        <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.h1 
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Get Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                  ESN Card Today!
                </span>
              </motion.h1>

              <motion.p
                variants={container(0.3)}
                initial="hidden"
                animate="visible"
                className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl"
              >
                Unlock exclusive discounts and experiences across Salzburg and Europe with your official ESN membership card.
              </motion.p>

              {/* Benefits List */}
              <motion.div
                variants={container(0.6)}
                initial="hidden"
                animate="visible"
                className="space-y-3 mb-8"
              >
                <div className="flex items-center gap-3">
                  <FaGift className="text-blue-600 text-xl flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Local Salzburg discounts (cafés, bars etc..)</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaTicketAlt className="text-blue-600 text-xl flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Exclusive ESN event discounts</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPlane className="text-blue-600 text-xl flex-shrink-0" />
                  <span className="text-gray-800 font-medium">Travel discounts with Ryanair, FlixBus, and more</span>
                </div>
              </motion.div>

              {/* Buy Now Button */}
              <motion.button
                variants={container(0.9)}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-gray-900 font-semibold py-4 px-8 rounded-full flex items-center gap-3 transition-colors duration-200 shadow-lg hover:shadow-xl border border-amber-200"
                onClick={() => {
                  const orderForm = document.getElementById('order-form');
                  orderForm?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Buy Now
                <FaArrowRight className="text-sm" />
</motion.button>


              {/* Price Tag */}
              <motion.div
                variants={container(1.2)}
                initial="hidden"
                animate="visible"
                className="mt-6 bg-amber-50 text-amber-900 px-4 py-2 rounded-full text-sm font-medium border border-amber-200"
              >
                Only €15 - Limited Time Offer!
              </motion.div>
            </div>
          </div>

          {/* Right Content - ESN Card Display */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="relative flex justify-center"
            >
              {/* ESN Card Image */}
              <img 
                src={esnCard} 
                alt="ESN Membership Card" 
                className="w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg"
              >
                🔥 Popular
              </motion.div>
              
              {/* Discount badge */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                🎉 30+ Discounts
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;