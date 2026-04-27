const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

async function buildCSS() {
  const input = fs.readFileSync(path.join(__dirname, 'src/styles.css'), 'utf-8');

  const result = await postcss([
    tailwind
  ]).process(input, { from: 'src/styles.css', to: 'dist/styles.css' });

  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(path.join(__dirname, 'dist/styles.css'), result.css);
  console.log('✅ CSS compilado en dist/styles.css');
}

buildCSS().catch(err => {
  console.error('❌ Error compilando CSS:', err);
  process.exit(1);
});
