function formatName(input) {
    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }
  
    // Trim leading and trailing spaces and replace multiple spaces with a single space
    const trimmedInput = input.trim().replace(/\s+/g, ' ');
  
    // Capitalize the first letter of each word
    const formattedInput = trimmedInput
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    return formattedInput;
  }
  module.exports={
    formatName
  }