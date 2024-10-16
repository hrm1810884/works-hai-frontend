import { VIEWER_CARD_SIZE_NUMBER } from "@/model/";

export type AbsoluteVector = {
    height: number;
    width: number;
}

const calculateAbsoluteVectorFromUpLeftToCenter = (arrayLength: number): number => {
    /**
     * find n such that fulfills the relationship, 
     * (2 * n) ** 2 + (2 * n + 1) <= arrayLength < (2 * (n + 1)) ** 2 + (2 * (n + 1) + 1)
     */

    const N_LIMIT = 1000

    if (arrayLength < 1 || arrayLength > (2 * (N_LIMIT + 1)) ** 2 + (2 * (N_LIMIT + 1) + 1)) {
        throw new Error(`arrayLength is ${arrayLength}. This is beyond limit`);
    }

    let left = 0; // always fulfilled
    let right = 1001; // never fullfilled

    while (left + 1 < right) {
        const mid = Math.floor((left + right) / 2);

        const leftThreshold = (2 * mid) ** 2 + (2 * mid + 1)
        if (leftThreshold <= arrayLength) {
            left = mid;
        } else {
            right = mid;
        }
    }

    const n: number = left;

    const bottomRightCorner = (2 * n) ** 2 + 3 * (2 * n + 1);

    /**
     * HOW TO DEVIDE
     * +----------------..-----------------+
     * |                                   |
     * +----------+-----..-----+           |
     * |topLeft   |            |           |
     * |          |            |           |
     * :          :            :           :
     * |          |            |           |
     * |          +-----..-----|           |
     * |                       |bottomRight|
     * +----------------..-----+-----------+
     */

    if (bottomRightCorner < arrayLength) {
        return (n + 1) * VIEWER_CARD_SIZE_NUMBER;
    } else {
        return (n + 0.5) * VIEWER_CARD_SIZE_NUMBER;
    }
}

const calculateAbsoluteVectorFromUpLeftCornerToLatestImageCenter = (arrayLength: number): AbsoluteVector => {
    /**
     * find n such that fulfills the relationship, 
     * (2 * n) ** 2 + 1 <= arrayLength <= (2 * (n + 1)) ** 2
     */

    const N_LIMIT = 1000

    if (arrayLength < 1 || arrayLength > (2 * (N_LIMIT + 1)) ** 2) {
        throw new Error(`arrayLength is ${arrayLength}. This is beyond limit`);
    }

    let left = 0; // always fulfilled
    let right = 1001; // never fullfilled

    while (left + 1 < right) {
        const mid = Math.floor((left + right) / 2);

        const leftThreshold = (2 * mid) ** 2 + 1
        if (leftThreshold <= arrayLength) {
            left = mid;
        } else {
            right = mid;
        }
    }

    const n: number = left;

    const bottomRightCorner = (2 * n) ** 2 + 3 * (2 * n + 1);
    const bottomLeftCorner = (2 * n) ** 2 + 2 * (2 * n + 1);
    const TopLeftCorner = (2 * n) ** 2 + (2 * n + 1);
    const TopRightCorner = (2 * (n + 1)) ** 2;

    /**
     * HOW TO DEVIDE
     * +----------+-----..-----+-----------+
     * |topLeft   |            |topRight   |
     * |          |-----..-----|           |
     * |          |            |           |
     * :          :            :           :
     * |          |            |           |
     * |          |-----..-----|           |
     * |bottomLeft|            |bottomRight|
     * +----------+-----..-----+-----------+
     */

    if ( bottomRightCorner <= arrayLength ) {
        return {
            "height": (TopRightCorner - arrayLength + 0.5) * VIEWER_CARD_SIZE_NUMBER,
            "width": (2 * n + 1 + 0.5) * VIEWER_CARD_SIZE_NUMBER,
        }
    } else if ( bottomLeftCorner < arrayLength ) {
        return {
            "height": (2 * n + 1 + 0.5) * VIEWER_CARD_SIZE_NUMBER,
            "width": (arrayLength - bottomLeftCorner + 0.5) * VIEWER_CARD_SIZE_NUMBER
        }
    } else if (TopLeftCorner <= arrayLength) {
        return {
            "height": (arrayLength - TopLeftCorner + 0.5) * VIEWER_CARD_SIZE_NUMBER,
            "width": (0 + 0.5) * VIEWER_CARD_SIZE_NUMBER
        }
    } else {
        return {
            "height": (0 + 0.5) * VIEWER_CARD_SIZE_NUMBER,
            "width": (TopLeftCorner - arrayLength + 0.5) * VIEWER_CARD_SIZE_NUMBER
        }
    }
}


export const getAbsoluteVectorToShiftForCentering = (arrayLength: number, innerHeight: number): AbsoluteVector => {
    try {
        const absoluteVectorFromUpLeftCornerToLatestImageCenter: AbsoluteVector = calculateAbsoluteVectorFromUpLeftCornerToLatestImageCenter(arrayLength);
        
        const absoluteVectorFromUpLeftToCenter: number = calculateAbsoluteVectorFromUpLeftToCenter(arrayLength);

        console.log(absoluteVectorFromUpLeftCornerToLatestImageCenter, absoluteVectorFromUpLeftToCenter)

        return {
            "height": innerHeight/2 - absoluteVectorFromUpLeftCornerToLatestImageCenter.height, 
            "width": absoluteVectorFromUpLeftToCenter - absoluteVectorFromUpLeftCornerToLatestImageCenter.width
        };
    } catch (error) {
        throw error;
    }
}