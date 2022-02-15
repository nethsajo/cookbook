import { TIMEOUT_SEC } from './config';

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};
