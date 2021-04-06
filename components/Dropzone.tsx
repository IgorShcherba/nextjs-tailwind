import React from "react";

import { useDropzone } from "react-dropzone";

interface DropzoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  labelText?: string;
}

type InputRef = React.ForwardedRef<HTMLInputElement>;

interface FileProp extends File {
  path?: string;
}

export const Dropzone = React.forwardRef(
  (props: DropzoneProps, ref: InputRef) => {
    const { onChange, labelText = "File", error, errorMessage } = props;
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

    const acceptedFileItems = acceptedFiles.map((file: FileProp) => (
      <li key={file.path} className="text-xs text-gray-700 mb-1">
        {file.path} - {file.size} bytes
      </li>
    ));

    return (
      <>
        <label>{labelText}</label>
        <div
          {...getRootProps({ ref })}
          className="w-full p-10 border border-dashed border-indigo-500 text-center"
        >
          <input
            {...getInputProps({
              onChange: (e) => {
                onChange?.(e.target.files as any);
              },
            })}
          />
          <p>- Drop file here -</p>
        </div>
        <ul className="mt-2">{acceptedFileItems}</ul>
        {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </>
    );
  }
);
