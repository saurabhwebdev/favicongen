# Favicon Generator

A simple web tool that generates various favicon and icon sizes from a single 512x512 image. This tool creates icons in the following sizes:
- 16x16 (favicon.ico)
- 32x32 (favicon.ico)
- 48x48
- 72x72
- 96x96
- 144x144
- 192x192
- 512x512

## Live Demo

You can try the tool at: [GitHub Pages Demo](https://saurabhwebdev.github.io/favicon-generator/)

## How to Use

1. Open the `index.html` file in a web browser
2. Upload a 512x512 pixel image by either:
   - Dragging and dropping the image onto the drop zone
   - Clicking the "Choose File" button and selecting your image
3. The tool will automatically generate previews of all icon sizes
4. Download individual icons by clicking the "Download" button below each preview
5. Download all icons at once by clicking the "Download All Icons" button

## Features

- Drag and drop interface
- Preview of all generated icon sizes
- Individual or bulk download options
- Automatic validation of image dimensions
- Modern and responsive design

## Browser Compatibility

This tool works in all modern browsers that support:
- HTML5 Canvas
- File API
- Drag and Drop API

## Deployment

### Local Development

1. Clone this repository
2. Open `index.html` in your browser

### GitHub Pages Deployment

This repository is set up to automatically deploy to GitHub Pages when pushing to the main branch. The `.github/workflows/pages.yml` file contains the GitHub Actions workflow that handles the deployment.

To deploy your own version:

1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Push changes to the main branch to trigger deployment

## Notes

- The input image must be exactly 512x512 pixels
- All generated icons are in PNG format
- The tool uses client-side processing, so your images never leave your computer 