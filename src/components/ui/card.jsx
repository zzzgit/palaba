import { cn } from '../../lib/utils.js'

const Card = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<div
			class={cn('rounded-lg border border-slate-700 bg-slate-800 shadow-md', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

const CardHeader = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<div
			class={cn('border-b border-slate-700 px-6 py-4', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

const CardTitle = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<h3
			class={cn('text-lg font-semibold leading-none tracking-tight text-slate-100', className)}
			{...rest}
		>
			{children}
		</h3>
	)
}

const CardDescription = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<p
			class={cn('text-sm text-slate-400', className)}
			{...rest}
		>
			{children}
		</p>
	)
}

const CardContent = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<div
			class={cn('px-6 py-4', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

const CardFooter = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<div
			class={cn('border-t border-slate-700 px-6 py-4', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

export {
	Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
}
