// lib/api/client.js
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5270/api";

export async function apiClient(endpoint, options = {}, providedToken = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  let token = providedToken;

  // Server-side auth
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

  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    ...options.headers,
  };

  let body = options.body;
  if (body instanceof FormData) {
    // browser handles content-type
  } else if (body && typeof body === "object") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body,
  });

  // ✅ If access token expired, try refresh
  if (response.status === 401 && typeof window !== "undefined") {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Unauthorized and no refresh token");

    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${refreshToken}` },
    });

    if (!refreshRes.ok) {
      // Refresh failed → logout
      localStorage.removeItem("accessToken"); 
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
      throw new Error("Session expired. Please login again.");
    }

    const refreshData = await refreshRes.json();
    localStorage.setItem("accessToken", refreshData.accessToken);

    // Retry original request with new access token
    headers.Authorization = `Bearer ${refreshData.accessToken}`;
    const retryResponse = await fetch(url, { method: options.method || "GET", headers, body });
    if (!retryResponse.ok) {
      const errorText = await retryResponse.text();
      throw new Error(errorText || `API request failed: ${retryResponse.status}`);
    }
    return retryResponse.json();
  }

  // Original response handling
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed: ${response.status}`);
  }

  try {
    return await response.json();
  } catch {
    return {};
  }
}


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

  
  updateEmployee: (id, employeeData) =>
    apiClient(`/employees/${id}`, { 
      method: 'PUT', 
      body: employeeData 
    }),
  
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

 