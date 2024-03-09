import OTPInput from "react-otp-input";
import style from "../styles/Otp.module.css";
import { useState } from "react";

const OTPField = () => {
  const [otp, setOtp] = useState("");

  return (
    <>
      <div className={style.Container}>
        <div className={style.Label}>Enter OTP</div>
        <div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={style.inputStyle}
            placeholder="000000"
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <div className={style.Resend}>Resend OTP</div>
      </div>
    </>
  );
};

export default OTPField;
