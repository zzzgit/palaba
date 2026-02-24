import Sidebar from './Sidebar.jsx';
import Banner from './Banner.jsx';
import '../styles/layout.css';

export default function MainLayout(props) {
  const getBreadcrumbs = () => {
    const page = props.currentPage || 'dashboard';
    const breadcrumbs = [
      { label: 'Home', path: 'dashboard' }
    ];

    if (page !== 'dashboard') {
      const pageLabels = {
        customers: 'Customer Management',
        sales: 'Sales Management'
      };
      breadcrumbs.push({ label: pageLabels[page], path: page, active: true });
    } else {
      breadcrumbs[0].active = true;
    }

    return breadcrumbs;
  };

  return (
    <div class="holy-grail-layout">
      <Banner />
      <div class="holy-grail-body">
        <Sidebar activePage={props.currentPage} onNavigate={props.onNavigate} />
        <main class="holy-grail-content">
          <div class="breadcrumbs">
            {getBreadcrumbs().map((crumb, index) => (
              <>
                {index > 0 && <span class="breadcrumb-separator">/</span>}
                <a
                  class={`breadcrumb-item ${crumb.active ? 'active' : ''}`}
                  onClick={() => !crumb.active && props.onNavigate(crumb.path)}
                >
                  {crumb.label}
                </a>
              </>
            ))}
          </div>
          <div class="content-wrapper">
            {props.children}
          </div>
        </main>
      </div>
    </div>
  );
}
