# Authentication System

This document explains how the authentication system works in the FieldBook application.

## Overview

The authentication system provides:
- Secure login with email/password
- Role-based access control (admin/customer)
- Automatic token management with refresh tokens
- Route protection
- Automatic token validation and refresh

## Key Components

### 1. AuthContext (`src/contexts/AuthContext.tsx`)
- Manages authentication state
- Handles login/logout operations
- Stores and validates access tokens and refresh tokens
- Provides authentication status to components

### 2. ProtectedRoute (`src/components/ProtectedRoute.tsx`)
- Protects routes from unauthorized access
- Redirects to login if not authenticated
- Enforces role-based access control
- Shows loading state during authentication check

### 3. API Utilities (`src/lib/api.ts`)
- Handles authenticated API requests
- Automatically includes access tokens
- Implements automatic token refresh on 401 responses
- Provides convenient API methods

### 4. Token Refresh Hook (`src/hooks/useTokenRefresh.ts`)
- Monitors token expiration
- Automatically refreshes tokens before they expire
- Handles both access and refresh tokens
- Runs every 5 minutes to check token validity

## How It Works

### Login Flow
1. User enters credentials on `/signin` page
2. `AuthContext.login()` sends request to backend
3. Backend returns access token, refresh token, and user data
4. Tokens are stored in localStorage (`fieldbook_token` and `fieldbook_refresh_token`)
5. User data is stored in localStorage as `fieldbook_user`
6. User is redirected to appropriate dashboard

### Token Refresh Flow
1. When access token is about to expire (within 10 minutes)
2. System automatically calls `/api/v1/auth/refresh` with refresh token
3. Backend returns new access token and refresh token
4. New tokens are stored in localStorage
5. User session continues seamlessly

### Route Protection
1. `ProtectedRoute` checks authentication status
2. If not authenticated, redirects to `/signin`
3. If authenticated but wrong role, redirects to correct dashboard
4. If authenticated and correct role, renders protected content

### Token Management
1. Access tokens are automatically included in API requests
2. Tokens are validated on app startup using JWT expiration
3. Expired tokens trigger automatic refresh
4. Failed refresh attempts trigger logout
5. Logout clears all tokens and user data

### Logout Flow
1. User clicks logout button
2. `AuthContext.logout()` is called
3. Backend logout endpoint is called (if available)
4. Local tokens and user data are cleared
5. User is redirected to home page

## API Endpoints

The system expects the backend to provide these endpoints:

### Login
- **Endpoint**: `POST /api/v1/auth/login`
- **Request**: `{ email, password, role }`
- **Response**: `{ access_token, refresh_token, user }`

### Refresh Token
- **Endpoint**: `POST /api/v1/auth/refresh`
- **Request**: `{ refresh_token }`
- **Response**: `{ data: { access_token, refresh_token, token_type, expires_in, refresh_expires_in } }`

### Logout
- **Endpoint**: `POST /api/v1/auth/logout`
- **Headers**: `Authorization: Bearer <access_token>`

## Usage

### Protecting Routes
```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute requiredRole="customer">
      <CustomerDashboard />
    </ProtectedRoute>
  }
/>
```

### Using Authentication in Components
```tsx
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, logout, isAuthenticated, getAccessToken, getRefreshToken } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user?.name}!</div>;
};
```

### Making Authenticated API Requests
```tsx
import { apiGet, apiPost } from '@/lib/api';

// GET request with auth (automatic token refresh on 401)
const response = await apiGet('/api/v1/fields');

// POST request with auth (automatic token refresh on 401)
const response = await apiPost('/api/v1/bookings', bookingData);
```

## Security Features

1. **Dual Token System**: Access tokens for API calls, refresh tokens for renewal
2. **Automatic Token Refresh**: Seamless token renewal without user interaction
3. **Token Validation**: Tokens are validated on app startup using JWT expiration
4. **Expiration Handling**: Expired tokens trigger automatic refresh
5. **Role-based Access**: Routes are protected by user roles
6. **Secure Logout**: All tokens are cleared on logout
7. **401 Handling**: Invalid tokens trigger automatic refresh or logout

## Token Storage

The system stores tokens in localStorage:
- `fieldbook_token`: Access token for API requests
- `fieldbook_refresh_token`: Refresh token for token renewal
- `fieldbook_user`: User data and role information

## Backend Integration

The system expects the backend to:
- Accept login requests at `/api/v1/auth/login`
- Return both access and refresh tokens in login response
- Provide refresh endpoint at `/api/v1/auth/refresh`
- Accept logout requests at `/api/v1/auth/logout`
- Return 401 for invalid/expired tokens

## Environment Configuration

API endpoints are configured in `src/config/env.ts`:
```typescript
export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/api/v1/auth/login`,
  REGISTER: `${API_URL}/api/v1/auth/register`,
  LOGOUT: `${API_URL}/api/v1/auth/logout`,
  REFRESH: `${API_URL}/api/v1/auth/refresh`,
};
```

## Troubleshooting

### Common Issues

1. **Token not being sent**: Check if token exists in localStorage
2. **401 errors**: Token might be expired, check automatic refresh
3. **Refresh token errors**: Check if refresh token is valid
4. **Redirect loops**: Check ProtectedRoute logic
5. **Role access issues**: Verify user role in AuthContext

### Debugging

- Check browser localStorage for `fieldbook_token`, `fieldbook_refresh_token`, and `fieldbook_user`
- Monitor network requests for authentication headers
- Check console for authentication-related errors
- Verify API endpoints are correctly configured
- Monitor token refresh attempts in console logs

### Token Refresh Flow

1. **Automatic Refresh**: When access token expires, system automatically calls refresh endpoint
2. **Manual Refresh**: Refresh can also be triggered manually if needed
3. **Fallback**: If refresh fails, user is redirected to login
4. **Seamless Experience**: Users don't need to manually log in again during active sessions 