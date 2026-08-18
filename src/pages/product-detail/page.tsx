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
    const stored = localStorage.getItem('amco_products');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const hasStale = Array.isArray(parsed) && parsed.some((p: any) => 
          p.images && p.images.some((img: string) => img.includes('513694203232-719a280e022f'))
        );
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].materialType && !hasStale) {
          const found = parsed.find((p: any) => p.id === id);
          if (found) return found;
        }
      } catch (err) {
        console.warn('Could not parse cached products:', err);
      }
    }
    return mockProducts.find((p) => p.id === id);
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<string>(
    product?.finishOptions ? product.finishOptions[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <i className="ri-door-line text-5xl text-gray-600"></i>
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
    setTimeout(() => setShowSuccess(false), 3500);
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

      <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
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

        {/* Main Product Editorial Grid: COMMERCE & SPECIFICATIONS FIRST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Dominant Architectural Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Large Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full bg-[#121212] border border-[#262626] overflow-hidden img-zoom-container">
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

            {/* Tactile Material Craftsmanship Callout */}
            <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                Material Craftsmanship & Provenance
              </h4>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                All timber veneers are book-matched sequentially. Liquid bronze and cold-spray metal finishes are chemically patinated by hand, ensuring that no two doors possess an identical micro-texture.
              </p>
            </div>
          </div>

          {/* Right Column: Pricing, Customization Options, Add to Bag & Engineering Specs Matrix (5 Cols) */}
          <div className="lg:col-span-5 space-y-7 lg:sticky lg:top-28">
            {/* Title & Price Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="uppercase tracking-widest text-[#C5A880]">{product.category}</span>
                <span>Ref: {product.id}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#F3F3F1] leading-tight">
                {product.name}
              </h1>
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-serif text-[#C5A880] font-semibold">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[11px] font-mono text-gray-400 uppercase">
                  (Base Specification)
                </span>
              </div>
            </div>

            {/* Material & Finish Selection */}
            {product.finishOptions && product.finishOptions.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-[#1C1C1C]">
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-300">
                  Select Architectural Finish: <span className="text-[#C5A880] font-semibold">{selectedFinish}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.finishOptions.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`text-xs font-mono px-3.5 py-2 transition-all duration-200 border active:scale-95 ${
                        selectedFinish === finish
                          ? 'border-[#C5A880] bg-[#C5A880]/15 text-white font-medium shadow-sm'
                          : 'border-[#262626] bg-[#121212] text-gray-400 hover:border-gray-500 hover:text-gray-200'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Commerce Actions */}
            <div className="space-y-4 pt-2 border-t border-[#1C1C1C]">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-mono text-gray-400 uppercase">Quantity:</span>
                <div className="flex items-center border border-[#2A2A2A] bg-[#121212]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-mono text-xs text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<i className="ri-shopping-bag-line"></i>}
                >
                  Add to Specification Bag
                </Button>

                {showSuccess && (
                  <div className="p-3.5 bg-[#C5A880]/15 border border-[#C5A880]/50 text-xs font-mono text-gray-200 text-center animate-fade-in flex items-center justify-center space-x-2">
                    <i className="ri-checkbox-circle-line text-[#C5A880] text-base"></i>
                    <span>Added to your project specification bag.</span>
                  </div>
                )}
              </div>

              <Button
                to={`/contact?subject=Bespoke%20Quote%20for%20${encodeURIComponent(product.name)}`}
                variant="outline"
                className="w-full text-xs"
              >
                Request Custom Dimensions & CAD Drawings
              </Button>
            </div>

            {/* Engineering Specification Matrix */}
            <div className="pt-6 border-t border-[#1C1C1C] space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                Engineering Specifications Matrix
              </h3>
              <div className="divide-y divide-[#1C1C1C] text-xs font-mono">
                {product.materialType && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Material Core:</span>
                    <span className="text-right text-gray-200">{product.materialType}</span>
                  </div>
                )}
                {product.openingMechanism && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Mechanism:</span>
                    <span className="text-right text-gray-200">{product.openingMechanism}</span>
                  </div>
                )}
                {product.maxDimensions && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Max Dimensions:</span>
                    <span className="text-right text-[#C5A880]">{product.maxDimensions}</span>
                  </div>
                )}
                {product.hardwareType && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Hardware Profile:</span>
                    <span className="text-right text-gray-200">{product.hardwareType}</span>
                  </div>
                )}
                {product.securityGrade && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Security & Acoustic:</span>
                    <span className="text-right text-gray-200">{product.securityGrade}</span>
                  </div>
                )}
                {product.leadTime && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400">Fabrication Lead Time:</span>
                    <span className="text-right text-gray-200">{product.leadTime}</span>
                  </div>
                )}
                <div className="py-2.5 flex justify-between">
                  <span className="text-gray-400">CAD / BIM Shop Drawings:</span>
                  <span className="text-right text-[#C5A880]">Available for Architects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Narrative & Full Story Description */}
        <Reveal delay={60} className="mt-20 sm:mt-28 pt-12 border-t border-[#1C1C1C] max-w-4xl space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
            Architectural Narrative
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#F3F3F1]">
            Engineering & Spatial Presence
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            {product.description}
          </p>
          {product.specifications && (
            <div className="p-6 bg-[#0E0E0E] border border-[#222] space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                Engineering Summary
              </h4>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {product.specifications}
              </p>
            </div>
          )}
        </Reveal>

        {/* Featured in Real Architectural Projects (Cross-Linking) */}
        {featuredProject && (
          <div className="mt-20 sm:mt-28 pt-12 border-t border-[#1C1C1C] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                  Installed Case Study
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  Featured In Built Architecture
                </h3>
              </div>
              <Link to="/projects" className="text-xs font-mono uppercase tracking-wider text-[#C5A880] hover:underline">
                Explore All Projects →
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111111] border border-[#222] p-6 sm:p-8">
              <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-[#080808]">
                <img
                  src={featuredProject.heroImage}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center space-x-3 text-xs font-mono text-[#C5A880]">
                  <span>{featuredProject.location}</span>
                  <span>•</span>
                  <span>{featuredProject.year}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif text-white">
                  {featuredProject.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  {featuredProject.description}
                </p>
                <div className="pt-2">
                  <Button to="/projects" variant="outline" size="sm">
                    View Complete Case Study
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Architectural Openings */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 sm:mt-28 pt-16 border-t border-[#1C1C1C] space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif text-white">
                Complementary Architectural Doors
              </h3>
              <Link to="/products" className="text-xs font-mono uppercase tracking-wider text-[#C5A880] hover:text-white transition-colors duration-300">
                View Catalogue
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((rel, idx) => (
                <Reveal key={rel.id} delay={idx * 80}>
                  <Link
                    to={`/product/${rel.id}`}
                    className="group bg-[#111] border border-[#222] hover:border-[#C5A880]/50 transition-all duration-300 block overflow-hidden shadow-xl"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden img-zoom-container bg-[#080808]">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#C5A880] uppercase tracking-wider">{rel.category}</span>
                        <span className="text-white font-semibold">{formatPrice(rel.price)}</span>
                      </div>
                      <h4 className="font-serif text-base text-white group-hover:text-[#C5A880] transition-colors duration-300 line-clamp-1">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-light truncate">
                        {rel.materialType}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

