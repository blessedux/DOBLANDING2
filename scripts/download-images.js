const https = require('https');
const fs = require('fs');
const path = require('path');

// URLs for placeholder images (using placeholder.com)
const imageUrls = {
  'verification.jpg': 'https://placehold.co/600x400/597CE9/FFFFFF.jpg?text=Advanced+Verification',
  'ai-management.jpg': 'https://placehold.co/600x400/597CE9/FFFFFF.jpg?text=AI+Management',
  'ecosystem.jpg': 'https://placehold.co/600x400/597CE9/FFFFFF.jpg?text=Ecosystem'
};

// Download directory
const downloadDir = path.join(__dirname, '../public/images');

// Ensure the directory exists
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

// Download function
function downloadImage(url, filename) {
  const filePath = path.join(downloadDir, filename);
  
  console.log(`Downloading ${filename}...`);
  
  const file = fs.createWriteStream(filePath);
  
  https.get(url, response => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
}

// Download all images
Object.entries(imageUrls).forEach(([filename, url]) => {
  downloadImage(url, filename);
});

console.log('Started downloading images. Please wait...'); 