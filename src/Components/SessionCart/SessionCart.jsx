import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


const SessionCart = ({ session }) => {

    const { image, title, description, registrationStartDate, registrationEndDate } = session;
    const [isDate, setDate] = useState(true);
    const [isUpcoming, setUpcoming] = useState(true);

    useEffect(() => {

        const currentDate = new Date();
        const regStartDate = new Date(registrationStartDate);
        const regEndDate = new Date(registrationEndDate);

        const isRegPeriod = currentDate >= regStartDate && currentDate <= regEndDate;
        setDate(isRegPeriod)
        const isUpcoming = currentDate < regStartDate;
        setUpcoming(isUpcoming);

    }, [registrationStartDate, registrationEndDate])


    return (
        <div className='p-3 shadow-md max-w-96 rounded-lg bg-primary_bg_color h-full flex flex-col'>
            <div>
                <img className='max-w-90 rounded-lg lg:h-48' src={image} alt="image" />
            </div>
            <div className='my-4 flex-grow'>
                <h1 className='text-xl md:text-2xl font-medium'>Title: {title}</h1>
                <h3>Description: {description}</h3>
            </div>
            <div className='mt-auto'>
                {
                    isDate ?
                        <button className='btn bg-secondary_color text-white '>On Going</button> :
                        <>
                            {
                                isUpcoming ? <button className='btn bg-secondary_color text-white '>Up Comming</button> :
                                    <button className='btn bg-secondary_color text-white '>Closed</button>
                            }
                        </>
                }
            </div>
            <button className='btn bg-primary_color text-white mt-5'>Read More</button>
        </div>
    );
};

export default SessionCart;

SessionCart.propTypes = {
    session: PropTypes.object.isRequired
}