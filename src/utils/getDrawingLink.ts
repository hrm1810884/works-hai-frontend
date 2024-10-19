import { DRAWING_SIZE } from "@/model";

import { guardUndef } from "./guardUndef";

function resizeCanvas(canvas: HTMLCanvasElement) {
    const resizedCanvas = document.createElement("canvas");
    const resizedContext = resizedCanvas.getContext("2d");

    resizedCanvas.width = DRAWING_SIZE;
    resizedCanvas.height = DRAWING_SIZE;

    // 元のCanvasからリサイズされたCanvasに描画
    resizedContext?.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        resizedCanvas.width,
        resizedCanvas.height
    );
    return resizedCanvas;
}

export function getDrawingLink(canvas: HTMLCanvasElement | null) {
    const currentCanvas = guardUndef(canvas);
    const resizedCanvas = resizeCanvas(currentCanvas);

    const link = resizedCanvas.toDataURL("image/png");
    return link;
}
