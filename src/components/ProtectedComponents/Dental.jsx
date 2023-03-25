import React, { useState, useEffect } from "react";
import dental1 from '../../assets/Dental/DentalImage1.jpg';
import dental2 from '../../assets/Dental/DentalImage2.jpg';
import dental3 from '../../assets/Dental/DentalImage3.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/Dental.css';

const Dental = () => {
  const [images, setImages] = useState([dental1, dental2, dental3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="dental-container"> 
        <img src={images[currentIndex]} className="vision-image" alt="logo" />
        <button className="book-button">Book an Appointment</button>
        <div className="datepicker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="datepicker"
            placeholderText="Select a date"
          />
        </div>
      </div>
    </>
  );
};

export default Dental;
