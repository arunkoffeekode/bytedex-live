import { toast } from "react-toastify";

export function errorToast(message) {
  return toast.error(message, {
    autoClose: 1500,
    theme: "colored",
  });
}

export function successToast(message) {
  return toast.success(message, {
    autoClose: 1500,
    theme: "colored",
  });
}
