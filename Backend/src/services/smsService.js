/**
 * Roof Ridge SMS Notification Service
 * Supports:
 * 1. Twilio (Production paid SMS gateway)
 * 2. Fast2SMS (Free trial/tier for Indian numbers - https://www.fast2sms.com)
 * 3. Textbelt (Free 1 text/day per IP - https://textbelt.com)
 * 4. Staging / Simulated Mock Provider (Zero-cost developer fallback with console output)
 */

let twilioClient = null;

const getTwilioClient = () => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (sid && token && sid !== 'your_twilio_sid' && token !== 'your_twilio_token') {
    if (!twilioClient) {
      const twilio = require('twilio');
      twilioClient = twilio(sid, token);
    }
    return twilioClient;
  }
  return null;
};

/**
 * Send OTP SMS to recipient mobile number
 * @param {string} phone 10-digit or international format phone number
 * @param {string} otp 4 or 6 digit verification code
 * @returns {Promise<{success: boolean, provider: string, isMock: boolean, details?: string}>}
 */
const sendOtpSms = async (phone, otp) => {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const tenDigitPhone = cleanPhone.slice(-10);
  const intlPhone = cleanPhone.startsWith('+') ? cleanPhone : `+91${tenDigitPhone}`;
  const messageBody = `Your Roof Ridge verification code is ${otp}. Valid for 10 minutes. Please do not share this code.`;

  // 1. Try Twilio if credentials are valid
  const twilio = getTwilioClient();
  if (twilio && process.env.TWILIO_PHONE_NUMBER && process.env.TWILIO_PHONE_NUMBER !== 'your_twilio_number') {
    try {
      const result = await twilio.messages.create({
        body: messageBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: intlPhone,
      });
      console.log(`[SMS Service - Twilio] SMS sent successfully. SID: ${result.sid}`);
      return { success: true, provider: 'twilio', isMock: false };
    } catch (err) {
      console.error(`[SMS Service - Twilio] Failed to send SMS via Twilio: ${err.message}`);
      // Fall through to other providers
    }
  }

  // 2. Try Fast2SMS (Free tier popular in India: https://www.fast2sms.com)
  const fast2SmsKey = process.env.FAST2SMS_API_KEY;
  if (fast2SmsKey && fast2SmsKey !== 'your_fast2sms_api_key') {
    try {
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': fast2SmsKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otp,
          numbers: tenDigitPhone,
        }),
      });
      const data = await response.json();
      if (data.return) {
        console.log(`[SMS Service - Fast2SMS] OTP sent successfully to ${tenDigitPhone}`);
        return { success: true, provider: 'fast2sms', isMock: false };
      }
      console.warn(`[SMS Service - Fast2SMS] Provider error:`, data.message);
    } catch (err) {
      console.error(`[SMS Service - Fast2SMS] Connection failed: ${err.message}`);
    }
  }

  // 3. Try Textbelt (Free 1 text per day per IP)
  if (process.env.USE_TEXTBELT === 'true') {
    try {
      const response = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: intlPhone,
          message: messageBody,
          key: process.env.TEXTBELT_KEY || 'textbelt',
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(`[SMS Service - Textbelt] SMS dispatched to ${intlPhone}`);
        return { success: true, provider: 'textbelt', isMock: false };
      }
      console.warn(`[SMS Service - Textbelt] Textbelt quota/error:`, data.error);
    } catch (err) {
      console.error(`[SMS Service - Textbelt] Failed: ${err.message}`);
    }
  }

  // 4. Staging / Simulated Mock Provider (Free Dev & Staging Fallback)
  console.log(`\n┌────────────────────────────────────────────────────────┐`);
  console.log(`│ [Roof Ridge SMS Gateway - Staging / Dev Mode]          │`);
  console.log(`│ Recipient: ${intlPhone.padEnd(44)}│`);
  console.log(`│ OTP Code : ${otp.padEnd(44)}│`);
  console.log(`│ Mode     : Simulated Free Staging OTP (No Cost)        │`);
  console.log(`└────────────────────────────────────────────────────────┘\n`);

  return {
    success: true,
    provider: 'mock_staging',
    isMock: true,
    details: 'Simulated OTP delivered via server console and staging API response',
  };
};

module.exports = {
  sendOtpSms,
};
