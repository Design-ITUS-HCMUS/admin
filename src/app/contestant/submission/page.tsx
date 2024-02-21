'use client';

import { Uploader } from '@/libs/ui/components/Uploader';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const Container = styled('div')({
  margin: '0 auto',
  padding: '16px',
  alignContent: 'center',
});

const StyledInput = styled('input')({
  display: 'none',
});

const StyledImage = styled(Image)({
  objectFit: 'contain',
});

const FileInput = ({ onChange }: { onChange: React.ChangeEventHandler<HTMLInputElement> }) => (
  <StyledInput id='fileInput' type='file' onChange={onChange} sx={{ width: '100%' }} />
);

const ErrorMessage = ({ message }: { message: string | null }) =>
  message ? <Typography color='error'>{message}</Typography> : null;

const FilePreview = ({ src }: { src: string | null }) =>
  src ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <StyledImage src={src} alt='File preview' width={600} height={600} objectFit='contain' />
    </Box>
  ) : null;

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

const handleFileChange =
  (
    setUploadState: Dispatch<SetStateAction<'resting' | 'hover' | 'failure'>>,
    setErrorMessage: Dispatch<SetStateAction<string | null>>,
    setSelectedFile: Dispatch<SetStateAction<File | null>>,
    setFilePreview: Dispatch<SetStateAction<string | null>>
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      const file = files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setUploadState('failure');
        setErrorMessage(
          `File type ${file.name.split('.').pop()?.toUpperCase()} is not supported. Only PNG, JPEG and GIF files are supported.`
        );
        return;
      }
      setUploadState('resting');
      setErrorMessage(null);
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

export default function Submission() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadstate, setUploadState] = useState<'resting' | 'hover' | 'failure'>('resting');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (uploadstate === 'failure') {
      setTimeout(() => {
        try {
          router.refresh();
        } catch (error) {
          console.error(error);
        } finally {
          setUploadState('resting');
          setErrorMessage(null);
          setSelectedFile(null);
          setFilePreview(null);
        }
      }, 1000);
    }
  }, [uploadstate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/submission', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('File upload failed');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant='h6' align={'center'}>
        Nộp bài
      </Typography>
      {!filePreview && (
        <Uploader
          buttonProps={uploadstate === 'failure' ? { state: 'error' } : { state: 'resting' }}
          placeholder='SVG, PNG, JPG or GIF (1400x700px)'
          inputProps={{
            id: 'fileInput',
            onChange: handleFileChange(setUploadState, setErrorMessage, setSelectedFile, setFilePreview),
          }}
        />
      )}
      <FileInput onChange={handleFileChange(setUploadState, setErrorMessage, setSelectedFile, setFilePreview)} />
      <ErrorMessage message={errorMessage} />
      <FilePreview src={filePreview} />
      {selectedFile && uploadstate !== 'failure' && (
        <Box display='flex' justifyContent='center' style={{ width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <Button type='submit' style={{ width: '100%' }}>
              Tải lên
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
}
