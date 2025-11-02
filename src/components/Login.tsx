import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isLogin) {
      if (password.length >= 6) {
        // Create user data and login
        const userData = {
          name: name || email.split('@')[0],
          email: email,
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
          createdAt: new Date().toISOString(),
        };
        
        login(userData);
        setSuccess(true);
        setLoading(false);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/shop');
        }, 2000);
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    } else {
      if (!name.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      if (password.length >= 6) {
        // Create user data and login
        const userData = {
          name: name,
          email: email,
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
          createdAt: new Date().toISOString(),
        };
        
        login(userData);
        setSuccess(true);
        setLoading(false);
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/shop');
        }, 2000);
      } else {
        setError('Password must be at least 6 characters');
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="mx-auto max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl tracking-wide">
                {isLogin ? 'Welcome Back!' : 'Account Created!'}
              </h2>
              <p className="mt-4 text-neutral-600">
                {isLogin 
                  ? 'You have successfully signed in to your account.' 
                  : 'Your account has been created successfully.'}
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Redirecting to shop...
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={handleBack}
              className="mb-8 inline-flex items-center gap-2 text-sm tracking-wider text-neutral-600 transition-colors hover:text-black"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
              <span>BACK</span>
            </button>

            <h1 className="font-serif text-4xl tracking-wide text-neutral-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <div className="mt-4 h-[1px] w-16 bg-black/20" />
            <p className="mt-4 text-sm tracking-wide text-neutral-500">
              {isLogin 
                ? 'Sign in to access your account and continue shopping' 
                : 'Join Westelle and discover exclusive collections'}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mt-12 space-y-6"
          >
            {!isLogin && (
              <div>
                <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm tracking-wide outline-none transition-all duration-200 focus:border-black"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm tracking-wide outline-none transition-all duration-200 focus:border-black"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm tracking-wide outline-none transition-all duration-200 focus:border-black"
                placeholder="Enter your password"
              />
              <p className="mt-2 text-xs text-neutral-400">
                Minimum 6 characters
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black py-4 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'PLEASE WAIT...' : isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>

            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-xs tracking-wider text-neutral-500 underline underline-offset-4 transition-colors hover:text-black"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 border-t border-neutral-200 pt-8 text-center"
          >
            <p className="text-sm text-neutral-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 font-medium tracking-wide text-black underline underline-offset-4 transition-opacity hover:opacity-60"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 rounded border border-neutral-200 bg-white p-6"
          >
            <h3 className="mb-3 text-xs tracking-wider text-neutral-400">
              MEMBER BENEFITS
            </h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Exclusive access to new collections</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Personalized shopping experience</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Order tracking and history</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Special offers and promotions</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}