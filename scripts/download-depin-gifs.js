const https = require('https');
const fs = require('fs');
const path = require('path');

// URLs for DePIN-related GIFs from Giphy
const gifPlaceholders = {
  // EV charging animation - for the cubos.gif replacement
  'public/icons/cubos.gif': 'https://media.giphy.com/media/SQgbkziuGrNxS/giphy.gif',
  
  // Network visualization - for the dashboard.gif replacement
  'public/icons/dashboard.gif': 'https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif',
  
  // Additional GIFs that might be useful for other sections
  'public/icons/solar-panel.gif': 'https://media.giphy.com/media/6qFTgz9lOQsH6/giphy.gif',
  'public/icons/smart-city.gif': 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  'public/icons/wireless-data.gif': 'https://media.giphy.com/media/l0MYDEPLWRWbJoRuU/giphy.gif'
};

// Create placeholder MP4 video
const createPlaceholderVideo = () => {
  const videoPath = path.join(__dirname, '../public/icons/mockup.mp4');
  
  // Ensure the directory exists
  const dir = path.dirname(videoPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create an empty file for now - you might want to replace this with a real video later
  fs.writeFileSync(videoPath, '');
  console.log('Created empty placeholder for mockup.mp4');
};

// Download function
function downloadPlaceholder(url, filePath) {
  // Ensure the directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  console.log(`Downloading ${path.basename(filePath)}...`);
  
  const file = fs.createWriteStream(filePath);
  
  https.get(url, response => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${path.basename(filePath)}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${path.basename(filePath)}: ${err.message}`);
  });
}

// Download all GIFs
Object.entries(gifPlaceholders).forEach(([filePath, url]) => {
  const fullPath = path.join(__dirname, '..', filePath);
  downloadPlaceholder(url, fullPath);
});

// Create placeholder video
createPlaceholderVideo();

console.log('Started downloading DePIN-related GIFs. Please wait...'); 