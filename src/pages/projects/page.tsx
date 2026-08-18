import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { mockProjects, mockProducts } from '../../mocks/products';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { useCurrency } from '../../contexts/CurrencyContext';

export default function Projects() {
  const { formatPrice } = useCurrency();

  // Map projects to exact door product systems from catalog
  const projectDoorMap: Record<string, typeof mockProducts[0]> = {
    'proj-01': mockProducts[1], // Venezia Liquid Bronze Pivot
    'proj-02': mockProducts[2], // Invisio Flush Door
    'proj-03': mockProducts[3], // Aura Fluted Glass Sliding Partition
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      {/* Projects Intro Header */}
      <section className="pt-36 sm:pt-48 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-[#1C1C1C]">
        <Reveal delay={50} className="max-w-3xl space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest-arch">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Architectural Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-[#F3F3F1] leading-tight">
            Doors in <br />
            <span className="italic text-[#C5A880]">Architectural Space</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            A curated lookbook of TheDoorman grand entrance pivots, concealed wall systems, and bespoke partition packages installed in prominent luxury residences and private developments.
          </p>
          <div className="pt-2 flex gap-4">
            <Button to="/products" variant="primary" size="sm">
              Shop All Installed Doors
            </Button>
            <Button to="/bespoke" variant="outline" size="sm">
              Commission Bespoke Project
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Project Case Studies with "Doors Featured in this Project" */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-28 sm:space-y-40">
        {mockProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          const featuredDoor = projectDoorMap[project.id] || mockProducts[0];

          return (
            <div key={project.id} className="space-y-10 sm:space-y-14">
              {/* Project Meta Header */}
              <Reveal delay={50}>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#222]">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-xs font-mono text-[#C5A880]">
                      <span>0{index + 1}</span>
                      <span>•</span>
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
                      {project.title}
                    </h2>
                  </div>

                  <div className="text-xs font-mono text-gray-400 text-left lg:text-right space-y-1">
                    {project.architect && <p><span className="text-gray-300">Architecture:</span> {project.architect}</p>}
                    <p><span className="text-gray-300">Door System:</span> {project.doorType}</p>
                  </div>
                </div>
              </Reveal>

              {/* Large Primary Project Photography */}
              <Reveal delay={100}>
                <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2/1] w-full overflow-hidden border border-[#222] bg-[#121212] img-zoom-container">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end">
                    <div className="bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                      {project.location} Installation
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Staggered Narrative, Gallery & Featured Door Commerce Card */}
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Narrative & Commerce Card (5 Cols) */}
                <Reveal delay={120} className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-serif text-white">
                      Design & Spatial Narrative
                    </h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* "DOORS FEATURED IN THIS PROJECT" Direct Commerce Block */}
                  <div className="p-6 bg-[#111111] border border-[#262626] space-y-4 shadow-xl">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#C5A880] uppercase tracking-widest">
                        Door Featured In This Project
                      </span>
                      <span className="text-white font-serif font-semibold">{formatPrice(featuredDoor.price)}</span>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Link
                        to={`/product/${featuredDoor.id}`}
                        className="w-20 aspect-[3/4] bg-[#080808] border border-[#2A2A2A] overflow-hidden flex-shrink-0 block"
                      >
                        <img
                          src={featuredDoor.images[0]}
                          alt={featuredDoor.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      <div className="flex-1 min-w-0 space-y-1">
                        <Link to={`/product/${featuredDoor.id}`}>
                          <h4 className="text-sm font-serif text-white hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                            {featuredDoor.name}
                          </h4>
                        </Link>
                        <p className="text-[10px] font-mono text-gray-400">
                          {featuredDoor.category}
                        </p>
                        <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed mt-1">
                          {featuredDoor.materialType}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#1C1C1C] flex gap-3">
                      <Button
                        to={`/product/${featuredDoor.id}`}
                        variant="primary"
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        Shop This Door
                      </Button>
                      <Button
                        to={`/contact?subject=Inquiry%20regarding%20${encodeURIComponent(project.title)}`}
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        Inquire System
                      </Button>
                    </div>
                  </div>
                </Reveal>

                {/* Gallery Images (7 Cols) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((img, i) => (
                    <Reveal key={i} delay={150 + i * 80}>
                      <div
                        className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden border border-[#222] bg-[#121212] img-zoom-container"
                      >
                        <img
                          src={img}
                          alt={`${project.title} gallery detail ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Collaboration & Specification CTA */}
      <section className="py-24 sm:py-32 bg-[#0C0C0C] border-t border-[#1C1C1C] text-center">
        <Reveal delay={50} className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
            Feature Your Project
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Architectural Practice Collaboration
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            We partner with premier architects and project managers across West Africa, the United Kingdom, and the Middle East from preliminary design intent to final on-site installation.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg">
              Initiate Project Partnership
            </Button>
            <Button to="/products" variant="outline" size="lg">
              Explore Door Catalogue
            </Button>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

