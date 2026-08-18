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
  const initialFinish = searchParams.get('finish') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialMaterial);
  const [selectedFinish, setSelectedFinish] = useState<string>(initialFinish);
  const [priceRange, setPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const mat = searchParams.get('material') || 'All';
    const fin = searchParams.get('finish') || 'All';
    const q = searchParams.get('search') || '';
    setSelectedCategory(cat);
    setSelectedMaterial(mat);
    setSelectedFinish(fin);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Real categories from mockProducts
  const categories = [
    'All',
    'Pivot Doors',
    'Concealed & Flush Doors',
    'Sliding Glass Partitions',
    'Armored Security Doors',
    'Bespoke Wood Doors',
    'Architectural Hardware',
  ];

  // Real material types
  const materialFilters = [
    { label: 'All Materials', value: 'All' },
    { label: 'European Oak', value: 'Oak' },
    { label: 'Liquid Bronze', value: 'Bronze' },
    { label: 'Fluted / Smoked Glass', value: 'Glass' },
    { label: 'Canaletto Walnut', value: 'Walnut' },
    { label: 'Basalt & Teak Armor', value: 'Basalt' },
    { label: 'Aerospace Aluminum', value: 'Aluminum' },
  ];

  // Real finishes found in mockProducts
  const finishFilters = [
    { label: 'All Finishes', value: 'All' },
    { label: 'Smoked Bog Oak', value: 'Smoked Bog Oak' },
    { label: 'Oxidized Dark Bronze', value: 'Oxidized Dark Bronze' },
    { label: 'Ready-to-Paint Primer', value: 'Ready-to-Paint Primer' },
    { label: 'Brushed Bronze', value: 'Brushed Bronze' },
    { label: 'Natural Canaletto Walnut', value: 'Natural Canaletto Walnut' },
    { label: 'Scorched Basalt & Teak', value: 'Scorched Basalt & Teak' },
    { label: 'Matte Architectural Black', value: 'Matte Architectural Black' },
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₦10,000,000', value: 'under-10m' },
    { label: '₦10,000,000 – ₦20,000,000', value: '10m-20m' },
    { label: 'Above ₦20,000,000', value: 'above-20m' },
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

  const handleFinishSelect = (finish: string) => {
    setSelectedFinish(finish);
    if (finish === 'All') {
      searchParams.delete('finish');
    } else {
      searchParams.set('finish', finish);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setSelectedFinish('All');
    setPriceRange('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort real products
  const filteredProducts = useMemo(() => {
    const result = mockProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesMaterial =
        selectedMaterial === 'All' ||
        product.materialType.toLowerCase().includes(selectedMaterial.toLowerCase()) ||
        product.finishOptions.some((f) => f.toLowerCase().includes(selectedMaterial.toLowerCase()));

      const matchesFinish =
        selectedFinish === 'All' ||
        product.finishOptions.some((f) => f.toLowerCase().includes(selectedFinish.toLowerCase()));

      const matchesPrice =
        priceRange === 'All' ||
        (priceRange === 'under-10m' && product.price < 10000000) ||
        (priceRange === '10m-20m' && product.price >= 10000000 && product.price <= 20000000) ||
        (priceRange === 'above-20m' && product.price > 20000000);

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subCategory.toLowerCase().includes(query) ||
        product.materialType.toLowerCase().includes(query) ||
        product.finishOptions.some((f) => f.toLowerCase().includes(query));

      return matchesCategory && matchesMaterial && matchesFinish && matchesPrice && matchesSearch;
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
  }, [selectedCategory, selectedMaterial, selectedFinish, priceRange, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: typeof mockProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedMaterial !== 'All' ||
    selectedFinish !== 'All' ||
    priceRange !== 'All' ||
    searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
            Digital Showroom & Commercial Store
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight">
            SHOP DOORS
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Explore TheDoorman's collection of architectural door systems. Browse specifications, configure bespoke finishes, and add directly to your order.
          </p>
        </div>

        {/* Live Search Field */}
        <div className="mt-8 relative max-w-2xl">
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doors, finishes, systems (e.g. Pivot, Oak, Bronze)..."
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#C5A880] py-3.5 pl-12 pr-10 text-sm text-white placeholder-gray-500 font-sans focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>
      </div>

      {/* Main Commerce Layout: Filters (Left 3 Cols) + Product Grid (Right 9 Cols) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {/* Mobile Filter Toggle & Sort Header */}
        <div className="lg:hidden flex items-center justify-between pb-6 mb-6 border-b border-[#1C1C1C] gap-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#141414] border border-[#2A2A2A] text-xs font-mono uppercase tracking-wider text-white"
          >
            <i className="ri-filter-3-line text-sm text-[#C5A880]"></i>
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Sort products by"
              className="bg-[#141414] border border-[#2A2A2A] text-xs font-mono py-2 px-3 text-white focus:outline-none focus:border-[#C5A880]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Desktop Filters Sidebar (3 Cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#C5A880] flex items-center space-x-2">
                <i className="ri-sound-module-line"></i>
                <span>Catalogue Filters</span>
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[10px] font-mono text-gray-400 hover:text-[#C5A880] underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Category / System Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-300">
                Door Category
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-[#181818] text-[#C5A880] font-medium border-l-2 border-[#C5A880]'
                        : 'text-gray-400 hover:text-white hover:bg-[#121212]'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && (
                      <i className="ri-check-line text-xs text-[#C5A880]"></i>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-300">
                Material Structure
              </h3>
              <div className="space-y-1">
                {materialFilters.map((mat) => (
                  <button
                    key={mat.value}
                    onClick={() => handleMaterialSelect(mat.value)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      selectedMaterial === mat.value
                        ? 'text-[#C5A880] font-medium'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{mat.label}</span>
                    {selectedMaterial === mat.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Filter */}
            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-300">
                Curated Finish
              </h3>
              <div className="space-y-1">
                {finishFilters.map((fin) => (
                  <button
                    key={fin.value}
                    onClick={() => handleFinishSelect(fin.value)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      selectedFinish === fin.value
                        ? 'text-[#C5A880] font-medium'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{fin.label}</span>
                    {selectedFinish === fin.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-300">
                Price Bracket
              </h3>
              <div className="space-y-1">
                {priceRanges.map((pr) => (
                  <button
                    key={pr.value}
                    onClick={() => setPriceRange(pr.value)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      priceRange === pr.value
                        ? 'text-[#C5A880] font-medium'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{pr.label}</span>
                    {priceRange === pr.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area (9 Cols) */}
          <main className="lg:col-span-9 space-y-6">
            {/* Active Filter Bar & Results Count */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#1C1C1C] gap-4">
              <p className="text-xs font-mono text-gray-400">
                Showing <span className="text-white font-semibold">{filteredProducts.length}</span> Architectural Doors
              </p>

              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:flex items-center space-x-3 text-xs font-mono">
                <span className="text-gray-400">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="Sort products"
                  className="bg-[#121212] border border-[#262626] py-1.5 px-3 text-white focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name (A–Z)</option>
                </select>
              </div>
            </div>

            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-xs font-mono text-[#C5A880]">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => handleCategorySelect('All')} className="hover:text-white">
                      ×
                    </button>
                  </span>
                )}
                {selectedMaterial !== 'All' && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-xs font-mono text-[#C5A880]">
                    <span>Material: {selectedMaterial}</span>
                    <button onClick={() => handleMaterialSelect('All')} className="hover:text-white">
                      ×
                    </button>
                  </span>
                )}
                {selectedFinish !== 'All' && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-xs font-mono text-[#C5A880]">
                    <span>Finish: {selectedFinish}</span>
                    <button onClick={() => handleFinishSelect('All')} className="hover:text-white">
                      ×
                    </button>
                  </span>
                )}
                {priceRange !== 'All' && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-xs font-mono text-[#C5A880]">
                    <span>Price Filtered</span>
                    <button onClick={() => setPriceRange('All')} className="hover:text-white">
                      ×
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-xs font-mono text-[#C5A880]">
                    <span>Search: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-white">
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-mono text-gray-400 hover:text-white underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="p-16 text-center bg-[#111111] border border-[#1F1F1F] space-y-4 my-8">
                <i className="ri-door-open-line text-4xl text-[#C5A880]"></i>
                <h3 className="text-xl font-serif text-white">No Matching Architectural Doors</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  We could not find doors matching your specific combination of filters. Try broadening your criteria or reset filters.
                </p>
                <div className="pt-2">
                  <Button onClick={clearAllFilters} variant="secondary" size="sm">
                    Reset All Filters
                  </Button>
                </div>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
                {filteredProducts.map((product, idx) => (
                  <Reveal key={product.id} delay={idx * 40}>
                    <div className="group relative bg-[#111111] border border-[#1F1F1F] hover:border-[#C5A880]/60 transition-all duration-500 flex flex-col h-full overflow-hidden">
                      {/* Product Image Frame */}
                      <Link
                        to={`/product/${product.id}`}
                        className="relative aspect-[3/4] w-full bg-[#080808] overflow-hidden block"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[9px] font-mono uppercase tracking-wider text-[#C5A880]">
                          {product.category}
                        </div>

                        {product.featured && (
                          <div className="absolute top-3 right-3 bg-[#C5A880] text-black px-2 py-0.5 text-[9px] font-mono font-bold uppercase">
                            Featured
                          </div>
                        )}
                      </Link>

                      {/* Product Card Metadata */}
                      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                            {product.subCategory}
                          </p>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-base font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                            {product.materialType}
                          </p>
                        </div>

                        {/* Starting Price & Finishes */}
                        <div className="pt-3 border-t border-[#1C1C1C] space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase text-gray-400">Starting Price</span>
                            <span className="text-sm font-mono text-[#F3F3F1] font-semibold">
                              {formatPrice(product.price)}
                            </span>
                          </div>

                          {/* Finishes chips */}
                          <div className="flex items-center space-x-1">
                            {product.finishOptions.slice(0, 2).map((finish) => (
                              <span
                                key={finish}
                                className="px-1.5 py-0.5 bg-[#181818] border border-[#282828] text-[9px] font-mono text-gray-300 truncate max-w-[110px]"
                              >
                                {finish}
                              </span>
                            ))}
                            {product.finishOptions.length > 2 && (
                              <span className="text-[9px] font-mono text-gray-500">
                                +{product.finishOptions.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <Link
                              to={`/product/${product.id}`}
                              className="py-2 px-2 bg-[#171717] hover:bg-[#222222] text-white border border-[#2B2B2B] text-center text-[11px] font-mono uppercase tracking-wider transition-colors duration-300"
                            >
                              VIEW PRODUCT
                            </Link>
                            <button
                              onClick={(e) => handleQuickAdd(e, product)}
                              className={`py-2 px-2 text-center text-[11px] font-mono uppercase tracking-wider border transition-all duration-300 ${
                                addedId === product.id
                                  ? 'bg-[#C5A880] text-black border-[#C5A880] font-bold'
                                  : 'bg-transparent text-[#C5A880] border-[#C5A880]/50 hover:bg-[#C5A880] hover:text-black'
                              }`}
                            >
                              {addedId === product.id ? '✓ ADDED' : 'ADD TO BAG'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
