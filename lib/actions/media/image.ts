import "server-only";

import cloudinary from "@/lib/cloudinary";

export async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "media",
        fetch_format: "auto",
        quality: "auto",
      },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          reject(new Error("Failed to save file"));
          return;
        }
        resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract everything after /upload/
    const uploadIndex = imageUrl.indexOf("/upload/");
    if (uploadIndex === -1) {
      console.error("Invalid Cloudinary URL:", imageUrl);
      return;
    }
    let pathAfterUpload = imageUrl.slice(uploadIndex + 8); // 8 = "/upload/".length
    // Skip version number if present (e.g., v1234567890/)
    if (/^v\d+\//.test(pathAfterUpload)) {
      pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, "");
    }
    // Remove file extension
    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, "");
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw error;
  }
}
