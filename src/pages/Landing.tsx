import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Listen for signup success from landing.html
      if (event.data?.type === 'chatsprout-joined') {
        const position = event.data.position;
        console.log('✅ Signup successful! Position:', position);

        // Store in localStorage
        localStorage.setItem('waitlistPosition', String(position));
        localStorage.setItem('hasJoinedWaitlist', 'true');

        // Navigate to thank you or onboarding
        navigate('/thank-you', {
          state: { position },
          replace: true
        });

        // OR navigate to onboarding:
        // navigate('/onboarding', { state: { position } });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        ref={iframeRef}
        src="/landing.html"
        className="w-full h-full border-0"
        title="ChatSprout Landing"
        allow="clipboard-write"
      />
    </div>
  );
}