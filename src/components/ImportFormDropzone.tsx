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
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const file = acceptedFiles.map((file) => 
    (
      <p key={file.name}>{file.name}</p>
    )
  )

  useEffect(() => {
    setIsDropzoneOpen(false);
  }, [isModalOpen]);

  return (
    <>
      <button onClick={() => setIsDropzoneOpen(!isDropzoneOpen)}>
        <FileArrowDown size={20} weight="bold" className="text-white mr-4" />
      </button>

      {isDropzoneOpen && (
        <div {...getRootProps({
          className: 'fixed w-1/2 h-1/4 flex items-center justify-center border-2 border-gray-400 border-dashed bg-slate-600 inset-0 top-1/2 left-1/2 text-x text-white transform -translate-x-1/2 -translate-y-1/2'
        })}>
          <input {...getInputProps()} />
          {file.length > 0 ? file : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </>
  )
}