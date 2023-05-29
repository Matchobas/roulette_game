import { Trash } from "phosphor-react";
import { useState } from "react";

import { WheelOptionModel } from "../model/WheelOptionModel";

interface DeleteAllOptionsProps {
  wheelOptions: WheelOptionModel[];
  handleWheelOptions: (options: WheelOptionModel[]) => void;
}

export function DeleteAllOptions({
  wheelOptions,
  handleWheelOptions
}: DeleteAllOptionsProps) {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  return (
    <>
      <button
        disabled={!wheelOptions.length}
        onClick={() => setIsDeleteConfirmationOpen(true)}
      >
        <Trash
          size={20}
          weight="bold"
          className={`text-white mr-4 ${
            wheelOptions.length ? "opacity-100" : "opacity-30"
          }`}
        />
      </button>
      {isDeleteConfirmationOpen && (
        <div className="fixed w-[35%] h-[20%] flex flex-col items-center justify-center border-2 rounded-lg bg-slate-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-white text-xl">
            Are you sure you want to delete all current options?
          </p>
          <div className="w-1/2 flex items-center justify-between">
            <button
              onClick={() => setIsDeleteConfirmationOpen(false)}
              className="px-4 bg-zinc-200 text-black text-lg rounded-md mt-6 hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleWheelOptions([]);
                setIsDeleteConfirmationOpen(false);
              }}
              className="px-4 bg-red-500 text-white text-lg rounded-md mt-6 hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
