import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div 
      className="h-screen w-full bg-cover bg-center flex items-center justify-center" 
      style={{ 
        backgroundImage: "url('/table.jpg')" 
      }}
    >
      <div className="bg-black/50 p-10 rounded-xl text-center shadow-xl backdrop-blur-md">
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
          Book a Table Instantly
        </h1>

        <p className="text-gray-200 mb-10 text-lg">
          Quick, simple, and hassle-free restaurant table booking.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          
          <Link to="/booking-form">
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg shadow-lg transition">
              Book Now
            </button>
          </Link>

          <Link to="/admin-login">
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg shadow-lg transition">
              Admin
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}
