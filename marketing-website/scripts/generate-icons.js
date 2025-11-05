const sharp = require('sharp');
const path = require('path');

async function generateIcons() {
  try {
    const inputPath = path.join(__dirname, '../public/logo.jpg');
    const outputDir = path.join(__dirname, '../public');
    
    // Generate favicon.ico (32x32)
    await sharp(inputPath)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(inputPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    // Generate favicon-32x32.png
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    
    // Generate favicon-16x16.png
    await sharp(inputPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    
    // Generate og-image.png (1200x630)
    await sharp(inputPath)
      .resize(1200, 630, { 
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(outputDir, 'og-image.png'));
    
    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();