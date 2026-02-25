import { cn } from '../../lib/utils.js'

const Card = (props) => {
	const { children, class: className, ...rest } = props

	return (
		<div
			class={cn(
				'rounded-lg border border-gray-200 bg-white shadow-sm',
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	)
}

const CardHeader = (props) => {
	const { children, class: className, ...rest } = props

	return (
		<div
			class={cn(
				'border-b border-gray-200 px-6 py-4',
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	)
}

const CardTitle = (props) => {
	const { children, class: className, ...rest } = props

	return (
		<h3
			class={cn(
				'text-lg font-semibold leading-none tracking-tight',
				className,
			)}
			{...rest}
		>
			{children}
		</h3>
	)
}

const CardDescription = (props) => {
	const { children, class: className, ...rest } = props

	return (
		<p
			class={cn(
				'text-sm text-gray-600',
				className,
			)}
			{...rest}
		>
			{children}
		</p>
	)
}

const CardContent = (props) => {
	const { children, class: className, ...rest } = props

	return (
		<div
			class={cn(
				'px-6 py-4',
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	)
}

const CardFooter = (props) => {
	const { children, class: className, ...rest } = props

	return (
		<div
			class={cn(
				'border-t border-gray-200 px-6 py-4',
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	)
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
