import PropTypes from "prop-types";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import style from "../styles/Bread.module.css";

const Bread = ({ page }) => {
  return (
    <div className={style.Container}>
      <div className={style.Numbers}>
        <div className={page === 1 ? style.ActiveIndex : style.Index}>
          {page <= 1 ? (
            <div className={style.UnvisitedIndex}>1</div>
          ) : (
            <IoCheckmarkCircleSharp size={27} color="rgba(74, 222, 128, 1)" />
          )}
        </div>
        <div className={page === 2 ? style.ActiveIndex : style.Index}>
          {page <= 2 ? (
            <div className={style.UnvisitedIndex}>2</div>
          ) : (
            <IoCheckmarkCircleSharp size={27} color="rgba(74, 222, 128, 1)" />
          )}
        </div>
        <div className={page === 3 ? style.ActiveIndex : style.Index}>
          {page <= 3 ? (
            <div className={style.UnvisitedIndex}>3</div>
          ) : (
            <IoCheckmarkCircleSharp size={27} color="rgba(74, 222, 128, 1)" />
          )}
        </div>
        <div className={page === 4 ? style.ActiveIndex : style.Index}>
          {page <= 4 ? (
            <div className={style.UnvisitedIndex}>4</div>
          ) : (
            <IoCheckmarkCircleSharp size={27} color="rgba(74, 222, 128, 1)" />
          )}
        </div>
      </div>
      <div className={style.Steps}>
        <div className={style.Text}>Verify Yourself</div>
        <div className={style.Text}>Personal Information</div>
        <div className={style.Text}>Professional Information</div>
        <div className={style.Text}>Show Your Work</div>
      </div>
    </div>
  );
};

Bread.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Bread;
