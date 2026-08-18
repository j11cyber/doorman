import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { Button } from '../../components/ui/Button';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const method = searchParams.get('method');
  const [isVerifying, setIsVerifying] = useState(method !== 'bank');
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | null>(null);

  useEffect(() => {
    if (method === 'bank') {
      setVerificationStatus('success');
      return;
    }

    if (!reference) {
      navigate('/');
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/verify-paystack-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ reference }),
          }
        );

        const data = await response.json();

        if (data.success && data.paymentStatus === 'paid') {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('failed');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [reference, method, navigate]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto text-center space-y-4">
            <i className="ri-loader-4-line text-4xl text-[#C5A880] animate-spin"></i>
            <h2 className="text-2xl font-serif text-white">Verifying Architectural Payment...</h2>
            <p className="text-xs text-gray-400 font-mono">Connecting with secure transaction gateway</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-800 flex items-center justify-center mx-auto text-red-400">
              <i className="ri-close-line text-3xl"></i>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-white">Payment Verification Pending</h2>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                We could not immediately verify your digital payment. If your account was debited, our concierge will confirm your order manually.
              </p>
            </div>
            <div className="flex gap-4 justify-center pt-2">
              <Button to="/products" variant="secondary" size="sm">
                Return to Catalogue
              </Button>
              <Button to="/contact" variant="primary" size="sm">
                Contact Concierge
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

      <div className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 lg:px-12 max-w-3xl mx-auto text-center space-y-8">
        <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
          <i className="ri-check-line text-3xl"></i>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest-arch text-[#C5A880]">
            Order Confirmation
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            ORDER CONFIRMED
          </h1>
          <p className="text-sm text-gray-300 font-light max-w-lg mx-auto">
            {method === 'bank'
              ? 'Thank you for commissioning TheDoorman. Your bank wire order specification has entered our architectural queue.'
              : 'Thank you for commissioning TheDoorman. Your payment has cleared and your order has entered our fabrication queue.'}
          </p>
          {reference && (
            <div className="pt-3 inline-block bg-[#111] px-4 py-2 border border-[#222]">
              <p className="text-xs font-mono text-gray-400">
                Order Reference: <span className="text-[#C5A880] font-semibold">{reference}</span>
              </p>
            </div>
          )}
        </div>

        {/* Bank Wire Details if Method === Bank */}
        {method === 'bank' && (
          <div className="p-6 bg-[#111111] border border-[#222] text-left space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#C5A880] flex items-center space-x-2">
              <i className="ri-bank-line text-base"></i>
              <span>Direct Studio Wire Instructions</span>
            </h3>

            <div className="divide-y divide-[#1F1F1F] text-xs font-mono">
              <div className="py-2 flex justify-between">
                <span className="text-gray-400">Beneficiary:</span>
                <span className="text-white">TheDoorman Architectural Systems Ltd</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400">Bank:</span>
                <span className="text-white">Access Bank / Standard Chartered</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400">Account Number:</span>
                <span className="text-[#C5A880] font-semibold">1234567890</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-400">Payment Reference:</span>
                <span className="text-[#C5A880] font-semibold">{reference}</span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-gray-400 pt-2 border-t border-[#1F1F1F]">
              * Please state your order reference in the wire description. Fabrication scheduling commences upon wire receipt.
            </p>
          </div>
        )}

        {/* Next Steps Timeline */}
        <div className="p-6 sm:p-8 bg-[#111111] border border-[#222] text-left space-y-6">
          <h3 className="text-base font-serif text-white">Fabrication & Delivery Milestones</h3>
          
          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#1C1C1C] border border-[#C5A880] text-[#C5A880] flex items-center justify-center flex-shrink-0 text-[10px]">
                1
              </div>
              <div>
                <p className="text-white font-medium">CAD Approval & Spec Verification</p>
                <p className="text-gray-400 font-light mt-0.5">Our engineering desk will email confirmation drawings for opening dimensions.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#1C1C1C] border border-[#333] text-gray-400 flex items-center justify-center flex-shrink-0 text-[10px]">
                2
              </div>
              <div>
                <p className="text-white font-medium">Atelier Joinery & Hand-Finishing</p>
                <p className="text-gray-400 font-light mt-0.5">Precision structural assembly, veneer book-matching, or liquid bronze patination.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#1C1C1C] border border-[#333] text-gray-400 flex items-center justify-center flex-shrink-0 text-[10px]">
                3
              </div>
              <div>
                <p className="text-white font-medium">Crated Delivery & Installation Support</p>
                <p className="text-gray-400 font-light mt-0.5">Reinforced protective crating and coordinated on-site installation guidance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <Button to="/products" variant="primary" size="md">
            CONTINUE SHOPPING
          </Button>
          <Button to="/" variant="secondary" size="md">
            VIEW SHOWROOM
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
