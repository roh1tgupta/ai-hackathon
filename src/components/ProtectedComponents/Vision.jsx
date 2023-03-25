import React, { useState, useEffect } from "react";
import vision1 from '../../assets/Vision/VisionImage1.jpg';
import vision2 from '../../assets/Vision/VisionImage2.png';
import vision3 from '../../assets/Vision/VisionImage3.png';
import vision4 from '../../assets/Vision/VisionImage4.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../css/Vision.css';

const Dental = () => {
  const [images, setImages] = useState([vision1, vision2, vision3,vision4]);
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
    <div className="vision-container"> 
      <img src={images[currentIndex]} className="vision-image" alt="logo"  />
      <button className="book-button">Book an Appointment</button>
      <div className="datepicker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="datepicker"
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
          />
        </div>
       </div>
    </>
  );
};

export default Dental;
