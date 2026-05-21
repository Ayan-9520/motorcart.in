import toast from "react-hot-toast";

/** Central toast helpers — keeps copy + duration consistent across modules. */
export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message, { duration: 5000 }),
  loading: (message: string) => toast.loading(message),
  dismiss: (id: string) => toast.dismiss(id),
};

export { toast };
