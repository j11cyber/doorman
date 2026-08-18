import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials. Please verify your email and password.');
        setIsProcessing(false);
      }
    } else {
      if (!formData.name) {
        setError('Please enter your full name or practice name');
        setIsProcessing(false);
        return;
      }
      const success = await register(formData.email, formData.password, formData.name);
      if (success) {
        navigate('/');
      } else {
        setError('An account with this email already exists.');
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F3F1] flex items-center justify-center px-4 py-16 selection:bg-[#C5A880]/30 selection:text-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group mb-4">
            <span className="font-serif text-3xl font-normal tracking-[0.04em] text-[#F3F3F1] group-hover:text-[#C5A880] transition-colors">
              <span className="font-light text-gray-300">The</span><span className="font-medium text-white">Doorman</span>
            </span>
            <p className="text-[9px] tracking-widest-arch uppercase text-[#C5A880] font-mono mt-0.5">
              Architectural Client Portal
            </p>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            {isLogin ? 'Sign In to Portal' : 'Register Spec Account'}
          </h2>
          <p className="text-xs text-gray-400 font-light">
            {isLogin
              ? 'Access saved architectural specifications and project orders'
              : 'Create an account to manage custom door orders'}
          </p>
        </div>

        <div className="bg-[#111111] border border-[#222] p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Full Name / Studio Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                  placeholder="e.g. David Sterling"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                placeholder="e.g. david@domain.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs font-mono">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#C5A880] text-[#0A0A0A] hover:bg-[#D8C2A2] py-3.5 text-xs uppercase tracking-widest-arch font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Verifying...</span>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-xs font-mono text-[#C5A880] hover:text-white transition-colors underline"
            >
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Sign In'}
            </button>
          </div>

          {isLogin && (
            <div className="pt-4 border-t border-[#1C1C1C] text-center space-y-1">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                Admin Demo Credentials:
              </p>
              <p className="text-xs font-mono text-gray-300">
                admin@thedoorman.com / Admin@2025
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-mono text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-1.5"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Return to Showroom</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
