import { PaintBrush } from "phosphor-react";

import { useDetectClickOut } from "../hooks/useDetectClickOut";
import { ColorPickerMenu } from "./ColorPickerMenu";

interface ColorPickerProps {
  wheelColors: string[];
  handleWheelColors: (colors: string[]) => void;
}

export function ColorPicker({
  handleWheelColors,
  wheelColors
}: ColorPickerProps) {
  const {
    nodeRef,
    triggerRef,
    show: isColorMenuOpen,
    setShow
  } = useDetectClickOut(false);

  return (
    <>
      <button ref={triggerRef}>
        <PaintBrush size={20} weight="bold" className="text-white mr-4" />
      </button>
      {isColorMenuOpen && (
        <ColorPickerMenu
          wheelColors={wheelColors}
          handleWheelColors={handleWheelColors}
          customRef={nodeRef}
        />
      )}
    </>
  );
}
