import { useDrawingBoard } from "./hooks";

export const DrawingBoard = () => {
    const {
        canvasElement,
        zoom,
        handlers: { handleDraw, handleMouseDown, handleMouseUp },
        mutators: { resetPainting },
    } = useDrawingBoard();

    return (
        <canvas
            ref={canvasElement}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseMove={(e) => handleDraw(e)}
            onMouseLeave={(e) => {
                handleDraw(e);
                resetPainting();
            }}
            id="canvasElement"
            className="absolute cursor-crosshair origin-top-left"
            style={{ width: "1920px", height: "1080px", transform: "scale(" + zoom + ")" }}
        ></canvas>
    );
};
