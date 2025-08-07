import LoginFormInput from "./LoginFormInput";
import AuthLayout from "./AuthLayout";
import { usePageTitle } from "@/hooks/usePageTitle";
import { PAGE_TITLES } from "@/constants/pageTitles";

export default function LoginForm() {
  usePageTitle({ title: PAGE_TITLES.LOGIN });

  return (
    <AuthLayout heroAlt="Login Image">
      <LoginFormInput className="space-y-4" />
    </AuthLayout>
  );
}
