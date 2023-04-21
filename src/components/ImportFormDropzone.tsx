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
  // transform -translate-x-1/2 -translate-y-1/2

  return (
    <>
      <button onClick={() => setIsDropzoneOpen(true)}>
        <FileArrowDown size={20} weight="bold" className="text-white mr-4" />
      </button>

      {/* <div className="fixed left-1/2 top-1/2 text-white text-xl transform -translate-x-1/2 -translate-y-1/2" >
        <p>Testando div fixada</p>
      </div> */}

      {/* {isDropzoneOpen && (
        <div {...getRootProps({className: 'fixed inset-0 top-1/2 left-1/2 text-white'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )} */}
    </>
  )
}