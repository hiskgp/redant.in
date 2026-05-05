import { useLocation, Link } from 'react-router-dom';

export default function ThankYou() {
  const location = useLocation();
  const position = location.state?.position || localStorage.getItem('waitlistPosition') || '??';

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-2">You're in! 🎉</h1>
        <p className="text-slate-600 mb-6">Welcome to ChatSprout early access</p>

        <div className="bg-emerald-50 border-emerald-200 rounded-2xl p-6 mb-6">
          <div className="text-sm text-emerald-700 mb-1">Your position</div>
          <div className="text-5xl font-extrabold text-emerald-600">#{position}</div>
          <div className="text-xs text-emerald-600 mt-2">in the waitlist</div>
        </div>

        <div className="space-y-3 text-left bg-slate-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-emerald-600 mt-0.5">✓</span>
            <span className="text-sm">We'll WhatsApp you within 24 hours</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-emerald-600 mt-0.5">✓</span>
            <span className="text-sm">Get 3 months free when we launch</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-emerald-600 mt-0.5">✓</span>
            <span className="text-sm">Early access to Tamil AI features</span>
          </div>
        </div>

        <Link
          to="/"
          className="inline-block w-full h-12 bg-slate-900 text-white rounded-xl font-semibold grid place-items-center hover:bg-slate-800 transition"
        >
          Back to Home
        </Link>

        <p className="text-xs text-slate-500 mt-4">
          Questions? WhatsApp us at +91 95004 76769
        </p>
      </div>
    </div>
  );
}