const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const svgPath = path.join(__dirname, 'public', 'images', 'Group.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  // favicon-16x16.png - orta boyut
  await sharp(svgBuffer)
    .resize(14, 14, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 1, bottom: 1, left: 1, right: 1, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'public', 'favicon-16x16.png'));
  console.log('favicon-16x16.png ok');

  // favicon-32x32.png - orta boyut
  await sharp(svgBuffer)
    .resize(28, 28, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 2, bottom: 2, left: 2, right: 2, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'public', 'favicon-32x32.png'));
  console.log('favicon-32x32.png ok');

  // favicon.ico - orta boyut
  await sharp(svgBuffer)
    .resize(28, 28, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 2, bottom: 2, left: 2, right: 2, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'public', 'favicon.ico'));
  console.log('favicon.ico ok');

  // apple-touch-icon.png
  await sharp(svgBuffer)
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png ok');

  console.log('Done!');
}

generateFavicons().catch(console.error);
