# API Setup and Testing

## Environment Configuration

To configure the API URL, create a `.env.local` file in the root directory:

```bash
# .env.local
VITE_API_URL=http://localhost:3000
```

Replace `http://localhost:3000` with your actual API server URL.

**Note**: See `src/config/env.example.ts` for reference.

## Testing the API

### 1. Manual Testing with Node.js Script

Run the test script to verify API connectivity:

```bash
npm run test:api
```

This will test the login endpoint with the credentials:
- Email: `customer@example.com`
- Password: `customer123`
- Role: `customer`

### 2. Automated Testing with Vitest

Run the automated tests:

```bash
npm test
```

This will run the API tests in `src/tests/api.test.ts`.

### 3. Testing in the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the sign-in page
3. Use the "Use Demo Credentials" button for customer login
4. The application will now make real API calls to your backend

## API Endpoints

The application expects the following API endpoints:

- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/logout` - User logout (optional)
- `GET /api/v1/auth/profile` - Get user profile (optional)

### Login Request Format

```json
{
  "email": "customer@example.com",
  "password": "customer123",
  "role": "customer"
}
```

### Expected Response Format

```json
{
  "user": {
    "id": "user-id",
    "email": "customer@example.com",
    "name": "User Name",
    "role": "customer",
    "avatar": "https://example.com/avatar.jpg"
  },
  "token": "jwt-token-here"
}
```

## Troubleshooting

1. **API not responding**: Make sure your backend server is running
2. **CORS errors**: Ensure your backend allows requests from the frontend origin
3. **Environment variable not working**: Restart the development server after creating `.env.local`
4. **Test failures**: Check the console output for detailed error messages 