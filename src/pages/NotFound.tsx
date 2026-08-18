import { useLocation } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex flex-col items-center justify-center text-center px-4 overflow-hidden selection:bg-[#C5A880]/30 selection:text-white">
      {/* Ghost Backdrop Number */}
      <h1 className="absolute text-[16rem] sm:text-[24rem] font-serif font-light text-[#141414] select-none pointer-events-none z-0">
        404
      </h1>

      <div className="relative z-10 max-w-lg space-y-6">
        <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
          Spatial Boundary // Route Not Found
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
          This Architectural Opening Does Not Exist
        </h2>
        <p className="text-xs font-mono text-gray-400">
          Path: <span className="text-[#C5A880]">{location.pathname}</span>
        </p>
        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
          The page or specification you requested may have been relocated or is currently in custom atelier fabrication.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Button to="/" variant="primary" size="md">
            Return to Showroom
          </Button>
          <Button to="/products" variant="outline" size="md">
            Explore Catalogue
          </Button>
        </div>
      </div>
    </div>
  );
}