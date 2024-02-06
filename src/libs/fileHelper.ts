import axios from 'axios';

export async function uploadFile(files: File[], permission: number = 0) {
  try {
    if (files.length === 0) return [];

    // Set default size per part (8MB/part)
    const partSize = 1024 * 1024 * 8;

    // Default arr to store file IDs
    const ids: number[] = [];

    // Change later to get real user ID
    const ownerID = 1;

    for (const file of files) {
      // Get upload ID and key
      const uploadIDResponse = await axios.post('/api/file/upload/start', {
        ownerID,
        filename: file.name,
        contentType: file.type,
        permission,
      });
      const uploadID = uploadIDResponse.data.data.uploadID;
      const key = uploadIDResponse.data.data.key;

      // Get presigned URL for all parts
      const presignedUrlResponse = await axios.post('/api/file/upload/presigned-url', {
        key,
        uploadID,
        totalPart: Math.ceil(file.size / partSize),
      });
      const presignedUrls = presignedUrlResponse.data.data;

      // Upload file to bucket
      const promises = [];

      for (let i = 0; i < presignedUrls.length; i++) {
        const start = i * partSize;
        const end = Math.min((i + 1) * partSize, file.size);
        const blob = file.slice(start, end);

        const singlePart = axios.put(presignedUrls[i], blob, {
          headers: {
            'Content-Type': file.type,
          },
        });

        promises.push(singlePart);
      }

      // Wait for all parts to be uploaded -> Push to parts array
      const uploadResults = await Promise.all(promises);
      const parts = uploadResults.map((part, index) => {
        return {
          ETag: part.headers.etag,
          PartNumber: index + 1,
        };
      });

      // Finish multipart upload
      await axios.post('/api/file/upload/finish', {
        key,
        uploadID,
        parts,
      });

      // Push file ID to array
      ids.push(key);
    }

    return ids;
  } catch (error) {
    return null;
  }
}

export async function deleteFile(ids: number[]) {
  try {
    for (let i = 0; i < ids.length; i++) {
      await axios.delete(`/api/file/${ids[i]}`);
    }

    return true;
  } catch (error) {
    return null;
  }
}

export async function replaceFile(oldFileIDs: number[], newFiles: File[], permission: number = 0) {
  try {
    // Upload new files first
    const newFileIDs = await uploadFile(newFiles, permission);
    if (!newFileIDs) return null;

    // Delete old files if new files are uploaded successfully
    try {
      await deleteFile(oldFileIDs);
    } catch (error) {
      // If failed to delete old files -> Return new file IDs
      // Then update the old file IDs in the database later
      return newFileIDs;
    }

    return newFileIDs;
  } catch (error) {
    return null;
  }
}
