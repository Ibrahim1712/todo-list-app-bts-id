import useGetBanners from "@/hooks/api/useGetBanners";
import BannerSlider from "./BannerSlider";
import BannerSliderLoadingState from "./BannerSliderLoadingState";
import BannerSliderErrorState from "./BannerSliderErrorState";

const DashboardBannersSection = () => {
  const { data: banners, isLoading, error } = useGetBanners();

  return (
    <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-12 flex flex-col items-start">
      <h2 className="text-lg font-semibold mb-6">Temukan Promo Menarik</h2>

      {isLoading && <BannerSliderLoadingState />}

      {error && <BannerSliderErrorState error={error} />}

      {banners && banners.length > 0 && <BannerSlider banners={banners} />}

      {banners && banners.length === 0 && (
        <div className="w-full">
          <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg h-32">
            <h3 className="text-md font-semibold text-gray-900 mb-1">
              Tidak Ada Promo Tersedia
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Promo menarik akan segera hadir untuk Anda
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardBannersSection;
