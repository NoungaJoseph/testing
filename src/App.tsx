import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Impact from './pages/Impact';
import Stories from './pages/Stories';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import SchoolRegistration from './pages/SchoolRegistration';
import ProgramDetail from './pages/ProgramDetail';
import Roadmap from './pages/Roadmap';
import Partnership from './pages/Partnership';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogLatestNews from './pages/BlogLatestNews';
import BlogArchives from './pages/BlogArchives';
import BlogDetail from './pages/BlogDetail';
import FocusDetail from './pages/FocusDetail';
import FocusCommunities from './pages/FocusCommunities';
import CommunityDetail from './pages/CommunityDetail';
import ApplicationDetail from './pages/ApplicationDetail';
import ScholarshipTrackApplication from './pages/ScholarshipTrackApplication';
import ScholarshipDetail from './pages/ScholarshipDetail';
import RequirementDetail from './pages/RequirementDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ChildrensFund from './pages/ChildrensFund';
import Account from './pages/Account';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackClickHeatmap } from './lib/analyticsTracker';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';

import CommunityProjects from './pages/CommunityProjects';

function AnalyticsPageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      trackClickHeatmap(location.pathname, e);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CookieConsent />
      <AnalyticsPageTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/childrens-fund" element={<ChildrensFund />} />
        <Route path="/account" element={<Account />} />
        <Route path="/school-registration" element={<SchoolRegistration />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/focus-communities" element={<FocusCommunities />} />
        <Route path="/apply/:type" element={<ApplicationDetail />} />
        <Route path="/apply/scholarship" element={<ScholarshipTrackApplication />} />
        <Route path="/apply/scholarship/:track" element={<ScholarshipTrackApplication />} />
        <Route path="/scholarships/:id" element={<ScholarshipDetail />} />
        <Route path="/apply/requirements/:slug" element={<RequirementDetail />} />
        {/* Blog routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/posts" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/latest-news" element={<BlogLatestNews />} />
        <Route path="/blog/archives" element={<BlogArchives />} />
        <Route path="/focus-communities/:slug" element={<FocusDetail />} />
        <Route path="/communities/:slug" element={<CommunityDetail />} />
        <Route path="/communities/:slug/projects" element={<CommunityProjects />} />
        {/* Get Involved alias */}
        <Route path="/get-involved" element={<Volunteer />} />
        {/* Legal routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/search" element={<Search />} />
        {/* Auth routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
