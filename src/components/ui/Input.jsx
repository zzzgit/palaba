import { cn } from '../../lib/utils.js'

const Input = (props) => {
	const {
		type = 'text',
		placeholder = '',
		class: className,
		...rest
	} = props

	return (
		<input
			type={type}
			placeholder={placeholder}
			class={cn(
				'flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
				className,
			)}
			{...rest}
		/>
	)
}

export { Input }
