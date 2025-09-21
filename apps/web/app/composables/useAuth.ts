import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse,
} from "~/types/auth";

export const useAuth = () => {
  const config = useRuntimeConfig();
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const isLoading = ref(false);

  // Initialize auth state from localStorage
  const initAuth = () => {
    if (process.client) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("accessToken");

      if (storedUser && storedToken) {
        try {
          user.value = JSON.parse(storedUser);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          clearAuth();
        }
      }
    }
  };

  // Clear auth state
  const clearAuth = () => {
    user.value = null;
    if (process.client) {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  // Login function
  const login = async (
    credentials: LoginRequest,
  ): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true;
    try {
      const { data } = await $fetch<AuthResponse>(
        `${config.public.apiBase}/auth/login`,
        {
          method: "POST",
          body: credentials,
          credentials: "include",
        },
      );

      if (data.success) {
        user.value = data.data.user;

        if (process.client) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
        }

        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Register function
  const register = async (
    userData: RegisterRequest,
  ): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true;
    try {
      const { data } = await $fetch<AuthResponse>(
        `${config.public.apiBase}/auth/register`,
        {
          method: "POST",
          body: userData,
          credentials: "include",
        },
      );

      if (data.success) {
        user.value = data.data.user;

        if (process.client) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
        }

        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      console.error("Register error:", error);
      return {
        success: false,
        message: error.data?.message || "Đăng ký thất bại. Vui lòng thử lại.",
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await $fetch(`${config.public.apiBase}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
      await navigateTo("/login");
    }
  };

  // Get user profile
  const getProfile = async (): Promise<User | null> => {
    try {
      const { data } = await $fetch<ApiResponse<User>>(
        `${config.public.apiBase}/users/profile`,
        {
          credentials: "include",
        },
      );

      if (data.success && data.data) {
        user.value = data.data;
        if (process.client) {
          localStorage.setItem("user", JSON.stringify(data.data));
        }
        return data.data;
      }
      return null;
    } catch (error) {
      console.error("Get profile error:", error);
      clearAuth();
      return null;
    }
  };

  // Initialize auth on composable creation
  initAuth();

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    login,
    register,
    logout,
    getProfile,
    clearAuth,
  };
};
