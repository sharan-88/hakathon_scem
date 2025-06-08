// Mock verifyAuth function for development
export async function verifyAuth(token: string) {
  // In a real implementation, you would verify the token and return user info or throw an error
  if (!token) {
    throw new Error('No token provided');
  }
  // Simulate a decoded user object
  return {
    id: 'mock-user-id',
    email: 'mockuser@example.com',
    role: 'student',
    valid: true,
  };
} 