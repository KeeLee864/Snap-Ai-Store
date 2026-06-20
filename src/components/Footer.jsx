import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-bold text-white">Snap</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <a href="#" className="hover:text-white transition-colors">Shipping</a>
            <a href="#" className="hover:text-white transition-colors">Returns</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} Snap. Problem solved.</p>
        </div>
      </div>
    </footer>
  );
}