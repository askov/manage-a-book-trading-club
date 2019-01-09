export default {
  validateAvatar(image: File) {
    // Max size in Kb
    const MAX_IMAGE_SIZE = 50;
    if (image) {
      if (image.size < MAX_IMAGE_SIZE * 1024) {
        return { acceptable: true };
      } else {
        return {
          acceptable: false,
          error: `Image is too large. File size can't exceed ${MAX_IMAGE_SIZE} KB`,
        };
      }
    } else {
      return { acceptable: false, error: 'Avatar is not selected' };
    }
  },
};
