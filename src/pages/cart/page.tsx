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

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex flex-col selection:bg-[#C5A880]/30 selection:text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#262626] flex items-center justify-center mx-auto text-[#C5A880]">
              <i className="ri-shopping-bag-line text-2xl"></i>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-serif text-white">Your Shopping Bag is Empty</h2>
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
              Architectural Selection
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
              YOUR SELECTION
            </h1>
          </div>
          <p className="text-xs font-mono text-gray-400">
            {totalItemsCount} {totalItemsCount === 1 ? 'Door' : 'Doors'} in Specification Bag
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="p-6 bg-[#111111] border border-[#1F1F1F] hover:border-[#2C2C2C] transition-colors flex flex-col sm:flex-row gap-6 items-start"
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

                {/* Info & Quantity Adjustments */}
                <div className="flex-1 min-w-0 space-y-3 w-full">
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
                      <p className="text-xs text-gray-400 font-light mt-0.5 line-clamp-1">
                        {item.product.materialType}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-400 p-1 transition-colors"
                      title="Remove from bag"
                      aria-label="Remove item"
                    >
                      <i className="ri-delete-bin-line text-base"></i>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#1C1C1C]">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-[#2A2A2A] bg-[#161616] text-xs font-mono">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3.5 py-1.5 text-white font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Unit & Subtotal Price */}
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-mono text-[#C5A880] font-semibold">
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

            <div className="pt-4 flex items-center justify-between">
              <Button to="/products" variant="ghost" size="sm" icon={<i className="ri-arrow-left-line"></i>} iconPosition="left">
                Continue Shopping Collections
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
                <span>SUBTOTAL ({totalItemsCount} items)</span>
                <span className="text-white font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>ARCHITECTURAL CRATING</span>
                <span className="text-[#C5A880]">Included</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>WHITE-GLOVE SITE DELIVERY</span>
                <span className="text-gray-300">Calculated at Checkout</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>CAD SPECIFICATION REVIEW</span>
                <span className="text-[#C5A880]">Included</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#222] flex justify-between items-baseline">
              <span className="text-sm font-mono uppercase tracking-wider text-white">ESTIMATED TOTAL</span>
              <span className="text-2xl font-mono text-[#C5A880] font-semibold">{formatPrice(total)}</span>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                onClick={() => navigate('/checkout')}
                variant="primary"
                className="w-full font-mono text-xs uppercase tracking-widest font-bold"
                size="lg"
              >
                PROCEED TO CHECKOUT
              </Button>
              <Button
                to="/bespoke"
                variant="outline"
                className="w-full text-xs"
                size="sm"
              >
                REQUEST BESPOKE CONFIGURATION
              </Button>
            </div>

            <p className="text-[11px] font-mono text-gray-400 leading-relaxed border-t border-[#1C1C1C] pt-4">
              * Fabrication begins upon CAD dimension confirmation and payment clearance. Transparent pricing in your selected currency.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
