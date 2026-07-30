import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useTranslation } from 'react-i18next';


const Donate = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const urlSector = searchParams.get('sector');
    const [sector, setSector] = useState<string>(urlSector || 'general');
    const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
    const [currency, setCurrency] = useState('XAF');
    const [customAmount, setCustomAmount] = useState('');
    const [method, setMethod] = useState<'mtn' | 'orange' | 'bank'>('mtn');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [documentBase64, setDocumentBase64] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [step, setStep] = useState(1);
    const [mtnStatus, setMtnStatus] = useState<'idle' | 'submitting' | 'polling' | 'error'>('idle');

    const selectedAmount = Number(customAmount) || 0;

    const submitDonation = async () => {
        try {
            setMtnStatus('submitting');
            
            const payload = {
                sector,
                frequency: frequency === 'monthly' ? 'MONTHLY' : 'ONE_TIME',
                amount: selectedAmount,
                currency,
                method: method.toUpperCase(),
                fullName,
                email,
                phone,
                documentBase64
            };
            
            // Note: Since we are running on localhost for testing but have a live frontend, we use localhost or api domain
            // But I will use localhost:8000 for development. The user's system has enakoos.com but we are testing locally.
            // Using a relative path or checking environment is better. Let's stick to localhost since they are running `npm run dev`.
            const backendUrl = import.meta.env.VITE_API_URL || 'https://api.enakoos.com/api/v1';

            const response = await fetch(`${backendUrl}/outreach/donations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                
                if (method === 'mtn') {
                    if (data.status === 'PENDING' && data.paymentUuid) {
                        setMtnStatus('polling');
                        pollMtnStatus(data.paymentUuid, data.paymentToken, data.donation.id);
                    } else {
                        setIsComplete(true);
                    }
                } else {
                    setIsComplete(true);
                }
            } else {
                console.error('Failed to submit donation', await response.text());
                if (method === 'mtn') {
                    setMtnStatus('error');
                } else {
                    setMtnStatus('error'); // We can reuse mtnStatus state as a general error for Step 2
                }
            }
        } catch (err) {
            console.error(err);
            setMtnStatus('error');
        }
    };

    const pollMtnStatus = async (uuid: string, token: string, donationId: string) => {
        const backendUrl = import.meta.env.VITE_API_URL || 'https://api.enakoos.com/api/v1';
        let attempts = 0;
        
        const interval = setInterval(async () => {
            attempts++;
            try {
                const res = await fetch(`${backendUrl}/outreach/donations/status/${uuid}?token=${token}&donationId=${donationId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === 'COMPLETED' || data.status === 'SETTLED') {
                        clearInterval(interval);
                        setMtnStatus('idle');
                        setIsComplete(true);
                    } else if (data.status === 'FAILED') {
                        clearInterval(interval);
                        setMtnStatus('error');
                    }
                }
            } catch (err) {
                console.error('Polling error', err);
            }
            
            if (attempts > 20) { // Timeout after 1 minute (20 * 3s)
                clearInterval(interval);
                setMtnStatus('error');
            }
        }, 3000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />
            <main className="flex-grow pt-40 md:pt-48 pb-24 px-6 md:px-12">
                <section className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Left Side: Editorial Image & Info */}
                        <FadeIn direction="up">
                            <div className="mb-12">
                                <span className="text-[#00BFA5] font-black tracking-[0.3em] uppercase text-[10px] block mb-4">
                                    {t('donate.hero.badge')}
                                </span>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#001B44] uppercase tracking-tighter leading-none mb-6">
                                    {t('donate.hero.title')}
                                    <span className="block text-[#00BFA5]">{t('donate.hero.title_highlight')}</span>
                                </h1>
                                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                                    {t('donate.hero.desc')}
                                </p>
                            </div>

                            <div className="w-full aspect-[4/3] overflow-hidden bg-slate-200 relative mb-8">
                                <img
                                    src="/assets/charity/Your Donation Changes Real Lives.png"
                                    alt="Donation impact"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 border-4 border-[#001B44] mix-blend-overlay pointer-events-none" />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="border-t-2 border-slate-900 pt-4">
                                    <p className="text-[#001B44] font-black uppercase tracking-widest text-xs mb-2">{(t('donate.features', { returnObjects: true }) as any[])[0]?.title}</p>
                                    <p className="text-slate-500 font-medium leading-relaxed">{(t('donate.features', { returnObjects: true }) as any[])[0]?.desc}</p>
                                </div>
                                <div className="border-t-2 border-slate-900 pt-4">
                                    <p className="text-[#001B44] font-black uppercase tracking-widest text-xs mb-2">{(t('donate.features', { returnObjects: true }) as any[])[1]?.title}</p>
                                    <p className="text-slate-500 font-medium leading-relaxed">{(t('donate.features', { returnObjects: true }) as any[])[1]?.desc}</p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right Side: Simple Clean Form */}
                        <FadeIn direction="up" delay={0.2}>
                            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100 relative overflow-hidden">
                                {isComplete ? (
                                    <div className="text-center py-12 relative z-10">
                                        <div className="w-20 h-20 bg-green-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-[#00BFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h2 className="text-3xl font-black text-[#001B44] mb-3">{t('donate.form.success_title')}</h2>
                                        <p className="text-slate-500 mb-8 leading-relaxed">
                                            {t('donate.form.success_desc', { frequency: frequency === 'monthly' ? t('donate.form.type_monthly') : t('donate.form.type_one_time') }).replace('{{frequency}}', frequency === 'monthly' ? t('donate.form.type_monthly') : t('donate.form.type_one_time'))}{' '}
                                            <span className="font-black text-[#00BFA5]">{Number(selectedAmount || 0).toLocaleString()} {currency}</span> {t('donate.form.success_desc_end')}
                                            <br />
                                            We have sent a receipt to your email: {email}.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => { setIsComplete(false); setStep(1); setMtnStatus('idle'); }}
                                            className="h-12 px-8 bg-[#001B44] text-white font-bold rounded-xl hover:bg-[#00BFA5] transition-colors"
                                        >
                                            {t('donate.form.btn_another')}
                                        </button>
                                    </div>
                                ) : step === 1 ? (
                                    <form
                                        className="space-y-6"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            setStep(2);
                                        }}
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-black text-[#001B44]">Make a Donation</h2>
                                            <p className="text-slate-500 text-sm mt-1">Your contribution brings real change.</p>
                                        </div>

                                        {/* Sector Selection */}
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">I want to support</label>
                                            <div className="relative">
                                                <select
                                                    value={sector}
                                                    onChange={(e) => setSector(e.target.value)}
                                                    className="w-full h-12 px-4 appearance-none rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] transition-all cursor-pointer"
                                                >
                                                    {urlSector && !['general', 'education', 'health', 'youth', 'emergency'].includes(urlSector) && (
                                                        <option value={urlSector}>Specific Program ({urlSector.replace(/-/g, ' ')})</option>
                                                    )}
                                                    <option value="general">General Fund (Where it's needed most)</option>
                                                    <option value="education">Education & Scholarships</option>
                                                    <option value="health">Community Health & Clean Water</option>
                                                    <option value="youth">Youth Empowerment</option>
                                                    <option value="emergency">Emergency Relief</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Frequency & Amount Selection */}
                                        <div>
                                            <div className="flex gap-6 mb-3">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        checked={frequency === 'one-time'} 
                                                        onChange={() => setFrequency('one-time')} 
                                                        className="w-4 h-4 accent-[#00BFA5]" 
                                                    />
                                                    <span className={`text-sm font-bold ${frequency === 'one-time' ? 'text-slate-900' : 'text-slate-500'}`}>One Time</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        checked={frequency === 'monthly'} 
                                                        onChange={() => setFrequency('monthly')} 
                                                        className="w-4 h-4 accent-[#00BFA5]" 
                                                    />
                                                    <span className={`text-sm font-bold ${frequency === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                                                </label>
                                            </div>
                                            
                                            <div className="relative flex">
                                                <div className="relative">
                                                    <select
                                                        value={currency}
                                                        onChange={(e) => setCurrency(e.target.value)}
                                                        className="h-12 pl-4 pr-8 rounded-l-xl bg-slate-100 border border-r-0 border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] appearance-none cursor-pointer"
                                                    >
                                                        <option value="XAF">XAF</option>
                                                        <option value="USD">USD</option>
                                                        <option value="EUR">EUR</option>
                                                        <option value="GBP">GBP</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                                <input
                                                    type="number"
                                                    min={100}
                                                    value={customAmount}
                                                    onChange={(e) => setCustomAmount(e.target.value)}
                                                    placeholder="Enter donation amount"
                                                    className="flex-1 h-12 px-4 rounded-r-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5] placeholder:text-slate-400 placeholder:font-medium"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Personal Details */}
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Your Details</label>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <input
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Full Name"
                                                    className="sm:col-span-2 h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5]"
                                                    required
                                                />
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    placeholder="Email Address"
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5]"
                                                    required
                                                />
                                                <input
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="Phone Number"
                                                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-[#00BFA5] focus:ring-1 focus:ring-[#00BFA5]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Optional Document Upload */}
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Supporting Document (Optional)</label>
                                            <input
                                                type="file"
                                                accept="image/*,.pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => setDocumentBase64(reader.result as string);
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#00BFA5]/10 file:text-[#00BFA5] hover:file:bg-[#00BFA5]/20 cursor-pointer"
                                            />
                                        </div>

                                        {/* Proceed Button */}
                                        <button
                                            type="submit"
                                            className="w-full h-14 rounded-xl bg-[#00BFA5] text-white font-black text-lg shadow-lg shadow-[#00BFA5]/30 hover:shadow-xl hover:shadow-[#00BFA5]/40 hover:-translate-y-0.5 transition-all mt-4"
                                        >
                                            Proceed to Donation
                                        </button>
                                        
                                        <p className="text-center text-xs text-slate-400">
                                            Secure payment processing. You can cancel monthly donations at any time.
                                        </p>
                                    </form>
                                ) : (
                                    /* Step 2: Payment Selection */
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <button onClick={() => { setStep(1); setMtnStatus('idle'); }} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            <div>
                                                <h2 className="text-xl font-black text-[#001B44]">Choose Payment Method</h2>
                                                <p className="text-slate-500 text-sm">Donating {Number(selectedAmount).toLocaleString()} {currency}</p>
                                            </div>
                                        </div>

                                        {mtnStatus === 'polling' ? (
                                            <div className="py-12 flex flex-col items-center justify-center text-center">
                                                <div className="w-16 h-16 border-4 border-[#00BFA5]/30 border-t-[#00BFA5] rounded-full animate-spin mb-6"></div>
                                                <h3 className="text-xl font-black text-[#001B44] mb-2">Check your phone</h3>
                                                <p className="text-slate-500 max-w-sm">
                                                    We have sent a Mobile Money prompt to <span className="font-bold text-slate-800">{phone}</span>. Please authorize the payment on your device.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {/* MTN Mobile Money */}
                                                <div className={`border-2 rounded-xl p-4 transition-all ${method === 'mtn' ? 'border-[#FFCC00] bg-[#FFCC00]/5' : 'border-slate-200 hover:border-slate-300'}`}>
                                                    <label className="flex items-center gap-4 cursor-pointer mb-4" onClick={() => setMethod('mtn')}>
                                                        <div className="w-12 h-8 bg-[#FFCC00] rounded-md flex items-center justify-center shrink-0">
                                                            <span className="text-black font-black text-[10px] uppercase">MTN</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-800">MTN Mobile Money</h4>
                                                            <p className="text-xs text-slate-500">Pay securely via MTN MoMo</p>
                                                        </div>
                                                        <input type="radio" checked={method === 'mtn'} readOnly className="w-5 h-5 accent-[#FFCC00]" />
                                                    </label>
                                                    
                                                    {method === 'mtn' && (
                                                        <div className="pl-16 pr-4 pb-2 animate-in fade-in slide-in-from-top-2">
                                                            <input 
                                                                type="text" 
                                                                value={phone} 
                                                                onChange={(e) => setPhone(e.target.value)} 
                                                                placeholder="Enter MTN Number (e.g. 237...)"
                                                                className="w-full h-11 px-4 rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] mb-3"
                                                            />
                                                            <button 
                                                                onClick={submitDonation} 
                                                                disabled={mtnStatus === 'submitting'}
                                                                className="w-full h-11 bg-[#FFCC00] text-black font-black rounded-lg hover:bg-[#F0C000] transition-colors disabled:opacity-50"
                                                            >
                                                                Pay {Number(selectedAmount).toLocaleString()} {currency}
                                                            </button>
                                                            {mtnStatus === 'error' && (
                                                                <p className="text-red-500 text-xs font-bold mt-2">Failed to process payment. Please try again.</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Orange Money */}
                                                <div className={`border-2 rounded-xl p-4 transition-all opacity-70 ${method === 'orange' ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}>
                                                    <label className="flex items-center gap-4 cursor-pointer" onClick={() => setMethod('orange')}>
                                                        <div className="w-12 h-8 bg-[#FF7900] flex items-center justify-center rounded-md shrink-0">
                                                            <div className="w-5 h-1.5 bg-white rounded-sm translate-y-1"></div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-800">Orange Money</h4>
                                                            <p className="text-xs text-orange-600 font-bold">Currently not available</p>
                                                        </div>
                                                        <input type="radio" checked={method === 'orange'} readOnly disabled className="w-5 h-5" />
                                                    </label>
                                                </div>

                                                {/* Bank Transfer */}
                                                <div className={`border-2 rounded-xl p-4 transition-all ${method === 'bank' ? 'border-[#001B44] bg-[#001B44]/5' : 'border-slate-200 hover:border-slate-300'}`}>
                                                    <label className="flex items-center gap-4 cursor-pointer mb-4" onClick={() => setMethod('bank')}>
                                                        <div className="w-12 h-8 bg-[#001B44] rounded-md flex items-center justify-center shrink-0">
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-800">Bank Transfer</h4>
                                                            <p className="text-xs text-slate-500">Foreign currency or direct deposit</p>
                                                        </div>
                                                        <input type="radio" checked={method === 'bank'} readOnly className="w-5 h-5 accent-[#001B44]" />
                                                    </label>

                                                    {method === 'bank' && (
                                                        <div className="pl-16 pr-4 pb-2 animate-in fade-in slide-in-from-top-2">
                                                            <p className="text-sm text-slate-600 mb-4 font-medium">
                                                                Submit your details and we will contact you via email with our official bank instructions.
                                                            </p>
                                                            <button 
                                                                onClick={submitDonation} 
                                                                disabled={mtnStatus === 'submitting'}
                                                                className="w-full h-11 bg-[#001B44] text-white font-black rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                                                            >
                                                                {mtnStatus === 'submitting' ? 'Submitting...' : 'Request Bank Details'}
                                                            </button>
                                                            {mtnStatus === 'error' && (
                                                                <p className="text-red-500 text-xs font-bold mt-2">Failed to submit request. Please try again or check your connection.</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Donate;
