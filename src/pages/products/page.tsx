import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { mockProducts } from '../../mocks/products';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialMaterial = searchParams.get('material') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialMaterial);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const mat = searchParams.get('material') || 'All';
    setSelectedCategory(cat);
    setSelectedMaterial(mat);
  }, [searchParams]);

  const categories = [
    'All',
    'Pivot Doors',
    'Concealed & Flush Doors',
    'Sliding Glass Partitions',
    'Armored Security Doors',
    'Bespoke Wood Doors',
    'Architectural Hardware',
  ];

  const materialFilters = [
    { label: 'All Materials', value: 'All' },
    { label: 'Smoked Oak', value: 'Oak' },
    { label: 'Liquid Bronze', value: 'Bronze' },
    { label: 'Fluted & Smoked Glass', value: 'Glass' },
    { label: 'Canaletto Walnut', value: 'Walnut' },
    { label: 'Basalt & Armor', value: 'Basalt' },
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material);
    if (material === 'All') {
      searchParams.delete('material');
    } else {
      searchParams.set('material', material);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const [productsList] = useState<typeof mockProducts>(() => {
    const stored = localStorage.getItem('amco_products');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const hasStale = Array.isArray(parsed) && parsed.some((p) => 
          p.images && p.images.some((img: string) => img.includes('513694203232-719a280e022f'))
        );
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].materialType && !hasStale) {
          return parsed;
        }
      } catch (err) {
        console.warn('Could not parse cached products:', err);
      }
    }
    return mockProducts;
  });

  const filteredProducts = useMemo(() => {
    let result = productsList.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesMaterial =
        selectedMaterial === 'All' ||
        (product.materialType && product.materialType.toLowerCase().includes(selectedMaterial.toLowerCase())) ||
        (product.finishOptions && product.finishOptions.some((f) => f.toLowerCase().includes(selectedMaterial.toLowerCase())));

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.materialType && product.materialType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.finishOptions && product.finishOptions.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesMaterial && matchesSearch;
    });

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [productsList, selectedCategory, selectedMaterial, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: typeof mockProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  const categoryNarratives: Record<string, { headline: string; description: string }> = {
    All: {
      headline: 'Architectural Doors & Systems Catalogue',
      description: 'Explore the complete TheDoorman portfolio — precision-engineered pivot entrances, frameless concealed flush systems, acoustic sliding glass partitions, and fortified ballistic portals.',
    },
    'Pivot Doors': {
      headline: 'Monumental Pivot Openings',
      description: 'Floor-to-ceiling pivot systems engineered with concealed heavy-duty hydraulic bearings supporting up to 500kg of bespoke timber, carbon steel, and patinated liquid bronze.',
    },
    'Concealed & Flush Doors': {
      headline: 'Zero-Sightline Invisible Doors',
      description: 'Flush-to-wall architectural doors engineered to merge seamlessly into continuous wall planes with 3D micro-adjustable hidden hinges and magnetic latches.',
    },
    'Sliding Glass Partitions': {
      headline: 'Acoustic Glass Sliding Systems',
      description: 'Minimalist ceiling-hung architectural glass partitions featuring vertical reeded fluted glass, smoked acoustic interlayers, and ultra-slim bronze profiles.',
    },
    'Armored Security Doors': {
      headline: 'Certified Biometric Armored Portals',
      description: 'Uncompromising European RC4 ballistic security engineering concealed beneath bespoke basalt stone, real bronze, and thermo-treated teak facades.',
    },
    'Bespoke Wood Doors': {
      headline: 'Handcrafted Solid & Fluted Wood Openings',
      description: 'Selected Canaletto walnut, smoked European oak, and 3D textured staves hand-assembled by master joiners for grand double openings.',
    },
    'Architectural Hardware': {
      headline: 'Sculptural Handles & Hardware',
      description: 'Solid cast silicon bronze bar pulls, biometric smart grips, and flush magnetic latches designed to complement oversized openings.',
    },
  };

  const currentNarrative = categoryNarratives[selectedCategory] || categoryNarratives['All'];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* Catalogue Header */}
      <div className="pt-32 sm:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <Reveal delay={50} className="space-y-3 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest-arch">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Digital Showroom Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#F3F3F1] leading-tight">
            {currentNarrative.headline}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            {currentNarrative.description}
          </p>
        </Reveal>

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto no-scrollbar pb-1 gap-2 sm:gap-2.5 max-w-full flex-nowrap lg:flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-[11px] sm:text-xs uppercase font-mono tracking-wider px-3 sm:px-4 py-2 transition-all duration-200 border flex-shrink-0 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-[#C5A880] text-[#0A0A0A] border-[#C5A880] font-semibold shadow-lg'
                      : 'bg-[#121212] text-gray-300 border-[#262626] hover:border-[#C5A880]/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter & Search Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-[#181818]">
            {/* Material Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[10px] font-mono uppercase text-gray-400 flex-shrink-0">Material:</span>
              {materialFilters.map((mat) => {
                const isSelected = selectedMaterial === mat.value;
                return (
                  <button
                    key={mat.value}
                    onClick={() => handleMaterialSelect(mat.value)}
                    className={`text-[10px] font-mono px-2.5 py-1 border transition-colors flex-shrink-0 whitespace-nowrap ${
                      isSelected
                        ? 'border-[#C5A880] bg-[#C5A880]/20 text-white'
                        : 'border-[#222222] bg-[#141414] text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {mat.label}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Selector */}
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <span className="text-[10px] font-mono uppercase text-gray-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#141414] border border-[#262626] focus:border-[#C5A880] text-[11px] font-mono text-gray-200 px-3 py-1.5 focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name (A–Z)</option>
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-60">
                <input
                  type="text"
                  placeholder="Search door models, finishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#C5A880] px-3 py-1.5 text-xs font-mono text-[#F3F3F1] placeholder-gray-500 focus:outline-none transition-colors"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <i className="ri-close-line text-xs"></i>
                  </button>
                ) : (
                  <i className="ri-search-line absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
                )}
              </div>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(selectedCategory !== 'All' || selectedMaterial !== 'All' || searchQuery) && (
            <div className="flex items-center justify-between pt-2 text-[11px] font-mono">
              <div className="flex items-center space-x-2 text-gray-400 flex-wrap gap-1">
                <span>Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-[#1C1C1C] border border-[#333] px-2 py-0.5 text-[#C5A880]">
                    {selectedCategory}
                  </span>
                )}
                {selectedMaterial !== 'All' && (
                  <span className="bg-[#1C1C1C] border border-[#333] px-2 py-0.5 text-[#C5A880]">
                    Material: {selectedMaterial}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-[#1C1C1C] border border-[#333] px-2 py-0.5 text-gray-200">
                    "{searchQuery}"
                  </span>
                )}
              </div>

              <button
                onClick={clearAllFilters}
                className="text-[#C5A880] hover:underline uppercase text-[10px]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Display Grid Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Count Bar */}
        <div className="pb-6 flex justify-between items-center text-xs font-mono text-gray-400">
          <p>
            Showing <span className="text-[#C5A880] font-semibold">{filteredProducts.length}</span> Architectural Door System{filteredProducts.length === 1 ? '' : 's'}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4 bg-[#0F0F0F] border border-[#1C1C1C] p-8">
            <i className="ri-door-line text-4xl text-gray-500"></i>
            <h3 className="text-xl font-serif text-white">No architectural door systems match your criteria</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Try adjusting your category selection, removing material filters, or clearing search keywords. We also provide full bespoke architectural fabrication.
            </p>
            <div className="pt-3 flex justify-center gap-4">
              <Button onClick={clearAllFilters} variant="primary" size="sm">
                Reset Filters
              </Button>
              <Button to="/bespoke" variant="outline" size="sm">
                Inquire Bespoke Build
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Reveal key={product.id} delay={Math.min(idx * 40, 200)}>
                <div className="spotlight-card group border border-[#1E1E1E] hover:border-[#C5A880]/60 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl bg-[#0E0E0E] overflow-hidden h-full">
                  {/* Product Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="relative aspect-[3/4] w-full overflow-hidden bg-[#080808] block img-zoom-container"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />

                    {/* Category & Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#C5A880]">
                      {product.category}
                    </div>

                    {product.featured && (
                      <div className="absolute top-2.5 right-2.5 bg-[#C5A880] text-black px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider font-bold shadow-md">
                        Masterpiece
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end p-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white flex items-center space-x-1.5">
                        <span>View Technical Specs</span>
                        <i className="ri-arrow-right-line text-[#C5A880]"></i>
                      </span>
                    </div>
                  </Link>

                  {/* Product Metadata & Actions */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <p className="text-[9px] sm:text-[10px] font-mono text-[#C5A880] uppercase tracking-wider truncate">
                        {product.subCategory}
                      </p>

                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="text-sm sm:text-base font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-[11px] text-gray-400 font-light line-clamp-1 leading-relaxed">
                        {product.materialType || product.description}
                      </p>

                      {/* Finish Swatches Preview */}
                      {product.finishOptions && product.finishOptions.length > 0 && (
                        <div className="pt-1 flex items-center space-x-1.5">
                          <span className="text-[8px] font-mono uppercase text-gray-400">Finishes:</span>
                          <div className="flex items-center space-x-1">
                            {product.finishOptions.slice(0, 3).map((finish, fIdx) => (
                              <span
                                key={fIdx}
                                title={finish}
                                className={`w-2 h-2 rounded-full border border-white/20 ${
                                  fIdx === 0 ? 'bg-[#4A3B32]' : fIdx === 1 ? 'bg-[#8C6D46]' : 'bg-[#222222]'
                                }`}
                              />
                            ))}
                            {product.finishOptions.length > 3 && (
                              <span className="text-[8px] font-mono text-gray-400">
                                +{product.finishOptions.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pricing & Add to Bag Row */}
                    <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between gap-2">
                      <div>
                        <span className="font-serif text-sm sm:text-base text-white font-semibold">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="bg-[#181818] hover:bg-[#C5A880] text-gray-200 hover:text-black border border-[#2A2A2A] hover:border-[#C5A880] px-3 py-1.5 text-[10px] font-mono uppercase transition-all duration-300 flex items-center space-x-1 flex-shrink-0 active:scale-95"
                        title="Add to Specification Bag"
                      >
                        {addedId === product.id ? (
                          <>
                            <i className="ri-check-line text-green-400"></i>
                            <span className="text-green-400 font-semibold">Added</span>
                          </>
                        ) : (
                          <>
                            <i className="ri-shopping-bag-line text-xs"></i>
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

