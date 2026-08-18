import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal } from '../../components/ui/Reveal';
import { mockProducts, mockProjects } from '../../mocks/products';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useCart } from '../../contexts/CartContext';

export default function Home() {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // 6 Real Products for Featured Collection
  const featuredCollection = [
    mockProducts[0], // Aeterna Grand Smoked Oak & Carbon Pivot Door
    mockProducts[1], // Venezia Patinated Liquid Bronze Pivot Portal
    mockProducts[2], // Invisio Zero-Sightline Minimalist Flush Door
    mockProducts[3], // Aura Fluted Glass Bronze Grid Sliding Partition
    mockProducts[4], // Fortis Biometric Armored Grand Entrance System
    mockProducts[5], // Canaletto 3D Ribbed Walnut Architectural Door
  ];

  // Most Requested Statement Doors
  const mostRequestedDoors = [
    mockProducts[0], // Aeterna Grand Pivot
    mockProducts[4], // Fortis Biometric Armored
    mockProducts[1], // Venezia Liquid Bronze
  ];

  const handleQuickAdd = (e: React.MouseEvent, product: typeof mockProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 2500);
  };

  // 6 Real Categories
  const doorSystemCategories = [
    {
      name: 'Pivot Doors',
      sub: 'Grand Entrance & Portals',
      description: 'Floor-concealed hydraulic pivot systems supporting panels up to 500kg with 360° hold-open actuation.',
      image: mockProducts[0].images[0],
      link: '/products?category=Pivot%20Doors',
      count: '3 Models Available',
    },
    {
      name: 'Concealed & Flush Doors',
      sub: 'Zero-Sightline Wall Integration',
      description: 'Extruded aluminum sub-frames with 3D-adjustable invisible hinges that integrate completely flush with wall surfaces.',
      image: mockProducts[2].images[0],
      link: '/products?category=Concealed%20%26%20Flush%20Doors',
      count: '1 Model Available',
    },
    {
      name: 'Sliding Glass Partitions',
      sub: 'Acoustic & Fluted Glass',
      description: 'Concealed ceiling soft-close tracks with 18mm anodized bronze profiles and acoustic laminated glass.',
      image: mockProducts[3].images[0],
      link: '/products?category=Sliding%20Glass%20Partitions',
      count: '2 Models Available',
    },
    {
      name: 'Armored Security Doors',
      sub: 'RC4 Biometric Entrances',
      description: 'Ballistic manganese armor cores clad in natural stone and teak with integrated biometric scanners.',
      image: mockProducts[4].images[0],
      link: '/products?category=Armored%20Security%20Doors',
      count: '1 Model Available',
    },
    {
      name: 'Bespoke Wood Doors',
      sub: 'Ribbed Walnut & Smoked Oak',
      description: 'Precision CNC-milled 3D staves and sequential book-matched European veneers for grand interior salons.',
      image: mockProducts[5].images[0],
      link: '/products?category=Bespoke%20Wood%20Doors',
      count: '2 Models Available',
    },
    {
      name: 'Architectural Hardware',
      sub: 'Solid Cast Silicon Bronze',
      description: '2200mm full-height sculptural door pulls cast in pure silicon bronze with hand-rubbed wax patinas.',
      image: mockProducts[8].images[0],
      link: '/products?category=Architectural%20Hardware',
      count: '1 Model Available',
    },
  ];

  // Real Finishes from mockProducts
  const architecturalFinishes = [
    {
      name: 'Smoked European Oak',
      category: 'Pivot & Wood Doors',
      description: 'Slow-fumed European white oak with deep charcoal patina and prominent open grain.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      link: '/products?finish=Smoked%20Bog%20Oak',
      sampleProduct: mockProducts[0],
    },
    {
      name: 'Patinated Liquid Bronze',
      category: 'Artisan Metal Pivots',
      description: 'Hand-applied real bronze alloy chemically patinated into an unrepeatable monolithic skin.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      link: '/products?finish=Oxidized%20Dark%20Bronze',
      sampleProduct: mockProducts[1],
    },
    {
      name: 'Fluted Acoustic Glass',
      category: 'Sliding Partitions',
      description: 'Precision vertical reeded tempered glass with acoustic interlayers and bronze trim.',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
      link: '/products?finish=Brushed%20Bronze',
      sampleProduct: mockProducts[3],
    },
    {
      name: '3D Ribbed Canaletto Walnut',
      category: 'Bespoke Interior Doors',
      description: 'Precision CNC-fluted solid Italian walnut creating rich architectural shadow play.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      link: '/products?finish=Natural%20Canaletto%20Walnut',
      sampleProduct: mockProducts[5],
    },
    {
      name: 'Scorched Basalt & Teak',
      category: 'Armored Security',
      description: 'Natural volcanic basalt stone tiles combined with weather-sealed thermo-treated teak.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      link: '/products?finish=Scorched%20Basalt%20%26%20Teak',
      sampleProduct: mockProducts[4],
    },
    {
      name: 'Matte Obsidian Black',
      category: 'Minimalist Aluminum',
      description: 'Ultra-matte electrostatic powder coat with velvety tactile surface and zero reflection.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      link: '/products?finish=Matte%20Architectural%20Black',
      sampleProduct: mockProducts[9],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION — ARCHITECTURAL COMMERCE ENTRY */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Cinematic Architectural Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
            alt="TheDoorman Luxury Grand Entrance Pivot"
            className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-black/80" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full text-center sm:text-left pt-12 sm:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              <Reveal delay={50}>
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1A1A1A]/80 border border-[#C5A880]/30 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
                  <p className="text-[11px] font-mono uppercase tracking-widest-arch text-[#C5A880]">
                    Architectural Door Systems & Atelier
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light leading-[1.03] text-[#F3F3F1] tracking-tight">
                  Doors, Engineered <br />
                  <span className="italic font-normal text-[#C5A880]">for Architecture.</span>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
                  Premium architectural door systems, refined finishes and bespoke configurations for exceptional spaces.
                </p>
              </Reveal>

              {/* Dominant Primary Shopping CTA & Secondary Bespoke CTA */}
              <Reveal delay={200}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <Button to="/products" variant="primary" size="lg" className="shadow-2xl shadow-[#C5A880]/10">
                    <span className="flex items-center justify-center space-x-2">
                      <span>SHOP DOORS</span>
                      <i className="ri-arrow-right-line text-sm"></i>
                    </span>
                  </Button>
                  <Button to="/bespoke" variant="secondary" size="lg">
                    <span>EXPLORE BESPOKE</span>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Quick Hero Floating Product Preview */}
            <div className="hidden lg:block lg:col-span-4">
              <Reveal delay={250}>
                <div className="p-5 bg-[#121212]/90 border border-[#262626] backdrop-blur-xl shadow-2xl space-y-4 group hover:border-[#C5A880]/50 transition-all duration-500">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#0A0A0A]">
                    <img
                      src={mockProducts[0].images[0]}
                      alt={mockProducts[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] font-mono uppercase text-[#C5A880]">
                      Featured Entrance
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      {mockProducts[0].subCategory}
                    </p>
                    <h3 className="text-base font-serif text-white group-hover:text-[#C5A880] transition-colors">
                      {mockProducts[0].name}
                    </h3>
                    <p className="text-sm font-mono text-[#C5A880] font-semibold pt-1">
                      From {formatPrice(mockProducts[0].price)}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-[#222]">
                    <Link
                      to={`/product/${mockProducts[0].id}`}
                      className="text-xs font-mono text-gray-300 hover:text-white flex items-center space-x-1"
                    >
                      <span>Configure Spec</span>
                      <i className="ri-arrow-right-s-line"></i>
                    </Link>
                    <button
                      onClick={(e) => handleQuickAdd(e, mockProducts[0])}
                      className="text-xs font-mono text-[#C5A880] hover:underline"
                    >
                      {quickAddedId === mockProducts[0].id ? '✓ In Bag' : '+ Add to Bag'}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED COLLECTION — SHOP THE COLLECTION (4–6 Real Products) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#1C1C1C]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionHeading
            eyebrow="Commercial Catalogue"
            title="SHOP THE COLLECTION"
            subtitle="Explore engineered pivot entrances, invisible flush frames, acoustic glass partitions, and armored security portals ready to specify and order."
            align="left"
          />
          <Link
            to="/products"
            className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880] hover:text-white transition-colors flex items-center space-x-1.5 flex-shrink-0"
          >
            <span>View All Doors ({mockProducts.length})</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {featuredCollection.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 60}>
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
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] font-mono uppercase tracking-wider text-[#C5A880]">
                    {product.category}
                  </div>

                  {/* CAD Available Badge */}
                  {product.cadAvailable && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[9px] font-mono text-gray-300">
                      BIM / CAD
                    </div>
                  )}
                </Link>

                {/* Product Metadata & Actions */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                      {product.subCategory}
                    </p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                      {product.materialType}
                    </p>
                  </div>

                  {/* Starting Price & Finishes Overview */}
                  <div className="pt-3 border-t border-[#1C1C1C] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-gray-400">Starting Price</span>
                      <span className="text-sm font-mono text-[#F3F3F1] font-semibold">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {/* Finishes Swatch Dots */}
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] font-mono text-gray-500 uppercase mr-1">Finishes:</span>
                      {product.finishOptions.slice(0, 3).map((finish) => (
                        <span
                          key={finish}
                          className="px-1.5 py-0.5 bg-[#181818] border border-[#282828] text-[9px] font-mono text-gray-300"
                        >
                          {finish.split(' ')[0]}
                        </span>
                      ))}
                      {product.finishOptions.length > 3 && (
                        <span className="text-[9px] font-mono text-gray-500">
                          +{product.finishOptions.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons: VIEW PRODUCT & ADD TO BAG */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="py-2.5 px-3 bg-[#171717] hover:bg-[#222222] text-white border border-[#2B2B2B] text-center text-xs font-mono uppercase tracking-wider transition-colors duration-300"
                      >
                        VIEW PRODUCT
                      </Link>
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`py-2.5 px-3 text-center text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                          quickAddedId === product.id
                            ? 'bg-[#C5A880] text-black border-[#C5A880] font-bold'
                            : 'bg-transparent text-[#C5A880] border-[#C5A880]/50 hover:bg-[#C5A880] hover:text-black'
                        }`}
                      >
                        {quickAddedId === product.id ? '✓ ADDED' : 'ADD TO BAG'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SHOP BY SYSTEM — ARCHITECTURAL CATEGORIES */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#0D0D0D] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Door Typologies"
            title="SHOP BY SYSTEM"
            subtitle="Every architectural opening demands an intentional kinematic system. Select your structural mechanism below."
            align="center"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doorSystemCategories.map((sys, idx) => (
              <Reveal key={sys.name} delay={idx * 60}>
                <Link
                  to={sys.link}
                  className="group relative h-[380px] sm:h-[420px] bg-[#121212] border border-[#222] hover:border-[#C5A880] transition-all duration-500 overflow-hidden flex flex-col justify-end p-6 sm:p-8 block"
                >
                  {/* System Image Background */}
                  <img
                    src={sys.image}
                    alt={sys.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Content Overlay */}
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                        {sys.sub}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {sys.count}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif text-white group-hover:text-[#C5A880] transition-colors">
                      {sys.name}
                    </h3>

                    <p className="text-xs text-gray-300 font-light line-clamp-2 leading-relaxed">
                      {sys.description}
                    </p>

                    <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-[#C5A880] group-hover:translate-x-1 transition-transform duration-300">
                      <span>Explore System</span>
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SHOP BY FINISH — TACTILE ARCHITECTURAL MATERIALS */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#1C1C1C]">
        <SectionHeading
          eyebrow="Materiality & Patinas"
          title="SHOP BY FINISH"
          subtitle="Explore authentic artisan timbers, hand-patinated liquid metals, acoustic fluted glasses, and scorched volcanic basalt."
          align="left"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {architecturalFinishes.map((finish, idx) => (
            <Reveal key={finish.name} delay={idx * 60}>
              <Link
                to={finish.link}
                className="group p-6 bg-[#111111] border border-[#202020] hover:border-[#C5A880]/60 transition-all duration-400 flex flex-col justify-between space-y-4 block"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A] border border-white/10">
                  <img
                    src={finish.image}
                    alt={finish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono uppercase text-[#C5A880]">
                    {finish.category}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-serif text-white group-hover:text-[#C5A880] transition-colors">
                    {finish.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {finish.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1E1E1E] flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">View Compatible Doors</span>
                  <span className="text-[#C5A880] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MOST REQUESTED / FEATURED STATEMENT DOORS */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#0C0C0C] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto space-y-16">
          <SectionHeading
            eyebrow="Architectural Flagships"
            title="FEATURED STATEMENT DOORS"
            subtitle="The most frequently specified monumental portals engineered for private villas and corporate headquarters."
            align="center"
          />

          <div className="space-y-12">
            {mostRequestedDoors.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 80}>
                <div className="p-6 sm:p-10 bg-[#121212] border border-[#222] hover:border-[#C5A880]/50 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Product Hero Shot */}
                  <Link
                    to={`/product/${product.id}`}
                    className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[16/11] bg-[#0A0A0A] overflow-hidden border border-white/10 group block"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/15 text-[10px] font-mono uppercase text-[#C5A880]">
                      {product.subCategory}
                    </div>
                  </Link>

                  {/* Right Technical Commerce Specs */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="space-y-1.5">
                      <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                        {product.category}
                      </p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-2xl sm:text-3xl font-serif text-white hover:text-[#C5A880] transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                      {product.description}
                    </p>

                    {/* Spec Bullets */}
                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#1E1E1E] text-xs font-mono">
                      <div>
                        <span className="text-gray-500 uppercase block text-[10px]">Max Scale</span>
                        <span className="text-gray-200">{product.maxDimensions.split('up to ')[1] || product.maxDimensions}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 uppercase block text-[10px]">Kinematics</span>
                        <span className="text-gray-200">{product.openingMechanism.split(' ')[0]} Hydraulic</span>
                      </div>
                      <div>
                        <span className="text-gray-500 uppercase block text-[10px]">Lead Time</span>
                        <span className="text-gray-200">{product.leadTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 uppercase block text-[10px]">Hardware</span>
                        <span className="text-gray-200 truncate block">{product.hardwareType.split(' ')[0]} Integrated</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                      <div>
                        <p className="text-[10px] font-mono uppercase text-gray-400">Starting Price</p>
                        <p className="text-xl font-mono font-semibold text-white">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button to={`/product/${product.id}`} variant="secondary" size="sm">
                          Configure Spec
                        </Button>
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                            quickAddedId === product.id
                              ? 'bg-[#C5A880] text-black border-[#C5A880] font-bold'
                              : 'bg-[#C5A880] text-black border-[#C5A880] hover:bg-[#d4b993]'
                          }`}
                        >
                          {quickAddedId === product.id ? '✓ Added' : 'Add to Bag'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ARCHITECTURAL PROJECTS — CONNECTING PROJECTS TO COMMERCE */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#1C1C1C]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionHeading
            eyebrow="Built Architecture"
            title="INSTALLED PROJECTS & CASE STUDIES"
            subtitle="Explore how TheDoorman portals transform private residences and pavilions. Shop the exact doors specified in each project."
            align="left"
          />
          <Link
            to="/projects"
            className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880] hover:text-white transition-colors flex items-center space-x-1.5 flex-shrink-0"
          >
            <span>View All Projects</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mockProjects.map((project, idx) => {
            // Relate to real product model
            const relatedDoor = idx === 0 ? mockProducts[1] : idx === 1 ? mockProducts[2] : mockProducts[3];

            return (
              <Reveal key={project.id} delay={idx * 80}>
                <div className="bg-[#111111] border border-[#222] hover:border-[#C5A880]/50 transition-all duration-500 flex flex-col h-full">
                  <div className="relative aspect-[4/3] bg-[#0A0A0A] overflow-hidden">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-[#C5A880]">
                      {project.location}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                        {project.architect}
                      </p>
                      <h3 className="text-lg font-serif text-white leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-light line-clamp-2 mt-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Commerce Bridge: Doors Used in This Project */}
                    <div className="pt-4 border-t border-[#1C1C1C] space-y-3 bg-[#0A0A0A]/50 p-3">
                      <p className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880]">
                        Door Used in This Project:
                      </p>
                      <div className="flex items-center space-x-3">
                        <img
                          src={relatedDoor.images[0]}
                          alt={relatedDoor.name}
                          className="w-10 h-12 object-cover border border-white/10 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-serif text-white truncate">
                            {relatedDoor.name}
                          </p>
                          <p className="text-[10px] font-mono text-[#C5A880]">
                            From {formatPrice(relatedDoor.price)}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/product/${relatedDoor.id}`}
                        className="block w-full py-2 bg-[#1C1C1C] hover:bg-[#C5A880] hover:text-black text-[#F3F3F1] text-center text-xs font-mono uppercase tracking-wider transition-all duration-300"
                      >
                        SHOP THIS DOOR
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BESPOKE ATELIER SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#0C0C0C] border-t border-[#1C1C1C]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Reveal delay={50}>
            <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
              Custom Architectural Commissions
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mt-3 leading-tight">
              YOUR DOOR. <br />
              <span className="italic text-[#C5A880]">YOUR ARCHITECTURE.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              When standard openings cannot meet the scale of your vision. Our atelier collaborates directly with architects and estate owners to engineer oversized pivot portals up to 5 meters tall, multi-tier sliding partitions, and custom patinated bronze facades.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/bespoke" variant="primary" size="lg">
                START A BESPOKE COMMISSION
              </Button>
              <Button to="/contact?subject=Bespoke+Inquiry" variant="secondary" size="lg">
                Schedule Atelier Consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL HOMEPAGE CTA — SHOP ALL DOORS */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center border-t border-[#1C1C1C]">
        <Reveal delay={50} className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Find the door that belongs in your space.
          </h2>
          <p className="text-sm text-gray-300 font-light">
            Browse our full catalogue of pivot portals, flush systems, sliding partitions, and security entrances with transparent pricing and CAD models.
          </p>
          <div className="pt-2">
            <Button to="/products" variant="primary" size="lg">
              SHOP ALL DOORS
            </Button>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
