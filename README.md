# Mandella Mining UI Web App

A modern, open-source web interface for the Mandella Wallet mining pool, built with Next.js and Tailwind CSS. It provides a sleek dashboard for monitoring and interacting with your mining pool, offering real-time pool statistics and hashrate monitoring, miner details and performance tracking, and modern, responsive design with Tailwind CSS.

## Overview

Mandella Mining UI provides a sleek dashboard for monitoring and interacting with your mining pool, offering:

- Real-time pool statistics and hashrate monitoring
- Miner details and performance tracking
- Modern, responsive design with Tailwind CSS
- Integration with Miningcore Pool API
- Built on Next.js 14 for optimal performance

🔗 **Live Pool**: [pool.mandellawallet.com](https://pool.mandellawallet.com)

## Prerequisites

- Node.js 18.17.0 or later
- npm or yarn package manager
- Miningcore Pool API endpoint

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/mandella-wallet/MandellaMiningUI.git
cd MandellaMiningUI/miningui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env.local` file:
```
NEXT_PUBLIC_API_BASE_URL=your_miningcore_api_url
```

4. Run development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Technology Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: FontAwesome, Lucide React
- **Charts**: Recharts
- **Type Safety**: TypeScript

## Project Structure

```
miningui/
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and helpers
│   └── styles/       # Global styles
├── public/           # Static assets
└── tailwind.config.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the MIT License.

## Support

For support, join our community:
- Email: support@mandellawallet.com
- Telegram: [mandellawallet](https://t.me/mandellawallet)
- X (Twitter): [@mandellawallet](https://x.com/mandellawallet)
