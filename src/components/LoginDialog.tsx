import React, { useState } from 'react';
import { Role } from '../types';

interface LoginDialogProps {
  onClose: () => void;
  onLoginSuccess: (email: string, role: Role) => void;
}

export default function LoginDialog({ onClose, onLoginSuccess }: LoginDialogProps) {
  const [email, setEmail] = useState('investor@demo.delta');
  const [pin, setPin] = useState('2026');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin !== '2026') {
      setError('Invalid Demo PIN. Please use 2026 for prototype entry.');
      return;
    }

    if (email === 'investor@demo.delta') {
      onLoginSuccess(email, 'investor');
    } else if (email === 'maker@delta.demo') {
      onLoginSuccess(email, 'maker');
    } else if (email === 'checker@delta.demo') {
      onLoginSuccess(email, 'checker');
    } else {
      // Create dynamically as guest or unregistered applicant if email isn't matching preseeds
      // In our prototype, we'll map any general email to temporary investor or give warning
      setError('Please select or input one of the verified demo accounts below.');
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPin('2026');
    setError('');
    
    let simulatedRole: Role = 'investor';
    if (demoEmail === 'maker@delta.demo') simulatedRole = 'maker';
    else if (demoEmail === 'checker@delta.demo') simulatedRole = 'checker';

    onLoginSuccess(demoEmail, simulatedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-paper text-ink rounded-radius-lg p-6 shadow-custom">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-cream flex items-center justify-center w-8 h-8 rounded-full text-forest hover:bg-line transition-colors text-lg"
          aria-label="Close dialog"
        >
          ×
        </button>

        <span className="text-[10px] uppercase tracking-widest font-extrabold text-moss block mb-1">
          Secure Access Gate
        </span>
        <h2 className="text-xl md:text-2xl font-sans tracking-tight text-forest font-bold mb-1">
          Sign In to Platform
        </h2>
        <p className="text-xs text-muted mb-4">
          Prototype testing environment using isolated memory data loops. Use PIN **2026**.
        </p>

        {error && (
          <div className="mb-4 p-2.5 bg-[#401212] border-l-3 border-accent-danger rounded-md text-xs font-semibold text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
            Workstation email
            <input 
              type="email" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="text-xs py-2 px-3" 
              required 
            />
          </label>
          
          <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
            Demo PIN
            <input 
              type="password" 
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(''); }}
              className="text-xs py-2 px-3 font-mono text-center tracking-widest" 
              maxLength={4}
              required 
            />
          </label>

          <button 
            type="submit" 
            className="w-full bg-forest hover:bg-forest-hover text-white text-xs font-bold py-2.5 rounded-md mt-6 transition-transform"
          >
            Authenticate Credentials &rarr;
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-line"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
            <span className="bg-paper px-2 text-muted">Test Profiles</span>
          </div>
        </div>

        <div className="space-y-2">
          <button 
            onClick={() => handleQuickLogin('investor@demo.delta')}
            className="w-full border border-line hover:border-[#2563eb] hover:bg-[#161616] text-left rounded-md p-2.5 flex justify-between items-center text-xs transition-colors"
          >
            <div className="flex flex-col">
              <strong className="text-[#ededed] font-bold">Approved Investor</strong>
              <span className="text-[10px] text-[#888888] font-mono">investor@demo.delta</span>
            </div>
            <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
              PORTFOLIO
            </span>
          </button>

          <button 
            onClick={() => handleQuickLogin('maker@delta.demo')}
            className="w-full border border-line hover:border-[#2563eb] hover:bg-[#161616] text-left rounded-md p-2.5 flex justify-between items-center text-xs transition-colors"
          >
            <div className="flex flex-col">
              <strong className="text-[#ededed] font-bold">Operations Maker</strong>
              <span className="text-[10px] text-[#888888] font-mono">maker@delta.demo</span>
            </div>
            <span className="text-[9px] bg-blue-950/40 text-blue-400 border border-blue-900 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
              MAKER
            </span>
          </button>

          <button 
            onClick={() => handleQuickLogin('checker@delta.demo')}
            className="w-full border border-line hover:border-[#2563eb] hover:bg-[#161616] text-left rounded-md p-2.5 flex justify-between items-center text-xs transition-colors"
          >
            <div className="flex flex-col">
              <strong className="text-[#ededed] font-bold">Admin Checker</strong>
              <span className="text-[10px] text-[#888888] font-mono">checker@delta.demo</span>
            </div>
            <span className="text-[9px] bg-amber-950/40 text-amber-400 border border-amber-900 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
              ADMIN
            </span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <small className="text-[10px] text-muted font-medium font-mono">
            Demo passphrase: <b className="text-forest">2026</b>
          </small>
        </div>
      </div>
    </div>
  );
}
