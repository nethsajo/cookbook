import { TIMEOUT_SEC } from './config.js';

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
    //Re-throw error
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  //To send data, we will need a post request.
  //So besides the url in fetch(), we also need to pass in an object of some options
  //1st option: is the method, and that method is a POST
  /*2nd option: object of headers. Headers are basically some snippets of text 
  which are like information about the request itself*/
  //3rd option: the payload of the request, so basically the data that we want to send (body)
  try {
    const response = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          //we specify in the request that the data we're gonna send is going to be in JSON format
          //and so only then our API can correctly accept that data and create a new recipe in the database
          'Content-Type': 'application/json',
        },
        //body should be in JSON format. So we can use the stringy method of JSON
        //then convert the data that we want to send
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    //Re-throw error
    throw error;
  }
};
