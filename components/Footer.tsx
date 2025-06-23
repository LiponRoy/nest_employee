import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin} from 'react-icons/fa';

export const Footer=()=> {
  return (
    <footer className="bg-slate-600 text-white py-10 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
        <Link href="/" className="text-2xl font-bold flex justify-start items-center gap-1">
                <span className="text-secondary-1">Nest</span>
                <span className="text-primary-2">Employee</span>
            </Link>
          <p className="text-sm text-gray-400">
            Your trusted job portal site.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Blog</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-xl text-gray-300">
            <a><FaFacebook /></a>
            <a><FaTwitter /></a>
            <a><FaLinkedin /></a>
          </div>
          <p className="text-sm text-gray-400 mt-4">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
