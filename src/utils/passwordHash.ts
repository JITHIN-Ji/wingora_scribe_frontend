

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

