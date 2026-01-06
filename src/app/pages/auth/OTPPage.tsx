import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp';
import { motion } from 'motion/react';

interface OTPPageProps {
  onVerify: () => void;
}

export default function OTPPage({ onVerify }: OTPPageProps) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    onVerify();
    navigate('/profile-option');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Verify OTP
            </h1>
            <p className="text-gray-600 mb-6">OTP sent via SMS</p>
          </div>

          <div className="flex justify-center mb-8">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-12 text-xl" />
                <InputOTPSlot index={1} className="w-12 h-12 text-xl" />
                <InputOTPSlot index={2} className="w-12 h-12 text-xl" />
                <InputOTPSlot index={3} className="w-12 h-12 text-xl" />
                <InputOTPSlot index={4} className="w-12 h-12 text-xl" />
                <InputOTPSlot index={5} className="w-12 h-12 text-xl" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            disabled={otp.length < 6}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg h-12 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            Verify & Continue
          </Button>

          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              Resend OTP
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
