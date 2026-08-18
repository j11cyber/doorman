import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal } from '../../components/ui/Reveal';
import { mockProducts, mockProjects } from '../../mocks/products';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useCart } from '../../contexts/CartContext';

export default function Home() {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const heroProduct = mockProducts[0]; // Aeterna Grand Smoked Oak & Carbon Pivot Door
  const bronzePivot = mockProducts[1]; // Venezia Patinated Liquid Bronze Pivot Portal
  const flushDoor = mockProducts[2];   // Invisio Zero-Sightline Minimalist Flush Door
  const slidingGlass = mockProducts[3];// Aura Fluted Glass Bronze Grid Sliding Partition
  const armoredDoor = mockProducts[4]; // Fortis Biometric Armored Grand Entrance System
  const walnutDoor = mockProducts[5];  // Canaletto 3D Ribbed Walnut Architectural Door

  const handleQuickAdd = (e: React.MouseEvent, product: typeof mockProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 2500);
  };

  // 6 Real Categories with real representative images & descriptions
  const doorSystemCategories = [
    {
      name: 'Pivot Doors',
      sub: 'Grand Entrance & Portals',
      description: 'Oversized monolithic pivot portals with concealed 500kg floor hydraulics.',
      image: heroProduct.images[0],
      link: '/products?category=Pivot%20Doors',
      count: '3 Models Available',
    },
    {
      name: 'Concealed & Flush Doors',
      sub: 'Zero-Sightline Wall Integration',
      description: 'Invisible subframes and magnetic latches engineered to disappear into walls.',
      image: flushDoor.images[0],
      link: '/products?category=Concealed%20%26%20Flush%20Doors',
      count: '1 Model Available',
    },
    {
      name: 'Sliding Glass Partitions',
      sub: 'Acoustic & Fluted Glass',
      description: 'Ceiling-hung fluted and smoked glass dividers with ultra-slim bronze profiles.',
      image: slidingGlass.images[0],
      link: '/products?category=Sliding%20Glass%20Partitions',
      count: '2 Models Available',
    },
    {
      name: 'Armored Security Doors',
      sub: 'RC4 Biometric Entrances',
      description: 'Certified ballistic manganese armor clad in natural basalt stone and thermo-teak.',
      image: armoredDoor.images[0],
      link: '/products?category=Armored%20Security%20Doors',
      count: '1 Model Available',
    },
    {
      name: 'Bespoke Wood Doors',
      sub: 'Ribbed Walnut & Smoked Oak',
      description: 'CNC 3D milled staves and book-matched European veneers for grand salons.',
      image: walnutDoor.images[0],
      link: '/products?category=Bespoke%20Wood%20Doors',
      count: '2 Models Available',
    },
    {
      name: 'Architectural Hardware',
      sub: 'Solid Cast Bronze Pulls',
      description: 'Sculptural 2200mm silicon bronze door pulls and biometric smart grips.',
      image: mockProducts[7].images[0],
      link: '/products?category=Architectural%20Hardware',
      count: '1 Model Available',
    },
  ];

  // Tactile Material Showcase matching real product finishes
  const architecturalMaterials = [
    {
      name: 'Smoked European Oak',
      category: 'Pivot & Wood Doors',
      description: 'Slow-fumed European white oak with deep charcoal patina and prominent open grain.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      categoryLink: '/products?category=Pivot%20Doors',
      featuredProduct: heroProduct,
    },
    {
      name: 'Patinated Liquid Bronze',
      category: 'Artisan Metal Pivots',
      description: 'Hand-applied real bronze alloy chemically patinated into an unrepeatable monolithic skin.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      categoryLink: '/products?category=Pivot%20Doors',
      featuredProduct: bronzePivot,
    },
    {
      name: 'Fluted Acoustic Glass',
      category: 'Sliding Partitions',
      description: 'Precision vertical reeded tempered glass with acoustic interlayers and bronze trim.',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
      categoryLink: '/products?category=Sliding%20Glass%20Partitions',
      featuredProduct: slidingGlass,
    },
    {
      name: '3D Ribbed Canaletto Walnut',
      category: 'Bespoke Interior Doors',
      description: 'Precision CNC-fluted solid Italian walnut creating rich architectural shadow play.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      categoryLink: '/products?category=Bespoke%20Wood%20Doors',
      featuredProduct: walnutDoor,
    },
  ];

  // Projects matched to actual door models in catalog
  const projectsWithDoors = [
    {
      project: mockProjects[0],
      linkedProduct: bronzePivot, // Venezia Liquid Bronze
      role: 'Main Entrance Portal',
    },
    {
      project: mockProjects[1],
      linkedProduct: flushDoor, // Invisio Zero-Sightline
      role: 'Interior Flush Package',
    },
    {
      project: mockProjects[2],
      linkedProduct: slidingGlass, // Aura Fluted Glass
      role: 'Executive Space Partition',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* 1. Cinematic Architectural Hero Section with Commerce Positioning */}
      <section className="relative min-h-[92vh] sm:min-h-screen pt-36 sm:pt-44 lg:pt-48 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden flex flex-col justify-between">
        {/* Background Architectural Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
            alt="TheDoorman Grand Architectural Pivot Door"
            className="w-full h-full object-cover object-center animate-hero-scale"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-black/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/25 to-black/75" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 border border-[#C5A880]/30 animate-fade-in-up [animation-delay:150ms]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-[11px] uppercase font-mono tracking-widest-arch text-[#C5A880]">
                Digital Showroom & Atelier
              </span>
            </div>

            {/* Main Commerce Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light tracking-tight leading-[1.02] text-[#F3F3F1] animate-fade-in-up [animation-delay:300ms]">
              Architectural doors, <br />
              <span className="italic font-normal text-[#C5A880]">precisely engineered.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-light leading-relaxed max-w-xl animate-fade-in-up [animation-delay:450ms]">
              Browse, specify, customize, and order monumental entrance pivot doors, zero-sightline concealed flush systems, and acoustic glass partitions.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 sm:gap-6 items-center animate-fade-in-up [animation-delay:600ms]">
              <Button to="/products" variant="primary" size="lg" icon={<i className="ri-arrow-right-line"></i>}>
                Shop The Catalogue
              </Button>
              <Button to="/bespoke" variant="outline" size="lg">
                Bespoke Commissions
              </Button>
            </div>
          </div>

          {/* Technical Specs Elevation Bar */}
          <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-gray-400 font-mono animate-fade-in-up [animation-delay:750ms]">
            <div>
              <p className="text-[#C5A880] text-sm font-semibold">4.5M</p>
              <p className="tracking-wider uppercase text-[10px] text-gray-400 mt-0.5">Max Engineered Height</p>
            </div>
            <div>
              <p className="text-[#C5A880] text-sm font-semibold">500KG</p>
              <p className="tracking-wider uppercase text-[10px] text-gray-400 mt-0.5">Concealed Pivot Bearing</p>
            </div>
            <div>
              <p className="text-[#C5A880] text-sm font-semibold">RC4 / 44dB</p>
              <p className="tracking-wider uppercase text-[10px] text-gray-400 mt-0.5">Ballistic Security & Sound</p>
            </div>
            <div>
              <p className="text-[#C5A880] text-sm font-semibold">100%</p>
              <p className="tracking-wider uppercase text-[10px] text-gray-400 mt-0.5">Bespoke Architectural Build</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY DOOR SYSTEM (Immediate Category Discovery) */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#1C1C1C]">
        <SectionHeading
          eyebrow="Door Systems Discovery"
          title="Shop by Door System"
          subtitle="Explore engineered architectural door lines designed for grand entrances, seamless interior walls, and space divisions."
          align="split"
          splitContent={
            <Button to="/products" variant="underline">
              View Complete Catalogue ({mockProducts.length} Models)
            </Button>
          }
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {doorSystemCategories.map((cat, idx) => (
            <Reveal key={cat.name} delay={idx * 70}>
              <Link
                to={cat.link}
                className="group relative block bg-[#111111] border border-[#1E1E1E] hover:border-[#C5A880]/60 transition-all duration-500 overflow-hidden shadow-xl"
              >
                {/* Category Image with Tactile Zoom */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#080808] img-zoom-container">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#C5A880]">
                    0{idx + 1} // System
                  </div>

                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-gray-400 bg-black/75 px-2 py-0.5 border border-white/10">
                    {cat.count}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                    {cat.sub}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-[#C5A880] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="pt-3 flex items-center text-xs font-mono text-[#C5A880] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Shop System</span>
                    <i className="ri-arrow-right-line ml-2"></i>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Masterpiece Showcase with Quick Add & Editorial Layout) */}
      <section className="py-24 sm:py-32 bg-[#0C0C0C] border-y border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeading
            eyebrow="Architectural Masterpieces"
            title="Featured Products"
            subtitle="Selected flagship door systems available for specification and custom ordering."
            align="split"
            splitContent={
              <Button to="/products" variant="primary">
                Browse All Doors
              </Button>
            }
          />

          {/* Asymmetric Product Grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Dominant Hero Card (7 Cols) */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="spotlight-card group relative bg-[#0E0E0E] border border-[#222222] hover:border-[#C5A880]/60 transition-all duration-500 overflow-hidden shadow-2xl">
                  <Link to={`/product/${heroProduct.id}`} className="relative aspect-[4/5] sm:aspect-[16/14] w-full block overflow-hidden bg-[#080808] img-zoom-container">
                    <img
                      src={heroProduct.images[0]}
                      alt={heroProduct.name}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[#C5A880] border border-[#C5A880]/30 shadow-md">
                      Flagship Pivot Model
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                      <span className="text-xs font-mono uppercase tracking-widest text-white flex items-center space-x-2">
                        <span>Inspect Full Blueprint & Finishes</span>
                        <i className="ri-arrow-right-line text-[#C5A880]"></i>
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#C5A880] uppercase tracking-widest">{heroProduct.category}</span>
                      <span className="text-white font-serif font-semibold text-lg sm:text-xl">{formatPrice(heroProduct.price)}</span>
                    </div>

                    <Link to={`/product/${heroProduct.id}`} className="block">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors leading-tight">
                        {heroProduct.name}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed line-clamp-2">
                      {heroProduct.description}
                    </p>

                    {/* Finish Options Preview */}
                    {heroProduct.finishOptions && (
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-gray-400">Available Finishes:</span>
                        {heroProduct.finishOptions.map((f, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-[#161616] border border-[#2A2A2A] text-gray-300">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Row */}
                    <div className="pt-4 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-4">
                      <Link
                        to={`/product/${heroProduct.id}`}
                        className="text-xs font-mono text-[#C5A880] hover:text-white uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                      >
                        <span>View Product Details</span>
                        <i className="ri-arrow-right-line"></i>
                      </Link>

                      <button
                        onClick={(e) => handleQuickAdd(e, heroProduct)}
                        className="bg-[#C5A880] hover:bg-[#D8C2A2] text-black px-5 py-2.5 text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 flex items-center space-x-2 active:scale-95"
                      >
                        {quickAddedId === heroProduct.id ? (
                          <>
                            <i className="ri-check-line"></i>
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <i className="ri-shopping-bag-line"></i>
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Staggered Supporting Products (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {[bronzePivot, flushDoor, slidingGlass].map((product, idx) => (
                <Reveal key={product.id} delay={150 + idx * 90}>
                  <div className="group bg-[#0E0E0E] border border-[#222222] hover:border-[#C5A880]/50 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row lg:flex-col shadow-lg">
                    <Link
                      to={`/product/${product.id}`}
                      className="relative aspect-[4/3] sm:aspect-square lg:aspect-[16/10] sm:w-1/2 lg:w-full overflow-hidden bg-[#080808] flex-shrink-0 img-zoom-container block"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#C5A880] border border-white/10">
                        {product.category}
                      </div>
                    </Link>

                    <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center text-xs font-mono mb-1">
                          <span className="text-[#C5A880] uppercase tracking-widest truncate pr-2">{product.subCategory}</span>
                          <span className="text-white font-serif font-semibold text-base">{formatPrice(product.price)}</span>
                        </div>
                        <Link to={`/product/${product.id}`}>
                          <h4 className="text-base font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-1">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-xs text-gray-400 font-light line-clamp-1 leading-relaxed mt-1">
                          {product.materialType}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-[11px] font-mono text-gray-400 hover:text-white uppercase tracking-wider"
                        >
                          View Specs
                        </Link>

                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="bg-[#181818] hover:bg-[#C5A880] text-gray-200 hover:text-black border border-[#2A2A2A] hover:border-[#C5A880] px-3 py-1.5 text-[10px] font-mono uppercase transition-all duration-300 flex items-center space-x-1.5 active:scale-95"
                        >
                          {quickAddedId === product.id ? (
                            <>
                              <i className="ri-check-line text-green-400"></i>
                              <span className="text-green-400 font-semibold">Added</span>
                            </>
                          ) : (
                            <>
                              <i className="ri-shopping-bag-line text-xs"></i>
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY MATERIAL & FINISH (Tactile Architectural Materiality) */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading
          eyebrow="Materiality & Tactility"
          title="Shop by Material & Finish"
          subtitle="Explore door systems by tactile materiality — rare bog oaks, liquid bronze patinas, acoustic reeded glass, and solid ribbed walnuts."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {architecturalMaterials.map((mat, index) => (
            <Reveal key={mat.name} delay={index * 80}>
              <div className="spotlight-card group relative border border-[#1E1E1E] overflow-hidden p-6 space-y-4 hover:border-[#C5A880]/60 transition-all duration-500 hover:shadow-xl bg-[#0E0E0E]">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080808] border border-[#1A1A1A] img-zoom-container">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/85 backdrop-blur-sm font-mono text-[9px] px-2 py-0.5 text-[#C5A880] border border-white/10">
                    0{index + 1}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                    {mat.category}
                  </p>
                  <h4 className="text-base sm:text-lg font-serif text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors duration-300">
                    {mat.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1C1C1C] flex justify-between items-center">
                  <Link
                    to={mat.categoryLink}
                    className="text-xs font-mono uppercase tracking-wider text-[#C5A880] hover:text-white flex items-center space-x-1"
                  >
                    <span>Browse Material</span>
                    <i className="ri-arrow-right-line text-xs"></i>
                  </Link>
                  <Link
                    to={`/product/${mat.featuredProduct.id}`}
                    className="text-[10px] font-mono text-gray-400 hover:text-gray-200"
                    title="View Flagship Door"
                  >
                    View Model
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. DOORS IN ARCHITECTURE (Projects as Social Proof + Direct "Shop This Door" Cross-Link) */}
      <section className="py-24 sm:py-32 bg-[#090909] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeading
            eyebrow="Architectural Case Studies"
            title="Doors in Space"
            subtitle="See TheDoorman installations across prominent private villas and commercial landmarks, and shop the exact systems specified."
            align="split"
            splitContent={
              <Button to="/projects" variant="underline">
                View All Case Studies
              </Button>
            }
          />

          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projectsWithDoors.map(({ project, linkedProduct, role }, idx) => (
              <Reveal key={project.id} delay={idx * 100}>
                <div className="bg-[#111111] border border-[#222222] hover:border-[#C5A880]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full shadow-2xl">
                  <div>
                    {/* Project Hero Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#080808] img-zoom-container">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#C5A880] border border-white/10">
                        {project.location} • {project.year}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 space-y-3">
                      <h4 className="text-xl font-serif text-white">
                        {project.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* "DOORS FEATURED IN THIS PROJECT" Mini Commerce Card */}
                  <div className="p-5 bg-[#0C0C0C] border-t border-[#1C1C1C] space-y-3">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880]">
                      Installed Door System
                    </p>
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={linkedProduct.images[0]}
                        alt={linkedProduct.name}
                        className="w-12 h-14 object-cover border border-[#262626] bg-[#161616] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-serif text-white truncate group-hover:text-[#C5A880]">
                          {linkedProduct.name}
                        </h5>
                        <p className="text-[10px] font-mono text-[#C5A880] mt-0.5">
                          {formatPrice(linkedProduct.price)}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-[#181818]">
                      <Link
                        to={`/product/${linkedProduct.id}`}
                        className="text-xs font-mono uppercase tracking-wider text-[#C5A880] hover:text-white flex items-center space-x-1"
                      >
                        <span>Shop This Door</span>
                        <i className="ri-arrow-right-line text-xs"></i>
                      </Link>
                      <Link
                        to="/projects"
                        className="text-[10px] font-mono text-gray-400 hover:text-gray-200"
                      >
                        Project Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BESPOKE COMMISSIONS (Custom Dimensions & Made to Order) */}
      <section className="py-24 sm:py-32 bg-[#0C0C0C] border-t border-[#1C1C1C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal delay={50} className="lg:col-span-7 space-y-6">
            <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
              Custom Atelier & Engineering
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#F3F3F1] leading-[1.08]">
              Custom Dimensions. <br />
              <span className="italic text-[#C5A880]">Uncompromised Scale.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl">
              When standard architectural openings cannot realize your intent. We engineer made-to-order pivot portals up to 4.5 meters in height with custom cold-spray bronze, CNC fluting, biometric integration, and full CAD/BIM shop drawings.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <Button to="/contact?subject=Bespoke%20Architectural%20Commission" variant="primary" size="lg">
                Request Bespoke Quote
              </Button>
              <Button to="/bespoke" variant="outline" size="lg">
                Explore Bespoke Process
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-6 bg-[#111111] border border-[#222]">
              <p className="text-2xl font-serif text-[#C5A880]">4500mm</p>
              <p className="text-gray-300 font-medium mt-1">Maximum Height</p>
              <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Laser-straight carbon-steel subframe eliminates warping.</p>
            </div>
            <div className="p-6 bg-[#111111] border border-[#222]">
              <p className="text-2xl font-serif text-[#C5A880]">500kg</p>
              <p className="text-gray-300 font-medium mt-1">Concealed Pivot</p>
              <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Subsurface floor hydraulics with fingertip actuation.</p>
            </div>
            <div className="p-6 bg-[#111111] border border-[#222]">
              <p className="text-2xl font-serif text-[#C5A880]">RC4</p>
              <p className="text-gray-300 font-medium mt-1">Armored Security</p>
              <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Multi-point motorized locking and ballistic core.</p>
            </div>
            <div className="p-6 bg-[#111111] border border-[#222]">
              <p className="text-2xl font-serif text-[#C5A880]">100%</p>
              <p className="text-gray-300 font-medium mt-1">CAD Provided</p>
              <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Complete shop drawings and axle offset calculations.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. BRAND CRAFTSMANSHIP & STRUCTURAL ENGINEERING (Supporting Everything) */}
      <section className="py-24 sm:py-32 bg-[#080808] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <Reveal delay={80}>
              <div className="relative aspect-[4/5] sm:aspect-[1/1] overflow-hidden border border-[#2A2A2A] shadow-2xl img-zoom-container bg-[#111]">
                <img
                  src="https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=1400&q=85"
                  alt="Architectural Door Hardware Detail"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/85 backdrop-blur-md border border-[#333]">
                  <p className="text-xs text-[#C5A880] font-mono uppercase tracking-wider">Invisio Subframe Precision</p>
                  <p className="text-sm font-serif text-white mt-1">3D Micro-Adjustable Concealed Hinges & Magnetic Silent Latch</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={120}>
              <p className="text-xs uppercase font-mono tracking-widest-arch text-[#C5A880]">
                Engineering & Craftsmanship
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F3F3F1] leading-[1.1] mt-2">
                Engineered to defy gravity. <br />
                <span className="italic text-[#C5A880]">Actuated in silence.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mt-4">
                Every TheDoorman door conceals high-precision structural mechanics: anti-warping carbon-steel tie rods, German-engineered hydraulic dampers, and multi-point magnetic latches.
              </p>
            </Reveal>

            <Reveal delay={160} className="space-y-4 pt-2">
              <div className="flex items-start space-x-4 p-4 bg-[#121212] border border-[#222] hover:border-[#C5A880]/30 transition-colors">
                <i className="ri-compass-3-line text-[#C5A880] text-xl mt-0.5"></i>
                <div>
                  <h4 className="text-sm font-semibold text-white">Concealed Hydraulic 360° Pivots</h4>
                  <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                    Zero visible frame hardware. Bearings rest subsurface in floor and ceiling with adjustable soft braking.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-[#121212] border border-[#222] hover:border-[#C5A880]/30 transition-colors">
                <i className="ri-shield-keyhole-line text-[#C5A880] text-xl mt-0.5"></i>
                <div>
                  <h4 className="text-sm font-semibold text-white">Integrated Biometric & Multi-Point Locks</h4>
                  <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                    Motorized magnetic bolts activate automatically upon door seating, certified up to European Security Class 4.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="pt-2 flex gap-4">
              <Button to="/products" variant="primary">
                Explore The Catalogue
              </Button>
              <Button to="/about" variant="ghost">
                Read Atelier Story
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

