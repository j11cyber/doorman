import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';

export default function Bespoke() {
  const [selectedSystem, setSelectedSystem] = useState('Pivot Door System');
  const [selectedMaterial, setSelectedMaterial] = useState('Smoked European Oak');
  const [selectedFinish, setSelectedFinish] = useState('Patinated Liquid Bronze');
  const [height, setHeight] = useState('3500');
  const [width, setWidth] = useState('1800');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectLocation: '',
    projectType: 'Private Luxury Villa',
    notes: '',
  });

  const steps = [
    {
      num: '01',
      title: 'CHOOSE SYSTEM',
      description: 'Select your opening kinematics: Grand Entrance Pivot, Zero-Sightline Flush, Acoustic Sliding Glass, or Armored Biometric.',
    },
    {
      num: '02',
      title: 'DEFINE DIMENSIONS',
      description: 'Specify rough opening heights up to 4500mm and widths up to 2400mm with millimeter structural tolerances.',
    },
    {
      num: '03',
      title: 'SELECT MATERIAL',
      description: 'Choose from sustainably sourced European timber staves, aerospace carbon subframes, or natural volcanic stone.',
    },
    {
      num: '04',
      title: 'SELECT FINISH',
      description: 'Hand-applied cold liquid bronze, fumed charcoal bog oak, or brushed champagne anodized architectural metals.',
    },
    {
      num: '05',
      title: 'PROJECT REQUIREMENTS',
      description: 'Submit blueprints, location details, and schedule an engineering consultation with our atelier desk.',
    },
  ];

  const systemsList = [
    'Grand Pivot Door System (up to 4.5m)',
    'Concealed & Invisible Flush System',
    'Acoustic Sliding Glass Partition System',
    'Ballistic Armored Biometric Entrance',
    'Ribbed Solid Timber Architectural Double Door',
  ];

  const materialsList = [
    'Smoked European Oak & Carbon Subframe',
    'Real Liquid Bronze over Composite Core',
    '10mm Fluted Safety Glass & Bronze Trim',
    'Selected Italian Canaletto Walnut',
    'Composite Manganese Armor & Basalt Stone',
  ];

  const finishesList = [
    'Patinated Liquid Bronze (Oxidized / Champagne)',
    'Smoked Bog Oak (Deep Charcoal Grain)',
    'Natural Canaletto Walnut (Matte Lacquer)',
    'Fluted / Reeded Acoustic Glass',
    'Scorched Basalt Stone & Thermo-Teak',
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

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
              <span>Architectural Commissioning</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.03] text-[#F3F3F1]">
              BESPOKE ARCHITECTURAL <br />
              <span className="italic text-[#C5A880]">DOORS</span>
            </h1>
            <p className="text-lg sm:text-xl font-serif text-gray-300 italic">
              "When standard isn't enough."
            </p>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-2xl">
              When standard catalogue dimensions and standard joinery cannot fulfill the architect’s vision. We engineer oversized, monolithic, and technologically advanced door systems tailored precisely to your spatial envelope.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 flex flex-col space-y-4">
            <a
              href="#bespoke-configurator"
              className="py-3.5 px-6 bg-[#C5A880] text-black font-mono text-xs uppercase tracking-wider font-bold text-center hover:bg-white transition-colors"
            >
              Start Commissioning Flow
            </a>
            <Button to="/products" variant="outline" size="md">
              Browse Catalogue First
            </Button>
            <p className="text-[11px] font-mono text-gray-400">
              * Dedicated project engineer assigned to every bespoke commission.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. 5-Step Process Concept */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <SectionHeading
          eyebrow="Commissioning Protocol"
          title="The Five-Stage Atelier Process"
          subtitle="From preliminary architectural intent to precision on-site calibration."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 60}>
              <div className="p-6 bg-[#111111] border border-[#222] hover:border-[#C5A880]/50 transition-all duration-300 h-full flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xl font-mono font-semibold text-[#C5A880] block">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-serif text-white uppercase tracking-wider mt-3">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Interactive Bespoke Quote Builder */}
      <section id="bespoke-configurator" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Choices (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <Reveal delay={50}>
              <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                Interactive Specification
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">
                Define Your Custom Parameters
              </h2>
              <p className="text-xs text-gray-400 font-light mt-2">
                Configure your desired architectural system, dimensions, and materials. Our engineering desk will prepare a technical shop drawing and cost schedule.
              </p>
            </Reveal>

            {/* 01 System */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5A880] block">
                01 — Architectural System:
              </label>
              <div className="space-y-1.5">
                {systemsList.map((sys) => (
                  <button
                    key={sys}
                    type="button"
                    onClick={() => setSelectedSystem(sys)}
                    className={`w-full p-3 text-left border text-xs font-serif transition-colors ${
                      selectedSystem === sys
                        ? 'border-[#C5A880] bg-[#1A1A1A] text-white ring-1 ring-[#C5A880]'
                        : 'border-[#222] bg-[#121212] text-gray-400 hover:text-white'
                    }`}
                  >
                    {sys}
                  </button>
                ))}
              </div>
            </div>

            {/* 02 Dimensions */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5A880] block">
                02 — Rough Opening Scale:
              </label>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">Height (mm):</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-3 bg-[#121212] border border-[#222] text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Width (mm):</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full p-3 bg-[#121212] border border-[#222] text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>

            {/* 03 Material */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5A880] block">
                03 — Structural Core & Cladding:
              </label>
              <div className="space-y-1.5">
                {materialsList.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full p-3 text-left border text-xs font-serif transition-colors ${
                      selectedMaterial === mat
                        ? 'border-[#C5A880] bg-[#1A1A1A] text-white ring-1 ring-[#C5A880]'
                        : 'border-[#222] bg-[#121212] text-gray-400 hover:text-white'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* 04 Finish */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5A880] block">
                04 — Surface Finish & Patina:
              </label>
              <div className="space-y-1.5">
                {finishesList.map((fin) => (
                  <button
                    key={fin}
                    type="button"
                    onClick={() => setSelectedFinish(fin)}
                    className={`w-full p-3 text-left border text-xs font-serif transition-colors ${
                      selectedFinish === fin
                        ? 'border-[#C5A880] bg-[#1A1A1A] text-white ring-1 ring-[#C5A880]'
                        : 'border-[#222] bg-[#121212] text-gray-400 hover:text-white'
                    }`}
                  >
                    {fin}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Submission Form (6 Cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="bg-[#111111] border border-[#262626] p-6 sm:p-10 space-y-6 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] flex items-center justify-center mx-auto text-2xl">
                    <i className="ri-check-line"></i>
                  </div>
                  <h3 className="text-2xl font-serif text-white">Bespoke Inquiry Received</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.fullName}. Our senior project engineer has logged your bespoke parameters ({selectedSystem}, {height}mm x {width}mm) and will contact you within 24 business hours with preliminary engineering review.
                  </p>
                  <div className="pt-4">
                    <Button to="/products" variant="secondary" size="sm">
                      Explore Full Storefront
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="pb-3 border-b border-[#222]">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                      05 — PROJECT REQUIREMENTS
                    </p>
                    <h3 className="text-xl font-serif text-white mt-1">
                      Request Bespoke Commission Quote
                    </h3>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 bg-[#0A0A0A] border border-[#222] text-xs font-mono space-y-1 text-gray-400">
                    <p><span className="text-[#C5A880]">System:</span> {selectedSystem}</p>
                    <p><span className="text-[#C5A880]">Dimensions:</span> {height}mm (H) × {width}mm (W)</p>
                    <p><span className="text-[#C5A880]">Material:</span> {selectedMaterial}</p>
                    <p><span className="text-[#C5A880]">Finish:</span> {selectedFinish}</p>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="text-gray-400 block mb-1">Full Name / Practice Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. David Sterling / Sterling Architects"
                        className="w-full p-3 bg-[#161616] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="architect@practice.com"
                          className="w-full p-3 bg-[#161616] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 block mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+234 / +44 ..."
                          className="w-full p-3 bg-[#161616] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 block mb-1">Project Site Location (City / State / Country)</label>
                      <input
                        type="text"
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        placeholder="e.g. Victoria Island, Lagos / Kensington, London"
                        className="w-full p-3 bg-[#161616] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="text-gray-400 block mb-1">Project Notes & Wall Construction</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Floor slab depth, wind conditions, smart entry requirements, or rough opening details..."
                        className="w-full p-3 bg-[#161616] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#C5A880] text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
                  >
                    {submitting ? 'Submitting Specification...' : 'REQUEST A BESPOKE QUOTE'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
