import { Button } from "../../ui/button";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useGetBalance } from "@/hooks/api/useGetBalance";
import { formatCurrency } from "@/helper/formatCurrency";

const BalancedInformation = () => {
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  const { balance } = useGetBalance();

  return (
    <div className="col-span-1 md:col-span-4 flex flex-col gap-2 justify-between items-start bg-[url('/assets/images/bg-saldo.png')] bg-cover bg-no-repeat p-6 rounded-2xl">
      <div className="h4 text-lg text-white font-normal">Saldo anda</div>
      <div className="text-3xl font-bold text-white">
        {showBalance ? (
          formatCurrency(balance)
        ) : (
          <>
            <span className="mr-2">Rp</span>{" "}
            <span>{Array(7).fill("•").join("")}</span>{" "}
          </>
        )}
      </div>
      <Button
        variant="ghost"
        className="text-white !px-0 hover:bg-transparent hover:text-white hover:underline cursor-pointer"
        onClick={handleShowBalance}
      >
        Lihat Saldo
        {showBalance ? (
          <EyeIcon className="ml-2" />
        ) : (
          <EyeClosedIcon className="ml-2" />
        )}
      </Button>
    </div>
  );
};

export default BalancedInformation;
