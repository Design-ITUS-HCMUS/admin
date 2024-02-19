'use client';
import React from 'react';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
// import { replaceFile } from '@/libs/fileHelper';

const Admin = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const currentFiles = Array.from(event.target.files);
      setFiles(currentFiles);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    const contentType: string[] = [];
    const filename: string[] = [];

    files.forEach((file) => {
      formData.append('file', file);
      contentType.push(file.type);
      filename.push(file.name);
    });

    // const response = await replaceFile([], files);
  };

  return (
    <div className='min-h-screen bg-slate-900 text-white space-y-12'>
      <div className='max-w-2xl mx-auto py-24 px-4'>
        <h2 className='text-base font-semibold leading-7 text-white'>Admin Panel</h2>
        <p className='mt-1 text-sm leading-6 text-gray-400'>Upload files here.</p>

        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
          <div className='col-span-full'>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10'>
              <div className='text-center'>
                <DocumentScannerIcon />
                <div className='mt-4 text-sm leading-6 text-gray-400'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500'>
                    <span>Upload a file</span>
                    <input
                      type='file'
                      id='file-upload'
                      name='file-upload'
                      className='sr-only'
                      onChange={handleFileChange}
                      multiple
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='submit'
            className='rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
