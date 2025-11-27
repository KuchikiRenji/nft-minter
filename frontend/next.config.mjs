import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack: (config) => {
    config.resolve.alias["pino-pretty"] = path.resolve(__dirname, "lib/shims/pinoPretty.ts");
    config.resolve.alias["@react-native-async-storage/async-storage"] = path.resolve(
      __dirname,
      "lib/shims/asyncStorage.ts"
    );
    return config;
  },
};

export default nextConfig;

