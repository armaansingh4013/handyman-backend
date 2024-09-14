const fs = require('fs');
const path = require('path');

// Function to delete images from the server folder
const deleteImages = (images) => {
  images.forEach((imagePath) => {
    const fullPath = path.join(__dirname, '..', imagePath); // Adjust the path if necessary

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(`Failed to delete image at ${fullPath}:`, err);
      } else {
        // console.log(`Successfully deleted image at ${fullPath}`);
      }
    });
  });
};

module.exports = deleteImages;
