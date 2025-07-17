import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(config);
