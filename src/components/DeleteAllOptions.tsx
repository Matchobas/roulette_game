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
        <div className="fixed w-[40%] h-1/4 flex flex-col items-center justify-center border-2 bg-slate-600 inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-white text-xl">
            Are you sure you want to delete all current options?
          </p>
          <div className="flex items-center gap-32">
            <button
              onClick={() => {
                handleWheelOptions([]);
                setIsDeleteConfirmationOpen(false);
              }}
              className="px-4 bg-zinc-200 text-black text-lg rounded-md mt-6 hover:bg-gray-400 transition-colors opacity-100"
            >
              Yes
            </button>
            <button
              onClick={() => setIsDeleteConfirmationOpen(false)}
              className="px-4 bg-zinc-200 text-black text-lg rounded-md mt-6 hover:bg-gray-400 transition-colors opacity-100"
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}
