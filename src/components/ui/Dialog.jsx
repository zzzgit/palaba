import { Show } from 'solid-js'
import { cn } from '../../lib/utils.js'

const Dialog = (props)=> {
	return (
		<Show when={props.open}>
			<div
				class='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'
				onClick={(e)=> {
					if (e.target === e.currentTarget && props.onOpenChange){
						props.onOpenChange(false)
					}
				}}
			>
				{props.children}
			</div>
		</Show>
	)
}

const DialogContent = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<div
			class={cn('relative bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto border border-slate-700', className)}
			onClick={e=> e.stopPropagation()}
			{...rest}
		>
			{children}
		</div>
	)
}

const DialogHeader = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<div
			class={cn('mb-4', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

const DialogTitle = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<h2
			class={cn('text-lg font-semibold text-slate-100', className)}
			{...rest}
		>
			{children}
		</h2>
	)
}

const DialogFooter = (props)=> {
	const {
		children, class: className, ...rest
	} = props

	return (
		<div
			class={cn('mt-6 flex gap-2 justify-end', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

export {
	Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
}
