import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { Reveal } from '../../components/ui/Reveal';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';

  const [inquiryStream, setInquiryStream] = useState<'general' | 'trade' | 'bespoke' | 'installation'>('trade');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Private Luxury Villa',
    doorCategories: [] as string[],
    dimensions: '',
    materialPreference: '',
    location: '',
    message: initialSubject ? `Inquiring regarding: ${initialSubject}\n\n` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doorCategoryOptions = [
    'Pivot Doors',
    'Concealed & Flush Doors',
    'Sliding Glass Partitions',
    'Armored Security Doors',
    'Bespoke Wood Doors',
    'Architectural Hardware',
  ];

  const handleCategoryToggle = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      doorCategories: prev.doorCategories.includes(cat)
        ? prev.doorCategories.filter((c) => c !== cat)
        : [...prev.doorCategories, cat],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <div className="pt-36 sm:pt-48 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Top 4 Inquiries Stream Tabs */}
        <div className="mb-12 border-b border-[#1C1C1C] pb-6">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880] mb-4">
            Commercial Channels & Consultation Desks
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <button
              onClick={() => setInquiryStream('general')}
              className={`p-3 text-left border transition-all ${
                inquiryStream === 'general'
                  ? 'border-[#C5A880] bg-[#161616] text-[#C5A880]'
                  : 'border-[#222] bg-[#0E0E0E] text-gray-400 hover:text-white'
              }`}
            >
              <span className="block font-serif text-sm text-white">GENERAL ENQUIRIES</span>
              <span className="text-[10px] text-gray-500">Showroom visits & info</span>
            </button>

            <button
              onClick={() => setInquiryStream('trade')}
              className={`p-3 text-left border transition-all ${
                inquiryStream === 'trade'
                  ? 'border-[#C5A880] bg-[#161616] text-[#C5A880]'
                  : 'border-[#222] bg-[#0E0E0E] text-gray-400 hover:text-white'
              }`}
            >
              <span className="block font-serif text-sm text-white">TRADE & ARCHITECTURE</span>
              <span className="text-[10px] text-gray-500">Practices & CAD schedules</span>
            </button>

            <button
              onClick={() => setInquiryStream('bespoke')}
              className={`p-3 text-left border transition-all ${
                inquiryStream === 'bespoke'
                  ? 'border-[#C5A880] bg-[#161616] text-[#C5A880]'
                  : 'border-[#222] bg-[#0E0E0E] text-gray-400 hover:text-white'
              }`}
            >
              <span className="block font-serif text-sm text-white">BESPOKE PROJECTS</span>
              <span className="text-[10px] text-gray-500">Monumental scale portals</span>
            </button>

            <button
              onClick={() => setInquiryStream('installation')}
              className={`p-3 text-left border transition-all ${
                inquiryStream === 'installation'
                  ? 'border-[#C5A880] bg-[#161616] text-[#C5A880]'
                  : 'border-[#222] bg-[#0E0E0E] text-gray-400 hover:text-white'
              }`}
            >
              <span className="block font-serif text-sm text-white">INSTALLATION</span>
              <span className="text-[10px] text-gray-500">On-site precision rigging</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand & Studio Directory (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <Reveal delay={50} className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                Commercial Concierge
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-tight">
                Start an <br />
                <span className="italic text-[#C5A880]">Architectural Project</span>
              </h1>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Connect with our dedicated specification team to review blueprints, dimension schedules, and material samples for your project.
              </p>
            </Reveal>

            <Reveal delay={120} className="pt-4 space-y-6 border-t border-[#1C1C1C] text-xs font-mono">
              <div>
                <p className="text-[#C5A880] uppercase tracking-wider mb-1">Direct Inquiries</p>
                <p className="text-gray-200 text-sm font-sans">concierge@thedoorman.com</p>
                <p className="text-gray-400 mt-0.5">+234 123 456 7890 / +44 20 7946 0912</p>
              </div>

              <div>
                <p className="text-[#C5A880] uppercase tracking-wider mb-1">Lagos Studio Showroom</p>
                <p className="text-gray-200">Victoria Island, Lagos, Nigeria</p>
                <p className="text-gray-400 mt-0.5">Monday – Friday: 09:00 – 18:00 (By Appointment)</p>
              </div>

              <div>
                <p className="text-[#C5A880] uppercase tracking-wider mb-1">London Consultation Suite</p>
                <p className="text-gray-200">Mayfair, London, United Kingdom</p>
                <p className="text-gray-400 mt-0.5">Private Architect Consultations</p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="bg-[#111111] border border-[#222] p-6 sm:p-10 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
                      <i className="ri-check-line text-2xl"></i>
                    </div>
                    <h3 className="text-2xl font-serif text-white">Project Inquiry Received</h3>
                    <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                      Thank you, {formData.fullName}. Your specification details for {inquiryStream.toUpperCase()} have been routed to our senior engineering desk. We will respond within 24 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-mono uppercase tracking-wider text-[#C5A880] underline pt-4"
                    >
                      Submit Another Specification
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="pb-3 border-b border-[#222] flex justify-between items-center">
                      <h3 className="text-xl font-serif text-white">
                        Specification & Project Intake
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#1C1C1C] text-[#C5A880] border border-[#333]">
                        {inquiryStream.toUpperCase()} STREAM
                      </span>
                    </div>

                    {/* Name & Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. David Sterling"
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="architect@practice.com"
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+234 800 000 0000"
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Site Location (City / Country)
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Lagos, Nigeria"
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Door Categories of Interest */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                        Door Typologies to Specify:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {doorCategoryOptions.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleCategoryToggle(cat)}
                            className={`p-2 text-left text-[11px] font-mono border transition-colors ${
                              formData.doorCategories.includes(cat)
                                ? 'bg-[#1C1C1C] border-[#C5A880] text-[#C5A880]'
                                : 'bg-[#141414] border-[#252525] text-gray-400 hover:text-white'
                            }`}
                          >
                            <span className="block truncate">{cat}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-1.5 pt-2">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                        Project Scope, Rough Openings & Blueprint Notes
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please detail your approximate wall openings, floor finishes, delivery timeline, or blueprint notes..."
                        className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#C5A880] text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
                    >
                      {isSubmitting ? 'Transmitting Schedule...' : 'START A PROJECT'}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
