import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "@/lib/redux/features/auth/authApi";

export const useForgotPasswordForm = () => {
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        await forgotPassword(values).unwrap();
        toast.success("Password reset email sent (if email exists).");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to send reset email.");
      }
    },
  });

  return { formik, isLoading, isSuccess };
};
