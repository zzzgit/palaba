import { createSignal, onMount, Show, For } from 'solid-js';
import { mockCustomerAPI } from '../mocks/mockAPI.js';
import '../styles/global.css';

export default function CustomerManagement() {
  const [customers, setCustomers] = createSignal([]);
  const [filteredCustomers, setFilteredCustomers] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [statusFilter, setStatusFilter] = createSignal('all');
  const [showModal, setShowModal] = createSignal(false);
  const [editingCustomer, setEditingCustomer] = createSignal(null);

  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    status: 'active'
  });

  onMount(async () => {
    await loadCustomers();
  });

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await mockCustomerAPI.getAll();
      if (response.success) {
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterCustomers(value, statusFilter());
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    filterCustomers(searchTerm(), value);
  };

  const filterCustomers = (search, status) => {
    let filtered = customers();

    if (search) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }

    setFilteredCustomers(filtered);
  };

  const openModal = (customer = null) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        status: customer.status
      });
    } else {
      setEditingCustomer(null);
      setFormData({ name: '', email: '', status: 'active' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
    setFormData({ name: '', email: '', status: 'active' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer()) {
        await mockCustomerAPI.update(editingCustomer().id, formData());
      } else {
        await mockCustomerAPI.create(formData());
      }
      await loadCustomers();
      closeModal();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await mockCustomerAPI.delete(id);
        await loadCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: 'badge-success',
      inactive: 'badge-error',
      pending: 'badge-warning'
    };
    return statusMap[status] || 'badge-info';
  };

  return (
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Customer Management</h1>
        <p class="page-subtitle">Manage your customer database</p>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h3 class="card-title">Customers</h3>
          <div class="table-actions">
            <input
              type="text"
              class="search-box"
              placeholder="Search customers..."
              value={searchTerm()}
              onInput={(e) => handleSearch(e.target.value)}
            />
            <select
              class="search-box"
              style="width: 150px;"
              value={statusFilter()}
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <button class="btn btn-primary" onClick={() => openModal()}>
              + Add Customer
            </button>
          </div>
        </div>

        {loading() ? (
          <div class="loading">Loading customers...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <For each={filteredCustomers()}>
                {(customer) => (
                  <tr>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <span class={`badge ${getStatusBadge(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td>{customer.joinDate}</td>
                    <td>{customer.totalOrders}</td>
                    <td>{formatCurrency(customer.totalSpent)}</td>
                    <td class="table-actions-cell">
                      <button
                        class="btn btn-secondary btn-small"
                        onClick={() => openModal(customer)}
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-secondary btn-small"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        )}

        <Show when={filteredCustomers().length === 0 && !loading()}>
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <div class="empty-state-text">No customers found</div>
          </div>
        </Show>
      </div>

      {/* Modal */}
      <Show when={showModal()}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          'background-color': 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'z-index': 1000
        }}>
          <div style={{
            background: 'white',
            padding: '32px',
            'border-radius': '8px',
            width: '500px',
            'max-width': '90%'
          }}>
            <h2 style={{ 'margin-bottom': '24px' }}>
              {editingCustomer() ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ 'margin-bottom': '16px' }}>
                <label style={{ display: 'block', 'margin-bottom': '8px', 'font-weight': '500' }}>
                  Name
                </label>
                <input
                  type="text"
                  class="search-box"
                  style={{ width: '100%' }}
                  value={formData().name}
                  onInput={(e) => setFormData({ ...formData(), name: e.target.value })}
                  required
                />
              </div>
              <div style={{ 'margin-bottom': '16px' }}>
                <label style={{ display: 'block', 'margin-bottom': '8px', 'font-weight': '500' }}>
                  Email
                </label>
                <input
                  type="email"
                  class="search-box"
                  style={{ width: '100%' }}
                  value={formData().email}
                  onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
                  required
                />
              </div>
              <div style={{ 'margin-bottom': '24px' }}>
                <label style={{ display: 'block', 'margin-bottom': '8px', 'font-weight': '500' }}>
                  Status
                </label>
                <select
                  class="search-box"
                  style={{ width: '100%' }}
                  value={formData().status}
                  onChange={(e) => setFormData({ ...formData(), status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', 'justify-content': 'flex-end' }}>
                <button type="button" class="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  {editingCustomer() ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Show>
    </div>
  );
}
