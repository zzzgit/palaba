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
		default: 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg active:bg-blue-700',
		secondary: 'bg-slate-700 text-gray-100 hover:bg-slate-600 border border-slate-600',
		outline: 'border border-slate-500 text-slate-200 hover:bg-slate-800 hover:border-blue-500',
		ghost: 'text-slate-300 hover:bg-slate-800 hover:text-slate-100',
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
