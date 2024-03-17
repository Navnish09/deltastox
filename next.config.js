/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://www.deltastox.com",
    NEXT_PUBLIC_TINY_MCE_API_KEY:
      "eiiyfmle196n4fkaid9eofgvyxld5qkaglmkvyg2prnwh1ah",
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
