export const navigateImage = (direction, currentIndex, imagesLength) => {
  const increment = direction === "prev" ? -1 : 1
  return (currentIndex + increment + imagesLength) % imagesLength
}
