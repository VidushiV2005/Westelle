import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountApp() {
  const { user, isAuthenticated, login, logout, updateUser } = useAuth();
  const [currentPage, setCurrentPage] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

 
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
        country: user.address?.country || '',
      });
    }
  }, [user]);

  // Login Page Component
  const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        if (password.length >= 6) {
          
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
          
          // Use AuthContext login
          login(userData);
          
          setSuccess(true);
          setLoading(false);
          setTimeout(() => {
            setCurrentPage('account');
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
          
          // Use AuthContext login
          login(userData);
          
          setSuccess(true);
          setLoading(false);
          setTimeout(() => {
            setCurrentPage('account');
          }, 2000);
        } else {
          setError('Password must be at least 6 characters');
          setLoading(false);
        }
      }
    };

    const handleBack = () => {
      setCurrentPage('account');
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
                  Redirecting to your account...
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
  };

  // Account Page Component
  const AccountPage = () => {
    const handleSave = () => {
      const updatedUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        createdAt: user?.createdAt || new Date().toISOString(),
      };
      
      
      updateUser(updatedUser);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setIsEditing(false);
      
      if (user) {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || '',
        });
      }
    };

    const handleLogout = () => {
    
      logout();
      setFormData({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      });
    };

    
    if (!isAuthenticated || !user) {
      return (
        <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="mx-auto max-w-md text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-neutral-100">
                  <svg className="h-16 w-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-neutral-800">Please Sign In</h2>
                <p className="mt-3 text-neutral-500">You need to be logged in to access your account</p>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="mt-8 inline-block border border-black bg-black px-12 py-4 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  SIGN IN
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
        <div className="container mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="group mb-10 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
              <span className="text-sm tracking-[0.2em] uppercase font-light">Back</span>
            </button>
            
            <h1 className="font-serif text-5xl tracking-wide">My Account</h1>
            <div className="mt-4 h-[1px] w-20 bg-black/20" />
            <p className="mt-4 text-sm tracking-wide text-neutral-500">
              MANAGE YOUR PROFILE AND PREFERENCES
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 space-y-6">
                <div className="border border-neutral-200 bg-white p-8">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-2xl font-serif text-white">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <h2 className="font-serif text-2xl tracking-wide">{user.name || 'Guest User'}</h2>
                  <p className="mt-2 text-sm text-neutral-500">{user.email || 'No email provided'}</p>
                  
                  <div className="mt-6 border-t border-neutral-200 pt-6">
                    <p className="text-xs tracking-wider text-neutral-400">MEMBER SINCE</p>
                    <p className="mt-1 text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      }) : 'Recently'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full border border-neutral-300 bg-transparent py-3 text-xs tracking-[0.3em] text-neutral-700 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                >
                  SIGN OUT
                </button>
              </div>
            </motion.div>

            {/* Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="border border-neutral-200 bg-white p-8">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="font-serif text-2xl tracking-wide">Personal Information</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-xs tracking-wider text-neutral-600 transition-colors hover:text-black"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>EDIT</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="mb-4 text-xs tracking-wider text-neutral-400">CONTACT DETAILS</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          FULL NAME
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                            placeholder="Enter your name"
                          />
                        ) : (
                          <p className="text-sm">{user.name || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          EMAIL ADDRESS
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                            placeholder="Enter your email"
                          />
                        ) : (
                          <p className="text-sm">{user.email || 'Not provided'}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          PHONE NUMBER
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                          />
                        ) : (
                          <p className="text-sm">{user.phone || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="mb-4 text-xs tracking-wider text-neutral-400">SHIPPING ADDRESS</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          STREET ADDRESS
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.street}
                            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                            placeholder="123 Fashion Avenue"
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                          />
                        ) : (
                          <p className="text-sm">{user.address?.street || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          CITY
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="New York"
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                          />
                        ) : (
                          <p className="text-sm">{user.address?.city || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          STATE / PROVINCE
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="NY"
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                          />
                        ) : (
                          <p className="text-sm">{user.address?.state || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          ZIP / POSTAL CODE
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            placeholder="10001"
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                          />
                        ) : (
                          <p className="text-sm">{user.address?.zipCode || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-xs tracking-wider text-neutral-600">
                          COUNTRY
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="United States"
                            className="w-full border border-neutral-300 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-black"
                          />
                        ) : (
                          <p className="text-sm">{user.address?.country || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 border-t border-neutral-200 pt-6">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-black py-3 text-xs tracking-[0.3em] text-white transition-all duration-300 hover:bg-neutral-800"
                      >
                        SAVE CHANGES
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 border border-neutral-300 bg-transparent py-3 text-xs tracking-[0.3em] text-neutral-700 transition-all duration-300 hover:border-black hover:text-black"
                      >
                        CANCEL
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order History Section */}
              <div className="mt-8 border border-neutral-200 bg-white p-8">
                <h2 className="mb-6 font-serif text-2xl tracking-wide">Order History</h2>
                <div className="py-12 text-center">
                  <svg className="mx-auto mb-4 h-16 w-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-sm text-neutral-500">No orders yet</p>
                  <p className="mt-2 text-xs text-neutral-400">Your order history will appear here</p>
                  <button 
                    onClick={() => window.location.href = '/shop'}
                    className="mt-6 border border-neutral-300 bg-transparent px-8 py-3 text-xs tracking-[0.3em] text-neutral-700 transition-all duration-300 hover:border-black hover:text-black"
                  >
                    START SHOPPING
                  </button>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="mt-8 border border-neutral-200 bg-white p-8">
                <h2 className="mb-6 font-serif text-2xl tracking-wide">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="mt-1 text-xs text-neutral-500">Receive updates about new collections and offers</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-black transition-colors">
                      <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <div>
                      <p className="text-sm font-medium">SMS Notifications</p>
                      <p className="mt-1 text-xs text-neutral-500">Get order updates via text message</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-300 transition-colors">
                      <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <p className="text-sm font-medium">Newsletter</p>
                      <p className="mt-1 text-xs text-neutral-500">Monthly style inspiration and exclusive previews</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-black transition-colors">
                      <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  
  return (
    <>
      {currentPage === 'login' ? <LoginPage /> : <AccountPage />}
    </>
  );
}