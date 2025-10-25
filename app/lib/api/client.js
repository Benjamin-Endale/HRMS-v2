// lib/api/client.js
import { getSession, signOut } from "next-auth/react";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5270/api";

export async function apiClient(endpoint, options = {}, providedToken = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  let token = providedToken;

  // Server-side auth (Next.js server components)
  if (!token && typeof window === "undefined") {
    try {
      const { auth } = await import("@/app/auth");
      const session = await auth();
      token = session?.user?.accessToken;
    } catch (err) {
      console.warn("Auth not available server-side:", err.message);
    }
  }

  // Client-side fallback
  if (!token && typeof window !== "undefined") {
    const session = await getSession();
    token = session?.accessToken || localStorage.getItem("accessToken");
  }

  const config = {
    method: options.method || "GET",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  let body = options.body;
  if (body && !(body instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(body);
  } else if (body) {
    config.body = body;
  }

  try {
    const response = await fetch(url, config);

    // 🟡 If access token expired → try refresh
    if (response.status === 401 && typeof window !== "undefined") {
      console.log("Access token expired, attempting refresh...");
      
      const refreshResult = await handleTokenRefresh();
      
      if (refreshResult.success) {
        // Retry original request with new access token
        config.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
        const retryResponse = await fetch(url, config);
        
        if (!retryResponse.ok) {
          const errorText = await retryResponse.text();
          throw new Error(errorText || `API request failed: ${retryResponse.status}`);
        }

        return await parseResponse(retryResponse);
      } else {
        // Refresh failed, redirect to login
        await redirectToLogin(refreshResult.error || "Session expired");
        return;
      }
    }

    // ✅ Handle normal success or other errors
    if (!response.ok) {
      const errorText = await response.text();
      
      // Handle "No data found" as a non-error case - RETURN EMPTY ARRAY
      if (errorText.includes('No employees found') || 
          errorText.includes('No tenants found') || 
          errorText.includes('No organizations found')) {
        console.log(`Info: ${errorText}`);
        return []; // Return empty array instead of throwing error
      }
      
      // Handle other errors normally
      throw new Error(errorText || `API request failed: ${response.status}`);
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
// 🔄 Handle token refresh
async function handleTokenRefresh() {
  try {
    const session = await getSession();
    const refreshToken = session?.refreshToken || localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return { success: false, error: "No refresh token available" };
    }

    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // 🟥 If refresh token also expired or invalid
    if (refreshRes.status === 401 || refreshRes.status === 403) {
      return { success: false, error: "Refresh token expired or invalid" };
    }

    if (!refreshRes.ok) {
      const errorText = await refreshRes.text();
      return { success: false, error: errorText || "Refresh failed" };
    }

    const refreshData = await refreshRes.json();

    if (!refreshData.accessToken) {
      return { success: false, error: "No access token in refresh response" };
    }

    // Save new tokens
    localStorage.setItem("accessToken", refreshData.accessToken);
    if (refreshData.refreshToken) {
      localStorage.setItem("refreshToken", refreshData.refreshToken);
    }

    // Update NextAuth session if available
    if (typeof window !== "undefined" && window.nextAuth) {
      // You might need to update the session here
      // This depends on your NextAuth configuration
    }

    return { 
      success: true, 
      accessToken: refreshData.accessToken,
      refreshToken: refreshData.refreshToken 
    };

  } catch (error) {
    console.error("Token refresh error:", error);
    return { success: false, error: error.message };
  }
}

// 🔁 Redirect helper
async function redirectToLogin(message = "Session expired") {
  console.warn("Redirecting to login:", message);
  
  // Clear local storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  
  // Sign out from NextAuth
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.warn("NextAuth signout error:", error);
  }
  
  // Redirect to login
  window.location.href = "/Login";
}

// 📄 Parse response helper
async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (error) {
      console.warn("Failed to parse JSON response:", error);
      return null;
    }
  }
  
  // Handle empty responses or other content types
  const text = await response.text();
  return text ? text : null;
}

// // Optional: Utility function to check token status
// export async function validateTokens() {
//   if (typeof window === "undefined") return { isValid: false };
  
//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");
  
//   if (!accessToken && !refreshToken) {
//     return { isValid: false, reason: "No tokens available" };
//   }
  
//   // You could add JWT expiration check here if tokens are JWTs
//   // const isAccessTokenExpired = checkJWTExpiration(accessToken);
  
//   return { 
//     isValid: !!accessToken, 
//     hasRefreshToken: !!refreshToken 
//   };
// }
// 🔐 ADD THESE NEW AUTHENTICATION METHODS BELOW 🔐

// Authentication-specific API methods
// 🔐 AUTHENTICATION METHODS 🔐
export const authAPI = {
  /**
   * Login with credentials
   * @param {Object} credentials - username and password
   * @returns {Promise} - API response
   */
  login: (credentials) =>
    apiClient('/auth/login', { 
      method: 'POST', 
      body: credentials 
    }),

  /**
   * Verify OTP code
   * @param {string} username - Username or email
   * @param {string} otp - OTP code
   * 
   * @returns {Promise} - Verification response with tokens
   */
  verifyOtp: (username, otp) =>
    apiClient('/auth/verify-otp', {
      method: 'POST',
      body: { UsernameOrEmail:username,OtpCode: otp  }
    }),

  /**
   * Resend OTP code
   * @param {string} username - Username or email
   * @returns {Promise} - Resend confirmation
   */
  resendOtp: (username) =>
    apiClient('/auth/resend-otp', {
      method: 'POST',
      body: { UsernameOrEmail: username }
    }),

  /**
   * Get user profile with authentication token
   * @param {string} token - JWT token
   * @returns {Promise} - User profile data
   */
  getUserProfile: (token) =>
    apiClient('/users/profile', { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }),


      // 🏢 Tenant / Organization management
  createTenant: (tenantData) =>
    apiClient('/tenants', {
      method: 'POST',
      body: tenantData,
    }),

      createOrganizations: (orgData, options = {}) =>
        apiClient("/organizations", {
          method: "POST",
          body: orgData,
          ...options,
        }),

        

  /**
   * Validate JWT token
   * @param {string} token - JWT token to validate
   * @returns {Promise} - Validation response
   */
  validateToken: (token) =>
    apiClient('/auth/validate', { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    }),

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} - New tokens
   */
  refreshToken: (refreshToken) =>
    apiClient('/auth/refresh', {
      method: 'POST',
      body: { refreshToken }
    }),

  /**
   * Logout user (invalidate token)
   * @param {string} token - JWT token to invalidate
   * @returns {Promise} - Logout confirmation
   */
  logout: (token) =>
    apiClient('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};

// 🏢 ADD THESE HRMS-SPECIFIC METHODS 🏢

// HRMS business API methods
export const hrmsAPI = {
  // Employee management
  // getEmployees: (params = {}) =>
  //   apiClient(`/employees?${new URLSearchParams(params)}`),
// hrmsAPI.js
getEmployeeById: (id, token) => apiClient(`/employees/${id}`, { method: "GET" }, token),

getEmployeesTenant: (tenantId, token) =>
  apiClient(`/employees/by-tenant/${tenantId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),


  getEmployees: (token) =>
  apiClient('/employees/all', 
    { 
      method: 'GET' },
     token),



getOrganizations: (token) =>
  apiClient('/organizations', 
    { 
      method: 'GET' },
     token),


  getUser: (tenantId, token) =>
    apiClient(`/users/by-tenant/${tenantId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),


  getuserAdmins:() =>
    apiClient(`/users/superadmins`),

getTenantSystemAdmin: (tenantId, token) =>
  apiClient(`/users/systemadmin/${tenantId}`, {}, token),

getTenantEmployees: (tenantId, token) =>
  apiClient(`/employees/total-employees/${tenantId}`, {}, token),  

  createEmployee: (employees, token) =>
    apiClient('/employees', {
      method: 'POST',
      body: employees, 
    }, token),

    getTenantModule: (id, token) => 
        apiClient(`/tenants/${id}/modules`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),


  createTenant: (tenants) =>
    apiClient('/tenants', { 
      method: 'POST', 
      body: tenants 
}),


createPermanentSettings: (settings) =>
  apiClient('/PermanentTenantSetting', {
    method: 'POST',
    body: settings,  
  }),

getPermanentSettings: (token) =>
  apiClient('/PermanentTenantSetting', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`
    }
  }),


  createSuperadmin: (userData) =>
    apiClient('/users', { 
      method: 'POST', 
      body: userData 
    }),
  createUser: (userData) =>
    apiClient('/users', { 
      method: 'POST', 
      body: userData 
    }),



  touchLogin: (id) =>
    apiClient(`/users/${id}/touch-login`, {
      method: 'POST',
    }),

  
  updateEmployee: (id,employeeData ,token) =>
    apiClient(`/employees/${id}`, {
      method: 'PUT',
      body: employeeData, 
    }, token),

  deleteEmployee: (id) =>
    apiClient(`/employees/${id}`, { 
      method: 'DELETE' 
    }),

  deleteUser: (id) =>
    apiClient(`/users/${id}`, { 
      method: 'DELETE' 
    }),

  // Organization management
    getTenant: (token) =>
      apiClient('/tenants', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

        
      getTenantById: (id, token) =>
        apiClient(`/tenants/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

  // Attendance management
  getAttendanceRecords: (params = {}) =>
    apiClient(`/attendance?${new URLSearchParams(params)}`),
  
  clockIn: (employeeId, data) =>
    apiClient(`/attendance/${employeeId}/clock-in`, {
      method: 'POST',
      body: data
    }),
  
  clockOut: (employeeId, data) =>
    apiClient(`/attendance/${employeeId}/clock-out`, {
      method: 'POST',
      body: data
    }),

  // Payroll management
  getPayrollRecords: (employeeId, period) =>
    apiClient(`/payroll/${employeeId}?period=${period}`),
  
  generatePayroll: (period) =>
    apiClient('/payroll/generate', {
      method: 'POST',
      body: { period }
    }),

  // Department management
  getDepartments: () =>
    apiClient('/departments'),
  
  getDepartmentEmployees: (departmentId) =>
    apiClient(`/departments/${departmentId}/employees`)
};

// 🎯 USAGE EXAMPLES:

/*
// 1. Authentication
const loginResponse = await authAPI.login({
  username: 'john.doe',
  password: 'password123'
});

// 2. Get employee data
const employees = await hrmsAPI.getEmployees();

// 3. Create new employee
const newEmployee = await hrmsAPI.createEmployee({
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@company.com',
  position: 'HR Manager',
  department: 'Human Resources',
  salary: 75000
});

// 4. Get attendance records for current month
const attendance = await hrmsAPI.getAttendanceRecords({
  month: '2024-01',
  employeeId: '123'
});
*/

 