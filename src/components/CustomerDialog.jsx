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

const CustomerDialog = ({ open, editingCustomer, formData, setFormData, handleSubmit, closeModal })=> {
	return (
		<Dialog.Root open={open} onOpenChange={({ open })=> { if (!open) closeModal() }} placement='center'>
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
										type='text'
										value={formData.name}
										onChange={e=> setFormData({ ...formData, name: e.target.value })}
									/>
								</Field.Root>
								<Field.Root>
									<Field.Label>Gender</Field.Label>
									<NativeSelect.Root>
										<NativeSelect.Field
											value={formData.gender}
											onChange={e=> setFormData({ ...formData, gender: e.target.value })}
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
										type='tel'
										value={formData.phone}
										onChange={e=> setFormData({ ...formData, phone: e.target.value })}
									/>
								</Field.Root>
								<Field.Root>
									<Field.Label>Extra Info</Field.Label>
									<Textarea
										value={formData.extra}
										onChange={e=> setFormData({ ...formData, extra: e.target.value })}
									/>
								</Field.Root>
							</Dialog.Body>
							<Dialog.Footer gap={2}>
								<Button variant='outline' onClick={closeModal}>Cancel</Button>
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
