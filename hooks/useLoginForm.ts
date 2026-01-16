import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "@/lib/redux/features/auth/authApi";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";

export const useLoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const userData = await login(values).unwrap();
        const { token, ...user } = userData;
        dispatch(setCredentials({ user, token }));
        toast.success("Welcome back!");
        router.push("/dashboard");
      } catch (err: any) {
        toast.error(
          err?.data?.message || "Login failed. Please check your credentials."
        );
      }
    },
  });

  return { formik, isLoading };
};
