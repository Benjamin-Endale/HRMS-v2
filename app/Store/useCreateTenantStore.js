'use client'
import { create } from 'zustand'

export const useCreateOrganizationStore = create((set) => ({
  tenantData: {},
  adminData: {},
  compensationData: {},
  useraccess: {},

  setTenantData: (data) => set((state) => ({ tenantData: { ...state.tenantData, ...data } })),
  setAdminData: (data) => set((state) => ({ adminData: { ...state.adminData, ...data } })),
  setCompensationData: (data) => set((state) => ({ compensationData: { ...state.compensationData, ...data } })),
  setUserAccess: (data) => set((state) => ({ useraccess: { ...state.useraccess, ...data } })),

  resetAll: () => set({ tenantData: {}, adminData: {}, compensationData: {}, useraccess: {} }),
}))
