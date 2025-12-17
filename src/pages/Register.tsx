import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authApi } from '../api/client';
import { hashPasswordForTransmission } from '../utils/passwordHash';

export function Register(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitRegister = async (e: any) => {
    e.preventDefault();
    setError('');
    setMessage('');

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasSymbol) {
      setError(
        'Password must be at least 8 characters long and include at least one uppercase letter and one symbol.'
      );
      return;
    }

    setIsLoading(true);
    try{
      // Hash password on client side before sending
      const passwordHash = await hashPasswordForTransmission(password);
      const res = await authApi.register(email, passwordHash, name);
      if(res.status === 'success'){
        setMessage('Registered successfully. Redirecting to sign in...');
        
        navigate('/login');
      }else{
        setError(res?.message || 'Registration failed');
      }
    }catch(err:any){
      setError(err?.response?.data?.detail || err?.message || 'Registration failed');
    }finally{setIsLoading(false)}
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #2c5f6f 0%, #1a3a47 50%, #2c5f6f 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '40px 32px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          maxWidth: '440px',
          width: '100%',
        }}
      >
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <h1
            style={{
              marginBottom: 8,
              color: '#2c5f6f',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Acucogn Ambient Scribe
          </h1>
          <p
            style={{
              marginBottom: 4,
              color: '#5a7c89',
              fontSize: 14,
            }}
          >
            Let doctors talk. We handle notes.
          </p>
          <h2
            style={{
              marginTop: 8,
              color: '#2c5f6f',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Create your account
          </h2>
          <p
            style={{
              marginTop: 4,
              color: '#5a7c89',
              fontSize: 13,
            }}
          >
            Use a strong password with at least 8 characters, an uppercase letter, and a symbol.
          </p>
        </div>

        {message && (
          <div
            style={{
              background: '#e6ffed',
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              color: '#22543d',
              fontSize: 14,
            }}
          >
            {message}
          </div>
        )}
        {error && (
          <div
            style={{
              background: '#ffeef0',
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              color: '#c33',
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={submitRegister}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 14,
              }}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 14,
              }}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 14,
              }}
            />
          </div>
          <button
            disabled={isLoading}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              background: isLoading ? '#8fa7b0' : '#2c5f6f',
              color: 'white',
              border: 'none',
              fontSize: 15,
              fontWeight: 600,
              cursor: isLoading ? 'default' : 'pointer',
            }}
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}