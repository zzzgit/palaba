import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Textarea,
} from '@chakra-ui/react'

const CustomerDialog = ({ open, onOpenChange, editingCustomer, formData, setFormData, handleSubmit, closeModal })=> {
	return (
		<Modal isOpen={open} onClose={closeModal} isCentered>
			<ModalOverlay bg='blackAlpha.400' backdropFilter='blur(4px)' />
			<ModalContent>
				<ModalHeader>
					{editingCustomer ? 'Edit Customer' : 'Add New Customer'}
				</ModalHeader>
				<form onSubmit={handleSubmit}>
					<ModalBody display='flex' flexDirection='column' gap={4}>
						<FormControl isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								type='text'
								value={formData.name}
								onChange={e=> setFormData({ ...formData, name: e.target.value })}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Gender</FormLabel>
							<Select
								value={formData.gender}
								onChange={e=> setFormData({ ...formData, gender: e.target.value })}
							>
								<option value='M'>Male</option>
								<option value='F'>Female</option>
								<option value='OTHER'>Other</option>
							</Select>
						</FormControl>
						<FormControl>
							<FormLabel>Phone</FormLabel>
							<Input
								type='tel'
								value={formData.phone}
								onChange={e=> setFormData({ ...formData, phone: e.target.value })}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Extra Info</FormLabel>
							<Textarea
								value={formData.extra}
								onChange={e=> setFormData({ ...formData, extra: e.target.value })}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter gap={2}>
						<Button variant='outline' onClick={closeModal}>Cancel</Button>
						<Button colorScheme='blue' type='submit'>
							{editingCustomer ? 'Update' : 'Create'}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}

export default CustomerDialog
