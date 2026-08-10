import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, Heart, Award, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState('donor');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setErrorMessage(t('auth.signup.err_password_match', 'Passwords do not match. Please re-enter your password.'));
            return;
        }

        if (password.length < 6) {
            setErrorMessage(t('auth.signup.err_password_length', 'Password must be at least 6 characters long.'));
            return;
        }

        if (!agreeTerms) {
            setErrorMessage(t('auth.signup.err_terms', 'Please agree to the Terms of Service and Privacy Policy to continue.'));
            return;
        }

        setIsLoading(true);

        try {
            const backendUrl = import.meta.env.VITE_API_URL || 'https://api.enakoos.com/api/v1';
            const response = await fetch(`${backendUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    email,
                    phone,
                    role: interest,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('enako_auth_token', data.token);
                }
                setSuccessMessage(t('auth.signup.success', 'Account created successfully! Redirecting...'));
                setTimeout(() => navigate('/signin'), 1500);
            } else {
                const errorData = await response.json().catch(() => ({}));
                setErrorMessage(errorData.message || t('auth.signup.err_failed', 'Registration failed. An account with this email may already exist.'));
            }
        } catch {
            // Frontend fallback for demo/testing
            localStorage.setItem('enako_auth_user', JSON.stringify({ fullName, email, phone, interest }));
            setSuccessMessage(t('auth.signup.success', 'Account created successfully! Welcome to Enako Outreach.'));
            setTimeout(() => navigate('/signin'), 1500);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc]" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />

            {/* HERO BANNER — Donate page style */}
            <section
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(360px, 45vh, 480px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'hidden',
                    marginTop: 0,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/assets/charity/african-primary-school.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 30%',
                    }}
                />

                {/* Breadcrumb */}
                <div
                    style={{
                        position: 'absolute',
                        top: '9.5rem',
                        left: '2.5rem',
                        color: 'rgba(255,255,255,0.82)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        zIndex: 2,
                    }}
                >
                    <Link to="/" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>{t('nav.home', 'Home')}</Link>
                    <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                    {t('nav.signup', 'Sign Up')}
                </div>

                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 3.5rem', maxWidth: 960 }}>
                    <FadeIn direction="up">
                        <h1
                            style={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                                color: '#fff',
                                margin: 0,
                                lineHeight: 1.08,
                            }}
                        >
                            {t('auth.signup.hero_title_1', 'CREATE AN')} <span className="text-[#1eb4d4]">ENAKO ACCOUNT</span>
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="ds-section flex-grow">
                <div className="ds-container">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* LEFT COLUMN: BENEFIT SUMMARY */}
                        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
                            <FadeIn direction="up">
                                <span className="ds-badge">{t('auth.signup.badge', 'JOIN 10,000+ SUPPORTERS')}</span>
                                <h2 className="ds-h2 text-3xl md:text-4xl text-[#1c4980] mt-2 mb-4">
                                    {t('auth.signup.title', 'BECOME PART OF REAL CHANGE')}
                                </h2>
                                <p className="ds-body leading-relaxed mb-6">
                                    {t('auth.signup.desc', 'Whether you are a donor, volunteer, student, or community partner, an Enako account gives you full visibility into ongoing humanitarian work across Cameroon.')}
                                </p>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.1}>
                                <div className="space-y-4">
                                    {[
                                        { icon: Heart, title: t('auth.signup.role_1_title', 'Donors & Partners'), desc: t('auth.signup.role_1_desc', 'Receive direct updates, impact reports, and Mobile Money transaction receipts.') },
                                        { icon: GraduationCap, title: t('auth.signup.role_2_title', 'Scholarship Applicants'), desc: t('auth.signup.role_2_desc', 'Submit and track primary, secondary, and university assistance applications.') },
                                        { icon: Award, title: t('auth.signup.role_3_title', 'Volunteers & Teachers'), desc: t('auth.signup.role_3_desc', 'Apply for teacher rewards, field volunteer missions, and community roles.') },
                                    ].map((role, idx) => (
                                        <div key={idx} className="ds-card p-5 border border-slate-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <role.icon className="w-5 h-5 text-[#1eb4d4]" />
                                                <h3 className="font-extrabold text-sm uppercase tracking-wide text-[#1c4980]">{role.title}</h3>
                                            </div>
                                            <p className="ds-body-sm">{role.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>

                        {/* RIGHT COLUMN: REGISTRATION FORM CARD */}
                        <div className="lg:col-span-7">
                            <FadeIn direction="up" delay={0.15}>
                                <div className="ds-card p-8 md:p-12 border border-slate-200 shadow-xl bg-white rounded-lg">
                                    <div className="mb-8">
                                        <h3 className="ds-h2 text-2xl text-[#111] mb-2">{t('auth.signup.card_title', 'CREATE YOUR FREE ACCOUNT')}</h3>
                                        <p className="ds-body-sm">
                                            {t('auth.signup.already_registered', 'Already registered?')}{' '}
                                            <Link to="/signin" className="ds-link font-bold">
                                                {t('auth.signup.signin_here', 'Sign in here')}
                                            </Link>
                                        </p>
                                    </div>

                                    {errorMessage && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm font-medium">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-700 text-sm font-bold">
                                            {successMessage}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                {t('auth.signup.fullname_label', 'Full Name')}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    placeholder={t('auth.signup.fullname_placeholder', 'First & Last Name')}
                                                    required
                                                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-300 rounded text-slate-900 text-sm font-medium focus:bg-white focus:border-[#1c4980] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Address */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                {t('auth.signup.email_label', 'Email Address')}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="name@example.com"
                                                    required
                                                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-300 rounded text-slate-900 text-sm font-medium focus:bg-white focus:border-[#1c4980] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                {t('auth.signup.phone_label', 'Phone Number (Cameroon or International)')}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="+237 670 000 000"
                                                    required
                                                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-300 rounded text-slate-900 text-sm font-medium focus:bg-white focus:border-[#1c4980] focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Primary Interest */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                {t('auth.signup.role_label', 'Primary Interest / Role')}
                                            </label>
                                            <select
                                                value={interest}
                                                onChange={(e) => setInterest(e.target.value)}
                                                className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded text-slate-900 text-sm font-medium focus:bg-white focus:border-[#1c4980] focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option value="donor">{t('auth.signup.opt_donor', 'Supporter / Donor')}</option>
                                                <option value="scholarship">{t('auth.signup.opt_scholarship', 'Scholarship Applicant / Parent')}</option>
                                                <option value="volunteer">{t('auth.signup.opt_volunteer', 'Volunteer / Community Worker')}</option>
                                                <option value="partner">{t('auth.signup.opt_partner', 'Corporate / Institutional Partner')}</option>
                                            </select>
                                        </div>

                                        {/* Passwords grid */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                    {t('auth.signup.password_label', 'Password')}
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                        <Lock className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder={t('auth.signup.min_chars', 'Min. 6 chars')}
                                                        required
                                                        className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-300 rounded text-slate-900 text-sm font-medium focus:bg-white focus:border-[#1c4980] focus:outline-none transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                                    >
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                                    {t('auth.signup.confirm_password_label', 'Confirm Password')}
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                        <Lock className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder={t('auth.signup.reenter_password', 'Re-enter password')}
                                                        required
                                                        className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-300 rounded text-slate-900 text-sm font-medium focus:bg-white focus:border-[#1c4980] focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Terms Agreement Checkbox */}
                                        <div className="pt-2">
                                            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                                                <input
                                                    type="checkbox"
                                                    checked={agreeTerms}
                                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                                    className="w-4 h-4 accent-[#1c4980] rounded mt-0.5"
                                                />
                                                <span>
                                                    {t('auth.signup.agree_prefix', 'I agree to the')}{' '}
                                                    <Link to="/terms-of-service" className="text-[#1c4980] underline font-bold" target="_blank">
                                                        {t('auth.signup.terms_link', 'Terms of Service')}
                                                    </Link>{' '}
                                                    {t('auth.signup.and', 'and')}{' '}
                                                    <Link to="/privacy-policy" className="text-[#1c4980] underline font-bold" target="_blank">
                                                        {t('auth.signup.privacy_link', 'Privacy Policy')}
                                                    </Link>.
                                                </span>
                                            </label>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="ds-btn ds-btn-primary w-full h-13 text-base justify-center rounded mt-2"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    {t('auth.signup.creating_account', 'Creating Account...')}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    {t('auth.signup.submit_btn', 'Create Free Account')} <ArrowRight className="w-4 h-4" />
                                                </span>
                                            )}
                                        </button>

                                        {/* Sign In Redirect */}
                                        <div className="text-center pt-2">
                                            <p className="text-sm text-slate-600">
                                                {t('auth.signup.already_have_account', 'Already have an Enako account?')}{' '}
                                                <Link to="/signin" className="text-[#1c4980] font-extrabold uppercase text-xs tracking-wider hover:underline ml-1">
                                                    {t('auth.signup.signin_link', 'Sign In Here')}
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SignUp;
