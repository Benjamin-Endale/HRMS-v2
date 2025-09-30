// lib/api/client.js
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5270/api';

// Base API client function (already exists)
export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (options.body && typeof options.body !== 'string') {
    config.body = JSON.stringify(options.body);
  }
 
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API Error: ${response.status}`);
  }

  return response.json();
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
  getEmployees: (params = {}) =>
    apiClient(`/employees?${new URLSearchParams(params)}`),
  
  getEmployeeById: (id) =>
    apiClient(`/employees/${id}`),
  
  getuser:() =>
    apiClient(`/users`),

  getuserAdmins:() =>
    apiClient(`/users/superadmins`),


  createEmployee: (employeeData) =>
    apiClient('/employees', { 
      method: 'POST', 
      body: employeeData 
    }),

  createSuperadmin: (userData) =>
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
  getOrganizations: () =>
    apiClient('/tenants'),
  
  getOrganizationById: (id) =>
    apiClient(`/organizations/${id}`),

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