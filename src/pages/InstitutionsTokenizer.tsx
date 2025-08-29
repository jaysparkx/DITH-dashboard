import React, { useState } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import {
  BuildingLibraryIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const InstitutionsTokenizer: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; description?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; description?: string } = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Description validation
    if (!description) {
      newErrors.description = 'Description is required';
    } else if (description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setEmail('');
    setDescription('');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className={`${isCollapsed ? 'ml-16' : 'ml-[280px]'} pt-16 min-h-screen bg-[#2a2a2a] transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="bg-[#3a3a3a] rounded-2xl p-12 shadow-2xl border border-gray-700/50 max-w-2xl w-full">
            {!isSubmitted ? (
              <div>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative">
                    <BuildingLibraryIcon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                      <LockClosedIcon className="w-4 h-4 text-gray-900" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-4">Institutions Tokenizer</h1>
                  <p className="text-gray-300 mb-2 leading-relaxed">
                    Transform institutional assets into digital tokens with our enterprise-grade tokenization platform.
                  </p>
                  <p className="text-sm text-gray-400 mb-8">
                    This feature is currently in private beta. Request early access below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors({ ...errors, email: undefined });
                        }
                      }}
                      className={`w-full px-4 py-3 bg-[#2a2a2a] border ${
                        errors.email ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                      placeholder="your@institution.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                      Description of Use Case <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) {
                          setErrors({ ...errors, description: undefined });
                        }
                      }}
                      rows={4}
                      className={`w-full px-4 py-3 bg-[#2a2a2a] border ${
                        errors.description ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none`}
                      placeholder="Please describe your institution and intended use case for asset tokenization..."
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-400">{errors.description}</p>
                    )}
                    <p className="mt-2 text-xs text-gray-400">
                      {description.length}/20 characters minimum
                    </p>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="mt-1 mr-3 h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-400">
                      I understand that this is a private beta feature and agree to be contacted about early access opportunities.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-200 shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Request...
                      </span>
                    ) : (
                      'Request Access'
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircleIcon className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Access Request Received!</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Thank you for your interest in our Institutions Tokenizer platform. 
                  We've received your request and will contact you at <span className="text-indigo-400 font-medium">{email}</span> within 48 hours.
                </p>
                <p className="text-sm text-gray-400 mb-8">
                  Our enterprise team will review your use case and provide tailored guidance for your tokenization needs.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionsTokenizer;