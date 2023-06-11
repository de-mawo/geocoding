/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN,
  },
};

module.exports = nextConfig;
