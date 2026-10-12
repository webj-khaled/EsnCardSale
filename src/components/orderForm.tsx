import { useState } from 'react';
import { 
  FaUpload, FaUser, FaGlobe, FaCalendar, FaHome, FaMapMarker, 
  FaCreditCard, FaLock, FaPhone, FaEnvelope 
} from 'react-icons/fa';
import { uploadFile, saveFormData } from '../supabase-functions';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

const OrderForm = () => {
  interface FormData {
  acceptanceFile: File | null;
  fullName: string;
  nationality: string;
  phone: string;
  email: string;
  dob: string;
  street: string;
  houseNumber: string;
  apartment: string;
  postalCode: string;
  city: string;
  country: string;
}

const [formData, setFormData] = useState<FormData>({
  acceptanceFile: null,
  fullName: '',
  nationality: '',
  phone: '',
  email: '',
  dob: '',
  street: '',
  houseNumber: '',
  apartment: '',
  postalCode: '',
  city: 'Salzburg',
  country: 'Austria'
});

  

  const [activeSection, setActiveSection] = useState('personal');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false); // Add loading state
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

    const handleCardholderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardholderName(e.target.value);
    };

  // Add this function to create payment intent
  const createPaymentIntent = async (amount: number) => {
  try {
    console.log('🔄 Creating payment intent with amount:', amount);
    
    const response = await fetch(
      'https://nhkleifovvbtyhkriole.supabase.co/functions/v1/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
      }
    );
    console.log('🌐 Response headers:', Object.fromEntries([...response.headers]));
    console.log('📤 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server error:', errorText);
      throw new Error(`Failed to create payment intent: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Payment intent created:', data);
    return data.clientSecret;
  } catch (error) {
    console.error('❌ Error creating payment intent:', error);
    alert('Error processing payment. Please try again.');
    return null;
  }
};

  
  
  // Validation functions
 const validatePersonal = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.acceptanceFile) newErrors.acceptanceFile = 'Acceptance letter is required';
  if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
  if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
  if (!formData.dob) newErrors.dob = 'Date of birth is required';
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const validateDelivery = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
  if (!formData.email.trim()) newErrors.email = 'Email is required';
  if (!formData.street.trim()) newErrors.street = 'Street name is required';
  if (!formData.houseNumber.trim()) newErrors.houseNumber = 'House number is required';
  if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  

  const handleNext = (section: string) => {
  let isValid = false;
  
  if (activeSection === "personal") {
    isValid = validatePersonal();
  } else if (activeSection === "delivery") {
    isValid = validateDelivery();
  }
  
  if (!isValid) return;
  setErrors({});
  setActiveSection(section);
};


 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};




  const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  fieldName: string
) => {
  if (e.target.files && e.target.files.length > 0) {
    setFormData({
      ...formData,
      [fieldName]: e.target.files[0],
    });
  }
};



  

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // REMOVE THIS: setIsSuccess(true) ← Wrong location!
  // Add this at the top of handleSubmit
  if (!stripe || !elements) {
    console.log('Stripe not loaded yet');
    alert('Payment system is not ready. Please try again.');
    return;
  }

  console.log('🔍 Starting form submission...');
  
  // Check if the acceptance letter or learning agreement exists
  if (!formData.acceptanceFile) {
    console.log('❌ Missing files');
    alert('Please upload your acceptance letter or learning agreement.');
    return;
  }

  try {
    setLoading(true);
    
    // 1. Create payment intent
    console.log('💳 Creating payment intent...');
    const clientSecret = await createPaymentIntent(20.99);
    
    if (!clientSecret) {
      throw new Error('Failed to create payment intent');
    }

    // 2. Get Stripe card element and confirm payment
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      throw new Error('Card element not found');
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardholderName,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: `${formData.street} ${formData.houseNumber}`,
                line2: formData.apartment || '',
                city: formData.city,
                postal_code: formData.postalCode,
                country: 'AT'
              }
            },
          },
      }).catch(error => {
        console.error('🔥 Stripe confirmation caught error:', error);
        throw error;
      });

      // Add detailed error info
      if (stripeError) {
        console.error('🔥 Stripe error type:', stripeError.type);
        console.error('🔥 Stripe error code:', stripeError.code);
        console.error('🔥 Stripe error message:', stripeError.message);
        console.error('🔥 Stripe error decline code:', stripeError.decline_code);
        throw new Error(stripeError.message);
      }

    

    // 3. Upload the acceptance letter and save data (only if payment succeeds)
    console.log('📤 Uploading files...');
    const sanitizeFileName = (name: string) => {
        return name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9_\s]/g, '')
          .replace(/\s+/g, '_')
          .toLowerCase();
      };

      const acceptanceFileName = `acceptance_${Date.now()}_${sanitizeFileName(formData.fullName)}`;
      const acceptanceLetterUrl = await uploadFile(formData.acceptanceFile, acceptanceFileName);

    // 4. Save all data to database
    console.log('💾 Saving to database...');
    await saveFormData(formData, acceptanceLetterUrl);

    console.log('🎉 Order submitted successfully!');
    setIsSuccess(true); // ✅ CORRECT LOCATION: After everything succeeds!
    
  } catch (error) {
    console.error('❌ Submission error:', error);
    if (error instanceof Error) {
      alert(error.message || 'Error submitting order. Please try again.');
    } else {
      alert('Error submitting order. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};


return (
  <div className="min-h-screen py-12 px-4">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      {isSuccess ? (
        // SUCCESS MESSAGE
        <div className="p-8 text-center">
          <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We will verify your data and send the ESN card to your address. An email of confirmation or rejection will be sent you in few days.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700">
              A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong>
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Place Another Order
          </button>
        </div>
      ) : (
        // ORIGINAL FORM
        <>
          {/* Form Header - ADDED BACK */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">ESN Card Order Form</h2>
            <p className="opacity-90">Get your ESN card for exclusive student benefits</p>
            <div className="mt-4 flex justify-center">
              <div className="bg-white text-blue-700 px-4 py-2 rounded-full font-semibold">
                Total: €20.99 (€15 + €5.99 delivery)
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between px-6 py-4 border-b">
            {/* Personal Step */}
            <button
              type="button"
              className={`flex flex-col items-center ${
                activeSection === "personal"
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveSection("personal")}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeSection === "personal"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                1
              </div>
              <span className="text-xs mt-1">Personal</span>
            </button>

            {/* Delivery Step */}
            <button
              type="button"
              className={`flex flex-col items-center ${
                activeSection === "delivery"
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => handleNext("delivery")}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeSection === "delivery"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                2
              </div>
              <span className="text-xs mt-1">Delivery</span>
            </button>

            {/* Payment Step */}
            <button
              type="button"
              className={`flex flex-col items-center ${
                activeSection === "payment"
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => handleNext("payment")}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeSection === "payment"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                3
              </div>
              <span className="text-xs mt-1">Payment</span>
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Section */}
            {activeSection === "personal" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                
                {/* Acceptance Letter Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Acceptance Letter or Learning Agreement *
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      errors.acceptanceFile ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                    } hover:bg-gray-100`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">{formData.acceptanceFile ? formData.acceptanceFile.name : 'Click to upload'}</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, 'acceptanceFile')}
                        required 
                      />
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGlobe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.nationality ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your nationality"
                      required
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.dob ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleNext("delivery")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue to Delivery
                </button>
              </div>
            )}

            {/* Delivery Section */}
            {activeSection === "delivery" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Delivery Information</h3>
                <p className="text-sm text-gray-600">Delivery available only within Salzburg, Austria</p>
                
                {/* Phone and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+43 123 456 789"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Street + House Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaHome className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.street ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Street name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Number *
                    </label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.houseNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="House number"
                      required
                    />
                  </div>
                </div>

                {/* Apartment + Postal Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.apartment ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Apartment number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-lg border p-3 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Postal code"
                      required
                    />
                  </div>
                </div>

                {/* City + Country (fixed) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarker className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        className="pl-10 w-full rounded-lg border-gray-300 border p-3 bg-gray-100"
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value="Austria"
                      className="w-full rounded-lg border-gray-300 border p-3 bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveSection("personal")}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNext("payment")}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Payment Section */}
            {activeSection === "payment" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Payment Information
                </h3>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>ESN Card:</span>
                    <span>€15.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee:</span>
                    <span>€5.99</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>€20.99</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Details *
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-400 transition-colors">
                    <div className="w-full overflow-x-auto">
                      <div className="min-w-[300px]">
                        <CardElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#374151",
                                fontFamily: "Inter, system-ui, sans-serif",
                                "::placeholder": {
                                  color: "#9CA3AF",
                                  fontSize: "14px",
                                  
                                },
                              },
                            },
                             hidePostalCode: true,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={handleCardholderNameChange}
                    className="w-full rounded-lg border-gray-300 border p-3 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name on card"
                    required
                  />
                </div>

                {/* Payment Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveSection("delivery")}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Pay €20.99"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  </div>
);
};


export default OrderForm;
