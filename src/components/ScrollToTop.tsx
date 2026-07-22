import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useLayoutEffect(() => {
        // Temporarily override smooth scroll to force immediate instant jump on route change
        const htmlElement = document.documentElement;
        const originalScrollBehavior = htmlElement.style.scrollBehavior;
        htmlElement.style.scrollBehavior = 'auto';

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' as ScrollBehavior,
        });

        // Also reset any scrollable main container elements
        document.body.scrollTop = 0;
        htmlElement.scrollTop = 0;

        // Restore original CSS scroll behavior after paint
        const timer = requestAnimationFrame(() => {
            htmlElement.style.scrollBehavior = originalScrollBehavior;
        });

        return () => cancelAnimationFrame(timer);
    }, [pathname, search]);

    return null;
};

export default ScrollToTop;
