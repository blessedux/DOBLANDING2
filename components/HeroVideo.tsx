'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const HeroVideo = () => {
  const [videoQuality, setVideoQuality] = useState<'high' | 'low' | 'webm' | 'poster'>('poster');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check network conditions
    const checkConnection = async () => {
      // Get connection info if available
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        
        if (conn.effectiveType === '4g' && !conn.saveData) {
          setVideoQuality('high');
        } else if (conn.effectiveType === '3g' || conn.saveData) {
          setVideoQuality('webm');
        } else {
          setVideoQuality('low');
        }
      } else {
        // Fallback to high quality if we can't detect
        setVideoQuality('high');
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      setVideoQuality('poster');
    } else {
      checkConnection();
    }
  }, []);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    // Fallback chain if current quality fails to load
    if (videoQuality === 'high') {
      setVideoQuality('webm');
    } else if (videoQuality === 'webm') {
      setVideoQuality('low');
    } else if (videoQuality === 'low') {
      setVideoQuality('poster');
    }
  };

  // Handle smooth loop transition
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      // If we're near the end of the video (within 0.5 seconds)
      if (video.currentTime >= video.duration - 0.5) {
        // Start fading out
        video.style.opacity = '0';
        // After the fade out, reset the video
        setTimeout(() => {
          video.currentTime = 0;
          video.style.opacity = '1';
        }, 500); // Match this with the CSS transition duration
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden" >
      {/* Poster image always shown during video load */}
      <Image
        src="/earth_first_frame.webp"
        alt="Earth from space"
        fill
        priority
        className="object-cover"
        style={{ opacity: isLoading ? 1 : 0 }}
      />

      {videoQuality !== 'poster' && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onTimeUpdate={handleTimeUpdate}
        >
          {/* Dynamic source based on quality */}
          {videoQuality === 'high' && (
            <source 
              src="/Earth Spinning in Space ｜ Royalty Free ｜ Stock footage ｜ Free HD Videos - No Copyright.mp4" 
              type="video/mp4"
            />
          )}
          {videoQuality === 'webm' && (
            <source 
              src="/earth_optimized.webm" 
              type="video/webm"
            />
          )}
          {videoQuality === 'low' && (
            <source 
              src="/earth_ultra_compressed.mp4" 
              type="video/mp4"
            />
          )}
        </video>
      )}

      {/* Optional loading indicator */}
      {isLoading && videoQuality !== 'poster' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      <style jsx>{`
        video {
          transition: opacity 0.5s ease-in-out;
          filter: contrast(1.2) brightness(0.85);
        }
        img {
          transition: opacity 0.5s ease-in-out;
          filter: contrast(1.2) brightness(0.85);
        }
      `}</style>
    </div>
  );
};

export default HeroVideo; 