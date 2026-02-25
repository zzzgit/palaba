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
				'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...rest}
		/>
	)
}

export { Input }
