import React, { useState, DragEvent, useReducer } from "react";
import Image from "next/image";

type State = {
  selectedFile: any;
  dragging: boolean;
};

type Action =
  | { type: "SET_FILE"; file: any }
  | { type: "START_DRAG" }
  | { type: "STOP_DRAG" };

type Props = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const DragImageArea: React.FC<Props> = ({ state, dispatch }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let reader:any = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const file = reader.result;
      dispatch({ type: "SET_FILE", file });
    };
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch({ type: "START_DRAG" });
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch({ type: "STOP_DRAG" });

    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      const file = event.dataTransfer.items[0].getAsFile();
      dispatch({ type: "SET_FILE", file });
    }
  };

  const handleDragLeave = () => {
    dispatch({ type: "STOP_DRAG" });
  };
  return (
    <div
      className={` flex flex-col items-center rounded-lg border border-dashed ${
        state.dragging ? "border-blue-500" : "border-gray-900/25"
      } px-6 py-10 h-full`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-green-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>

      {state.selectedFile && (
        <div className="mt-4 flex flex-col items-center">
          <Image
            src={state.selectedFile}
            alt="Preview"
            className="max-w-full h-auto"
            width={140}
            height={100}
          />
          <p className="text-sm leading-5 text-gray-600 mt-2">
            {state.selectedFile.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default DragImageArea;
