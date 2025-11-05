const sharp = require('sharp');
const path = require('path');

async function generateAndroidIcons() {
  try {
    const inputPath = path.join(__dirname, '../public/logo.jpg');
    const outputDir = path.join(__dirname, '../public');
    
    // Generate android-chrome-192x192.png
    await sharp(inputPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));
    
    // Generate android-chrome-512x512.png
    await sharp(inputPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    
    console.log('Android icons generated successfully!');
  } catch (error) {
    console.error('Error generating Android icons:', error);
  }
}

generateAndroidIcons();