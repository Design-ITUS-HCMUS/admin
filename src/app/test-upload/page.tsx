'use client';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface IFile {
  map(arg0: (file: IFile) => import('react').JSX.Element): import('react').ReactNode;
  id: number;
  filename: string;
  type: string;
  data: string;
  createdAt: string;
}

export default function Page() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event: any) => {
    setFiles(Array.from(event.target.files));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/api/save-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [fileArr, setFileArr] = useState<IFile | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const ids = [1, 2, 3];

        const response = await axios.post('/api/get-file', { ids });
        console.log(response.data.data);
        setFileArr(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFile();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
          Upload files
          <VisuallyHiddenInput type='file' multiple onChange={handleFileChange} />
        </Button>

        <Button type='submit' variant='contained' endIcon={<SendIcon />}>
          Send
        </Button>
      </form>

      <div>
        {fileArr?.map((file: IFile) => (
          <div key={file.id}>
            <div>{file.filename}</div>
            <div>{file.type}</div>
            <div>{file.createdAt}</div>
            {file.type.startsWith('image/') ? (
              <img src={`data:${file.type};base64,${file.data}`} alt={file.filename} />
            ) : (
              <a href={`data:${file.type};base64,${file.data}`} download={file.filename}>
                <Button variant='contained' startIcon={<DownloadIcon />}>
                  Download
                </Button>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
