/**
 * Client-side password hashing utility
 * Uses Web Crypto API to hash passwords before sending to server
 * This prevents passwords from being visible in plain text in network requests
 * 
 * Security approach:
 * 1. Client hashes password with SHA-256
 * 2. Sends hash to server (not plain password)
 * 3. Server hashes the received hash again with PBKDF2 before storing/comparing
 * 4. This ensures plain password never leaves the client
 */

/**
 * Hash a password using SHA-256 for secure transmission
 * The server will hash this again with PBKDF2 before storing/comparing
 * @param password - Plain text password
 * @returns Promise resolving to hex-encoded SHA-256 hash
 */
export async function hashPasswordForTransmission(password: string): Promise<string> {
  if (!password) {
    throw new Error('Password cannot be empty');
  }

  // Use SHA-256 to hash the password
  // The server will hash this again with PBKDF2
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

