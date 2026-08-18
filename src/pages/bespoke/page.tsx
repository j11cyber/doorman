import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';

export default function Bespoke() {
  const steps = [
    {
      num: '01',
      title: 'Architectural Dialogue & Site Review',
      description: 'We collaborate directly with architects, interior designers, and project leads to assess rough opening tolerances, floor structural slab depth, wind loads, and desired spatial ergonomics.',
    },
    {
      num: '02',
      title: 'Precision CAD/BIM & Engineering',
      description: 'Our engineering atelier produces comprehensive shop drawings, weight distribution calculations, pivot axle offset geometry, and electrical/biometric conduits.',
    },
    {
      num: '03',
      title: 'Atelier Joinery & Hand Patination',
      description: 'Master artisans assemble the aerospace structural carbon subframe, veneer sequential rare timber flitches, or hand-apply real liquid bronze and oxidized chemical patinas.',
    },
    {
      num: '04',
      title: 'White-Glove Installation & Micro-Calibration',
      description: 'Specialized installation teams calibrate concealed hydraulic pivots to millimeter precision, guaranteeing whisper-quiet zero-effort swing and flawless architectural perimeter alignment.',
    },
  ];

  const customizationDimensions = [
    { label: 'Maximum Leaf Height', value: '4500 mm', note: 'Single piece monolithic slab' },
    { label: 'Maximum Leaf Width', value: '2400 mm', note: 'Wide format entrance pivot' },
    { label: 'Maximum Bearing Weight', value: '500 kg', note: 'Floor-concealed hydraulic hinge' },
    { label: 'Security & Acoustic Rating', value: 'RC4 / 44dB', note: 'Ballistic certified core' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-36 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 border-b border-[#1C1C1C] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <Reveal delay={50} className="lg:col-span-8 space-y-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest-arch">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Bespoke Architectural Atelier</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.05] text-[#F3F3F1]">
              Bespoke Architectural <br />
              <span className="italic text-[#C5A880]">Commissions</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
              When standard catalogue dimensions and off-the-shelf joinery cannot fulfill the architect’s vision. We engineer oversized, monolithic, and technologically advanced door systems tailored precisely to your project.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 flex flex-col space-y-4">
            <Button to="/contact?subject=Bespoke%20Architectural%20Consultation" variant="primary" size="lg">
              Book Architect Consultation
            </Button>
            <Button to="/products" variant="outline" size="md">
              Browse Catalogue First
            </Button>
            <p className="text-[11px] font-mono text-gray-400">
              * Dedicated project engineer assigned to every architectural inquiry.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Custom Dimensions Matrix Bar */}
      <section className="py-12 bg-[#0E0E0E] border-b border-[#1C1C1C] px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          {customizationDimensions.map((dim, i) => (
            <div key={i} className="space-y-1">
              <p className="text-gray-400 uppercase text-[10px]">{dim.label}</p>
              <p className="text-xl sm:text-2xl font-serif text-[#C5A880] font-semibold">{dim.value}</p>
              <p className="text-gray-500 text-[10px]">{dim.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Alternating Section 1: Image Left -> Text Right */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <Reveal delay={80}>
              <div className="relative aspect-[4/5] overflow-hidden border border-[#222] img-zoom-container bg-[#111]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                  alt="4.5m Grand Pivot Door Engineering"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/85 backdrop-blur-md border border-[#333]">
                  <p className="text-[10px] font-mono uppercase text-[#C5A880] tracking-wider">Scale Benchmark</p>
                  <p className="text-xs font-serif text-white mt-0.5">4.2-Meter Height • Subsurface Hydraulic Pivot Axle</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={140}>
              <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                Monumental Scale
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-white mt-2">
                Heights up to 4.5 meters. <br />
                <span className="italic text-[#C5A880]">Without deflection or warping.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mt-4">
                Standard wooden and hollow doors cannot exceed 2.7 meters without suffering seasonal warping and structural sag. Our oversized pivot doors utilize an internal carbon-fiber and aerospace steel truss matrix that maintains laser-straight alignment regardless of temperature swings.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-mono">
                <div className="p-4 bg-[#121212] border border-[#222]">
                  <p className="text-[#C5A880] text-base font-semibold">4500 mm</p>
                  <p className="text-gray-400 mt-1">Maximum Vertical Clearance</p>
                </div>
                <div className="p-4 bg-[#121212] border border-[#222]">
                  <p className="text-[#C5A880] text-base font-semibold">2400 mm</p>
                  <p className="text-gray-400 mt-1">Single Leaf Width</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Alternating Section 2: Text Left -> Image Right */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <Reveal delay={80}>
              <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                Material Laboratory
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-white mt-2">
                Liquid bronze, burnt timber, <br />
                <span className="italic text-[#C5A880]">and acoustic fluted glass.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mt-4">
                Bring any material vision to reality. Our finishing atelier works with genuine cold-spray liquid metals (Bronze, Copper, Brass, Pewter), book-matched bog oaks, hand-chiseled stone veneers, and custom fluted glass molds.
              </p>
              <p className="text-sm text-gray-400 font-light leading-relaxed mt-3">
                We also formulate custom dye recipes and wood smoke levels to match your exact interior millwork, flooring, and stone selections.
              </p>
              <div className="pt-4">
                <Button to="/contact?subject=Material%20Sample%20Request" variant="outline">
                  Request Physical Finish Box
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <Reveal delay={140}>
              <div className="relative aspect-[4/5] overflow-hidden border border-[#222] img-zoom-container bg-[#111]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
                  alt="Liquid Bronze Patina Finishing"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/85 backdrop-blur-md border border-[#333]">
                  <p className="text-[10px] font-mono uppercase text-[#C5A880] tracking-wider">Atelier Detail</p>
                  <p className="text-xs font-serif text-white mt-0.5">Hand-Applied Oxidized Bronze Liquid Patina</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. The 4-Stage Architectural Process */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Commissioning Workflow"
            title="From Blueprint to Installation"
            subtitle="Our disciplined four-stage engineering methodology ensures zero tolerance errors on site."
            align="center"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 80}>
                <div
                  className="p-8 bg-[#121212] border border-[#222] relative space-y-4 hover:border-[#C5A880]/50 transition-all duration-300 h-full"
                >
                  <span className="font-mono text-3xl text-[#C5A880] font-light block">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-serif text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Direct Consultation Call to Action */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#1C1C1C] text-center">
        <Reveal delay={50} className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
            Start Your Custom Project
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Have an Architectural Drawing or Project in Mind?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            Send us your elevation sketches, CAD dimensions, or schedule an in-person meeting at our Lagos or London studio.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg">
              Submit Drawing / Project Inquiry
            </Button>
            <Button to="/projects" variant="outline" size="lg">
              View Built Projects
            </Button>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

