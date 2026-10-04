import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

const defaultUser = {
  name: 'Mai Linh',
  email: 'mailinh@todayly.vn',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5',
  bio: 'Yêu thích lối sống tối giản, thảnh thơi và tích cực mỗi ngày.',
  city: 'Đà Nẵng',
  wakeUpTime: '06:30',
  sleepTime: '23:00',
  dietaryPreference: 'Thanh đạm, ít ngọt',
  favoriteStyle: 'Smart-Casual',
  transportation: 'Xe máy & Đi bộ',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('todayly_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });
  const [token, setToken] = useState(() => localStorage.getItem('todayly_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem('todayly_token');
      if (storedToken) {
        try {
          const freshUser = await authService.getCurrentUser();
          setUser(freshUser);
        } catch {
          // Nếu backend tạm thời offline, vẫn giữ user từ local
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const updateUserPreferences = async (preferences) => {
    const updated = await authService.updatePreferences(preferences);
    setUser(updated);
    return updated;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        login,
        register,
        updateUserPreferences,
        logout,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
