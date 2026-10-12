import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Benefits from "./components/benefits";
import Contact from "./components/orderForm"; 
import TripBanner from "./components/tripBanner";
import { supabase } from './supaBase-client';
import AtomAnimation from "./components/AtomAnimation";

const App = () => {

  // Add this test somewhere in your app
const testSupabase = async () => {
  const { data, error } = await supabase.from('information').select('count');
  console.log('Supabase test:', { data, error });
};
testSupabase();
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 min-h-screen relative">
      {/* Custom background pattern */}
      <div className="fixed top-0 -z-10 w-full h-full bg-slate-50 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Subtle overlay */}
      <div className="fixed top-0 -z-10 w-full h-full bg-gradient-to-br from-blue-100/20 to-blue-300/10"></div>

    

      {/* Content */}
      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <Benefits/>
        <TripBanner />
        <div id="order-form">
        <Contact />
        </div>
        <AtomAnimation />
      </div>
    </div>
  );
};

export default App;