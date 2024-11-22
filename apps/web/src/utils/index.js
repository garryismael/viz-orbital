export const getImageUrls = (path, prefix, total) => {
  return Array.from({ length: total }, (_, index) => {
    const paddedNumber = String(index + 1).padStart(4, "0");
    return `${path}/${prefix}${paddedNumber}.jpg`;
  });
};
