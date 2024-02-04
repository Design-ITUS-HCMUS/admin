import axios from 'axios';

export async function uploadFile(files: File[], permission: number = 0) {
  try {
    if (files.length === 0) return [];

    // Change later to get real user ID
    const ownerID = 1;

    const contentType: string[] = [];
    const filename: string[] = [];

    files.forEach((file) => {
      contentType.push(file.type);
      filename.push(file.name);
    });

    const presignedUrlResponse = await axios.post('/api/file/presigned-url', {
      ownerID,
      contentType,
      filename,
      permission,
    });

    const presignedUrls = presignedUrlResponse.data.data.url;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const presignedUrl = presignedUrls[i];

      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
    }

    const uploadConfirmationResponse = await axios.post('/api/file/upload-confirmation', {
      ids: presignedUrlResponse.data.data.ids,
    });

    if (uploadConfirmationResponse.data.success === false) return null;

    return presignedUrlResponse.data.data.ids;
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
