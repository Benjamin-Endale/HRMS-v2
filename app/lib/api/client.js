// lib/api/client.js
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5270/api";

export async function apiClient(endpoint, options = {}, providedToken = null) {
  const url = `${API_BASE_URL}${endpoint}`;

  let token = providedToken;

  // 🧩 Server-side auth
  if (!token && typeof window === "undefined") {
    try {
      const { auth } = await import("@/app/auth");
      const session = await auth();
      token = session?.user?.accessToken;
    } catch (err) {
      console.warn("Auth not available server-side:", err.message);
    }
  }

  // 🧩 Client-side auth fallback
  if (!token && typeof window !== "undefined") {
    const session = await getSession();
    token = session?.accessToken || localStorage.getItem("accessToken");
  }

  // 🧩 Set up headers
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    ...options.headers,
  };

  // 🧩 Handle FormData vs JSON automatically
  let body = options.body;
  if (body instanceof FormData) {
    // Do NOT set Content-Type manually — browser will handle it
  } else if (body && typeof body === "object") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  // 🧩 Execute fetch
  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body,
  });

  // 🧩 Handle response
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed: ${response.status}`);
  }

  try {
    return await response.json();
  } catch {
    return {}; // Handle empty or non-JSON responses
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
  
  getEmployeeById: (id) =>
    apiClient(`/employees/${id}`),

getEmployees: (token) =>
  apiClient('/employees', 
    { 
      method: 'GET' },
     token),

getOrganizations: (token) =>
  apiClient('/organizations', 
    { 
      method: 'GET' },
     token),


  getuser:() =>
    apiClient(`/users`),

  getuserAdmins:() =>
    apiClient(`/users/superadmins`),

getTenantSystemAdmin: (tenantId, token) =>
  apiClient(`/users/systemadmin/${tenantId}`, {}, token),

getTenantEmployees: (tenantId, token) =>
  apiClient(`/employees/total-employees/${tenantId}`, {}, token),  

  createEmployee: (employees, token) =>
    apiClient('/employees', {
      method: 'POST',
      body: employees, // Can be FormData or JSON
    }, token),


    

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

  // Organization management
    getTenant: (token) =>
      apiClient('/tenants', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

  
  getTenantById: (id) =>
    apiClient(`/tenants/${id}`),

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

 