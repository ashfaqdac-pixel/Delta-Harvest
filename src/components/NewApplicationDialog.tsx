import React, { useState } from 'react';
import { Application } from '../types';

interface NewApplicationDialogProps {
  onClose: () => void;
  onSubmit: (app: Omit<Application, 'id' | 'status' | 'notes' | 'submittedAt'>) => void;
}

export default function NewApplicationDialog({ onClose, onSubmit }: NewApplicationDialogProps) {
  const [step, setStep] = useState<number>(1);
  const [success, setSuccess] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: 'Dhaka, Bangladesh',
    applicantType: 'Individual',
    occupation: '',
    interest: 'Aquaculture cycle financing',
    ticket: 250000,
    involvement: 'Financial participation only',
    sourceOfFunds: 'Salary / professional income',
    objective: '',
    pep: 'No',
    riskCheck: false,
    truthCheck: false,
    privacyCheck: false,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: string[] = [];
    if (currentStep === 1) {
      if (!formData.name.trim()) stepErrors.push('Full name is required.');
      if (!formData.email.trim() || !formData.email.includes('@')) stepErrors.push('A valid email is required.');
      if (!formData.mobile.trim()) stepErrors.push('Mobile terminal number is required.');
      if (!formData.location.trim()) stepErrors.push('Current location is required.');
      if (!formData.occupation.trim()) stepErrors.push('Occupation or organisation is required.');
    } else if (currentStep === 2) {
      if (!formData.objective.trim() || formData.objective.length < 15) {
        stepErrors.push('Please describe your investment objective (at least 15 characters).');
      }
    } else if (currentStep === 3) {
      if (!formData.riskCheck) stepErrors.push('You must acknowledge the investment risks associated with agriculture.');
      if (!formData.truthCheck) stepErrors.push('You must certify the accuracy and legality of resources.');
      if (!formData.privacyCheck) stepErrors.push('You must consent to internal data processing.');
      if (!formData.pep) stepErrors.push('Please specify your PEP status.');
    }

    setErrors(stepErrors);
    return stepErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      setErrors([]);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      onSubmit({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        location: formData.location,
        applicantType: formData.applicantType,
        occupation: formData.occupation,
        interest: formData.interest,
        ticket: Number(formData.ticket),
        involvement: formData.involvement,
        sourceOfFunds: formData.sourceOfFunds,
        objective: formData.objective,
      });
      setSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-paper text-ink rounded-radius-lg p-6 md:p-8 shadow-custom max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-cream flex items-center justify-center w-8 h-8 rounded-full text-forest hover:bg-line transition-colors text-lg"
          aria-label="Close dialog"
        >
          ×
        </button>

        {!success ? (
          <>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-moss block mb-1">
              Private Access Discovery
            </span>
            <h2 className="text-2xl md:text-3xl font-sans tracking-tight text-forest font-bold mb-2">
              Apply for Investor Access
            </h2>
            <p className="text-xs text-muted mb-4 md:mb-6">
              This is a non-binding agricultural suitability assessment under Private Placement protocols. No currency can be routed or processed on this platform.
            </p>

            {/* Stepper Header */}
            <div className="grid grid-cols-3 gap-2 border-b border-line pb-4 mb-6">
              <div className={`flex flex-col sm:flex-row items-center gap-2 ${step >= 1 ? 'text-forest' : 'text-muted'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-forest text-lime' : 'bg-line text-muted'}`}>
                  1
                </span>
                <span className="text-[11px] font-bold">Applicant</span>
              </div>
              <div className={`flex flex-col sm:flex-row items-center gap-2 ${step >= 2 ? 'text-forest' : 'text-muted'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-forest text-lime' : 'bg-line text-muted'}`}>
                  2
                </span>
                <span className="text-[11px] font-bold">Target & Interest</span>
              </div>
              <div className={`flex flex-col sm:flex-row items-center gap-2 ${step >= 3 ? 'text-forest' : 'text-muted'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-forest text-lime' : 'bg-line text-muted'}`}>
                  3
                </span>
                <span className="text-[11px] font-bold">Declarations</span>
              </div>
            </div>

            {/* Error Banner */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-[#f9e4df] border-l-4 border-accent-danger rounded-md text-xs text-[#963e32]">
                <ul className="list-disc pl-4 space-y-1">
                  {errors.map((err, i) => <li key={i} className="font-semibold">{err}</li>)}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* STEP 1: Applicant particulars */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Full name
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="text-xs" 
                      placeholder="e.g. Ashfaq Ahmed" 
                      required 
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Email address
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="text-xs" 
                      placeholder="investor@example.com" 
                      required 
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Mobile terminal number
                    <input 
                      type="tel" 
                      name="mobile" 
                      value={formData.mobile} 
                      onChange={handleInputChange} 
                      className="text-xs" 
                      placeholder="+88017xxxxxxxx" 
                      required 
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Primary location
                    <input 
                      type="text" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleInputChange} 
                      className="text-xs" 
                      required 
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Applicant category
                    <select name="applicantType" value={formData.applicantType} onChange={handleInputChange} className="text-xs bg-paper">
                      <option value="Individual">Individual investor</option>
                      <option value="Family office">Family office / Private pool</option>
                      <option value="Company">Corporate / Treasury</option>
                      <option value="Strategic partner">Strategic partner / Agro-operator</option>
                      <option value="Institution">Institutional syndicate</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Occupation / Organisation
                    <input 
                      type="text" 
                      name="occupation" 
                      value={formData.occupation} 
                      onChange={handleInputChange} 
                      className="text-xs" 
                      placeholder="e.g. Managing Partner, Peak Ventures" 
                      required 
                    />
                  </label>
                </div>
              )}

              {/* STEP 2: Goal, Interest & Capacity details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                      Primary sector focus
                      <select name="interest" value={formData.interest} onChange={handleInputChange} className="text-xs bg-paper">
                        <option value="Aquaculture cycle financing">Aquaculture stocking cycles</option>
                        <option value="Cattle operations">Livestock fattening campaigns</option>
                        <option value="Whole-farm strategic participation">Whole-farm infrastructure development</option>
                        <option value="Institutional financing">Institutional partnership</option>
                        <option value="Future opportunities">Future opportunities database registration</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                      Indicative capacity range
                      <select name="ticket" value={formData.ticket} onChange={handleInputChange} className="text-xs bg-paper">
                        <option value={250000}>Up to ৳2.5 Lakh (Indicative minimum)</option>
                        <option value={500000}>৳2.5 Lakh – ৳5.0 Lakh</option>
                        <option value={1000000}>৳5.0 Lakh – ৳10.0 Lakh</option>
                        <option value={2000000}>৳10.0 Lakh – ৳20.0 Lakh</option>
                        <option value={5000000}>Above ৳20 Lakh</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                      Expected engagement style
                      <select name="involvement" value={formData.involvement} onChange={handleInputChange} className="text-xs bg-paper">
                        <option value="Financial participation only">Passive capital allocation only</option>
                        <option value="Strategic guidance">Strategic expert oversight contribution</option>
                        <option value="Buyer / market access">Distribution network or commercial offtake connection</option>
                        <option value="Operational partnership">Active co-management team participation</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                      Disclosed Source of Funds
                      <select name="sourceOfFunds" value={formData.sourceOfFunds} onChange={handleInputChange} className="text-xs bg-paper">
                        <option value="Salary / professional income">Salary / professional income</option>
                        <option value="Business income">Corporate revenue / Retained reserves</option>
                        <option value="Investment income">Venture payouts or dividends</option>
                        <option value="Savings">Personal accumulated savings</option>
                        <option value="Other lawful source">Other fully authenticated sources</option>
                      </select>
                    </label>
                  </div>

                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Investment objectives & evaluation terms
                    <textarea 
                      name="objective"
                      rows={3} 
                      value={formData.objective} 
                      onChange={handleInputChange} 
                      placeholder="Describe what transparency matrices you track and what documents you need to verify before committing to Bhaluka operations."
                      className="text-xs"
                      required
                    />
                  </label>
                </div>
              )}

              {/* STEP 3: Legal, Anti-laundering declarations */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-cream p-4 rounded-md space-y-3">
                    <span className="text-[10px] tracking-wider uppercase font-bold text-moss">Private Placement Declarations</span>
                    
                    <label className="flex gap-2.5 items-start text-xs font-normal text-forest cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="riskCheck" 
                        checked={formData.riskCheck} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 mt-0.5" 
                      />
                      <span>
                        I acknowledge agricultural operations carry risks of diseases, adverse climate events, biological feed-price volatility, and that **no investment return is guaranteed or safeguarded**.
                      </span>
                    </label>

                    <label className="flex gap-2.5 items-start text-xs font-normal text-forest cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="truthCheck" 
                        checked={formData.truthCheck} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 mt-0.5" 
                      />
                      <span>
                        I certify that the candidate profile submitted is truthful and any subsequent capital allocated is completely sourced through authorized, lawful frameworks.
                      </span>
                    </label>

                    <label className="flex gap-2.5 items-start text-xs font-normal text-forest cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="privacyCheck" 
                        checked={formData.privacyCheck} 
                        onChange={handleInputChange} 
                        className="w-4 h-4 mt-0.5" 
                      />
                      <span>
                        I consent to the compliance board processing this request purely for internal suitability vetting, private placement compliance logs, and communications.
                      </span>
                    </label>
                  </div>

                  <label className="flex flex-col gap-1 text-xs font-bold text-forest">
                    Politically Exposed Person (PEP) designation
                    <select name="pep" value={formData.pep} onChange={handleInputChange} className="text-xs bg-paper">
                      <option value="No">No — I do not hold any public government, regulatory or administrative profile</option>
                      <option value="Yes">Yes — Details can be declared privately in phone screening</option>
                      <option value="Unsure">Unsure of designation rules</option>
                    </select>
                  </label>
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-line mt-6">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={handleBack} 
                    className="border border-line hover:border-forest text-forest rounded-md px-4 py-2 font-bold text-xs"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="bg-forest hover:bg-forest-hover text-white rounded-md px-5 py-2 font-bold text-xs"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="bg-forest-light hover:bg-forest text-lime rounded-md px-6 py-2.5 font-bold text-xs"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-emerald-950/40 text-emerald-400 border border-emerald-900 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-xl font-bold text-forest font-sans">Application Received Successfully</h3>
            <p className="text-xs text-muted max-w-md mx-auto mt-2">
              Your suitability application has been logged to the V2 dashboard vetting queue under identifier **APP-{(Math.floor(Math.random() * 900) + 100)}**.
            </p>
            <p className="text-xs text-muted max-w-md mx-auto mt-1">
              You can sign in to the **Checker Console** (`checker@delta.demo`) to approve this request and test the auto-generation of active investor accounts instantly.
            </p>
            <button 
              onClick={onClose} 
              className="mt-6 bg-forest hover:bg-forest-hover text-white rounded-md px-6 py-2.5 font-bold text-xs"
            >
              Return to Landscape
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
