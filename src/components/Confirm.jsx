import { useEffect, useRef, useState } from 'react'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'

let _show = null

const Confirm = ()=> {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const resolveRef = useRef(null)

	useEffect(()=> {
		_show = (msg)=> new Promise((resolve)=> {
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
		<Modal isOpen={open} onClose={handleCancel} isCentered size='sm'>
			<ModalOverlay bg='blackAlpha.400' backdropFilter='blur(4px)' />
			<ModalContent>
				<ModalHeader>確認</ModalHeader>
				<ModalBody>{message}</ModalBody>
				<ModalFooter gap={2}>
					<Button variant='outline' onClick={handleCancel}>取消</Button>
					<Button colorScheme='red' onClick={handleConfirm}>確定</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

Confirm.it = (message)=> {
	if (_show) return _show(message)
	return Promise.resolve(false)
}

export default Confirm
