'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { MyDialog } from '@/libs/ui/components/Dialog';
import Box from '@mui/material/Box';
import { UploadFile } from '@mui/icons-material';
import color from '@/libs/ui/color';

const Container = styled('div')({
  margin: '0 auto',
});

const StyledMyDialog = styled(MyDialog)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

StyledMyDialog.defaultProps = {
  ...MyDialog.defaultProps,
  maxWidth: false,
};

const getBackgroundColor = (uploadstate: string) => {
  switch (uploadstate) {
    case 'hover':
      return color.blue[100];
    case 'failure':
      return color.background.error;
    default:
      return 'white';
  }
};

const BaseBox = styled(Box)<{ uploadstate: string }>(({ theme, uploadstate }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: getBackgroundColor(uploadstate),
}));

const StyledLabel = styled('label')<{ uploadstate: string }>(({ theme, uploadstate }) => ({
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  backgroundColor: getBackgroundColor(uploadstate),
}));

const StyledInput = styled('input')({
  display: 'none',
});

const StyledImage = styled(Image)({
  objectFit: 'contain',
  width: '100%',
  height: '100%',
});

const DialogContent = styled(BaseBox)(({ theme, uploadstate }) => ({
  width: '600px',
  padding: '24px 16px',
  gap: '8px',
  border: uploadstate === 'failure' ? '1px solid red' : '1px dashed gray',
  borderRadius: '4px',
  borderColor: uploadstate === 'hover' ? 'blue' : uploadstate === 'failure' ? 'red' : 'gray',
}));

const StyledBox = styled(BaseBox)({
  position: 'relative',
  width: '100%',
});

// Extracted components
const FileInput = ({ onChange }: { onChange: React.ChangeEventHandler<HTMLInputElement> }) => (
  <StyledInput id='fileInput' type='file' onChange={onChange} sx={{ width: '100%' }} />
);

const ErrorMessage = ({ message }: { message: string | null }) =>
  message ? <Typography color='error'>{message}</Typography> : null;

const FilePreview = ({ src }: { src: string | null }) =>
  src ? (
    <Box sx={{ position: 'relative', width: '100%', height: '30%' }}>
      <StyledImage src={src} alt='File preview' width={30} height={30} />
    </Box>
  ) : null;

// Helper function
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
      if (file.type === 'application/pdf') {
        setUploadState('failure');
        setErrorMessage('PDF files are not supported.');
        return;
      }
      setUploadState('resting');
      setErrorMessage(null);
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

// Main component
export default function Submission() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadstate, setUploadState] = useState<'resting' | 'hover' | 'failure'>('resting');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (uploadstate === 'failure') {
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Wait for 3 seconds
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
      <Typography variant='h6'>Nộp bài</Typography>
      <StyledMyDialog open={true} maxWidth={false}>
        <DialogContent uploadstate={uploadstate}>
          <StyledLabel
            uploadstate={uploadstate}
            htmlFor='fileInput'
            onMouseEnter={() => setUploadState('hover')}
            onMouseLeave={() => setUploadState('resting')}>
            {!filePreview && (
              <StyledBox uploadstate={uploadstate} sx={{ gap: '8px' }}>
                <UploadFile
                  color={uploadstate === 'failure' ? 'error' : 'primary'}
                  sx={{ fontSize: '40px', width: '100%' }}
                />
                <Typography variant='h5'>Click to upload</Typography>
                <Typography>SVG, PNG, JPG or GIF (1400x700px)</Typography>
              </StyledBox>
            )}
            <ErrorMessage message={errorMessage} />
            <FileInput onChange={handleFileChange(setUploadState, setErrorMessage, setSelectedFile, setFilePreview)} />
            <FilePreview src={filePreview} />
          </StyledLabel>
          {selectedFile && uploadstate !== 'failure' && (
            <Box display='flex' justifyContent='flex-end' sx={{ width: '100%' }}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Button type='submit' style={{ width: '100%' }}>
                  Upload
                </Button>
              </form>
            </Box>
          )}
        </DialogContent>
      </StyledMyDialog>
    </Container>
  );
}
