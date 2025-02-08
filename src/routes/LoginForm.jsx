import React, { useState } from 'react'
import { Phone, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { loginSchema } from '../lib/validation'
import { users } from '../../server/auth'
import { useNavigate, Link } from 'react-router-dom'

export function LoginForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    remember: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form data
      const validatedData = loginSchema.parse(formData)

      // Format phone number to include country code if not present
      const phoneNumber = validatedData.phone.startsWith('+')
        ? validatedData.phone
        : `+970${validatedData.phone}`

      // Check if user exists in mock data
      const user = users.find(u => u.phone === phoneNumber)
      
      if (!user) {
        throw new Error('Phone number not found')
      }

      // Simulate successful login
      setTimeout(() => {
        // Store user info in localStorage or state management
        localStorage.setItem('user', JSON.stringify(user))
        toast.success('Login successful!')
        navigate('/')
      }, 1000)
      
    } catch (error) {
      if (error.name === 'ZodError') {
        error.errors.forEach((err) => toast.error(err.message))
      } else {
        toast.error(error.message || 'Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUpClick = () => {
    // You can implement navigation to signup page here
    console.log('Navigate to signup')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-[32px] shadow-lg">
          <h2 className="text-2xl font-bold text-center text-[#0A2472] mb-2">Log in</h2>
          <p className="text-center text-gray-500 mb-6">Please enter your mobile to continue</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="flex items-center space-x-1">
                  <img 
                    src="https://flagcdn.com/w20/ps.png" 
                    alt="Palestine flag" 
                    className="w-5 h-auto"
                  />
                  <span className="text-gray-500">+970</span>
                </div>
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full pl-24 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Phone Number"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0A2472] hover:bg-[#061a5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to='/signup'
              className="font-medium text-[#0A2472] hover:text-[#061a5a] focus:outline-none focus:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}