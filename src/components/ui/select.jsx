import { cn } from '../../lib/utils.js'

const Select = (props) => {
	const {
		children,
		class: className,
		...rest
	} = props

	return (
		<select
			class={cn(
				'flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
				className,
			)}
			{...rest}
		>
			{children}
		</select>
	)
}

export { Select }
