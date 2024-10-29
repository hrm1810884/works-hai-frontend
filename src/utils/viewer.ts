import { VIEWER_CARD_SIZE_NUMBER } from "@/model/";

export type AbsoluteVector = {
    height: number;
    width: number;
};

type CalculationResult = {
    toLatestImageCenter: AbsoluteVector;
    toGridCenter: AbsoluteVector;
};

// n >= 0
const NthTopLeftCornerIndex = (n: number) => (2 * n) ** 2 + (2 * n + 1);
const NthBottomLeftCornerIndex = (n: number) => (2 * n) ** 2 + (2 * n + 1) * 2;
const NthBottomRightCornerIndex = (n: number) => (2 * n) ** 2 + (2 * n + 1) * 3;
const NthTopRightCornerIndex = (n: number) => (2 * n) ** 2 + (2 * n + 1) * 4 + 1;
/**
 * HOW TO DEVIDE
 *
 * +-----------------------...-----------------+
 * |(end)                  <-       topRight   |
 * +-----------------+-----...-----+-----------+
 * |topLeft          | <---        |           |
 * |(start)          |-----...-----|           |
 * |      |          |             |     ^     |
 * :      |          :   2n x 2n   :     |     :
 * |      v          |             |           |
 * |                 |-----...-----|           |
 * |bottomLeft       |      ->     |bottomRight|
 * +-----------------+-----...-----+-----------+
 */

const calculateAbsoluteVectorFromTopLeftCorner = (arrayLength: number): CalculationResult => {
    /**
     * find n such that fulfills the relationship,
     * (2 * n) ** 2 + (2 * n + 1) <= arrayLength < (2 * (n + 1)) ** 2 + (2 * (n + 1) + 1)
     */

    const N_LIMIT = 1000;

    if (arrayLength < 1 || arrayLength > NthTopLeftCornerIndex(N_LIMIT + 1)) {
        throw new Error(`arrayLength is ${arrayLength}. This is beyond limit`);
    }

    let left = 0; // always fulfilled
    let right = N_LIMIT + 1; // never fullfilled

    while (left + 1 < right) {
        const mid = Math.floor((left + right) / 2);

        const leftThreshold = (2 * mid) ** 2 + (2 * mid + 1);
        if (leftThreshold <= arrayLength) {
            left = mid;
        } else {
            right = mid;
        }
    }

    const n: number = left;

    const bottomRightCorner = NthBottomRightCornerIndex(n);
    const bottomLeftCorner = NthBottomLeftCornerIndex(n);
    const topRightCorner = NthTopRightCornerIndex(n);

    const topLeftCorner = NthTopLeftCornerIndex(n);
    const nextTopLeftCorner = NthTopLeftCornerIndex(n + 1);

    if (topRightCorner <= arrayLength) {
        return {
            toLatestImageCenter: {
                height: 0.5 * VIEWER_CARD_SIZE_NUMBER,
                width: (nextTopLeftCorner - arrayLength - 0.5) * VIEWER_CARD_SIZE_NUMBER,
            },
            toGridCenter: {
                height: (n + 1.5) * VIEWER_CARD_SIZE_NUMBER,
                width: (n + 1) * VIEWER_CARD_SIZE_NUMBER,
            },
        };
    } else if (bottomRightCorner <= arrayLength) {
        return {
            toLatestImageCenter: {
                height: (topRightCorner - arrayLength - 0.5) * VIEWER_CARD_SIZE_NUMBER,
                width: (2 * n + 1.5) * VIEWER_CARD_SIZE_NUMBER,
            },
            toGridCenter: {
                height: (n + 1) * VIEWER_CARD_SIZE_NUMBER,
                width: (n + 1) * VIEWER_CARD_SIZE_NUMBER,
            },
        };
    } else if (bottomLeftCorner <= arrayLength) {
        return {
            toLatestImageCenter: {
                height: (2 * n + 1.5) * VIEWER_CARD_SIZE_NUMBER,
                width: (arrayLength - bottomLeftCorner + 0.5) * VIEWER_CARD_SIZE_NUMBER,
            },
            toGridCenter: {
                height: (n + 1) * VIEWER_CARD_SIZE_NUMBER,
                width: (n + 0.5) * VIEWER_CARD_SIZE_NUMBER,
            },
        };
    } else {
        return {
            toLatestImageCenter: {
                height: (arrayLength - topLeftCorner + 0.5) * VIEWER_CARD_SIZE_NUMBER,
                width: 0.5 * VIEWER_CARD_SIZE_NUMBER,
            },
            toGridCenter: {
                height: (n + 0.5) * VIEWER_CARD_SIZE_NUMBER,
                width: (n + 0.5) * VIEWER_CARD_SIZE_NUMBER,
            },
        };
    }
};

export const getAbsoluteVectorToShiftForCentering = (
    arrayLength: number,
    innerHeight: number
): AbsoluteVector => {
    const absoluteVectorFromTopLeftCorner: CalculationResult =
        calculateAbsoluteVectorFromTopLeftCorner(arrayLength);

    return {
        height: innerHeight / 2 - absoluteVectorFromTopLeftCorner.toLatestImageCenter.height,
        width: innerWidth / 2 - absoluteVectorFromTopLeftCorner.toLatestImageCenter.width,
    };
};
