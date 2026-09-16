export const ERROR_MESSAGES: Record<string, string> = {
  // Authentication Errors
  "1001": "Invalid username or password.",
  "1002": "Account is locked. Please try again in 15 minutes.",
  "1003": "This email address is already registered.",
  
  // KYC Errors
  "2001": "Identity document upload failed. Please try a clearer image.",
  "2002": "Age requirement not met. You must be 18 or older to register.",
  
  // Financial / Stripe Errors
  "3001": "Payout routing setup failed. Please re-link your Stripe account.",
  "3002": "Transaction was declined by the issuing bank.",

  // System Fallbacks
  "9999": "A critical server error occurred. Please contact support.",
};

// Helper function to resolve codes cleanly
export const getErrorMessage = (statusCode: string): string => {
  return ERROR_MESSAGES[statusCode] || "An unexpected error occurred. Please try again.";
};
1