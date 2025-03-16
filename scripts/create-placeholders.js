const https = require('https');
const fs = require('fs');
const path = require('path');

// URLs for placeholder GIFs (using giphy)
const gifPlaceholders = {
  'public/icons/cubos.gif': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3o3eWdtbHkyOWZ5Z2VwZ3NvZXd3YmJmeGRyNHFlYmRsaTYzOWRyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGtgR3qDlW7oAFO/giphy.gif',
  'public/icons/dashboard.gif': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2lyZHM0a2YwdHl1NWJlOGtrZjMzdmJ1dnNjOXYxazFqanRzN3d5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif'
};

// Create placeholder MP4 video
const createPlaceholderVideo = () => {
  const videoPath = path.join(__dirname, '../public/icons/mockup.mp4');
  
  // Ensure the directory exists
  const dir = path.dirname(videoPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create an empty file for now
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

console.log('Started creating placeholders. Please wait...'); 