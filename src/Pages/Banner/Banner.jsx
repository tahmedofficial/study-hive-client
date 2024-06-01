import banner from "../../assets/images/bannerImg.avif";

const Banner = () => {

    return (
        <div className="carousel w-full py-10 lg:py-5 bg-primary_bg_color">

            <div id="slide1" className="carousel-item relative w-full group">
                <div className="grid md:grid-cols-2 w-full md:w-5/6 mx-auto items-center">
                    <div className="md:col-span-1 px-4 md:flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-semibold text-black">Inspiring Education, Transforming Lives</h1>
                        <h3 className="py-5 text-lg my-4">
                            Embark on a journey like no other as you discover the captivating allure of Paris, a land brimming with diverse landscapes, vibrant cultures, and immersive experiences. Nestled in the heart of the continent, Spin beckons travelers with its blend of ancient traditions and modern marvels.
                        </h3>
                        <div>
                            <button className="btn text-white bg-primary_color rounded-none px-10">See our programs</button>
                        </div>
                    </div>
                    <div className="md:col-span-1 p-4 pt-10">
                        <img src={banner} className="w-full rounded-xl" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;