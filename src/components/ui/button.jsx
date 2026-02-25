import { cn } from '../../lib/utils.js'

const Button = (props) => {
	const {
		children,
		variant = 'default',
		size = 'md',
		disabled = false,
		...rest
	} = props

	const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

	const variants = {
		default: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
		outline: 'border border-gray-300 text-gray-900 hover:bg-gray-100',
		ghost: 'text-gray-900 hover:bg-gray-100',
	}

	const sizes = {
		sm: 'h-8 px-3 text-sm',
		md: 'h-10 px-4 text-sm',
		lg: 'h-12 px-6 text-base',
	}

	return (
		<button
			class={cn(
				baseStyles,
				variants[variant],
				sizes[size],
			)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	)
}

export { Button }
