import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Dropzone from 'react-dropzone'
import FileDrop from '../../../components/FileDrop';

export default function PodcastEpisodeCreate() {
  const { register, handleSubmit, control } = useForm();
  const [files, setFiles] = useState([]);

  const onSubmit = ({ name, description, transcript, audio_url, video_url }: any) => {
    console.log({ name, description, transcript, audio_url, video_url });
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
              <Controller
                name={`audio_url`}
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }: any) => (
                  <FileDrop files={[value]} setFiles={onChange} onChange={(e: any) => onChange(e.target?.files?.[0]) } multiple={false} />
                )}
              />
            </div>
          </section>
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Video File
            </label>
            <div className="mt-1">
              <Controller
                name={`video_url`}
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }: any) => (
                  <FileDrop files={[value]} setFiles={onChange} onChange={(e: any) => onChange(e.target?.files?.[0]) } multiple={false} />
                )}
              />
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