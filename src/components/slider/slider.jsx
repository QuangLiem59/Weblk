import React, { useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./slider.scss";
import Banner from 'constant/banner';

SliderC.propTypes = {

};

function SliderC(props) {
    const ref = useRef({});

    const NextSlide = () => {
        ref.current.slickNext();
    }
    const PrevSlide = () => {
        ref.current.slickPrev();
    }
    const st = {
        className: 'ctn__slider',
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        rows: 1,
        arrows: false,
        autoplaySpeed: 3000,
        autoplay: true,
        dots: true
    };
    return (

        <div className="ctn">
            <Slider ref={ref} {...st}>
                <div
                    className="ctn__slider__slide"
                >
                    <div
                        className="ctn__slider__slide__img"
                        style={{
                            "backgroundImage": `url(${Banner.bn1})`
                        }}>

                    </div>
                </div>
                <div
                    className="ctn__slider__slide"
                >
                    <div
                        className="ctn__slider__slide__img"
                        style={{
                            "backgroundImage": `url(${Banner.bn2})`
                        }}>

                    </div>
                </div>
                <div
                    className="ctn__slider__slide"
                >
                    <div
                        className="ctn__slider__slide__img"
                        style={{
                            "backgroundImage": `url(${Banner.bn3})`
                        }}>

                    </div>
                </div>
                <div
                    className="ctn__slider__slide"
                >
                    <div
                        className="ctn__slider__slide__img"
                        style={{
                            "backgroundImage": `url(${Banner.bn4})`
                        }}>

                    </div>
                </div>
                <div
                    className="ctn__slider__slide"
                >
                    <div
                        className="ctn__slider__slide__img"
                        style={{
                            "backgroundImage": `url(${Banner.bn5})`
                        }}>

                    </div>
                </div>
                <div
                    className="ctn__slider__slide"
                >
                    <div
                        className="ctn__slider__slide__img"
                        style={{
                            "backgroundImage": `url(${Banner.bn6})`
                        }}>
                    </div>
                </div>
            </Slider>
            <button className="ctn__prevbt" onClick={PrevSlide}>
                <img src={Banner.prevbt} alt="Prev" />
            </button>
            <button className="ctn__nextbt" onClick={NextSlide}>
                <img src={Banner.nextbt} alt="Next" />
            </button>
        </div>
    );
}

export default SliderC;