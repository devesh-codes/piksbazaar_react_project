import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Logo & Description */}
          <div>
            <img src="../assets/icon101.png" alt="Logo" className="w-48 mb-4" />
            <p className="text-sm leading-relaxed">
              Over 5.4 million+ high quality stock images, videos and music shared by our talented community.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {['Instagram', 'Facebook', 'TikTok', 'Twitter', 'LinkedIn', 'YouTube', 'Pinterest'].map(platform => (
                <a
                  key={platform}
                  href="#"
                  className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {/* Discover */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Discover</h3>
              <ul className="space-y-2">
                {[
                  "Editor's Choice",
                  'Curated Collections',
                  'Pixabay Radio',
                  'Popular Images',
                  'Popular Videos',
                  'Popular Music',
                  'Popular Searches'
                ].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:underline hover:text-gray-900 transition"
                    >
                      {item}
                      {item === 'Pixabay Radio' && (
                        <span className="ml-2 text-white bg-green-500 text-xs px-2 py-0.5 rounded-full">NEW</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Community</h3>
              <ul className="space-y-2">
                {['Blog', 'Forum', 'Creators', 'Cameras'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:underline hover:text-gray-900 transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">About</h3>
              <ul className="space-y-2">
                {[
                  'About Us',
                  'FAQ',
                  'License Summary',
                  'Terms of Service',
                  'Privacy Policy',
                  'Cookies Policy',
                  'Digital Services Act',
                  'Report Content',
                  'API'
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:underline hover:text-gray-900 transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t pt-6 text-center text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="underline hover:text-gray-700">Privacy Policy</a> and{' '}
          <a href="#" className="underline hover:text-gray-700">Terms of Service</a> apply.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
