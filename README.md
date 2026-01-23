# 🚀 Crypto Tracker & NFT Analytics Platform

A comprehensive full-stack cryptocurrency and NFT tracking platform built with Next.js 15, featuring real-time data, market analytics, and social sentiment analysis.

## 🌟 Live Demo

> 🔗 **[Live Demo]** _(Coming Soon)_

## ✨ Features

### Cryptocurrency Tracking
- 📊 **Real-time Price Data** - Live cryptocurrency prices via CoinGecko API
- 📈 **Market Analytics** - 24-hour volume tracking and market cap rankings
- 🔍 **Advanced Search** - Quick search across all listed cryptocurrencies
- 📰 **Crypto News Integration** - Latest news and market updates
- ⭐ **Favorites System** - Save and track your favorite coins

### NFT Analytics
- 🎨 **NFT Collections** - Browse top NFT collections with real-time data
- 📊 **Rankings Dashboard** - Track collection performance and metrics
- 🔗 **OpenSea Integration** - Direct integration with OpenSea API

### Social Sentiment
- 💬 **Reddit Integration** - Track crypto discussions and community sentiment
- 📊 **Social Analytics** - Aggregate social media mentions and trends

### User Features
- 🔐 **Authentication System** - Secure login/signup with JWT
- 👤 **User Profiles** - Personalized dashboard and preferences
- 🔔 **Real-time Updates** - WebSocket integration for live data

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Heroicons
- **Animations:** Custom React animations

### Backend
- **Runtime:** Node.js
- **API Routes:** Next.js API Routes
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Session Management:** Express sessions

### APIs & Integrations
- **CoinGecko API** - Cryptocurrency data
- **OpenSea API** - NFT collection data
- **Reddit API** - Social sentiment analysis
- **Twitter/X API** - Additional social data

### DevOps & Tools
- **Version Control:** Git
- **Package Manager:** npm
- **Environment:** dotenv

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/juniordeveloqer/crypto.git
   cd crypto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your API keys and credentials (see Environment Setup below)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# See .env.example for complete list of required variables

# Database
MONGO_URI=your_mongodb_connection_string

# API Keys
CRYPTOCOMPARE=your_cryptocompare_api_key
OPENSEA_API_KEY=your_opensea_api_key
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret

# Session
SESSION_SECRET=your_session_secret
SECRET=your_jwt_secret
```

### How to Get API Keys

1. **CryptoCompare:** [cryptocompare.com/api](https://www.cryptocompare.com/cryptopian/api-keys)
2. **OpenSea:** [docs.opensea.io](https://docs.opensea.io/reference/api-keys)
3. **Reddit:** [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
4. **MongoDB:** [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## 📁 Project Structure

```
crypto/
├── app/                    # Next.js 15 App Router
│   ├── (HomePage)/        # Landing page
│   ├── (Market)/          # Crypto market listings
│   ├── (NftCollection)/   # NFT rankings & collections
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   └── components/        # Shared app components
├── components/            # Reusable React components
│   ├── basicAnimations/   # Animation components
│   ├── Collection/        # NFT collection components
│   ├── loading/           # Loading states
│   ├── NftComponents/     # NFT-specific components
│   └── redditapi/         # Reddit integration
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── models/                # MongoDB models
├── types/                 # TypeScript definitions
└── public/                # Static assets

```

## 🎯 Development Roadmap

### ✅ Current Features (Completed)
- Basic cryptocurrency tracking with CoinGecko API
- NFT collection rankings via OpenSea
- User authentication system (JWT + bcrypt)
- Reddit sentiment integration
- Real-time data fetching
- Search functionality
- Favorites/star system

### 🔧 Required Improvements (Must-Have for Production)
These are essential to make the project job-ready:

- **Error Handling** - Add error boundaries and proper error messages
- **Loading States** - Implement skeleton screens on all pages
- **Responsive Design** - Ensure mobile compatibility
- **TypeScript Cleanup** - Fix type errors and add proper types
- **Code Optimization** - Remove unused dependencies and code
- **Security Audit** - Validate all API endpoints
- **Production Deployment** - Deploy to Vercel with proper configuration
- **Performance** - Audit `next/image` usage (sizes, priority) and verify lazy-load behavior

### ⭐ Planned Enhancements (Stand-Out Features)
These will differentiate the project from basic portfolios:

- **AI Integration** - Claude API for smart price analysis and predictions
- **WebSocket Hardening** - Reconnect logic, more pairs, optional server-side gateway
- **Advanced Caching** - Redis/memory caching for better performance
- **Rate Limiting** - Protect API routes from abuse
- **CI/CD Pipeline** - Automated testing and deployment
- **Monitoring** - Error tracking with Sentry
- **SEO Optimization** - Meta tags, sitemap, and analytics
- **API Documentation** - Swagger/OpenAPI documentation

### 📋 Future Considerations (Post-Launch)
Ideas for future iterations (not in current scope):

- Portfolio tracking with wallet integration
- Advanced charting with TradingView
- Price alerts and notifications
- Social sharing features
- Multi-language support

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Caner Doğdu**
- GitHub: [@juniordeveloqer](https://github.com/juniordeveloqer)
- LinkedIn: [Add your LinkedIn]

## 🙏 Acknowledgments

- CoinGecko for cryptocurrency data
- OpenSea for NFT data
- Reddit API for social sentiment
- Next.js team for the amazing framework

---

**Built with ❤️ using Next.js 15, TypeScript, and MongoDB**
