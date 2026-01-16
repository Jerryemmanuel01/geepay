import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from "@/lib/redux/features/auth/authApi";

export const useResetPasswordForm = (token: string) => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&#]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword({ token, password: values.password }).unwrap();
        toast.success("Password reset successfully! Please login.");
        router.push("/auth/login");
      } catch (err: any) {
        toast.error(
          err?.data?.message || "Failed to reset password. Link may be expired."
        );
      }
    },
  });

  return { formik, isLoading };
};
