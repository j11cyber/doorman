import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';

export default function About() {
  const pillars = [
    {
      title: 'Material Authenticity',
      text: 'We never compromise on material depth. Our timbers are sustainably harvested European oaks and American Canaletto walnuts, and our patinas are created with real cold-applied metals rather than synthetic decorative foils.',
    },
    {
      title: 'Structural Aerospace Engineering',
      text: 'Behind the calm minimalist face of our doors lies an internal chassis of carbon-steel, multi-axis adjustable tie rods, and high-density acoustic insulation engineered to resist climate movement.',
    },
    {
      title: 'Millimeter Calibration',
      text: 'Every pivot door and flush system is individually balanced in our atelier. Axle offsets are calculated to the exact weight distribution, ensuring a 400kg door glides open with gentle fingertip pressure.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* 1. Hero Statement */}
      <section className="pt-36 sm:pt-48 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <Reveal delay={50} className="max-w-4xl space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
            The Heritage & Ethos
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.05] text-[#F3F3F1]">
            Crafting the Permanence of <br />
            <span className="italic text-[#C5A880]">Architectural Openings</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-3xl">
            TheDoorman was conceived to bridge the gap between visionary architectural design and industrial door engineering. We believe the entrance is the most consequential element of any architectural structure.
          </p>
        </Reveal>
      </section>

      {/* 2. Editorial Narrative Section (Image + Text Story) */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <Reveal delay={80}>
              <div className="relative aspect-[4/5] overflow-hidden border border-[#222] img-zoom-container">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                  alt="TheDoorman Atelier Craftsmanship"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={120}>
              <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                The Atelier Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-white mt-2">
                Where artisan joinery meets <br />
                <span className="italic text-[#C5A880]">precision mechanics.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mt-4">
                In contemporary architecture, spaces are defined by expansive glass, raw concrete, monolithic stone, and refined timbers. Standard interior and exterior doors often interrupt this visual rhythm with clumsy frames, visible hinges, and inadequate scale.
              </p>
              <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed mt-3">
                At TheDoorman, our mission is to eliminate visual clutter. We design doors that either integrate completely flush with the surrounding walls—disappearing into architectural silence—or stand as heroic monumental portals that celebrate entry.
              </p>
              <div className="pt-4">
                <Button to="/products" variant="primary">
                  Explore The Collections
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Three Core Pillars */}
      <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Core Principles"
            title="The Pillars of TheDoorman"
            subtitle="Three non-negotiable standards that govern every door engineered in our atelier."
            align="center"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <Reveal key={pillar.title} delay={idx * 80}>
                <div
                  className="p-8 bg-[#121212] border border-[#222] space-y-4 hover:border-[#C5A880]/50 transition-all duration-300 h-full"
                >
                  <span className="text-xs font-mono uppercase text-[#C5A880] tracking-widest">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-serif text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Showrooms & Representation */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#1C1C1C]">
        <SectionHeading
          eyebrow="Presence & Consultations"
          title="Global Showroom Studios"
          subtitle="Experience TheDoorman door systems in person or arrange a private architect consultation."
          align="split"
          splitContent={
            <Button to="/contact" variant="primary">
              Book Studio Appointment
            </Button>
          }
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal delay={80}>
            <div className="p-6 bg-[#111] border border-[#222] space-y-3 hover:border-[#C5A880]/40 transition-colors duration-300">
              <p className="text-xs font-mono uppercase text-[#C5A880]">Lagos Atelier & Showroom</p>
              <h4 className="text-lg font-serif text-white">Victoria Island Studio</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Full-scale operating displays of 4m Grand Pivot doors, Invisio flush walls, and motorized sliding glass partitions.
              </p>
              <p className="text-xs font-mono text-[#C5A880] pt-2">+234 123 456 7890</p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="p-6 bg-[#111] border border-[#222] space-y-3 hover:border-[#C5A880]/40 transition-colors duration-300">
              <p className="text-xs font-mono uppercase text-[#C5A880]">London Consultation Office</p>
              <h4 className="text-lg font-serif text-white">Mayfair Architectural Suite</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Material sample archives, CAD specification support, and direct project collaboration for UK and European residential projects.
              </p>
              <p className="text-xs font-mono text-[#C5A880] pt-2">london@thedoorman.com</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="p-6 bg-[#111] border border-[#222] space-y-3 hover:border-[#C5A880]/40 transition-colors duration-300">
              <p className="text-xs font-mono uppercase text-[#C5A880]">Dubai Project Desk</p>
              <h4 className="text-lg font-serif text-white">DIFC Regional Desk</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                High-thermal resistance engineering and Middle East logistics for luxury villas and hospitality developments.
              </p>
              <p className="text-xs font-mono text-[#C5A880] pt-2">dubai@thedoorman.com</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
