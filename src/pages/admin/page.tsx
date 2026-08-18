import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { Product, BankDetails } from '../../types';
import { mockProducts, categoryStructure } from '../../mocks/products';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: 'Access Bank',
    accountNumber: '1234567890',
    accountHolder: 'TheDoorman Architectural Systems Ltd',
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const storedProducts = localStorage.getItem('amco_products');
    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        const hasStaleImages = Array.isArray(parsed) && parsed.some((p: Product) => 
          p.images && p.images.some((img: string) => img.includes('513694203232-719a280e022f'))
        );
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].materialType && !hasStaleImages) {
          setProducts(parsed);
        } else {
          setProducts(mockProducts);
          localStorage.setItem('amco_products', JSON.stringify(mockProducts));
        }
      } catch {
        setProducts(mockProducts);
        localStorage.setItem('amco_products', JSON.stringify(mockProducts));
      }
    } else {
      setProducts(mockProducts);
      localStorage.setItem('amco_products', JSON.stringify(mockProducts));
    }

    const storedBank = localStorage.getItem('amco_bank_details');
    if (storedBank) {
      setBankDetails(JSON.parse(storedBank));
    }
  }, [user, navigate]);

  const handleSaveProduct = (product: Product) => {
    let updatedProducts: Product[];
    if (editingProduct) {
      updatedProducts = products.map((p) => (p.id === product.id ? product : p));
    } else {
      updatedProducts = [...products, { ...product, id: `door-${Date.now()}` }];
    }
    setProducts(updatedProducts);
    localStorage.setItem('amco_products', JSON.stringify(updatedProducts));
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this architectural door model?')) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('amco_products', JSON.stringify(updatedProducts));
    }
  };

  const handleSaveBankDetails = () => {
    localStorage.setItem('amco_bank_details', JSON.stringify(bankDetails));
    alert('Bank transfer details updated successfully.');
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      {/* Header */}
      <header className="bg-[#111111] border-b border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="font-serif text-2xl tracking-[0.04em] text-[#C5A880]">
                <span className="font-light text-gray-300">The</span><span className="font-medium text-white">Doorman</span>
              </Link>
              <span className="text-gray-400">/</span>
              <h1 className="text-xs font-mono uppercase tracking-widest text-gray-300">
                Atelier Admin Console
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-xs font-mono uppercase text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
              >
                <i className="ri-eye-line"></i>
                <span>View Showroom</span>
              </Link>
              <button
                onClick={logout}
                className="text-xs font-mono uppercase bg-red-950/60 border border-red-800/80 text-red-300 px-3 py-1.5 hover:bg-red-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-[#1C1C1C]">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-xs font-mono uppercase tracking-widest-arch transition-colors ${
              activeTab === 'products'
                ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="ri-door-line mr-1.5"></i>
            Door Catalogue ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-xs font-mono uppercase tracking-widest-arch transition-colors ${
              activeTab === 'settings'
                ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className="ri-bank-line mr-1.5"></i>
            Studio Bank Settings
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-serif text-white">Door Models & Specifications</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Manage live catalogue items, pricing, finishes, and technical dimensions.</p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductForm(true);
                }}
                className="bg-[#C5A880] text-[#0A0A0A] px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#D8C2A2] transition-colors"
              >
                + Add New Door Model
              </button>
            </div>

            {showProductForm ? (
              <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#111111] border border-[#1F1F1F] overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-[#080808] border-b border-[#1F1F1F]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono uppercase text-[#C5A880]">
                          {product.category}
                        </div>
                        {product.featured && (
                          <div className="absolute top-2 right-2 bg-[#C5A880] text-black px-2 py-0.5 text-[9px] font-mono font-bold uppercase">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-base text-white line-clamp-1">{product.name}</h3>
                          <span className="font-mono text-sm text-[#C5A880] font-semibold">₦{product.price.toLocaleString('en-NG')}</span>
                        </div>
                        <p className="text-[11px] font-mono text-gray-400">{product.subCategory}</p>
                        <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
                          {product.materialType || product.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-[#1C1C1C] mt-2 flex gap-3">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowProductForm(true);
                        }}
                        className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C5A880] text-gray-200 py-2 text-xs font-mono uppercase transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 bg-red-950/40 border border-red-900/60 hover:bg-red-900/60 text-red-300 py-2 text-xs font-mono uppercase transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bank Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-xl bg-[#111111] border border-[#222] p-8 space-y-6">
            <h2 className="text-xl font-serif text-white pb-3 border-b border-[#222]">
              Direct Studio Wire Transfer Details
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase">Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase">Account Number</label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase">Beneficiary Account Name</label>
                <input
                  type="text"
                  value={bankDetails.accountHolder}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
                />
              </div>

              <button
                onClick={handleSaveBankDetails}
                className="w-full bg-[#C5A880] text-[#0A0A0A] hover:bg-[#D8C2A2] py-3.5 text-xs font-mono uppercase tracking-wider font-semibold transition-colors mt-4"
              >
                Save Studio Wire Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: '',
      name: '',
      price: 5000,
      category: 'Pivot Doors',
      subCategory: 'Grand Entrance Pivot Systems',
      description: '',
      specifications: '',
      images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85'],
      featured: false,
      available: true,
      materialType: 'Smoked European Oak & Carbon-Steel Subframe',
      finishOptions: ['Smoked Bog Oak', 'Natural Canaletto Walnut', 'Brushed Bronze Patina'],
      openingMechanism: 'Floor-Concealed Heavy-Duty Hydraulic Pivot (360°)',
      maxDimensions: 'Up to 2200mm (W) x 4500mm (H)',
      hardwareType: 'Integrated Full-Height Bronzed Vertical Pull',
      securityGrade: 'Multi-Point Motorized Locking Grade RC3/RC4',
      leadTime: '6–8 Weeks',
    }
  );

  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);

  useEffect(() => {
    if (formData.category && categoryStructure[formData.category]) {
      setAvailableSubCategories(categoryStructure[formData.category]);
      if (!categoryStructure[formData.category].includes(formData.subCategory)) {
        setFormData((prev) => ({
          ...prev,
          subCategory: categoryStructure[formData.category][0] || '',
        }));
      }
    }
  }, [formData.category, formData.subCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="bg-[#111111] border border-[#222] p-6 sm:p-8">
      <h3 className="text-xl font-serif text-white mb-6">
        {product ? 'Edit Architectural Door Model' : 'Add New Door Model'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Door Model Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Base Price (NGN ₦) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Door Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              required
            >
              {Object.keys(categoryStructure).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Sub-Category *</label>
            <select
              value={formData.subCategory}
              onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              required
            >
              {availableSubCategories.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Material Core & Cladding</label>
            <input
              type="text"
              value={formData.materialType || ''}
              onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              placeholder="e.g. Smoked Oak & Carbon Steel"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Opening Mechanism</label>
            <input
              type="text"
              value={formData.openingMechanism || ''}
              onChange={(e) => setFormData({ ...formData, openingMechanism: e.target.value })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              placeholder="e.g. Floor-Concealed 360° Pivot"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Max Engineered Dimensions</label>
            <input
              type="text"
              value={formData.maxDimensions || ''}
              onChange={(e) => setFormData({ ...formData, maxDimensions: e.target.value })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              placeholder="e.g. Up to 2200mm W x 4500mm H"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-gray-400 uppercase">Hardware & Security Profile</label>
            <input
              type="text"
              value={formData.hardwareType || ''}
              onChange={(e) => setFormData({ ...formData, hardwareType: e.target.value })}
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
              placeholder="e.g. Solid Cast Bronze Pull with Biometrics"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-gray-400 uppercase">Architectural Description *</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-gray-400 uppercase">Technical Specifications Matrix</label>
          <textarea
            rows={2}
            value={formData.specifications || ''}
            onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
            className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
          />
        </div>

        {/* Images */}
        <div className="space-y-2">
          <label className="block text-gray-400 uppercase">Photography Image URLs *</label>
          {formData.images.map((img, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="url"
                value={img}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                className="flex-1 bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-3 text-white focus:outline-none"
                placeholder="https://..."
                required
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(idx)}
                  className="px-3 bg-red-950/50 border border-red-800 text-red-300"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-xs text-[#C5A880] underline pt-1"
          >
            + Add Another Image URL
          </button>
        </div>

        {/* Featured & Available Checkboxes */}
        <div className="flex space-x-6 pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="accent-[#C5A880]"
            />
            <span className="text-gray-300">Featured Masterpiece</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              className="accent-[#C5A880]"
            />
            <span className="text-gray-300">Active Specification</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t border-[#222]">
          <button
            type="submit"
            className="flex-1 bg-[#C5A880] text-[#0A0A0A] hover:bg-[#D8C2A2] py-3 font-semibold uppercase tracking-wider transition-colors"
          >
            {product ? 'Update Door Model' : 'Save New Door Model'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] text-gray-300 hover:text-white py-3 uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
