import styles from "./styles/sliderX1Y.module.css";
import { useState } from "react";

export const Slider = ({ content }: { content: React.ReactNode[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const numSlidesToShow = 3; // Number of slides to display

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + numSlidesToShow) % content.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (currentSlide - numSlidesToShow + content.length) % content.length
    );
  };

  return (
    <div className={styles.sliderX1Y}>
      <div className={styles.slides}>
        {content.slice(currentSlide, currentSlide + numSlidesToShow)}
      </div>
      <button onClick={handlePrevSlide}>&#10094;</button>
      <button onClick={handleNextSlide}>&#10095;</button>
    </div>
  );
};
