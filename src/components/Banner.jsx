import React, { useEffect, useRef } from "react";

const Banner = () => {
  const scrollRef = useRef(null);

  // Sample card data - replace with your actual data
  const cards = [
    { id: 1, title: "Premium Photos", image: "../assets/hero.jpg", color: "bg-blue-100" },
    
    { id: 3, title: "Vector Graphics", image: "../assets/vectors.jpg", color: "bg-yellow-100" },
    { id: 4, title: "Illustrations", image: "../assets/illustration.jpg", color: "bg-purple-100" },
    { id: 5, title: "PSD", image: "../assets/psd.jpg", color: "bg-pink-100" },
    { id: 6, title: "Sound Effects", image: "../assets/sound.jpg", color: "bg-indigo-100" },
    { id: 7, title: "3D Models", image: "../assets/3d.jpg", color: "bg-red-100" },
    
  ];

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Function to handle scroll animation
    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed
    const totalWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through all content
      if (scrollPosition >= totalWidth - containerWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(scroll);

    // Pause scrolling when hovering
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-white py-10 px-6 border-t-red-500">
      {/* Original banner content */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
        {/* Circle placeholder for icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold text-xl">♥</span>
          </div>
        </div>

        {/* Text content */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
            Premium media you can use anywhere
          </h3>
          <p className="text-sm text-gray-600 mb-3 max-w-3xl">
            Piksbazaar is a vibrant community of creatives, sharing royalty-free images, videos, audio and other media. All content is released by Pixabay under the Content License, which makes it safe to use without asking for permission or giving credit to the artist – even for certain commercial purposes.
          </p>
          <a
            href="#"
            className="text-green-600 font-medium text-sm hover:underline"
          >
            Learn more about our license
          </a>
        </div>
      </div>

      {/* Auto-scrolling cards section */}
      <div className="max-w-7xl py-8 mx-auto">
        <h4 className="text-xl font-medium flex justify-center text-gray-800 mb-4">Explore Our Categories</h4>
        
        {/* Scrolling container with overflow hidden */}
        <div 
          className="overflow-x-hidden relative"
          ref={scrollRef}
        >
          <div className="flex space-x-4 pb-4">
            {cards.map(card => (
              <div 
                key={card.id} 
                className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`h-40 ${card.color} flex items-center justify-center`}>
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 ">
                  <h5 className="font-medium text-gray-900">{card.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">Explore our collection</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation indicators (optional) */}
        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;