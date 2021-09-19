import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dropzone from 'react-dropzone'

export default function PodcastEpisodeCreate() {
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState([]);

  const onSubmit = ({ name, description, transcript, audio_url, video_url }: any) => {
    console.log({ name, description, transcript, audio_url, video_url });
    // auth.signin(email, password)
    //   .then((user: any) => history.push("/"))
  }

  const onFileUpload = (new_files: any[]) => {
    let good_files = [];
    let invalid_file = false;
    for (let file of new_files) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/svg"
      ) {
        good_files.push(file);
      } else {
        invalid_file = true;
      }
    }
    const updated_files: any = [...files, ...good_files];
    setFiles(updated_files);
    if (invalid_file) alert("Please upload photos that are either JPEG, PNG, or SVG");
  }

  const removeFile = (e: any, remove_idx: number) => {
    e.stopPropagation();
    const filtered_files = files.filter((_, idx) => idx !== remove_idx);
    setFiles([...filtered_files]);
  }

  const displayDropzoneContent = (isDragActive: boolean, _isDragAccept: boolean, _isDragReject: boolean) => {
    if (isDragActive) {
      return <p className="text-gray-700">Drop them here!</p>
    }

    if (files.length > 0) {
      return files.map((file: any, idx: number) => {
        return (
          <div className="flex">
            <p key={idx} className="text-white mr-2.5">{file.name}</p>
            <p onClick={(e) => removeFile(e, idx)} className="text-gray-700 cursor-pointer">✕</p>
          </div>
        )
      })
    }

    return <p className="text-gray-700">Drag 'n' drop some files here, or click to select files</p>
  }

	return (
		<div>
      <div className="max-w-7xl mx-auto px-2">
        <h1 className="text-2xl font-semibold text-gray-900">Create episode</h1>
      </div>
      <div className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Podcast Episode Name"
              { ...register("name", { required: true }) }
              />
            </div>
          </section>
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Describe your podcast..."
                { ...register("description", { required: true }) }
              />
            </div>
          </section>
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Transcript
            </label>
            <div className="mt-1">
              <textarea
                id="transcript"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 md:min-h-25 rounded-md"
                placeholder="Add the podcast transcript..."
                { ...register("transcript") }
              />
            </div>
          </section>
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Audio File
            </label>
            <div className="mt-1">
              <Dropzone onDrop={onFileUpload} multiple={false}>
                {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => (
                  <section>
                    <div
                      className="border-dashed border-4 border-celeste p-4 rounded-md h-12 md:h-full md:min-h-25 grid items-center justify-center"
                      style={{ minHeight: `8rem` }}
                      {...getRootProps()}
                    >
                      <input {...register('audio_url')} {...getInputProps()}  />
                      {
                        displayDropzoneContent(isDragActive, isDragAccept, isDragReject)
                      }
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </section>
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Video File
            </label>
            <div className="mt-1">
              <Dropzone onDrop={() => {}} multiple={false}>
                {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => (
                  <section>
                    <div
                      className="border-dashed border-4 border-celeste p-4 rounded-md h-12 md:h-full md:min-h-25 grid items-center justify-center"
                      style={{ minHeight: `8rem` }}
                      {...getRootProps()}
                    >
                      <input {...register('video_url')} {...getInputProps() } />
                      {
                        displayDropzoneContent(isDragActive, isDragAccept, isDragReject)
                      }
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </section>
          <section className="mt-2">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create episode
            </button>
          </section>
        </form>
      </div>
		</div>
	)
}