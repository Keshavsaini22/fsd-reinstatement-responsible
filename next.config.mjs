import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/localize/index.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
        '@mui/material': {
            transform: '@mui/material/{{member}}',
        },
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    output: "standalone",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default withNextIntl(nextConfig);
