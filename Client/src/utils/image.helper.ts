export const getImageUrl = (filename: string) => {
    // If the image already has a full URL, return it
    if (filename.startsWith("http")) return filename;
    // Otherwise, return the standard server path
    return `http://localhost:5000/uploads/${filename}`;
};