import React from "react";

export default function Contributor() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-[#27548A] text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Piksbazaar Contributor</h1>
          <button className="bg-white text-[#27548A] hover:bg-gray-100 px-4 py-2 rounded font-semibold">Join Now</button>
        </div>
      </header>

      

      

      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-4xl font-bold mb-6">Sell photos, vectors & PSD designs on Piksbazaar</h3>
            <p className="text-lg text-gray-700 mb-6">
              Become a Piksbazaar contributor and make money selling your images and designs online.
            </p>
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <span className="bg-red-100 text-red-600 p-2 rounded"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></span>
                <p><strong>Create</strong> photos, vectors, illustrations, mockups, etc. We embrace all types of creativity.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm8 14V6m-4 4l4-4 4 4" /></svg></span>
                <p><strong>Upload</strong> your graphic resources to Piksbazaar through our intuitive and easy-to-use tool.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-yellow-100 text-yellow-600 p-2 rounded"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.105 0-2 .672-2 1.5S10.895 11 12 11s2 .672 2 1.5S13.105 14 12 14m0-6v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                <p><strong>Make money</strong> per every download your resources get. As simple as that.</p>
              </li>
            </ul>
            <button className="mt-8 bg-[#27548A] text-white text-lg px-6 py-3 rounded font-semibold">Become a contributor</button>
          </div>
          <div className="md:w-1/2 grid grid-cols-3 gap-2 items-center justify-center">
            <img src="../assets/banner.png" alt="Piksbazaar Contributor Promo" className="rounded-xl  col-span-3" />
            {/* <img src="/mnt/data/94ed6c38-af50-4165-8f0f-9a8c3afe5c7e.png" alt="Piksbazaar Contributor Thumbnails" className="rounded-xl shadow-md col-span-1" /> */}
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Enjoy creative freedom</h3>
          <p className="text-gray-600 mb-10">
            At Piksbazaar, there’s room for your creativity, whatever your talent is. Choose the graphic resources you want to sell and upload them to our platform.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-xl mb-2">Sell Photos</h4>
              <p className="text-gray-700 mb-4">Find your concept, capture it and make money selling outstanding stock photos online with Piksbazaar.</p>
              <a href="#" className="text-blue-600 font-semibold">See guidelines</a>
            </div>
            <div className="bg-cyan-50 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-xl mb-2">Sell illustrations vector art</h4>
              <p className="text-gray-700 mb-4">Create quality and useful designs that sell best online: banners, wedding invitations, backgrounds... There are countless options!</p>
              <a href="#" className="text-blue-600 font-semibold">See guidelines</a>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-xl mb-2">Sell PSD designs</h4>
              <p className="text-gray-700 mb-4">Design unique and eye-catching mockups and templates that show your true potential and make you earn money online.</p>
              <a href="#" className="text-blue-600 font-semibold">See guidelines</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Piksbazaar Contributor. All rights reserved.
      </footer>
    </div>
  );
}