import { createSignal } from 'solid-js'
import {
	Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from './ui/Dialog.jsx'
import { Button } from './ui/Button.jsx'

// 全局状态管理
const [confirmState, setConfirmState] = createSignal({
	open: false,
	message: '',
	resolve: null,
})

// Confirm组件
const Confirm = ()=> {
	const handleConfirm = ()=> {
		const state = confirmState()
		if (state.resolve){
			state.resolve(true)
		}
		setConfirmState({
			open: false,
			message: '',
			resolve: null,
		})
	}

	const handleCancel = ()=> {
		const state = confirmState()
		if (state.resolve){
			state.resolve(false)
		}
		setConfirmState({
			open: false,
			message: '',
			resolve: null,
		})
	}

	return (
		<Dialog
			open={confirmState().open}
			onOpenChange={(open)=> {
				if (!open){
					handleCancel()
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>確認</DialogTitle>
				</DialogHeader>
				<div class='text-slate-300 py-4'>
					{confirmState().message}
				</div>
				<DialogFooter>
					<Button variant='secondary' onClick={handleCancel}>
						取消
					</Button>
					<Button variant='default' onClick={handleConfirm}>
						確定
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

// 靜態方法
Confirm.it = (message)=> {
	return new Promise((resolve)=> {
		setConfirmState({
			open: true,
			message: message || '確定要執行此操作嗎？',
			resolve,
		})
	})
}

export default Confirm
