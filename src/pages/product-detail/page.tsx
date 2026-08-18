import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { mockProducts, mockProjects } from '../../mocks/products';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const product = useMemo(() => {
    return mockProducts.find((p) => p.id === id);
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<string>(
    product?.finishOptions ? product.finishOptions[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'materials' | 'hardware' | 'delivery'>('overview');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <i className="ri-door-line text-5xl text-[#C5A880]"></i>
          <h2 className="text-2xl font-serif text-white">Door Specification Not Found</h2>
          <p className="text-sm text-gray-400">The architectural model you are searching for does not exist or has been archived.</p>
          <Button onClick={() => navigate('/products')} variant="primary">
            Return to Catalogue
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  // Find project that features this door or similar
  const featuredProject = mockProjects.find((proj) => {
    if (product.id === 'door-pivot-02' && proj.id === 'proj-01') return true;
    if (product.id === 'door-flush-01' && proj.id === 'proj-02') return true;
    if (product.id === 'door-sliding-01' && proj.id === 'proj-03') return true;
    if (proj.doorType.toLowerCase().includes(product.category.toLowerCase())) return true;
    return false;
  }) || mockProjects[0];

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] border border-[#C5A880] text-white p-4 shadow-2xl backdrop-blur-xl animate-fade-in flex items-center space-x-4 max-w-md">
          <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center flex-shrink-0">
            <i className="ri-check-line text-lg"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono uppercase tracking-wider text-[#C5A880]">Added to Specification Bag</p>
            <p className="text-sm font-serif truncate text-gray-200">{product.name} (Qty: {quantity})</p>
          </div>
          <Link
            to="/cart"
            className="px-3 py-1.5 bg-[#C5A880] text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors"
          >
            View Bag
          </Link>
        </div>
      )}

      <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 mb-8 sm:mb-12 overflow-x-auto no-scrollbar pb-1">
          <Link to="/" className="hover:text-white transition-colors flex-shrink-0">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors flex-shrink-0">Catalogue</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#C5A880] transition-colors flex-shrink-0">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#C5A880] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Large Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full bg-[#121212] border border-[#262626] overflow-hidden">
              <img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover object-center animate-fade-in"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#C5A880] border border-[#C5A880]/30">
                {product.subCategory}
              </div>
              {product.featured && (
                <div className="absolute top-4 right-4 bg-[#C5A880] text-black px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  Masterpiece
                </div>
              )}
            </div>

            {/* Thumbnail Gallery Row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square bg-[#121212] border overflow-hidden transition-all duration-300 ${
                      selectedImage === idx
                        ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                        : 'border-[#262626] opacity-60 hover:opacity-100 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} detail view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Architect CAD & BIM Downloads Box */}
            {product.cadAvailable && (
              <div className="p-5 bg-[#121212] border border-[#222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#C5A880] flex items-center space-x-1.5">
                    <i className="ri-file-code-line text-sm"></i>
                    <span>Architectural BIM & CAD Packages</span>
                  </p>
                  <p className="text-xs text-gray-400 font-light">
                    2D DWG sections, 3D Revit models, axle offset drawings, and rough opening specifications.
                  </p>
                </div>
                <a
                  href={`/contact?subject=CAD+Request+${encodeURIComponent(product.name)}`}
                  className="px-4 py-2 bg-[#1C1C1C] hover:bg-[#282828] text-white border border-[#333] text-xs font-mono uppercase tracking-wider flex-shrink-0 transition-colors"
                >
                  Request CAD Bundle
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Configuration & Commerce Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                  {product.category}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-xs font-mono text-gray-400">{product.subCategory}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif text-[#F3F3F1] leading-tight">
                {product.name}
              </h1>

              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-mono text-white font-semibold">
                  {formatPrice(product.price * quantity)}
                </span>
                <span className="text-xs font-mono text-gray-400 uppercase">
                  {quantity > 1 ? `(${formatPrice(product.price)} each)` : 'Starting Spec'}
                </span>
              </div>
            </div>

            {/* Configurator Section */}
            <div className="space-y-6 pt-4 border-t border-[#1C1C1C]">
              {/* 1. Select Finish */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5A880]">
                    Select Architectural Finish:
                  </label>
                  <span className="text-xs font-mono text-gray-300 font-medium">
                    {selectedFinish}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.finishOptions.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-3 text-left border text-xs transition-all duration-300 ${
                        selectedFinish === finish
                          ? 'border-[#C5A880] bg-[#1A1A1A] text-white ring-1 ring-[#C5A880]'
                          : 'border-[#242424] bg-[#121212] text-gray-400 hover:border-gray-500 hover:text-gray-200'
                      }`}
                    >
                      <p className="font-serif leading-snug">{finish}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Maximum Engineering Dimensions */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block">
                  Scale & Opening Dimensions:
                </label>
                <div className="p-3.5 bg-[#121212] border border-[#222] text-xs font-mono text-gray-200 space-y-1">
                  <p className="font-medium text-white">{product.maxDimensions}</p>
                  <p className="text-[11px] text-gray-400 font-light">
                    * Sized precisely to your architectural rough opening during technical CAD review.
                  </p>
                </div>
              </div>

              {/* 3. Quantity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block">
                  Quantity / Openings:
                </label>
                <div className="inline-flex items-center border border-[#2B2B2B] bg-[#121212]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-[#1C1C1C] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-6 py-2.5 font-mono text-sm text-white font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-[#1C1C1C] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Actions: ADD TO BAG & REQUEST BESPOKE QUOTE */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 bg-[#C5A880] hover:bg-[#d4b993] text-black font-mono text-xs uppercase tracking-widest font-bold shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <i className="ri-shopping-bag-line text-base"></i>
                  <span>ADD TO SPECIFICATION BAG — {formatPrice(product.price * quantity)}</span>
                </button>

                <Button
                  to={`/contact?subject=Bespoke+Quote+for+${encodeURIComponent(product.name)}`}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  REQUEST BESPOKE QUOTE / CUSTOM DIMENSIONS
                </Button>
              </div>

              {/* Lead Time & White Glove Assurance */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1C1C1C] text-xs font-mono text-gray-400">
                <div className="flex items-center space-x-2">
                  <i className="ri-time-line text-[#C5A880]"></i>
                  <span>Lead Time: {product.leadTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-shield-check-line text-[#C5A880]"></i>
                  <span>5-Year Structural Warranty</span>
                </div>
              </div>
            </div>

            {/* Tabbed Product Technical Information */}
            <div className="space-y-4 pt-6 border-t border-[#1C1C1C]">
              <div className="flex border-b border-[#222] overflow-x-auto no-scrollbar space-x-4 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 transition-colors uppercase whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors uppercase whitespace-nowrap ${
                    activeTab === 'specs'
                      ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-2 transition-colors uppercase whitespace-nowrap ${
                    activeTab === 'materials'
                      ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Materials & Hardware
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-2 transition-colors uppercase whitespace-nowrap ${
                    activeTab === 'delivery'
                      ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Delivery
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs font-light text-gray-300 leading-relaxed pt-2">
                {activeTab === 'overview' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'specs' && (
                  <div className="space-y-2 font-mono">
                    <p className="text-gray-300 leading-normal">{product.specifications}</p>
                    <p className="text-gray-400 pt-1">Security / Acoustic Grade: <span className="text-[#C5A880]">{product.securityGrade || 'High-Spec Residential'}</span></p>
                  </div>
                )}
                {activeTab === 'materials' && (
                  <div className="space-y-2 font-mono">
                    <p><span className="text-gray-500 uppercase">Core:</span> {product.materialType}</p>
                    <p><span className="text-gray-500 uppercase">Kinematics:</span> {product.openingMechanism}</p>
                    <p><span className="text-gray-500 uppercase">Hardware:</span> {product.hardwareType}</p>
                  </div>
                )}
                {activeTab === 'delivery' && (
                  <div className="space-y-2 font-mono">
                    <p>All doors are shipped in reinforced timber structural crating with shock-watch sensors. Complimentary on-site installation coordination provided for Lagos and London metropolitan zones.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Installed Project Feature Lookbook */}
        <div className="mt-24 pt-16 border-t border-[#1C1C1C]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#111111] border border-[#222] p-6 sm:p-10">
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
              <img
                src={featuredProject.heroImage}
                alt={featuredProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 text-[10px] font-mono text-[#C5A880]">
                {featuredProject.location}
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                Architectural Installation Case Study
              </p>
              <h3 className="text-2xl font-serif text-white">
                {featuredProject.title}
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {featuredProject.description}
              </p>
              <div className="pt-2">
                <Button to="/projects" variant="secondary" size="sm">
                  View Full Projects Lookbook
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE Related Products */}
        <div className="mt-24 pt-16 border-t border-[#1C1C1C] space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                Coordinated Architecture
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                YOU MAY ALSO LIKE
              </h2>
            </div>
            <Link to="/products" className="text-xs font-mono text-[#C5A880] hover:underline">
              View All Catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-[#111111] border border-[#1F1F1F] hover:border-[#C5A880]/60 transition-all duration-400 flex flex-col justify-between"
              >
                <Link to={`/product/${rel.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#0A0A0A] block">
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono uppercase text-[#C5A880]">
                    {rel.category}
                  </div>
                </Link>
                <div className="p-5 space-y-3">
                  <Link to={`/product/${rel.id}`}>
                    <h4 className="text-base font-serif text-white hover:text-[#C5A880] transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1C1C1C]">
                    <span className="text-xs font-mono text-white font-semibold">
                      {formatPrice(rel.price)}
                    </span>
                    <Link
                      to={`/product/${rel.id}`}
                      className="text-xs font-mono text-[#C5A880] hover:underline"
                    >
                      Configure →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
