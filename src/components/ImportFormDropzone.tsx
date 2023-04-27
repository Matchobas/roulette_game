import { FileArrowDown } from "phosphor-react";
import { WheelOptionModel } from "../model/WheelOptionModel";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

interface ImportFormDropzoneProps {
  handleWheelOptions: (options: WheelOptionModel[]) => void;
  isModalOpen: boolean;
}

export function ImportFormDropzone({ handleWheelOptions, isModalOpen }: ImportFormDropzoneProps) {
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);
  const [isDrozoneDisabled, setIsDropzoneDisabled] = useState(false);
  const [file, setFile] = useState<JSX.Element[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  useEffect(() => {
    const files = acceptedFiles.map((file) => 
      <p className="text-white text-lg" key={file.name}>{file.name}</p>
    )

    if (files.length > 0) {
      console.log("Changing");
      setFile(files);
      setIsDropzoneDisabled(true);
    };
  }, [acceptedFiles]);

  useEffect(() => {
    setIsDropzoneOpen(false);
  }, [isModalOpen]);

  return (
    <>
      <button onClick={() => setIsDropzoneOpen(!isDropzoneOpen)}>
        <FileArrowDown size={20} weight="bold" className="text-white mr-4 text-" />
      </button>

      {isDropzoneOpen && (
        <div {...getRootProps({
          className: 'fixed w-1/2 h-1/4 flex flex-col items-center justify-center border-2 border-gray-400 border-dashed bg-slate-600 inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        })}>
          <input {...getInputProps({disabled: isDrozoneDisabled})} />
          {file.length > 0 ? file : (
            <p className="text-white text-lg">Drag 'n' drop a csv file here, or click to select one</p>
          )}
          
          {acceptedFiles.length > 0 && (
            <button
              onClick={() => console.log("Clicked")}
              className="px-2 bg-zinc-400 text-white rounded-md mt-6 hover:bg-zinc-500 transition-colors opacity-100"
            >
              Load options
            </button>
          )}
        </div>
      )}
    </>
  )
}