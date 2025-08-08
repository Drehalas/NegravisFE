# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# 0G Compute Network Backend Configuration
NEXT_PUBLIC_ZEROG_API_URL=http://localhost:4000
ZEROG_BACKEND_URL=http://localhost:4000

# Optional: For production deployments
# NEXT_PUBLIC_ZEROG_API_URL=https://negravis-api.railway.app
# ZEROG_BACKEND_URL=https://negravis-api.railway.app

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Backend Setup

1. Clone the 0G Compute Network backend:
```bash
git clone https://github.com/oguzhaangumuss/Negravis.git
cd Negravis
npm install
```

2. Set up backend environment:
```bash
# Copy environment template
cp .env.example .env

# Add your private key for 0G network
PRIVATE_KEY=your_private_key_here
```

3. Start the backend:
```bash
npm run dev
```

The backend will run on `http://localhost:4000` and provide:
- Account management
- AI service providers
- Query processing
- Transaction history

## Testing the Integration

1. Start both frontend and backend
2. Visit `http://localhost:3000/api-docs`
3. Click "Interactive Swagger UI" tab
4. Test API endpoints directly in the browser

## Production Deployment

For production, update the environment variables to point to your deployed backend:

```bash
NEXT_PUBLIC_ZEROG_API_URL=https://your-backend-domain.com
ZEROG_BACKEND_URL=https://your-backend-domain.com
```