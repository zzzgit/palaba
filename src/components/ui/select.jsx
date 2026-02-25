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
				'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...rest}
		>
			{children}
		</select>
	)
}

export { Select }
