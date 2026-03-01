import {
	Field,
	Input,
	RadioGroup,
	Textarea,
} from '@chakra-ui/react'
import Dialog from './common/Dialog'

const CustomerDialog = ({
	open, editingCustomer, formData, setFormData, handleSubmit, closeModal,
})=> {
	return (
		<Dialog
			cancelText='Cancel'
			formOnSubmit={handleSubmit}
			isForm
			isOpen={open}
			onClose={closeModal}
			saveText={editingCustomer ? 'Update' : 'Create'}
			showCloseButton
			title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
		>
			<div style={{
				display: 'flex', flexDirection: 'column', gap: '1rem',
			}}
			>
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
					<RadioGroup.Root
						alignItems='center'
						display='flex'
						gap='4'
						onValueChange={value=> setFormData({ ...formData, gender: value.value })}
						value={formData.gender || 'M'}
					>
						<RadioGroup.Item value='M'>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemIndicator />
							<RadioGroup.ItemText>Male</RadioGroup.ItemText>
						</RadioGroup.Item>
						<RadioGroup.Item value='F'>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemIndicator />
							<RadioGroup.ItemText>Female</RadioGroup.ItemText>
						</RadioGroup.Item>
						<RadioGroup.Item value='OTHER'>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemIndicator />
							<RadioGroup.ItemText>Other</RadioGroup.ItemText>
						</RadioGroup.Item>
					</RadioGroup.Root>
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
			</div>
		</Dialog>
	)
}

export default CustomerDialog
