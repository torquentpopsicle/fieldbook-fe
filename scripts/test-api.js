#!/usr/bin/env node

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000';
const LOGIN_ENDPOINT = `${API_URL}/api/v1/auth/login`;

async function testLogin() {
  const credentials = {
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer'
  };

  console.log('Testing login API...');
  console.log('Endpoint:', LOGIN_ENDPOINT);
  console.log('Credentials:', credentials);

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('\nResponse Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('\nResponse Data:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Login successful!');
      if (data.token) {
        console.log('Token received:', data.token.substring(0, 20) + '...');
      }
    } else {
      console.log('\n❌ Login failed!');
    }

  } catch (error) {
    console.error('\n❌ Error testing API:', error.message);
    console.log('Make sure your API server is running on:', API_URL);
  }
}

testLogin(); 