import React, { useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';

export default function FileDrop({ onChange, files, setFiles, multiple }: any) {
  const removeFile = (e: any, remove_idx: number) => {
    e.stopPropagation();
    const filtered_files = files.filter((_: any, idx: number) => idx !== remove_idx);
    setFiles(filtered_files.length > 0 ? filtered_files : null);
  }

  const displayDropzoneContent = (isDragActive: boolean, _isDragAccept: boolean, _isDragReject: boolean) => {
    if (isDragActive) {
      return <p className="text-gray-700">Drop them here!</p>
    }

    const valid_files = files.filter((f: any) => f !== null);
    console.log({ valid_files });
    if (valid_files.length > 0) {
      return files.map((file: any, idx: number) => {
        console.log({ file });
        return (
          <div key={idx} className="flex">
            <p className="text-black mr-2.5">{file.name}</p>
            <p onClick={(e) => removeFile(e, idx)} className="text-gray-700 cursor-pointer">✕</p>
          </div>
        )
      })
    }

    return <p className="text-gray-700">Drag 'n' drop some files here, or click to select files</p>
  }

  return (
    <Dropzone multiple={multiple}>
      {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => (
        <section>
          <div
            className="border-dashed border-4 border-celeste p-4 rounded-md h-12 md:h-full md:min-h-25 grid items-center justify-center"
            style={{ minHeight: `8rem` }}
            {...getRootProps()}
          >
            <input {...getInputProps({ onChange }) } />
            {
              displayDropzoneContent(isDragActive, isDragAccept, isDragReject)
            }
          </div>
        </section>
      )}
    </Dropzone>
  )
}