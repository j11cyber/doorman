import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Button } from '../../components/ui/Button';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#262626] flex items-center justify-center mx-auto text-[#C5A880]">
              <i className="ri-shopping-bag-line text-2xl"></i>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-serif text-white">Your Specification Bag is Empty</h2>
              <p className="text-sm text-gray-400 font-light">
                Explore our architectural collections to add luxury doors, flush systems, and hardware to your spec sheet.
              </p>
            </div>
            <div className="pt-2">
              <Button to="/products" variant="primary">
                Explore Door Collections
              </Button>
            </div>
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 border-b border-[#1C1C1C] gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880] mb-1">
              Architectural Order
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
              Specification Bag
            </h1>
          </div>
          <p className="text-xs font-mono text-gray-400">
            {items.reduce((sum, item) => sum + item.quantity, 0)} Items Selected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="p-6 bg-[#111111] border border-[#1F1F1F] flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Product Thumbnail */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="relative aspect-[3/4] w-24 sm:w-28 bg-[#080808] border border-[#262626] overflow-hidden flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Info & Adjustments */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                        {item.product.category}
                      </p>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-base sm:text-lg font-serif text-white hover:text-[#C5A880] transition-colors leading-snug">
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-400 p-1 transition-colors"
                      title="Remove from spec bag"
                    >
                      <i className="ri-delete-bin-line text-base"></i>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#2A2A2A] bg-[#161616] text-xs font-mono">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Unit & Subtotal Price */}
                    <div className="text-right">
                      <p className="text-base font-serif text-[#C5A880]">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] font-mono text-gray-400">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button to="/products" variant="ghost" size="sm" icon={<i className="ri-arrow-left-line"></i>} iconPosition="left">
                Continue Exploring Collections
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-[#111111] border border-[#222] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
            <h3 className="text-xl font-serif text-white pb-3 border-b border-[#222]">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-white font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Freight & Site Logistics</span>
                <span className="text-gray-300">Calculated at Checkout</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Technical CAD Support</span>
                <span className="text-[#C5A880]">Included</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex justify-between items-baseline">
              <span className="text-sm font-mono uppercase tracking-wider text-white">Estimated Total</span>
              <span className="text-2xl font-serif text-[#C5A880]">{formatPrice(total)}</span>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={() => navigate('/checkout')}
                variant="primary"
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              <Button
                to="/contact?subject=Bespoke%20Consultation%20from%20Cart"
                variant="outline"
                className="w-full text-xs"
                size="sm"
              >
                Request Custom Quote Instead
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
