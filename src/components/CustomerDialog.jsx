import { Show } from 'solid-js'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../components/ui/Dialog.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Select } from '../components/ui/Select.jsx'
import { Button } from '../components/ui/Button.jsx'

const CustomerDialog = (props)=> {
	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Show when={props.editingCustomer()} fallback='Add New Customer'>
							Edit Customer
						</Show>
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={e=> props.handleSubmit(e)}>
					<div style={{
						'margin-bottom': '16px',
					}}>
						<label style={{
							display: 'block',
							'margin-bottom': '8px',
							'font-weight': '500',
						}}>Name</label>
						<Input
							type='text'
							value={props.formData().name}
							onInput={e=> props.setFormData({ ...props.formData(), name: e.target.value })}
							required
						/>
					</div>
					<div style={{
						'margin-bottom': '16px',
					}}>
						<label style={{
							display: 'block',
							'margin-bottom': '8px',
							'font-weight': '500',
						}}>Gender</label>
						<Select
							value={props.formData().gender}
							onChange={e=> props.setFormData({ ...props.formData(), gender: e.target.value })}
						>
							<option value='M'>Male</option>
							<option value='F'>Female</option>
							<option value='OTHER'>Other</option>
						</Select>
					</div>
					<div style={{
						'margin-bottom': '16px',
					}}>
						<label style={{
							display: 'block',
							'margin-bottom': '8px',
							'font-weight': '500',
						}}>Phone</label>
						<Input
							type='tel'
							value={props.formData().phone}
							onInput={e=> props.setFormData({ ...props.formData(), phone: e.target.value })}
						/>
					</div>
					<div style={{
						'margin-bottom': '24px',
					}}>
						<label style={{
							display: 'block',
							'margin-bottom': '8px',
							'font-weight': '500',
						}}>Extra Info</label>
						<textarea
							class='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
							style={{ 'min-height': '80px' }}
							value={props.formData().extra}
							onInput={e=> props.setFormData({ ...props.formData(), extra: e.target.value })}
						/>
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={props.closeModal}>Cancel</Button>
						<Button type='submit'>
							<Show when={props.editingCustomer()} fallback='Create'>Update</Show>
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CustomerDialog
