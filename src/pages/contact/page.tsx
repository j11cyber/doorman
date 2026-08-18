import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { Reveal } from '../../components/ui/Reveal';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand & Studio Directory (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <Reveal delay={50} className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
                Concierge & Quotation
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-tight">
                Request an <br />
                <span className="italic text-[#C5A880]">Architectural Quote</span>
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

          {/* Right Column: Comprehensive Architectural Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="bg-[#111111] border border-[#222] p-6 sm:p-10 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
                      <i className="ri-check-line text-2xl"></i>
                    </div>
                    <h3 className="text-2xl font-serif text-white">Inquiry Successfully Received</h3>
                    <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                      Thank you, {formData.fullName}. Your project details have been routed to a TheDoorman Senior Architectural Consultant. We will follow up within 24 hours.
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
                    <h3 className="text-xl font-serif text-white pb-3 border-b border-[#222]">
                      Project & Specification Details
                    </h3>

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
                          placeholder="e.g. David Sterling, Architect"
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
                          placeholder="e.g. sterling@archstudio.com"
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+234..."
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                        >
                          <option value="Private Luxury Villa">Private Luxury Villa</option>
                          <option value="Penthouse Renovation">Penthouse Renovation</option>
                          <option value="Commercial Landmark">Commercial Landmark</option>
                          <option value="Multi-Unit Residential Development">Multi-Unit Residential Development</option>
                          <option value="Hospitality Resort">Hospitality Resort</option>
                        </select>
                      </div>
                    </div>

                    {/* Door Category Interest Checkboxes */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                        Door Systems Required (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {doorCategoryOptions.map((cat) => {
                          const isChecked = formData.doorCategories.includes(cat);
                          return (
                            <button
                              type="button"
                              key={cat}
                              onClick={() => handleCategoryToggle(cat)}
                              className={`text-left px-3.5 py-2.5 text-xs font-mono border transition-all flex items-center justify-between ${
                                isChecked
                                  ? 'border-[#C5A880] bg-[#C5A880]/15 text-white'
                                  : 'border-[#262626] bg-[#161616] text-gray-400 hover:border-gray-500'
                              }`}
                            >
                              <span>{cat}</span>
                              {isChecked && <i className="ri-check-line text-[#C5A880]"></i>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dimensions & Material Preference */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Approximate Dimensions (W × H mm)
                        </label>
                        <input
                          type="text"
                          value={formData.dimensions}
                          onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                          placeholder="e.g. 2000mm x 4200mm"
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                          Material / Finish Preference
                        </label>
                        <input
                          type="text"
                          value={formData.materialPreference}
                          onChange={(e) => setFormData({ ...formData, materialPreference: e.target.value })}
                          placeholder="e.g. Smoked Oak, Liquid Bronze"
                          className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Location & Notes */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                        Project Location / City
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Ikoyi, Lagos / London, UK"
                        className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                        Architectural Specifications & Notes
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide additional details regarding structural opening conditions, lock preferences, or timeline..."
                        className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-4 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C5A880] text-[#0A0A0A] hover:bg-[#D8C2A2] py-4 text-xs uppercase tracking-widest-arch font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <span>Routing to Architectural Team...</span>
                      ) : (
                        <span>Submit Architectural Specification Request</span>
                      )}
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
