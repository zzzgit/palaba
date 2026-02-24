import { createSignal, onMount, Show, For } from 'solid-js';
import { mockSalesAPI } from '../mocks/mockAPI.js';
import '../styles/global.css';

export default function SalesManagement() {
  const [sales, setSales] = createSignal([]);
  const [filteredSales, setFilteredSales] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [statusFilter, setStatusFilter] = createSignal('all');

  onMount(async () => {
    await loadSales();
  });

  const loadSales = async () => {
    setLoading(true);
    try {
      const response = await mockSalesAPI.getAll();
      if (response.success) {
        setSales(response.data);
        setFilteredSales(response.data);
      }
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterSales(value, statusFilter());
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    filterSales(searchTerm(), value);
  };

  const filterSales = (search, status) => {
    let filtered = sales();

    if (search) {
      filtered = filtered.filter(s =>
        s.customerName.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toString().includes(search)
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(s => s.status === status);
    }

    setFilteredSales(filtered);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await mockSalesAPI.updateStatus(id, newStatus);
      await loadSales();
    } catch (error) {
      console.error('Error updating status:', error);
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
      completed: 'badge-success',
      processing: 'badge-warning',
      pending: 'badge-info',
      cancelled: 'badge-error'
    };
    return statusMap[status] || 'badge-info';
  };

  const calculateTotalRevenue = () => {
    return filteredSales().reduce((sum, sale) => sum + sale.amount, 0);
  };

  const calculateAverageOrder = () => {
    const total = calculateTotalRevenue();
    const count = filteredSales().length;
    return count > 0 ? total / count : 0;
  };

  return (
    <div class="container">
      {/* Summary Stats */}
      <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr);">
        <div class="stat-card">
          <div class="stat-label">Total Orders</div>
          <div class="stat-value">{filteredSales().length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Revenue</div>
          <div class="stat-value">{formatCurrency(calculateTotalRevenue())}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Average Order</div>
          <div class="stat-value">{formatCurrency(calculateAverageOrder())}</div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <h3 class="card-title">Sales Transactions</h3>
          <div class="table-actions">
            <input
              type="text"
              class="search-box"
              placeholder="Search by customer or order ID..."
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
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {loading() ? (
          <div class="loading">Loading sales...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <For each={filteredSales()}>
                {(sale) => (
                  <tr>
                    <td>#{sale.id}</td>
                    <td>{sale.customerName}</td>
                    <td>{sale.orderDate}</td>
                    <td>{sale.items}</td>
                    <td>{formatCurrency(sale.amount)}</td>
                    <td>
                      <span class={`badge ${getStatusBadge(sale.status)}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td class="table-actions-cell">
                      <Show when={sale.status === 'pending'}>
                        <button
                          class="btn btn-secondary btn-small"
                          onClick={() => handleUpdateStatus(sale.id, 'processing')}
                        >
                          Process
                        </button>
                      </Show>
                      <Show when={sale.status === 'processing'}>
                        <button
                          class="btn btn-secondary btn-small"
                          onClick={() => handleUpdateStatus(sale.id, 'completed')}
                        >
                          Complete
                        </button>
                      </Show>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        )}

        <Show when={filteredSales().length === 0 && !loading()}>
          <div class="empty-state">
            <div class="empty-state-icon">📦</div>
            <div class="empty-state-text">No sales transactions found</div>
          </div>
        </Show>
      </div>
    </div>
  );
}
