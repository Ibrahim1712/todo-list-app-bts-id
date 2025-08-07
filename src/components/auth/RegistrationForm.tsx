import { PAGE_TITLES } from "@/constants/pageTitles";
import AuthLayout from "./AuthLayout";
import RegistrationFormInput from "./RegistrationFormInput";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function RegistrationForm() {
  usePageTitle({ title: PAGE_TITLES.REGISTER });

  return (
    <AuthLayout>
      <RegistrationFormInput className="space-y-4" />
    </AuthLayout>
  );
}
