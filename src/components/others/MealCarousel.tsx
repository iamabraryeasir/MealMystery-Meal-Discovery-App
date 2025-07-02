import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { Meal } from "../../types/meal.type";
import MealCard from "../common/MealCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface MealCarouselProps {
  meals: Meal[];
  title: string;
}

export default function MealCarousel({ meals, title }: MealCarouselProps) {
  if (meals.length === 0) return null;

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          <button className="swiper-button-prev-custom p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition-colors duration-300">
            <ChevronLeft className="h-5 w-5 text-orange-600" />
          </button>
          <button className="swiper-button-next-custom p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition-colors duration-300">
            <ChevronRight className="h-5 w-5 text-orange-600" />
          </button>
        </div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-orange-300",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-orange-500",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="meal-carousel"
        >
          {meals.slice(0, 8).map((meal) => (
            <SwiperSlide key={meal.idMeal} className="h-full flex pb-12">
              <MealCard
                mealId={meal.idMeal}
                className="flex-1 h-full flex flex-col !min-h-[500px] !max-h-[500px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
