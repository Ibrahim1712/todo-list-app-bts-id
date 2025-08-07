import { cn } from "@/lib/utils";
import { InputWithIcon } from "../ui/input-with-icon";
import { Button } from "../ui/button";
import { getErrorMessage } from "@/types/error";
import useRegistrationFormInput from "@/hooks/auth/useRegistrationFormInput";
import { Mail, User, Lock, Eye, EyeOff, X } from "lucide-react";

const RegistrationFormInput = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    registerMutation,
    formData,
    getFieldError,
    isValid,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegistrationFormInput();

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
        <h1 className="text-2xl font-bold">Lengkapi data untuk membuat akun</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <InputWithIcon
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Masukkan Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={<Mail size={12} />}
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
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Masukkan Nama Pengguna"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={<User size={12} />}
            rightIcon={<Mail className="sr-only" />}
            className={
              getFieldError("username")
                ? "border-red-500 focus-visible:border-red-500"
                : ""
            }
            required
          />
          {getFieldError("username") && (
            <span className="text-red-500 text-xs mt-1">
              {getFieldError("username")}
            </span>
          )}
        </div>

        <div className="grid gap-3">
          <InputWithIcon
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Masukkan Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={<Lock size={12} />}
            rightIcon={showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
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

        <div className="grid gap-3">
          <InputWithIcon
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Konfirmasi Password"
            value={formData.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            leftIcon={<Lock size={12} />}
            rightIcon={
              showConfirmPassword ? <EyeOff size={12} /> : <Eye size={12} />
            }
            onRightIconClick={toggleConfirmPasswordVisibility}
            className={
              getFieldError("confirm_password")
                ? "border-red-500 focus-visible:border-red-500"
                : ""
            }
            required
          />
          {getFieldError("confirm_password") && (
            <span className="text-red-500 text-xs mt-1">
              {getFieldError("confirm_password")}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-sm"
          disabled={registerMutation.isPending || !isValid}
        >
          {registerMutation.isPending ? "Membuat akun..." : "Registrasi"}
        </Button>
      </div>
      <div className="text-center text-sm">
        <span>Sudah punya akun? Masuk {"  "}</span>
        <a
          href="/login"
          className="underline underline-offset-4 text-orange-700"
        >
          di sini
        </a>
      </div>

      {registerMutation.error && (
        <div className="relative flex justify-between items-center bg-red-50 border border-red-200 rounded-md p-4 mt-2">
          <div className="text-red-600 text-sm">
            {getErrorMessage(registerMutation.error)}
          </div>
          <button
            onClick={() => registerMutation.reset()}
            className="text-red-600 hover:text-red-700"
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {registerMutation.isSuccess && (
        <div className="relative flex justify-between items-center bg-green-50 border border-green-200 rounded-md p-4 mt-2">
          <div className="text-green-600 text-sm">
            {registerMutation.data?.message ||
              "Registrasi berhasil silahkan login"}
          </div>
          <button
            onClick={() => registerMutation.reset()}
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

export default RegistrationFormInput;
