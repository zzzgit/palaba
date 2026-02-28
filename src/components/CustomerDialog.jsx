import {
	Button,
	CloseButton,
	Dialog,
	Field,
	Input,
	NativeSelect,
	Portal,
	Textarea,
} from '@chakra-ui/react'

const CustomerDialog = ({
	open, editingCustomer, formData, setFormData, handleSubmit, closeModal,
})=> {
	return (
		<Dialog.Root onOpenChange={({ open })=> { if (!open){ closeModal() } }} open={open} placement='center'>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>
								{editingCustomer ? 'Edit Customer' : 'Add New Customer'}
							</Dialog.Title>
						</Dialog.Header>
						<form onSubmit={handleSubmit}>
							<Dialog.Body display='flex' flexDirection='column' gap={4}>
								<Field.Root required>
									<Field.Label>Name</Field.Label>
									<Input
										onChange={e=> setFormData({ ...formData, name: e.target.value })}
										type='text'
										value={formData.name}
									/>
								</Field.Root>
								<Field.Root>
									<Field.Label>Gender</Field.Label>
									<NativeSelect.Root>
										<NativeSelect.Field
											onChange={e=> setFormData({ ...formData, gender: e.target.value })}
											value={formData.gender}
										>
											<option value='M'>Male</option>
											<option value='F'>Female</option>
											<option value='OTHER'>Other</option>
										</NativeSelect.Field>
									</NativeSelect.Root>
								</Field.Root>
								<Field.Root>
									<Field.Label>Phone</Field.Label>
									<Input
										onChange={e=> setFormData({ ...formData, phone: e.target.value })}
										type='tel'
										value={formData.phone}
									/>
								</Field.Root>
								<Field.Root>
									<Field.Label>Extra Info</Field.Label>
									<Textarea
										onChange={e=> setFormData({ ...formData, extra: e.target.value })}
										value={formData.extra}
									/>
								</Field.Root>
							</Dialog.Body>
							<Dialog.Footer gap={2}>
								<Button onClick={closeModal} variant='outline'>Cancel</Button>
								<Button colorPalette='blue' type='submit'>
									{editingCustomer ? 'Update' : 'Create'}
								</Button>
							</Dialog.Footer>
						</form>
						<Dialog.CloseTrigger asChild>
							<CloseButton size='sm' />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

export default CustomerDialog
