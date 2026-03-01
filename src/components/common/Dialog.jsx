import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'

const CustomDialog = ({
	isOpen,
	onClose,
	title,
	children,
	cancelText = 'Cancel',
	saveText = 'Save',
	onCancel,
	onSave,
	showCloseButton = false,
	size = 'md',
})=> {
	// Dialog padding definition
	const dialogPadding = '24px'

	const handleCancel = ()=> {
		onCancel?.()
		onClose()
	}

	const handleSave = ()=> {
		onSave?.()
		onClose()
	}

	return (
		<Dialog.Root
			onOpenChange={(details)=> {
				if (!details.open){
					onClose()
				}
			}} open={isOpen} placement='center' size={size}
		>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content display='flex' flexDirection='column' gap={4} p={dialogPadding}>
						<Dialog.Header p={0}>
							<Dialog.Title>
								{title}
							</Dialog.Title>
						</Dialog.Header>
						{ (
							<>
								<Dialog.Body p={0}>
									{children}
								</Dialog.Body>
								<Dialog.Footer gap={2} p={0}>
									<Dialog.ActionTrigger asChild>
										<Button minW='fit-content' onClick={handleCancel} variant='outline' w='auto'>
											{cancelText}
										</Button>
									</Dialog.ActionTrigger>
									<Button minW='fit-content' onClick={handleSave} w='auto'>
										{saveText}
									</Button>
								</Dialog.Footer>
							</>
						)}
						{showCloseButton && (
							<Dialog.CloseTrigger asChild>
								<CloseButton size='sm' />
							</Dialog.CloseTrigger>
						)}
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

export default CustomDialog
