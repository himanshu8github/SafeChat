import { body } from 'express-validator';

export const signupValidation = [
  body('email')
    .optional()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .withMessage('Only Gmail addresses are allowed'),

  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Enter a valid international phone number'),

  body()
    .custom((value) => {
      if (!value.email && !value.phone) {
        throw new Error('Either email or phone number is required');
      }
      return true;
    }),

  body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be a 6-digit code'),
];
