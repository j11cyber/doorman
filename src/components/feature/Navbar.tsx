import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import CurrencySelector from './CurrencySelector';
import { mockProducts } from '../../mocks/products';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [systemsDropdownOpen, setSystemsDropdownOpen] = useState(false);
  const [finishesDropdownOpen, setFinishesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const shopRef = useRef<HTMLDivElement>(null);
  const systemsRef = useRef<HTMLDivElement>(null);
  const finishesRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { itemCount, addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const storedUser = localStorage.getItem('amco_user');
        setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setSystemsDropdownOpen(false);
    setFinishesDropdownOpen(false);
    setSearchModalOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
      if (systemsRef.current && !systemsRef.current.contains(event.target as Node)) {
        setSystemsDropdownOpen(false);
      }
      if (finishesRef.current && !finishesRef.current.contains(event.target as Node)) {
        setFinishesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchModalOpen]);

  const isHome = location.pathname === '/';

  // 6 Real Door Categories matching mockProducts
  const shopCategories = [
    { name: 'All Architectural Doors', path: '/products', tag: 'Complete Collection' },
    { name: 'Pivot Doors', path: '/products?category=Pivot%20Doors', tag: 'Monolithic Grand Portals' },
    { name: 'Concealed & Flush Doors', path: '/products?category=Concealed%20%26%20Flush%20Doors', tag: 'Invisible Zero-Sightline' },
    { name: 'Sliding Glass Partitions', path: '/products?category=Sliding%20Glass%20Partitions', tag: 'Acoustic Fluted & Smoked Glass' },
    { name: 'Armored Security Doors', path: '/products?category=Armored%20Security%20Doors', tag: 'RC4 Biometric Entrances' },
    { name: 'Bespoke Wood Doors', path: '/products?category=Bespoke%20Wood%20Doors', tag: '3D Ribbed Walnut & Oak' },
    { name: 'Architectural Hardware', path: '/products?category=Architectural%20Hardware', tag: 'Cast Silicon Bronze Pulls' },
  ];

  // 4 Core Door Systems
  const doorSystems = [
    { name: 'Pivot Systems', path: '/products?category=Pivot%20Doors', desc: 'Floor-concealed heavy hydraulics up to 500kg' },
    { name: 'Flush & Concealed Systems', path: '/products?category=Concealed%20%26%20Flush%20Doors', desc: 'Extruded aluminum wall-integrated subframes' },
    { name: 'Sliding & Partition Systems', path: '/products?category=Sliding%20Glass%20Partitions', desc: 'Concealed ceiling soft-stop tracks with slim profiles' },
    { name: 'Armored Entrance Systems', path: '/products?category=Armored%20Security%20Doors', desc: 'Manganese ballistic steel chassis with smart entry' },
  ];

  // Real finishes found in mockProducts
  const realFinishes = [
    { name: 'Smoked Bog Oak', path: '/products?finish=Smoked%20Bog%20Oak', tone: '#2A2521' },
    { name: 'Patinated Liquid Bronze', path: '/products?finish=Oxidized%20Dark%20Bronze', tone: '#5C4A32' },
    { name: 'Natural Canaletto Walnut', path: '/products?finish=Natural%20Canaletto%20Walnut', tone: '#6E4E37' },
    { name: 'Fluted Safety Glass', path: '/products?finish=Brushed%20Bronze', tone: '#8C7D6B' },
    { name: 'Scorched Basalt & Teak', path: '/products?finish=Scorched%20Basalt%20%26%20Teak', tone: '#1F1E1D' },
    { name: 'Matte Architectural Black', path: '/products?finish=Matte%20Architectural%20Black', tone: '#111111' },
  ];

  // Live filter search results
  const searchResults = searchQuery.trim() === ''
    ? mockProducts.slice(0, 4)
    : mockProducts.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.materialType.toLowerCase().includes(query) ||
          p.finishOptions.some((f) => f.toLowerCase().includes(query)) ||
          p.description.toLowerCase().includes(query)
        );
      });

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled || !isHome
            ? 'bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-[#1C1C1C] py-3.5 sm:py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex flex-col group flex-shrink-0">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.04em] text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors duration-300">
                <span className="font-light text-gray-300">The</span>
                <span className="font-medium text-white">Doorman</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] font-mono -mt-1 transition-opacity duration-300 group-hover:opacity-90">
                Architectural Doors
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* SHOP Dropdown */}
              <div
                ref={shopRef}
                className="relative"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 flex items-center space-x-1 ${
                    location.pathname === '/products' && !location.search ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>Shop</span>
                  <i className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${shopDropdownOpen ? 'rotate-180 text-[#C5A880]' : ''}`}></i>
                </button>

                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 bg-[#0C0C0C]/98 border border-[#222222] shadow-2xl backdrop-blur-2xl p-2 animate-fade-in z-50">
                    <div className="px-3 py-2 border-b border-[#1A1A1A] mb-1">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                        Catalogue Collections
                      </p>
                    </div>
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        className="px-3 py-2 hover:bg-[#161616] text-left transition-colors group block"
                      >
                        <p className="text-xs font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors">
                          {cat.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-light truncate">
                          {cat.tag}
                        </p>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-[#1A1A1A] mt-1 px-3 py-1.5 flex justify-between items-center text-[10px] font-mono">
                      <Link to="/products" className="text-[#C5A880] hover:underline flex items-center gap-1">
                        <span>Explore Full Showroom</span>
                        <i className="ri-arrow-right-line text-xs"></i>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* SYSTEMS Dropdown */}
              <div
                ref={systemsRef}
                className="relative"
                onMouseEnter={() => setSystemsDropdownOpen(true)}
                onMouseLeave={() => setSystemsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setSystemsDropdownOpen(!systemsDropdownOpen)}
                  className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 flex items-center space-x-1 ${
                    location.search.includes('category') ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>Systems</span>
                  <i className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${systemsDropdownOpen ? 'rotate-180 text-[#C5A880]' : ''}`}></i>
                </button>

                {systemsDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-[#0C0C0C]/98 border border-[#222222] shadow-2xl backdrop-blur-2xl p-2 animate-fade-in z-50">
                    <div className="px-3 py-2 border-b border-[#1A1A1A] mb-1">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                        Architectural Engineering
                      </p>
                    </div>
                    {doorSystems.map((system) => (
                      <Link
                        key={system.name}
                        to={system.path}
                        className="px-3 py-2 hover:bg-[#161616] text-left transition-colors group block"
                      >
                        <p className="text-xs font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors">
                          {system.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-light truncate mt-0.5">
                          {system.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* FINISHES Dropdown */}
              <div
                ref={finishesRef}
                className="relative"
                onMouseEnter={() => setFinishesDropdownOpen(true)}
                onMouseLeave={() => setFinishesDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setFinishesDropdownOpen(!finishesDropdownOpen)}
                  className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 flex items-center space-x-1 ${
                    location.search.includes('finish') ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>Finishes</span>
                  <i className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${finishesDropdownOpen ? 'rotate-180 text-[#C5A880]' : ''}`}></i>
                </button>

                {finishesDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#0C0C0C]/98 border border-[#222222] shadow-2xl backdrop-blur-2xl p-2 animate-fade-in z-50">
                    <div className="px-3 py-2 border-b border-[#1A1A1A] mb-1">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                        Curated Material Finishes
                      </p>
                    </div>
                    {realFinishes.map((f) => (
                      <Link
                        key={f.name}
                        to={f.path}
                        className="px-3 py-2 hover:bg-[#161616] text-left transition-colors group flex items-center space-x-3"
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: f.tone }}
                        />
                        <span className="text-xs font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors">
                          {f.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects */}
              <Link
                to="/projects"
                className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                  location.pathname === '/projects' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                }`}
              >
                Projects
              </Link>

              {/* Bespoke */}
              <Link
                to="/bespoke"
                className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                  location.pathname === '/bespoke' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                }`}
              >
                Bespoke
              </Link>

              {/* About */}
              <Link
                to="/about"
                className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                  location.pathname === '/about' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                }`}
              >
                About
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`nav-link-item text-xs uppercase tracking-widest-arch font-medium transition-colors duration-300 py-1 ${
                  location.pathname === '/contact' ? 'text-[#C5A880] active' : 'text-gray-300 hover:text-white'
                }`}
              >
                Contact
              </Link>

              {currentUser?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-xs uppercase tracking-widest-arch text-[#C5A880] border border-[#C5A880]/40 px-3 py-1 hover:bg-[#C5A880] hover:text-black transition-all duration-300 font-mono"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Currency Selector */}
              <div className="hidden sm:block">
                <CurrencySelector />
              </div>

              {/* Live Search Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-gray-300 hover:text-[#C5A880] transition-colors flex items-center space-x-1.5"
                title="Search doors and finishes"
                aria-label="Search Catalogue"
              >
                <i className="ri-search-line text-base sm:text-lg"></i>
                <span className="hidden md:inline text-[11px] font-mono tracking-wider uppercase text-gray-400 hover:text-[#C5A880]">
                  Search
                </span>
              </button>

              {/* Bag Link with Live Counter */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-300 hover:text-[#C5A880] transition-colors duration-300 flex items-center space-x-1.5"
                aria-label="Shopping Bag"
                title="Shopping Bag"
              >
                <i className="ri-shopping-bag-line text-lg sm:text-xl"></i>
                <span className="text-xs font-mono font-medium text-gray-300 hover:text-white">
                  BAG ({itemCount})
                </span>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C5A880] text-[#0A0A0A] font-mono text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-md animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0A0A]/98 border-b border-[#1C1C1C] px-6 py-6 mt-3 backdrop-blur-2xl animate-fade-in max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">Currency</span>
              <CurrencySelector />
            </div>

            {/* Shop Section */}
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                Shop By Category
              </p>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {shopCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className="text-sm font-serif text-gray-200 hover:text-[#C5A880] transition-colors flex items-center justify-between py-1 border-b border-[#141414]"
                  >
                    <span>{cat.name}</span>
                    <i className="ri-arrow-right-s-line text-xs text-gray-500"></i>
                  </Link>
                ))}
              </div>
            </div>

            {/* Finishes */}
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                Shop By Finish
              </p>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {realFinishes.map((f) => (
                  <Link
                    key={f.name}
                    to={f.path}
                    className="text-xs font-mono text-gray-400 hover:text-[#C5A880] transition-colors flex items-center space-x-2 py-1"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.tone }} />
                    <span className="truncate">{f.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary Nav Links */}
            <div className="pt-2 border-t border-[#1A1A1A] space-y-2 font-serif text-base">
              <Link to="/bespoke" className="block text-white hover:text-[#C5A880] py-1">
                Bespoke Atelier
              </Link>
              <Link to="/projects" className="block text-white hover:text-[#C5A880] py-1">
                Architectural Projects
              </Link>
              <Link to="/about" className="block text-white hover:text-[#C5A880] py-1">
                About The Atelier
              </Link>
              <Link to="/contact" className="block text-white hover:text-[#C5A880] py-1">
                Contact & Trade Quote
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Live Search Modal Overlay */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-start justify-center pt-20 sm:pt-28 px-4 animate-fade-in">
          <div className="bg-[#0D0D0D] border border-[#262626] w-full max-w-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] flex flex-col">
            {/* Search Header & Input */}
            <div className="flex items-center justify-between border-b border-[#222] pb-4">
              <div className="flex items-center space-x-3 flex-1">
                <i className="ri-search-line text-[#C5A880] text-xl"></i>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doors, finishes, systems (e.g. Pivot, Oak, Bronze)..."
                  className="w-full bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder-gray-500 font-serif"
                />
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 text-2xl transition-colors ml-4"
                aria-label="Close search"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            {/* Quick Result Items */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                {searchQuery.trim() === '' ? 'Featured Architectural Doors' : `Matching Doors (${searchResults.length})`}
              </p>

              {searchResults.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm font-light">
                  No doors found matching "{searchQuery}". Try searching for Pivot, Flush, Sliding, or Bronze.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 bg-[#141414] border border-[#222] hover:border-[#C5A880]/50 transition-all duration-300 flex items-center space-x-4 group"
                    >
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => setSearchModalOpen(false)}
                        className="w-16 h-20 aspect-[3/4] bg-[#0A0A0A] overflow-hidden flex-shrink-0 border border-white/10"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-mono uppercase tracking-wider text-[#C5A880]">
                          {product.category}
                        </p>
                        <Link
                          to={`/product/${product.id}`}
                          onClick={() => setSearchModalOpen(false)}
                          className="text-xs font-serif text-white hover:text-[#C5A880] transition-colors line-clamp-1 block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs font-mono text-gray-300 font-semibold mt-1">
                          From {formatPrice(product.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Link
                            to={`/product/${product.id}`}
                            onClick={() => setSearchModalOpen(false)}
                            className="text-[10px] font-mono text-[#C5A880] hover:underline"
                          >
                            View →
                          </Link>
                          <button
                            onClick={() => {
                              addToCart(product);
                              setSearchModalOpen(false);
                            }}
                            className="text-[10px] font-mono text-gray-400 hover:text-white"
                          >
                            + Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1C1C1C] flex justify-between items-center text-xs font-mono text-gray-400">
              <span>Press ESC to close</span>
              <Link
                to={`/products?search=${encodeURIComponent(searchQuery)}`}
                onClick={() => setSearchModalOpen(false)}
                className="text-[#C5A880] hover:underline"
              >
                View all in full catalogue →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
