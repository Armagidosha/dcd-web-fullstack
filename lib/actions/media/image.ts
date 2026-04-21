import "server-only";

import cloudinary from "@/lib/cloudinary";
import { logger } from "@/lib/logger";

export async function saveImage(file: File): Promise<string> {
  const log = logger.child({
    module: "cloudinary",
    action: "upload",
  });

  const start = Date.now();

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
        const duration = Date.now() - start;

        if (error || !result) {
          log.error(
            {
              event: "upload_failed",
              error,
              size: buffer.length,
              durationMs: duration,
            },
            "Cloudinary upload failed",
          );

          reject(new Error("Failed to save file"));
          return;
        }

        log.info(
          {
            event: "upload_success",
            url: result.secure_url,
            publicId: result.public_id,
            size: buffer.length,
            durationMs: duration,
          },
          "Cloudinary upload success",
        );

        resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });
}

export async function deleteImage(imageUrl: string): Promise<void> {
  const log = logger.child({
    module: "cloudinary",
    action: "delete",
  });

  const start = Date.now();

  try {
    const uploadIndex = imageUrl.indexOf("/upload/");

    if (uploadIndex === -1) {
      log.warn(
        {
          event: "invalid_url",
          imageUrl,
        },
        "Invalid Cloudinary URL",
      );

      return;
    }

    let pathAfterUpload = imageUrl.slice(uploadIndex + 8);

    if (/^v\d+\//.test(pathAfterUpload)) {
      pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, "");
    }

    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId);

    const duration = Date.now() - start;

    log.info(
      {
        event: "delete_success",
        publicId,
        durationMs: duration,
      },
      "Cloudinary delete success",
    );
  } catch (error) {
    log.error(
      {
        event: "delete_failed",
        imageUrl,
        error,
      },
      "Cloudinary delete error",
    );

    throw error;
  }
}
