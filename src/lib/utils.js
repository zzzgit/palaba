import { clsx } from 'clsx'

const cn = (...classes)=> {
	return clsx(classes)
}

// Format date as 'Jan 4, 2026'
const formatDate = (dateString)=> {
	const date = new Date(dateString)
	const options = {
		year: 'numeric', month: 'short', day: 'numeric',
	}
	// e.g., 'Jan 4, 2026'
	return date.toLocaleDateString('en-US', options)
}

export { cn, formatDate }
