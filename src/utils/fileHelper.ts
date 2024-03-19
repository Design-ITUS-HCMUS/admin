import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

const fileBaseAxios = axios.create({ baseURL: '/api/file' });

export async function uploadFile(
  fileList: FileList,
  setProgress: Dispatch<SetStateAction<number>>,
  permission: number = 0
) {
  const files = Array.from(fileList);
  // Default size per part (8MB/part)
  const partSize = 1024 * 1024 * 8;

  // Default arr to store file IDs
  const ids: number[] = [];

  // UploadID and key -> null
  let uploadID: string | null = null;
  let key: number | null = null;

  try {
    if (files.length === 0) return [];

    for (const file of files) {
      // Array to store uploaded size of each part
      const countUploadedSize = new Array(Math.ceil(file.size / partSize)).fill(0);

      // Get upload ID and key
      try {
        const uploadIDResponse = await fileBaseAxios.post('/upload/start', {
          filename: file.name,
          contentType: file.type,
          permission,
        });
        uploadID = uploadIDResponse.data.data.uploadID;
        key = uploadIDResponse.data.data.key;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to get upload ID and key' + error);
      }

      // Get presigned URL for all parts
      const presignedUrlResponse = await fileBaseAxios.post('/upload/presigned-url', {
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

        // Do not delete header -> Facing CORS issue (Signature does not match)
        const singlePart = axios.put(presignedUrls[i], blob, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress(progressEvent) {
            countUploadedSize[i] = progressEvent.loaded;
            const totalUploadedSize = countUploadedSize.reduce((a, b) => a + b, 0);
            setProgress(Math.round((totalUploadedSize / file.size) * 100));
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
      ids.push(Number(key));
    }

    return ids;
  } catch (error) {
    try {
      // If failed to upload file -> Rollback
      // Delete uploaded files
      await deleteFile(ids);

      // Abort current upload file
      await axios.post('/api/file/upload/abort', {
        key,
        uploadID,
      });

      return [];
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload file, also failed to abort. Please try again.');
    }
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

// export async function replaceFile(oldFileIDs: number[], newFiles: FileList, permission: number = 0) {
//   try {
//     // Upload new files first
//     const newFileIDs = await uploadFile(newFiles, permission);
//     if (!newFileIDs) return null;

//     // Delete old files if new files are uploaded successfully
//     try {
//       await deleteFile(oldFileIDs);
//     } catch (error) {
//       // If failed to delete old files -> Return new file IDs
//       // Then update the old file IDs in the database later
//       return newFileIDs;
//     }

//     return newFileIDs;
//   } catch (error) {
//     return null;
//   }
// }
