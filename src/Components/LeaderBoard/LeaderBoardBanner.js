import React from 'react';
import { useState } from 'react';
import BinanceLogoHeader from '../../images/binance-logo-header.svg';
import HeaderMainLogo from '../../images/header-main-logo.svg';
import './LeaderBoardBanner.css';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function LeaderBoardBanner() {
  const [slidesPerView, setSliderPerView] = useState('1');

  return (
    <div className="leader-slider">
      <Swiper
        modules={[Navigation, Autoplay]}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={0}
        loop={true}
        slidesPerView={slidesPerView}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide className="slide-1">
          <div className="container">
            <div className="slide-inner">
              <p>
                <span>Копируйте сделки</span> в один клик с FITT
              </p>
              <span className="binance-powered">Powered by</span>
              <img src={BinanceLogoHeader} alt="binance-logo" className="binance-logo"></img>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide-1">
          <div className="container">
            <div className="slide-inner">
              <p>
                <span>Копируйте сделки</span> в один клик с FITT
              </p>
              <span className="binance-powered">Powered by</span>
              <img src={BinanceLogoHeader} alt="binance-logo" className="binance-logo"></img>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide-1">
          <div className="container">
            <div className="slide-inner">
              <p>
                <span>Копируйте сделки</span> в один клик с FITT
              </p>
              <span className="binance-powered">Powered by</span>
              <img src={BinanceLogoHeader} alt="binance-logo" className="binance-logo"></img>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
