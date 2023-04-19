import { FileArrowDown } from "phosphor-react";
import { WheelOptionModel } from "../model/WheelOptionModel";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

interface ImportFormDropzoneProps {
  handleWheelOptions: (options: WheelOptionModel[]) => void;
}

export function ImportFormDropzone({ handleWheelOptions }: ImportFormDropzoneProps) {
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <>
      <button onClick={() => setIsDropzoneOpen(true)}>
        <FileArrowDown size={20} weight="bold" className="text-white mr-4" />
      </button>

      {isDropzoneOpen ? (
        <div {...getRootProps({className: 'fixed top-1/2'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      ) : null}
    </>
  )
}