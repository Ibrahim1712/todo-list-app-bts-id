import { Button } from "@/components/ui/button";
import { getErrorMessage, type APIError } from "@/types/error";

const ServiceDetailErrorState = ({ error }: { error: Error | APIError }) => {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-600 font-medium text-lg mb-3">
            {getErrorMessage(error) || "Gagal memuat detail layanan"}
          </div>
          <p className="text-gray-600 mb-4">
            Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Muat Ulang
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailErrorState;
