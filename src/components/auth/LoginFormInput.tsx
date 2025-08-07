import { cn } from "@/lib/utils";
import { InputWithIcon } from "../ui/input-with-icon";
import { Button } from "../ui/button";
import { getErrorMessage } from "@/types/error";
import useLoginFormInput from "@/hooks/auth/useLoginFormInput";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";

const LoginFormInput = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    loginMutation,
    formData,
    getFieldError,
    isValid,
    showPassword,
    togglePasswordVisibility,
  } = useLoginFormInput();

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex gap-4 items-center">
          <img src="/assets/images/logo.png" alt="logo" />
          <span className="font-bold text-xl">To Do List App</span>
        </div>
        <h1 className="text-2xl font-bold">
          Masuk atau buat akun untuk memulai
        </h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <InputWithIcon
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Masukkan Username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={<Mail size={16} />}
            rightIcon={<Mail className="sr-only" />}
            className={
              getFieldError("email")
                ? "border-red-500 focus-visible:border-red-500"
                : ""
            }
            required
          />
          {getFieldError("email") && (
            <span className="text-red-500 text-xs mt-1">
              {getFieldError("email")}
            </span>
          )}
        </div>
        <div className="grid gap-3">
          <InputWithIcon
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan Kata Sandi"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={<Lock size={16} />}
            rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            onRightIconClick={togglePasswordVisibility}
            className={
              getFieldError("password")
                ? "border-red-500 focus-visible:border-red-500"
                : ""
            }
            required
          />
          {getFieldError("password") && (
            <span className="text-red-500 text-xs mt-1">
              {getFieldError("password")}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full py-6"
          disabled={loginMutation.isPending || !isValid}
        >
          {loginMutation.isPending ? "Mencoba masuk..." : "Masuk"}
        </Button>
      </div>
      <div className="text-center text-sm">
        <span>Belum punya akun? Registrasi {"  "}</span>
        <a href="/" className="underline underline-offset-4 text-orange-700">
          di sini
        </a>
      </div>

      {loginMutation.error && (
        <div className="relative flex justify-between items-center bg-red-50 border border-red-200 rounded-md p-4 mt-2">
          <div className="text-red-600 text-sm">
            {getErrorMessage(loginMutation.error)}
          </div>
          <button
            onClick={() => loginMutation.reset()}
            className="text-red-600 hover:text-red-700"
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {loginMutation.isSuccess && (
        <div className="relative flex justify-between items-center bg-green-50 border border-green-200 rounded-md p-4 mt-2">
          <div className="text-green-600 text-sm">
            Login Berhasil! Mengarahkan ke Beranda...
          </div>
          <button
            onClick={() => loginMutation.reset()}
            className="text-green-600 hover:text-green-600"
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </form>
  );
};

export default LoginFormInput;
