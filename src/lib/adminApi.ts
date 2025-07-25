import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { API_URL } from '@/config/env';

// Admin Fields API
export const adminFieldsApi = {
  getAll: () => apiGet(`${API_URL}/api/v1/admin/fields`),
  getById: (id: number) => apiGet(`${API_URL}/api/v1/admin/fields/${id}`),
  create: (data: any) => apiPost(`${API_URL}/api/v1/admin/fields`, data),
  update: (id: number, data: any) => apiPut(`${API_URL}/api/v1/admin/fields/${id}`, data),
  delete: (id: number) => apiDelete(`${API_URL}/api/v1/admin/fields/${id}`),
};

// Admin Users API
export const adminUsersApi = {
  getAll: () => apiGet(`${API_URL}/api/v1/admin/users`),
  getById: (id: string) => apiGet(`${API_URL}/api/v1/admin/users/${id}`),
  update: (id: string, data: any) => apiPut(`${API_URL}/api/v1/admin/users/${id}`, data),
  delete: (id: string) => apiDelete(`${API_URL}/api/v1/admin/users/${id}`),
}; 