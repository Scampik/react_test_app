import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import LoginPage from './Login';
import ChatPage from './MainPage';
import PageNotFound from './PageNotFound.jsx';
import SignUp from './Registration';
import { useAuth } from '../hooks/index.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.userName ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.userName ? (
    <Button onClick={auth.logOut}>{t('exit')}</Button>
  ) : (
    <></>
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" bg="white" expand="lg">
          <div className="container">
            <Navbar.Brand as={Link} to="/">
              {t('siteName')}
            </Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Routes>
          <Route element={<div>{t('noPageSelected')}</div>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
