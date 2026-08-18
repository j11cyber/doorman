import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'bank'>('paystack');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Site address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (items.length === 0) {
      alert('Your specification bag is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const totalPrice = total;

      if (paymentMethod === 'bank') {
        // Handle bank transfer
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Insert customer
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .insert({
            email: formData.email,
            full_name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
          })
          .select()
          .maybeSingle();

        if (customerError) throw customerError;

        // Insert order
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            customer_id: customer?.id,
            order_number: orderNumber,
            items: items,
            subtotal: totalPrice,
            total: totalPrice,
            currency: currency.code,
            payment_method: 'bank_transfer',
            payment_status: 'pending',
            notes: formData.notes,
          });

        if (orderError) throw orderError;

        clearCart();
        navigate(`/order-success?reference=${orderNumber}&method=bank`);
      } else {
        // Handle Paystack payment via Supabase Edge Function
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/create-paystack-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              customerData: formData,
              orderData: {
                items: items,
                subtotal: totalPrice,
                total: totalPrice,
                currency: currency.code,
                paymentMethod: 'paystack',
                notes: formData.notes,
              },
            }),
          }
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to create payment');
        }

        clearCart();
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
          <div className="max-w-md text-center space-y-6">
            <h2 className="text-2xl font-serif text-white">Your Specification Bag is Empty</h2>
            <p className="text-sm text-gray-400">Add architectural doors or hardware before proceeding to checkout.</p>
            <Button to="/products" variant="primary">
              Browse Catalogue
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <div className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="pb-8 mb-10 border-b border-[#1C1C1C]">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880] mb-1">
            Order Finalization
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Architectural Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Checkout Form (8 Cols) */}
          <div className="lg:col-span-8 bg-[#111111] border border-[#222] p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Client / Site Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-white pb-3 border-b border-[#222]">
                  1. Client & Site Delivery Information
                </h3>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    Full Name / Company Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. David Sterling"
                    className={`w-full bg-[#161616] border ${
                      errors.fullName ? 'border-red-500' : 'border-[#2A2A2A]'
                    } focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors`}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. david@domain.com"
                      className={`w-full bg-[#161616] border ${
                        errors.email ? 'border-red-500' : 'border-[#2A2A2A]'
                      } focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234..."
                      className={`w-full bg-[#161616] border ${
                        errors.phone ? 'border-red-500' : 'border-[#2A2A2A]'
                      } focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    Site Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Plot / Street / Villa Name"
                    className={`w-full bg-[#161616] border ${
                      errors.address ? 'border-red-500' : 'border-[#2A2A2A]'
                    } focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors`}
                  />
                  {errors.address && <p className="text-red-400 text-xs">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Lagos, London, Dubai"
                      className={`w-full bg-[#161616] border ${
                        errors.city ? 'border-red-500' : 'border-[#2A2A2A]'
                      } focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors`}
                    />
                    {errors.city && <p className="text-red-400 text-xs">{errors.city}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Lagos State / Greater London"
                      className={`w-full bg-[#161616] border ${
                        errors.state ? 'border-red-500' : 'border-[#2A2A2A]'
                      } focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors`}
                    />
                    {errors.state && <p className="text-red-400 text-xs">{errors.state}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                    Architectural & Site Access Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Specific site unloading conditions, crane access, target installation date..."
                    className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] p-4 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4 pt-4 border-t border-[#222]">
                <h3 className="text-xl font-serif text-white">
                  2. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`p-4 border cursor-pointer transition-all block ${
                      paymentMethod === 'paystack'
                        ? 'border-[#C5A880] bg-[#C5A880]/10'
                        : 'border-[#2A2A2A] bg-[#161616] hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paystack"
                      checked={paymentMethod === 'paystack'}
                      onChange={() => setPaymentMethod('paystack')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base text-white">Online Payment (Paystack)</span>
                      <i className="ri-bank-card-line text-[#C5A880] text-lg"></i>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">Instant secure card & digital checkout</p>
                  </label>

                  <label
                    className={`p-4 border cursor-pointer transition-all block ${
                      paymentMethod === 'bank'
                        ? 'border-[#C5A880] bg-[#C5A880]/10'
                        : 'border-[#2A2A2A] bg-[#161616] hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base text-white">Direct Studio Wire / Transfer</span>
                      <i className="ri-bank-line text-[#C5A880] text-lg"></i>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">Invoice wire transfer with order reference</p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#C5A880] text-[#0A0A0A] hover:bg-[#D8C2A2] py-4 text-xs uppercase tracking-widest-arch font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    <span>Processing Architectural Order...</span>
                  </span>
                ) : (
                  <span>Place Architectural Order ({formatPrice(total)})</span>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-[#111111] border border-[#222] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
            <h3 className="text-xl font-serif text-white pb-3 border-b border-[#222]">
              Specification Review
            </h3>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 items-start">
                  <div className="w-16 aspect-[3/4] bg-[#080808] border border-[#262626] overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif text-white truncate">{item.product.name}</h4>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                    <p className="text-xs font-mono text-[#C5A880] mt-1 font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#222] space-y-2 text-xs font-mono">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-white font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Fabrication Crate & Logistics</span>
                <span className="text-[#C5A880]">Included</span>
              </div>
              <div className="pt-3 border-t border-[#222] flex justify-between items-baseline">
                <span className="text-sm font-mono uppercase tracking-wider text-white">Order Total (NGN)</span>
                <span className="text-2xl font-serif text-[#C5A880]">{formatPrice(total)}</span>
              </div>
            </div>

            <p className="text-[10px] font-mono text-gray-400 leading-relaxed">
              * Official architectural invoice and technical fabrication schedule will be issued upon order confirmation.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
