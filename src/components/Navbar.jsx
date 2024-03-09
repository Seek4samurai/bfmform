import style from "../styles/Navbar.module.css";
import bfmlogo from "../assets/Frame.svg";

const Navbar = () => {
  return (
    <>
      <div className={style.Container}>
        <div className={style.Center}>
          <div className={style.Wrapper}>
            <img src={bfmlogo} alt="logo"></img>
            <div className={style.Heading}>
              Account Verification
              <span className={style.Subtext}>In progress</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
