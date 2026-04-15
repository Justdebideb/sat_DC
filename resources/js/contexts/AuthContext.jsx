import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutIntent, setCheckoutIntent] = useState(false);

  // Load user session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aura-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('aura-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('aura-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aura-user');
    }
  }, [user]);

  const login = (email, password, isAdmin = false) => {
    // Mock authentication - in real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check admin credentials
        if (isAdmin) {
          if (email === 'admin@aura.com' && password === 'admin123') {
            const adminUser = {
              id: 'admin-1',
              email: 'admin@aura.com',
              name: 'Admin User',
              role: 'admin',
              avatar: '👤'
            };
            setUser(adminUser);
            resolve(adminUser);
          } else {
            reject(new Error('Invalid admin credentials'));
          }
          return;
        }

        // Check regular user credentials
        const mockUsers = [
          {
            id: 'user-1',
            email: 'john@example.com',
            password: 'password123',
            name: 'John Doe',
            role: 'user',
            avatar: '👤',
            phone: '+63 912 345 6789',
            addresses: [
              {
                id: 'addr-1',
                firstName: 'John',
                lastName: 'Doe',
                phone: '+63 912 345 6789',
                address: '123 Makati Avenue',
                city: 'Makati',
                zip: '1200',
                isDefault: true
              }
            ]
          },
          {
            id: 'user-2',
            email: 'jane@example.com',
            password: 'password123',
            name: 'Jane Smith',
            role: 'user',
            avatar: '👤',
            phone: '+63 923 456 7890',
            addresses: [
              {
                id: 'addr-2',
                firstName: 'Jane',
                lastName: 'Smith',
                phone: '+63 923 456 7890',
                address: '456 Quezon City',
                city: 'Quezon City',
                zip: '1100',
                isDefault: true
              }
            ]
          }
        ];

        const foundUser = mockUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock registration - in real app, this would be an API call
        const newUser = {
          id: `user-${Date.now()}`,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          role: 'user',
          avatar: '👤',
          phone: userData.phone,
          addresses: [
            {
              id: `addr-${Date.now()}`,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phone: userData.phone,
              address: userData.address,
              city: userData.city,
              zip: userData.zip,
              isDefault: true
            }
          ]
        };

        setUser(newUser);
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setCheckoutIntent(false);
  };

  const requireAuth = () => {
    if (!user) {
      setCheckoutIntent(true);
      return false;
    }
    return true;
  };

  const clearCheckoutIntent = () => {
    setCheckoutIntent(false);
  };

  const value = {
    user,
    isLoading,
    checkoutIntent,
    login,
    register,
    logout,
    requireAuth,
    clearCheckoutIntent,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
