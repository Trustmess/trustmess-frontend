import axios from 'axios';

const API_URL = import.meta.env.VITE_FASTAPI_SERVER || '/';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Get list of URLs from .env
const getApiUrls = () => {
  const urls = import.meta.env.VITE_FASTAPI_SERVER;
  if (!urls) {
    // When API URL is not set, we are using proxied requests on the same origin
    return ['/'];
  }
  return urls.split(',').map((url) => url.trim());
};

// Check API
const pingApi = async (url) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 500);

    // If URL set to '/' (proxy), then don't attempt backend ping, just consider it available
    if (url === '/' || url === '') {
      clearTimeout(timeoutId);
      console.log('Api proxy available at /');
      return true;
    }

    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;

    await api.get(cleanUrl, {
      signal: controller.signal,
      timeout: 2000,
    });

    clearTimeout(timeoutId);
    console.log(`Api avaible: ${url}`);
    return true;
  } catch (error) {
    console.log(`Api unavaible: ${url}`);
    return false;
  }
};

const findWorkingApi = async () => {
  const urls = getApiUrls();
  console.log('Search working API in:', urls);

  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const isWorking = await pingApi(url);
      if (isWorking) {
        return url;
      }

      throw new Error(`${url} is not avaible`);
    }),
  );

  // Find first avaible

  const workingUrl = results.find((result) => result.status === 'fulfilled');

  if (workingUrl) {
    const apiUrl = workingUrl.value.endsWith('/') ? workingUrl.value : workingUrl.value + '/';
    console.log('Use Api: ', apiUrl);
    return apiUrl;
  }

  console.warn('All APIs are not avaibles, return fallback', urls[0]);
  return urls[0].endsWith('/') ? urls[0] : urls[0] + '/';
};

let cachedApiUrl = null;

export const getApiUrl = async () => {
  if (cachedApiUrl) {
    return cachedApiUrl;
  }

  cachedApiUrl = await findWorkingApi();
  return cachedApiUrl;
};

export const refreshApiUrl = async () => {
  cachedApiUrl = null;
  return await getApiUrl();
};
