export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "0599123456",
    password: "Test@123", // In real app, this would be hashed
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0599789012",
    password: "Test@123",
  },
];

// Simulated active sessions
export const sessions = [
  {
    userId: 1,
    token: "fake-session-token-1",
    expires: "2024-12-31",
  },
]; 