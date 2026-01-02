import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full font-sans text-white">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/table.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 md:px-16">
        <div className="text-2xl font-bold tracking-tighter uppercase">
          Kab<span className="text-orange-500">za</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/admin-login" className="text-sm font-medium hover:text-orange-400 transition">
            Admin Portal
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-[80vh] px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight max-w-4xl">
          Elevate Your <br /> 
          <span className="text-orange-500">Dining Experience</span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
          From intimate dinners to grand celebrations, reserve your perfect spot 
          with just a few clicks. Fast, reliable, and always ready for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <Link to="/user-login">
            <button className="px-10 py-4 bg-orange-600 hover:bg-orange-700 rounded-full text-lg font-semibold shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer">
              Reserve a Table
            </button>
          </Link>
          
          <Link to="/user-register">
            <button className="px-10 py-4 border border-white/30 hover:bg-white/10 rounded-full text-lg font-semibold backdrop-blur-sm transition duration-300 cursor-pointer">
              Create Account
            </button>
          </Link>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 text-center pb-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Rocky Restaurant Group. All rights reserved.
      </footer>
    </div>
  );
}