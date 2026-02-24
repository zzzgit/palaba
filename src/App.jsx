import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
import MainLayout from './components/MainLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CustomerManagement from './pages/CustomerManagement.jsx';
import SalesManagement from './pages/SalesManagement.jsx';
import './styles/global.css';
import './styles/layout.css';

function App() {
  const [currentPage, setCurrentPage] = createSignal('dashboard');

  const renderPage = () => {
    switch (currentPage()) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'sales':
        return <SalesManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout currentPage={currentPage()} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

render(() => <App />, document.getElementById('root'));
