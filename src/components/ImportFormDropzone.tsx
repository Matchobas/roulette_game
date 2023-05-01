import { FileArrowDown } from "phosphor-react";
import { WheelOptionModel } from "../model/WheelOptionModel";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

interface ImportFormDropzoneProps {
  handleWheelOptions: (options: WheelOptionModel[]) => void;
  isModalOpen: boolean;
}

export function ImportFormDropzone({ handleWheelOptions, isModalOpen }: ImportFormDropzoneProps) {
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);
  const [isDrozoneDisabled, setIsDropzoneDisabled] = useState(false);
  const [file, setFile] = useState<File>();
  const [fileComponent, setFileComponent] = useState<JSX.Element>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  function handleCloseDropzone(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log(event.code);
    if (event.code === "Escape") {
      setIsDropzoneOpen(false);
    }
  }

  function handleSendCsvFile() {
    if (fileComponent) {
      api.post("/import", {
        file: file
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((res) => res.data)
      .then((data: WheelOptionModel[]) => {
        handleWheelOptions(data);
        setFileComponent(undefined);
        setIsDropzoneOpen(false);
        setIsDropzoneDisabled(false);
      });
    }
  }

  function handleChangeFile() {
    setFileComponent(undefined);
    setIsDropzoneDisabled(false);
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const currentFile = acceptedFiles[0];
      setFile(currentFile);
      setFileComponent(<p className="text-white text-lg" key={currentFile.name}>{currentFile.name}</p>)
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
          <input {...getInputProps({disabled: isDrozoneDisabled, onKeyDown: (e) => handleCloseDropzone(e)})} />
          {fileComponent ? fileComponent : (
            <p className="text-white text-lg">Drag 'n' drop a csv file here, or click to select one</p>
          )}
          
          {fileComponent && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleChangeFile}
                className="px-2 bg-zinc-400 text-white rounded-md mt-6 hover:bg-zinc-500 transition-colors opacity-100"
              >
                Change file
              </button>
              <button
                onClick={handleSendCsvFile}
                className="px-2 bg-zinc-400 text-white rounded-md mt-6 hover:bg-zinc-500 transition-colors opacity-100"
              >
                Load options
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}