import { useEffect, useRef, useState } from "react";

export function useDetectClickOut(initState: boolean) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(initState);

  const handleClickOutside = (event: MouseEvent) => {
    const nodeTarget = event.target as Node;
    if (triggerRef.current && triggerRef.current.contains(nodeTarget)) {
      return setShow(!show);
    }

    if (nodeRef.current && !nodeRef.current.contains(nodeTarget)) {
      return setShow(false);
    }

    return false;
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    triggerRef,
    nodeRef,
    show,
    setShow
  };
}
