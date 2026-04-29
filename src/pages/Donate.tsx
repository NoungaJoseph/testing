import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const oneTimeAmounts = [2000, 5000, 10000, 25000];
const monthlyAmounts = [1500, 3000, 7000, 12000];

const Donate = () => {
    const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
    const [amount, setAmount] = useState<number>(5000);
    const [customAmount, setCustomAmount] = useState('');
    const [method, setMethod] = useState<'mtn' | 'orange' | 'bank'>('mtn');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const selectedAmount = customAmount ? Number(customAmount) : amount;
    const presetAmounts = frequency === 'one-time' ? oneTimeAmounts : monthlyAmounts;

    const impactLines = useMemo(() => {
        if (selectedAmount < 3000) {
            return [
                'Supports school supplies for one child.',
                'Adds to emergency support reserve.',
            ];
        }
        if (selectedAmount < 8000) {
            return [
                'Supports learning kits for 2 children.',
                'Contributes to one community outreach day.',
            ];
        }
        if (selectedAmount < 15000) {
            return [
                'Supports a partial scholarship package.',
                'Contributes to local health outreach transport.',
            ];
        }
        return [
            'Supports one full student support cycle.',
            'Contributes to clean-water and education field logistics.',
        ];
    }, [selectedAmount]);

    const submitDonation = () => {
        setIsComplete(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={35} />
                <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
                    <section className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-10 items-start">
                            <FadeIn direction="right">
                                <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white">
                                    <div className="relative h-[340px]">
                                        <img
                                            src="/assets/charity/Your Donation Changes Real Lives.png"
                                            alt="Donation impact"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#001F5B]/85 via-[#001F5B]/35 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <p className="text-[#00C2C7] text-xs font-bold uppercase tracking-widest mb-2">Secure Donation</p>
                                            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight">
                                                Give Once. Give Monthly.
                                                <span className="block">Build Lasting Impact.</span>
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="p-6 md:p-8">
                                        <p className="text-slate-600 leading-relaxed mb-6">
                                            Inspired by top global donation experiences, this page is designed for clarity: simple amount selection, minimal form fields,
                                            clear payment options, and transparent impact preview.
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="rounded-2xl border border-slate-200 p-4">
                                                <img src="/assets/charity/scholarship.png" alt="Scholarship icon" className="w-8 h-8 object-contain mb-2" />
                                                <p className="text-[#001F5B] font-bold text-sm">Education Support</p>
                                                <p className="text-slate-500 text-xs">Books, fees, mentoring.</p>
                                            </div>
                                            <div className="rounded-2xl border border-slate-200 p-4">
                                                <img src="/assets/charity/clean-water.png" alt="Water icon" className="w-8 h-8 object-contain mb-2" />
                                                <p className="text-[#001F5B] font-bold text-sm">Community Relief</p>
                                                <p className="text-slate-500 text-xs">Water, health, essentials.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn direction="left">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
                                    {isComplete ? (
                                        <div className="text-center py-10">
                                            <img src="/assets/charity/donate-now.png" alt="Donation complete" className="w-20 h-20 object-contain mx-auto mb-5" />
                                            <h2 className="text-3xl font-black text-[#001F5B] mb-2">Thank you for your support</h2>
                                            <p className="text-slate-600 mb-6">
                                                Your {frequency === 'monthly' ? 'monthly' : 'one-time'} pledge of{' '}
                                                <span className="font-black text-[#001F5B]">{Number(selectedAmount || 0).toLocaleString()} XAF</span> has been recorded.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => setIsComplete(false)}
                                                className="h-11 px-5 rounded-lg bg-[#001F5B] text-white font-bold hover:bg-[#0D1B3E] transition-colors"
                                            >
                                                Make another donation
                                            </button>
                                        </div>
                                    ) : (
                                        <form
                                            className="form-shell space-y-6"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                submitDonation();
                                            }}
                                        >
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-[#001F5B] mb-3">Donation Type</p>
                                                <div className="grid grid-cols-2 gap-2 bg-slate-100 rounded-xl p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFrequency('one-time');
                                                            setAmount(oneTimeAmounts[1]);
                                                            setCustomAmount('');
                                                        }}
                                                        className={`h-10 rounded-lg text-sm font-bold transition-colors ${frequency === 'one-time' ? 'bg-white text-[#001F5B]' : 'text-slate-500'}`}
                                                    >
                                                        One-Time
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFrequency('monthly');
                                                            setAmount(monthlyAmounts[1]);
                                                            setCustomAmount('');
                                                        }}
                                                        className={`h-10 rounded-lg text-sm font-bold transition-colors ${frequency === 'monthly' ? 'bg-white text-[#001F5B]' : 'text-slate-500'}`}
                                                    >
                                                        Monthly
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-[#001F5B] mb-3">Choose Amount (XAF)</p>
                                                <div className="grid grid-cols-2 gap-2 mb-3">
                                                    {presetAmounts.map((amt) => (
                                                        <button
                                                            key={amt}
                                                            type="button"
                                                            onClick={() => {
                                                                setAmount(amt);
                                                                setCustomAmount('');
                                                            }}
                                                            className={`h-11 rounded-lg border text-sm font-bold transition-colors ${
                                                                !customAmount && amount === amt
                                                                    ? 'border-[#00C2C7] bg-[#00C2C7]/15 text-[#001F5B]'
                                                                    : 'border-slate-200 text-slate-700 hover:border-[#00C2C7]'
                                                            }`}
                                                        >
                                                            {amt.toLocaleString()}
                                                        </button>
                                                    ))}
                                                </div>
                                                <input
                                                    type="number"
                                                    min={1000}
                                                    value={customAmount}
                                                    onChange={(e) => setCustomAmount(e.target.value)}
                                                    placeholder="Custom amount"
                                                    className="w-full h-11 px-4 rounded-lg border border-slate-200 text-[#001F5B] focus:outline-none focus:border-[#00C2C7]"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-[#001F5B] mb-3">Payment Method</p>
                                                <div className="grid sm:grid-cols-3 gap-2">
                                                    {[
                                                        { key: 'mtn' as const, label: 'MTN MoMo' },
                                                        { key: 'orange' as const, label: 'Orange Money' },
                                                        { key: 'bank' as const, label: 'Bank Transfer' },
                                                    ].map((m) => (
                                                        <button
                                                            key={m.key}
                                                            type="button"
                                                            onClick={() => setMethod(m.key)}
                                                            className={`h-11 rounded-lg border text-xs font-bold transition-colors ${
                                                                method === m.key
                                                                    ? 'border-[#00C2C7] bg-[#00C2C7]/15 text-[#001F5B]'
                                                                    : 'border-slate-200 text-slate-600 hover:border-[#00C2C7]'
                                                            }`}
                                                        >
                                                            {m.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <input
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder="Full name"
                                                    className="h-11 px-4 rounded-lg border border-slate-200 text-[#001F5B] focus:outline-none focus:border-[#00C2C7]"
                                                    required
                                                />
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    placeholder="Email address"
                                                    className="h-11 px-4 rounded-lg border border-slate-200 text-[#001F5B] focus:outline-none focus:border-[#00C2C7]"
                                                    required
                                                />
                                                <input
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="Phone number"
                                                    className="h-11 px-4 rounded-lg border border-slate-200 text-[#001F5B] focus:outline-none focus:border-[#00C2C7] sm:col-span-2"
                                                    required
                                                />
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                                <p className="text-xs font-black uppercase tracking-widest text-[#001F5B] mb-2">Your Impact Preview</p>
                                                <p className="text-sm text-slate-700 mb-2">
                                                    Donation amount: <span className="font-black text-[#001F5B]">{Number(selectedAmount || 0).toLocaleString()} XAF</span>
                                                </p>
                                                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                                                    {impactLines.map((line) => (
                                                        <li key={line}>{line}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full h-12 rounded-lg bg-[#00C2C7] text-[#001F5B] font-black hover:bg-[#0099A1] transition-colors"
                                            >
                                                Donate Securely
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </FadeIn>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Donate;
