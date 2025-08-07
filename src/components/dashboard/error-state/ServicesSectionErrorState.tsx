import { getErrorMessage, type APIError } from "@/types/error";

const ServicesSectionErrorState = ({ error }: { error: Error | APIError }) => {
  return (
    <div className="col-span-12 flex flex-col items-center justify-center p-4 rounded-lg bg-red-50 border border-red-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-red-500 mb-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-red-700 font-medium mb-2">Gagal memuat layanan</p>
      <p className="text-red-600 text-sm mb-4">
        {getErrorMessage(error) || "Terjadi kesalahan yang tidak terduga"}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Coba Lagi
      </button>
    </div>
  );
};

export default ServicesSectionErrorState;
