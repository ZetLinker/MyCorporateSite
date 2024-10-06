// ResizableImageComponent.tsx

import React, { useRef } from "react";
import { NodeViewWrapper } from "@tiptap/react";

export const ResizableImageComponent = ({ node, updateAttributes }: any) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startX.current = e.clientX;
    startWidth.current = imgRef.current?.offsetWidth || 0;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const newWidth = startWidth.current + e.clientX - startX.current;
    updateAttributes({ width: `${newWidth}px` });
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <NodeViewWrapper style={{ position: "relative", display: "inline-block" }}>
      <img
        ref={imgRef}
        src={node.attrs.src}
        style={{ width: node.attrs.width, display: "block" }}
        alt=""
      />
      <div
        contentEditable={false}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "10px",
          height: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          cursor: "nwse-resize",
        }}
        onMouseDown={onMouseDown}
      ></div>
    </NodeViewWrapper>
  );
};
