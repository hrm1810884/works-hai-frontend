import { Info, WarningCircle, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";
import { match } from "ts-pattern";

type ToastType = "info" | "error" | "success";

type Props = {
    message: string;
    type: ToastType;
};

const ICON_SIZE = "1.5rem";

const toastIcon = (type: ToastType) =>
    match(type)
        .with("info", () => <Info size={ICON_SIZE} />)
        .with("error", () => <WarningCircle size={ICON_SIZE} />)
        .with("success", () => <CheckCircle size={ICON_SIZE} />)
        .exhaustive();

/**
 * トーストを表示する utility 関数
 * @param message トーストに表示するメッセージ
 * @param type トーストの種類
 * usecase層か、presentation層から呼び出すことを想定している
 */
export const showToast = ({ message, type }: Props) => {
    toast(message, {
        type: type,
        icon: toastIcon(type),
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};
