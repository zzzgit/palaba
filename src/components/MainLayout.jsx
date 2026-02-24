import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import '../styles/layout.css';

export default function MainLayout(props) {
  return (
    <div class="app-layout">
      <Sidebar activePage={props.currentPage} onNavigate={props.onNavigate} />
      <div class="main-content">
        <Header currentPage={props.currentPage} onNavigate={props.onNavigate} />
        <div class="content-wrapper">
          {props.children}
        </div>
      </div>
    </div>
  );
}
