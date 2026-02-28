import { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Portal } from '@chakra-ui/react'

let _show = null

const Confirm = ()=> {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const resolveRef = useRef(null)

	useEffect(()=> {
		_show = msg=> new Promise((resolve)=> {
			resolveRef.current = resolve
			setMessage(msg || '確定要執行此操作嗎？')
			setOpen(true)
		})
		return ()=> { _show = null }
	}, [])

	const handleConfirm = ()=> {
		resolveRef.current?.(true)
		resolveRef.current = null
		setOpen(false)
	}

	const handleCancel = ()=> {
		resolveRef.current?.(false)
		resolveRef.current = null
		setOpen(false)
	}

	return (
		<Dialog.Root onOpenChange={({ open })=> { if (!open){ handleCancel() } }} open={open} placement='center' size='sm'>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>確認</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							{message}
						</Dialog.Body>
						<Dialog.Footer gap={2}>
							<Button onClick={handleCancel} variant='outline'>取消</Button>
							<Button colorPalette='red' onClick={handleConfirm}>確定</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

Confirm.it = (message)=> {
	if (_show){ return _show(message) }
	return Promise.resolve(false)
}

export default Confirm
