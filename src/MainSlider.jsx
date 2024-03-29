import React from 'react'

import slider1 from '../src/assests/slider-image-1.jpeg'
import slider2 from '../src/assests/slider-image-2.jpeg'
import slider3 from '../src/assests/slider-image-3.jpeg'
import blog1 from '../src/assests/blog-img-1.jpeg'
import blog2 from '../src/assests/blog-img-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000
    };

    return (
        <header>
            <div className='row gx-0'>
                <div className="col-md-9">
                    <Slider {...settings}>
                        <img src={slider1} height={400} alt="" />
                        <img src={slider2} height={400} alt="" />
                        <img src={slider3} height={400} alt="" />
                    </Slider>
                </div>
                <div className="col-md-3">
                    <img src={blog1} className='w-100' height={200} alt="" />
                    <img src={blog2} className='w-100' height={200} alt="" />
                </div>
            </div>
        </header>
    )
}
