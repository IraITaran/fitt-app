import React from "react";
import { useState } from "react";
import "./KnowledgeBase.css";

import SlideImage1 from "../../images/slide-1.jpg";
import SlideImage2 from "../../images/slide-2.jpg";
import SlideImage3 from "../../images/slide-3.jpg";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const KnowledgeBase = () => {
    const [slidesPerView, setSliderPerView] = useState("1");

    const changeSlidesPerView = (event) => {
        console.log(event.target);
        //setSliderPerView("2");
    };

    return (
        <div className="KnowledgeBase" onResize={changeSlidesPerView}>
            <div className="container">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={slidesPerView}
                    navigation
                    scrollbar={{ draggable: true }}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        920: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    <h2 className="knowledgebase-title">База знаний</h2>
                    <SwiperSlide>
                        <a className="slide-link" href="#">
                            <img
                                src={SlideImage1}
                                alt="slide-1"
                                className="slide-image"
                            ></img>
                            <h3 className="slide-title">
                                Новый спотовый листинг GCAKE/USDT
                            </h3>
                            <p className="slide-text">
                                Купите и получите часть призового фонда в 40 000
                            </p>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="slide-link">
                            <img
                                src={SlideImage2}
                                alt="slide-2"
                                className="slide-image"
                            ></img>
                            <h3 className="slide-title">
                                Новый спотовый листинг GCAKE/USDT
                            </h3>
                            <p className="slide-text">
                                Купите и получите часть призового фонда в 40 000
                            </p>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="slide-link">
                            <img
                                src={SlideImage3}
                                alt="slide-3"
                                className="slide-image"
                            ></img>
                            <h3 className="slide-title">
                                Новый спотовый листинг GCAKE/USDT
                            </h3>
                            <p className="slide-text">
                                Купите и получите часть призового фонда в 40 000
                            </p>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="slide-link">
                            <img
                                src={SlideImage3}
                                alt="slide-3"
                                className="slide-image"
                            ></img>
                            <h3 className="slide-title">
                                Новый спотовый листинг GCAKE/USDT
                            </h3>
                            <p className="slide-text">
                                Купите и получите часть призового фонда в 40 000
                            </p>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="slide-link">
                            <img
                                src={SlideImage3}
                                alt="slide-3"
                                className="slide-image"
                            ></img>
                            <h3 className="slide-title">
                                Новый спотовый листинг GCAKE/USDT
                            </h3>
                            <p className="slide-text">
                                Купите и получите часть призового фонда в 40 000
                            </p>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a href="#" className="slide-link">
                            <img
                                src={SlideImage3}
                                alt="slide-3"
                                className="slide-image"
                            ></img>
                            <h3 className="slide-title">
                                Новый спотовый листинг GCAKE/USDT
                            </h3>
                            <p className="slide-text">
                                Купите и получите часть призового фонда в 40 000
                            </p>
                        </a>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default KnowledgeBase;
