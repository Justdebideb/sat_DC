import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function AuthPage({ onBack, onAuthSuccess }) {
  const { login, register, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await login(loginForm.email, loginForm.password, isAdmin);
      setSuccess(isAdmin ? 'Admin login successful!' : 'Login successful!');
      setTimeout(() => {
        onAuthSuccess();
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'address', 'city', 'zip'];
    const missingFields = requiredFields.filter(field => !registerForm[field]);
    if (missingFields.length > 0) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await register(registerForm);
      setSuccess('Registration successful! You are now logged in.');
      setTimeout(() => {
        onAuthSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForms = () => {
    setLoginForm({ email: '', password: '' });
    setRegisterForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      zip: ''
    });
    setError('');
    setSuccess('');
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setIsAdmin(false);
    resetForms();
  };

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>AURA.</span>
        <button style={s.backBtn} onClick={onBack}>Back</button>
      </nav>

      <div style={s.container}>
        {/* Auth Card */}
        <div style={s.authCard}>
          {/* Tab Navigation */}
          <div style={s.tabContainer}>
            <button
              style={{
                ...s.tab,
                ...(activeTab === 'login' ? s.activeTab : {})
              }}
              onClick={() => switchTab('login')}
            >
              Login
            </button>
            <button
              style={{
                ...s.tab,
                ...(activeTab === 'register' ? s.activeTab : {})
              }}
              onClick={() => switchTab('register')}
            >
              Register
            </button>
          </div>

          {/* Messages */}
          {error && <div style={s.errorMessage}>{error}</div>}
          {success && <div style={s.successMessage}>{success}</div>}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form style={s.form} onSubmit={handleLogin}>
              {/* Admin Toggle */}
              <div style={s.adminToggle}>
                <label style={s.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    style={s.checkbox}
                  />
                  Login as Admin
                </label>
              </div>

              <div style={s.formGroup}>
                <input
                  style={s.input}
                  type="email"
                  placeholder={isAdmin ? "Admin Email" : "Email Address"}
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div style={s.formGroup}>
                <input
                  style={s.input}
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  ...s.submitBtn,
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : (isAdmin ? 'Admin Login' : 'Login')}
              </button>

              {/* Demo Credentials */}
              <div style={s.demoCredentials}>
                <p style={s.demoTitle}>Demo Credentials:</p>
                <p style={s.demoText}>
                  User: john@example.com / password123
                </p>
                <p style={s.demoText}>
                  Admin: admin@aura.com / admin123
                </p>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form style={s.form} onSubmit={handleRegister}>
              <div style={s.formRow}>
                <div style={s.formGroup}>
                  <input
                    style={s.input}
                    type="text"
                    placeholder="First Name"
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div style={s.formGroup}>
                  <input
                    style={s.input}
                    type="text"
                    placeholder="Last Name"
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div style={s.formGroup}>
                <input
                  style={s.input}
                  type="email"
                  placeholder="Email Address"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div style={s.formGroup}>
                <input
                  style={s.input}
                  type="tel"
                  placeholder="Phone Number"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>

              <div style={s.formGroup}>
                <input
                  style={s.input}
                  type="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              <div style={s.formGroup}>
                <input
                  style={s.input}
                  type="password"
                  placeholder="Confirm Password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>

              <div style={s.formGroup}>
                <input
                  style={s.input}
                  type="text"
                  placeholder="Street Address"
                  value={registerForm.address}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>

              <div style={s.formRow}>
                <div style={s.formGroup}>
                  <input
                    style={s.input}
                    type="text"
                    placeholder="City"
                    value={registerForm.city}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div style={s.formGroup}>
                  <input
                    style={s.input}
                    type="text"
                    placeholder="Zip Code"
                    value={registerForm.zip}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, zip: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  ...s.submitBtn,
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>

        {/* Welcome Section */}
        <div style={s.welcomeSection}>
          <h2 style={s.welcomeTitle}>Welcome to AURA</h2>
          <p style={s.welcomeText}>
            Your premium destination for authentic sneakers. Join our community of sneaker enthusiasts and discover the latest collections.
          </p>
          <div style={s.features}>
            <div style={s.feature}>
              <span style={s.featureIcon}>👟</span>
              <h3 style={s.featureTitle}>Authentic Products</h3>
              <p style={s.featureDesc}>100% genuine sneakers with warranty</p>
            </div>
            <div style={s.feature}>
              <span style={s.featureIcon}>🚚</span>
              <h3 style={s.featureTitle}>Fast Delivery</h3>
              <p style={s.featureDesc}>Quick shipping across the Philippines</p>
            </div>
            <div style={s.feature}>
              <span style={s.featureIcon}>💳</span>
              <h3 style={s.featureTitle}>Secure Payment</h3>
              <p style={s.featureDesc}>Safe and secure transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  nav: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0 40px',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '900',
    letterSpacing: '-0.5px',
    color: 'white',
  },
  backBtn: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  container: {
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '0 24px',
    display: 'flex',
    gap: '60px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  authCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '480px',
  },
  tabContainer: {
    display: 'flex',
    marginBottom: '32px',
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '4px',
  },
  tab: {
    flex: 1,
    padding: '12px 24px',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  activeTab: {
    background: 'white',
    color: '#111',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  errorMessage: {
    background: '#fee',
    color: '#c53030',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '1px solid #fed7d7',
  },
  successMessage: {
    background: '#f0fdf4',
    color: '#16a34a',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '1px solid #bbf7d0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  adminToggle: {
    marginBottom: '16px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  input: {
    padding: '14px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    background: '#fafafa',
  },
  submitBtn: {
    padding: '16px 32px',
    background: '#111',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    letterSpacing: '0.3px',
  },
  demoCredentials: {
    background: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '16px',
  },
  demoTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    margin: '0 0 8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  demoText: {
    fontSize: '13px',
    color: '#888',
    margin: '0 0 4px',
    fontFamily: 'monospace',
  },
  welcomeSection: {
    flex: 1,
    minWidth: '300px',
    color: 'white',
  },
  welcomeTitle: {
    fontSize: '48px',
    fontWeight: '900',
    margin: '0 0 24px',
    letterSpacing: '-2px',
    lineHeight: 1.1,
  },
  welcomeText: {
    fontSize: '18px',
    lineHeight: 1.6,
    margin: '0 0 40px',
    opacity: 0.9,
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  featureIcon: {
    fontSize: '24px',
    background: 'rgba(255, 255, 255, 0.2)',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 4px',
  },
  featureDesc: {
    fontSize: '14px',
    margin: 0,
    opacity: 0.8,
    lineHeight: 1.4,
  },
};
