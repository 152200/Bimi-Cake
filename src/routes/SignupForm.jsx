import React, { useState } from 'react'
import { Mail, User, Lock, Phone, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { signupSchema } from '../lib/validation'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signupUser } from '../app/features/authSlice'

export function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form data
      const validatedData = signupSchema.parse(formData)

      // Format phone number
      const phoneNumber = validatedData.phone.startsWith('+') 
        ? validatedData.phone 
        : `+970${validatedData.phone}`

      const userData = {
        ...validatedData,
        phone: phoneNumber
      }

      const result = await dispatch(signupUser(userData))
      
      if (result.success) {
        toast.success('Account created successfully!')
        navigate('/')
      } else {
        toast.error(result.error)
      }
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

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-[32px] shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-[#0A2472] hover:text-[#061a5a]">
              sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User size={20} />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#E5C1C1] focus:border-transparent"
                placeholder="Full Name"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Mail size={20} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#E5C1C1] focus:border-transparent"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Phone size={20} />
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#E5C1C1] focus:border-transparent"
                placeholder="Phone number"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock size={20} />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#E5C1C1] focus:border-transparent"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
                     text-sm font-medium rounded-lg text-white bg-[#0A2472] hover:bg-[#061a5a]
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5C1C1]"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              'Sign up'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm