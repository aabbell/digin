import React, { useState } from 'react'

type LoginProps = {
	onSuccess?: () => void
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const validate = () => {
		if (!email) return 'Please enter your email'
		// simple email pattern
		const re = /\S+@\S+\.\S+/
		if (!re.test(email)) return 'Please enter a valid email'
		if (!password) return 'Please enter your password'
		if (password.length < 6) return 'Password must be at least 6 characters'
		return ''
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		setError('')
		const err = validate()
		if (err) {
			setError(err)
			return
		}
		setLoading(true)
		// Demo submit - replace with real API call
		setTimeout(() => {
			setLoading(false)
			console.log('Login submitted', { email, password })
			onSuccess?.()
		}, 800)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
					<p className="mt-2 text-center text-sm text-gray-600">Welcome back — please enter your credentials.</p>
				</div>
				<form className="mt-8 space-y-6 bg-white p-8 rounded shadow" onSubmit={handleSubmit} noValidate>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								aria-invalid={!!error}
							/>
						</div>
						<div className="mt-4">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								aria-invalid={!!error}
							/>
						</div>
					</div>

					{error && <p className="text-sm text-red-600">{error}</p>}

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
							<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
						>
							{loading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
