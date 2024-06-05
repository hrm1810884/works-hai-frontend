import { useCallback, useState } from "react";

export const useStorage = () => {
    const [presignedUrl, setPresignedUrl] = useState<string>("");
    const updatePresignedUrl = useCallback(
        (newUrl: string) => {
            setPresignedUrl(newUrl);
        },
        [setPresignedUrl]
    );

    return {
        presignedUrl,
        mutator: {
            updatePresignedUrl,
        },
    };
};
