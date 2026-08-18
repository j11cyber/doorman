import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1C1C1C] text-[#F3F3F1] pt-16 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#1C1C1C]">
          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl font-normal tracking-[0.04em] text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors duration-300">
                <span className="font-light text-gray-300">The</span><span className="font-medium text-white">Doorman</span>
              </span>
              <p className="text-[10px] tracking-widest-arch uppercase text-[#C5A880] font-mono mt-1">
                Luxury Architectural Doors & Digital Showroom
              </p>
            </Link>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-md">
              We design, engineer, and fabricate bespoke oversized entrance pivots, concealed zero-sightline flush systems, and acoustic glass partitions for discerning residential and commercial projects worldwide.
            </p>
            <div className="pt-2 flex items-center space-x-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#C5A880] transition-colors text-lg"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#C5A880] transition-colors text-lg"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-line"></i>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#C5A880] transition-colors text-lg"
                aria-label="Pinterest"
              >
                <i className="ri-pinterest-line"></i>
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Door Systems */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest-arch text-[#C5A880] mb-5">
                Door Systems
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-light">
                <li>
                  <Link to="/products?category=Pivot%20Doors" className="hover:text-white transition-colors">
                    Pivot Doors
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Concealed%20%26%20Flush%20Doors" className="hover:text-white transition-colors">
                    Concealed Flush Doors
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Sliding%20Glass%20Partitions" className="hover:text-white transition-colors">
                    Sliding Glass Partitions
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Armored%20Security%20Doors" className="hover:text-white transition-colors">
                    Armored Security Doors
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Bespoke%20Wood%20Doors" className="hover:text-white transition-colors">
                    Bespoke Wood Doors
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Architectural%20Hardware" className="hover:text-white transition-colors">
                    Architectural Hardware
                  </Link>
                </li>
              </ul>
            </div>

            {/* Architecture & Services */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest-arch text-[#C5A880] mb-5">
                Architectural Atelier
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-light">
                <li>
                  <Link to="/products" className="hover:text-white transition-colors">
                    All Door Systems
                  </Link>
                </li>
                <li>
                  <Link to="/bespoke" className="hover:text-white transition-colors">
                    Bespoke Commissions
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-white transition-colors">
                    Doors in Architecture
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Material Craftsmanship
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Request Quote & CAD
                  </Link>
                </li>
              </ul>
            </div>

            {/* Studios & Consultations */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs uppercase font-mono tracking-widest-arch text-[#C5A880] mb-5">
                Studios & Showroom
              </h4>
              <div className="space-y-4 text-xs text-gray-400 font-light leading-relaxed">
                <div>
                  <p className="text-gray-300 font-medium">Lagos Atelier & Showroom</p>
                  <p>Victoria Island, Lagos, Nigeria</p>
                  <p className="text-[#C5A880] mt-0.5">+234 123 456 7890</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">London Consultation Office</p>
                  <p>Mayfair, London, UK</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Architectural Inquiries</p>
                  <p className="text-[#C5A880]">concierge@thedoorman.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} TheDoorman. Precision Architectural Door Systems.</p>
          <div className="flex space-x-6">
            <Link to="/products" className="hover:text-[#C5A880] transition-colors">
              Catalogue
            </Link>
            <Link to="/bespoke" className="hover:text-[#C5A880] transition-colors">
              Bespoke
            </Link>
            <Link to="/projects" className="hover:text-[#C5A880] transition-colors">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-[#C5A880] transition-colors">
              Contact & Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

