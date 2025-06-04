import { request } from '@playwright/test';  // Correct import from Playwright

export const sendSOAPRequest = async (url, xmlRequest) => {
  try {
    // Send the POST request using Playwright's request API
    const response = await request.post(url, {
      data: xmlRequest,
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    // Return the response body (as a string)
    return await response.text();
  } catch (error) {
    throw  (`Error sending SOAP request: ${error.message}`);
  }
};
