'use client';

import { useState } from 'react';
import { ChevronRight, Play, Code, Database, Zap, Shield, Globe, BookOpen, Users, MessageCircle } from 'lucide-react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Play className="h-5 w-5" />,
      content: {
        title: 'Welcome to Negravis Oracle Platform',
        description: 'Your complete guide to building with decentralized data',
        content: `
## What is Negravis?

Negravis is a next-generation Oracle platform built on Hedera Hashgraph that provides **reliable, real-time data** to blockchain applications. Think of it as the bridge between the physical world and the digital blockchain ecosystem.

### Why Choose Negravis?

🔒 **Security First**: Every data point is cryptographically verified and stored immutably on Hedera  
⚡ **Lightning Fast**: Sub-second data delivery with 99.99% uptime guarantee  
🌐 **Global Scale**: Distributed network ensures data availability worldwide  
💰 **Cost Effective**: Leveraging Hedera's low-cost consensus for affordable operations  

### Quick Start in 3 Steps

1. **Sign Up**: Create your developer account on our dashboard
2. **Get API Key**: Generate your unique API credentials 
3. **Make First Call**: Start querying real-time data immediately

### Your First API Call

\`\`\`javascript
const response = await fetch('https://api.negravis.com/v1/price/BTC', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
console.log('BTC Price:', data.price);
\`\`\`

Ready to dive deeper? Explore our comprehensive guides below! 👇
        `
      }
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      icon: <Database className="h-5 w-5" />,
      content: {
        title: 'Understanding the Negravis Architecture',
        description: 'Deep dive into our decentralized data infrastructure',
        content: `
## The Technology Behind Negravis

### 🏗️ **Three-Layer Architecture**

**1. Data Collection Layer**
- Global network of verified data providers
- Real-time sensor networks and APIs
- Multi-source data aggregation for accuracy

**2. Consensus Layer (Hedera Hashgraph)**
- Immutable data storage and verification
- Byzantine fault tolerance
- Energy-efficient consensus mechanism

**3. Application Layer**
- RESTful APIs for easy integration
- WebSocket streams for real-time data
- Smart contract interfaces

### 🔄 **Data Flow Process**

1. **Collection**: Raw data gathered from multiple trusted sources
2. **Validation**: Cryptographic verification and quality checks
3. **Consensus**: Data committed to Hedera ledger with timestamps
4. **Distribution**: Real-time delivery to applications via APIs
5. **Verification**: Full audit trail for data provenance

### 🛡️ **Security Measures**

- **End-to-end encryption** for all data transmission
- **Multi-signature validation** from independent oracles
- **Fraud detection algorithms** to identify anomalies
- **Decentralized architecture** prevents single points of failure

### 🚀 **Performance Specs**

- **Latency**: < 100ms average response time
- **Throughput**: 10,000+ queries per second
- **Availability**: 99.99% uptime SLA
- **Accuracy**: 99.95% data accuracy guarantee
        `
      }
    },
    {
      id: 'use-cases',
      title: 'Real-World Applications',
      icon: <Zap className="h-5 w-5" />,
      content: {
        title: 'Transform Your Business with Oracle Data',
        description: 'Discover practical applications across industries',
        content: `
## Industry Applications

### 💰 **Decentralized Finance (DeFi)**

**Price Feeds for Trading**
- Real-time cryptocurrency prices
- Cross-exchange arbitrage detection
- Liquidation triggers for lending protocols

*"We reduced slippage by 40% using Negravis real-time price feeds"* - DeFi Protocol Team

**Example Integration:**
\`\`\`solidity
contract TradingBot {
    function checkPrice() external view returns (uint256) {
        return IPriceOracle(NEGRAVIS_ORACLE).getPrice("BTC/USD");
    }
}
\`\`\`

### 🏭 **Supply Chain & Manufacturing**

**Asset Tracking**
- IoT sensor data from warehouses
- Temperature monitoring for pharmaceuticals
- Location tracking for high-value goods

**Quality Assurance**
- Environmental conditions monitoring
- Compliance verification
- Automated quality reports

### 🌍 **Smart Cities & IoT**

**Environmental Monitoring**
- Air quality measurements
- Traffic flow optimization
- Energy grid management

**Emergency Response**
- Weather alert systems
- Disaster prediction models
- Resource allocation optimization

### 🏥 **Healthcare & Research**

**Clinical Trials**
- Patient data verification
- Treatment outcome tracking
- Regulatory compliance

**Supply Chain Safety**
- Drug authenticity verification
- Cold chain monitoring
- Counterfeit detection

### 🎮 **Gaming & NFTs**

**Dynamic NFTs**
- Sports statistics integration
- Weather-based game mechanics
- Real-world event triggers

**Gaming Economics**
- In-game asset pricing
- Tournament reward distribution
- Player achievement verification
        `
      }
    },
    {
      id: 'api-guide',
      title: 'API Integration Guide',
      icon: <Code className="h-5 w-5" />,
      content: {
        title: 'Complete API Integration Guide',
        description: 'Everything you need to integrate Negravis APIs',
        content: `
## REST API Endpoints

### 🔐 **Authentication**

All API requests require authentication using API keys:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.negravis.com/v1/
\`\`\`

### 📊 **Price Data Endpoints**

**Get Current Price**
\`\`\`javascript
GET /v1/price/{symbol}

// Example Response
{
  "symbol": "BTC/USD",
  "price": 42250.75,
  "timestamp": 1640995200,
  "confidence": 99.8,
  "sources": 12
}
\`\`\`

**Get Historical Data**
\`\`\`javascript
GET /v1/price/{symbol}/history?from=1640995200&to=1641081600

// Returns array of price points
[
  {
    "timestamp": 1640995200,
    "price": 42250.75,
    "volume": 1250000
  }
]
\`\`\`

### 🌤️ **Weather Data Endpoints**

**Current Weather**
\`\`\`javascript
GET /v1/weather/{location}

{
  "location": "New York, NY",
  "temperature": 18.5,
  "humidity": 65,
  "conditions": "Partly Cloudy",
  "timestamp": 1640995200
}
\`\`\`

### 📈 **Custom Data Feeds**

**Enterprise Endpoints**
- Custom data streams
- Batch query operations
- Historical data exports
- Real-time WebSocket connections

### 🔄 **WebSocket Streaming**

\`\`\`javascript
const ws = new WebSocket('wss://api.negravis.com/v1/stream');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channels: ['price:BTC/USD', 'weather:NYC']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
\`\`\`

### 📝 **SDKs & Libraries**

**JavaScript/TypeScript**
\`\`\`bash
npm install @negravis/oracle-sdk
\`\`\`

**Python**
\`\`\`bash
pip install negravis-oracle
\`\`\`

**Go**
\`\`\`bash
go get github.com/negravis/oracle-go
\`\`\`
        `
      }
    },
    {
      id: 'tutorials',
      title: 'Step-by-Step Tutorials',
      icon: <BookOpen className="h-5 w-5" />,
      content: {
        title: 'Hands-On Learning Tutorials',
        description: 'Build real applications with guided tutorials',
        content: `
## Tutorial Series

### 🎯 **Tutorial 1: Build a Price Tracker**

**What You'll Learn:**
- Set up API authentication
- Fetch real-time price data
- Create a simple dashboard
- Handle error scenarios

**Prerequisites:**
- Basic JavaScript knowledge
- Node.js installed
- Text editor

**Step 1: Project Setup**
\`\`\`bash
mkdir price-tracker
cd price-tracker
npm init -y
npm install express axios dotenv
\`\`\`

**Step 2: Create API Client**
\`\`\`javascript
// api.js
const axios = require('axios');

class NegravisClient {
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: 'https://api.negravis.com/v1',
      headers: { 'Authorization': \`Bearer \${apiKey}\` }
    });
  }
  
  async getPrice(symbol) {
    const response = await this.client.get(\`/price/\${symbol}\`);
    return response.data;
  }
}

module.exports = NegravisClient;
\`\`\`

**Step 3: Build Express Server**
\`\`\`javascript
// server.js
const express = require('express');
const NegravisClient = require('./api');

const app = express();
const oracle = new NegravisClient(process.env.API_KEY);

app.get('/price/:symbol', async (req, res) => {
  try {
    const price = await oracle.getPrice(req.params.symbol);
    res.json(price);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
\`\`\`

### 🎯 **Tutorial 2: Smart Contract Integration**

**Build a DeFi Price Oracle Consumer**

**Step 1: Smart Contract Setup**
\`\`\`solidity
pragma solidity ^0.8.0;

interface INegravisOracle {
    function getPrice(string memory symbol) external view returns (uint256);
    function getLastUpdate(string memory symbol) external view returns (uint256);
}

contract PriceConsumer {
    INegravisOracle public oracle;
    
    constructor(address _oracle) {
        oracle = INegravisOracle(_oracle);
    }
    
    function getBTCPrice() external view returns (uint256) {
        return oracle.getPrice("BTC/USD");
    }
    
    function isPriceStale(string memory symbol) external view returns (bool) {
        uint256 lastUpdate = oracle.getLastUpdate(symbol);
        return block.timestamp - lastUpdate > 300; // 5 minutes
    }
}
\`\`\`

**Step 2: Deployment Script**
\`\`\`javascript
const { ethers } = require("hardhat");

async function main() {
  const PriceConsumer = await ethers.getContractFactory("PriceConsumer");
  const oracle = await PriceConsumer.deploy("0x123..."); // Negravis Oracle address
  
  await oracle.deployed();
  console.log("PriceConsumer deployed to:", oracle.address);
}
\`\`\`

### 🎯 **Tutorial 3: Real-Time Dashboard**

**Create a Live Data Visualization**

**Technologies Used:**
- React.js for frontend
- Chart.js for visualizations
- WebSocket for real-time updates

**Key Features:**
- Live price charts
- Multiple cryptocurrency tracking
- Alert system for price changes
- Historical data analysis

*Full code examples available in our GitHub repository!*
        `
      }
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: <Shield className="h-5 w-5" />,
      content: {
        title: 'Development Best Practices',
        description: 'Build robust and secure applications',
        content: `
## Security Best Practices

### 🔐 **API Key Management**

**DO:**
- Store API keys in environment variables
- Use different keys for development/production
- Rotate keys regularly (monthly recommended)
- Implement key rotation without downtime

**DON'T:**
- Hardcode API keys in source code
- Share keys in public repositories
- Use the same key across multiple applications

\`\`\`javascript
// ✅ Good
const apiKey = process.env.NEGRAVIS_API_KEY;

// ❌ Bad
const apiKey = "sk_live_123456789";
\`\`\`

### ⚡ **Performance Optimization**

**Caching Strategy**
\`\`\`javascript
const cache = new Map();
const CACHE_TTL = 30000; // 30 seconds

async function getCachedPrice(symbol) {
  const cached = cache.get(symbol);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const fresh = await oracle.getPrice(symbol);
  cache.set(symbol, { data: fresh, timestamp: Date.now() });
  return fresh;
}
\`\`\`

**Rate Limiting**
- Respect API rate limits (1000 requests/minute)
- Implement exponential backoff for retries
- Use WebSockets for high-frequency updates

### 🛠️ **Error Handling**

**Robust Error Management**
\`\`\`javascript
class OracleClient {
  async getPrice(symbol, retries = 3) {
    try {
      return await this.api.get(\`/price/\${symbol}\`);
    } catch (error) {
      if (retries > 0 && error.response?.status >= 500) {
        await this.delay(1000 * (4 - retries)); // Exponential backoff
        return this.getPrice(symbol, retries - 1);
      }
      throw new OracleError(\`Failed to fetch price for \${symbol}\`, error);
    }
  }
}
\`\`\`

### 🔄 **Data Validation**

**Always Validate Oracle Data**
\`\`\`javascript
function validatePriceData(data) {
  if (!data.price || data.price <= 0) {
    throw new Error('Invalid price data');
  }
  
  if (data.confidence < 95) {
    console.warn('Low confidence price data:', data.confidence);
  }
  
  const age = Date.now() / 1000 - data.timestamp;
  if (age > 300) { // 5 minutes
    throw new Error('Stale price data');
  }
  
  return data;
}
\`\`\`

### 📊 **Monitoring & Logging**

**Application Monitoring**
- Log all Oracle API calls with timestamps
- Monitor response times and error rates
- Set up alerts for API failures
- Track data freshness and accuracy

\`\`\`javascript
const logger = require('winston');

async function loggedAPICall(operation, symbol) {
  const start = Date.now();
  try {
    const result = await operation();
    logger.info('Oracle call successful', {
      symbol,
      duration: Date.now() - start,
      timestamp: new Date().toISOString()
    });
    return result;
  } catch (error) {
    logger.error('Oracle call failed', {
      symbol,
      error: error.message,
      duration: Date.now() - start
    });
    throw error;
  }
}
\`\`\`
        `
      }
    },
    {
      id: 'support',
      title: 'Support & Community',
      icon: <Users className="h-5 w-5" />,
      content: {
        title: 'Get Help & Connect',
        description: 'Community resources and support channels',
        content: `
## Getting Help

### 💬 **Community Channels**

**Discord Server**
- Real-time chat with developers
- Technical support from core team
- Community-driven solutions
- Weekly developer AMAs

**GitHub Discussions**
- Feature requests and roadmap discussions
- Open source contributions
- Bug reports and issues
- Code examples and snippets

**Developer Forum**
- In-depth technical discussions
- Integration best practices
- Use case sharing
- Partner announcements

### 📧 **Direct Support**

**Technical Support**
- Email: tech-support@negravis.com
- Response time: < 24 hours
- Available 24/7 for enterprise customers

**Business Inquiries**
- Email: partnerships@negravis.com
- Custom integration discussions
- Enterprise pricing and SLAs
- Dedicated account management

### 📚 **Additional Resources**

**Developer Blog**
- Weekly technical deep-dives
- Integration tutorials
- Industry insights
- Product updates

**YouTube Channel**
- Video tutorials and walkthroughs
- Live coding sessions
- Webinar recordings
- Developer interviews

**Newsletter**
- Monthly product updates
- New feature announcements
- Industry news and trends
- Developer spotlights

### 🤝 **Contributing**

**Open Source Projects**
- SDK libraries (JavaScript, Python, Go)
- Example applications
- Documentation improvements
- Community tools

**Bug Bounty Program**
- Security vulnerability reporting
- Rewards up to $10,000
- Responsible disclosure process
- Recognition in Hall of Fame

### 📈 **Enterprise Support**

**Dedicated Solutions**
- Custom data feeds
- Private oracle networks
- White-label solutions
- 24/7 premium support

**SLA Guarantees**
- 99.99% uptime commitment
- < 50ms response time guarantee
- Dedicated infrastructure
- Priority feature development

### 🎓 **Learning Resources**

**Certification Program**
- Oracle Integration Specialist
- Blockchain Data Engineer
- DeFi Developer Certification
- Smart Contract Auditor

**Workshops & Training**
- Monthly virtual workshops
- On-site training for enterprises
- Custom curriculum development
- Hands-on project guidance

---

**Need immediate help?** Join our Discord for fastest response: [discord.gg/negravis](https://discord.gg/negravis)
        `
      }
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Developer Documentation
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Complete guides, tutorials, and best practices for building with Negravis Oracle Platform
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Documentation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {currentSection?.content.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {currentSection?.content.description}
                </p>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <div 
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ 
                    __html: currentSection?.content.content.replace(/\n/g, '<br/>').replace(/```(\w+)?\n(.*?)```/gs, '<pre><code class="language-$1">$2</code></pre>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^# (.+)$/gm, '<h1>$1</h1>')
                  }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <a href="/dashboard" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="h-6 w-6" />
                  <h3 className="font-semibold">Try Dashboard</h3>
                </div>
                <p className="text-blue-100 text-sm">Explore live data and analytics</p>
              </a>

              <a href="/api-docs" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="h-6 w-6" />
                  <h3 className="font-semibold">API Reference</h3>
                </div>
                <p className="text-purple-100 text-sm">Complete API documentation</p>
              </a>

              <a href="https://discord.gg/negravis" className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-6 w-6" />
                  <h3 className="font-semibold">Join Community</h3>
                </div>
                <p className="text-green-100 text-sm">Get help from developers</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = `
.markdown-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
  color: #1f2937;
}

.markdown-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem 0;
  color: #374151;
}

.markdown-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.25rem 0 0.75rem 0;
  color: #4b5563;
}

.markdown-content pre {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-content code {
  background: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #dc2626;
}

.markdown-content pre code {
  background: transparent;
  padding: 0;
  color: #1f2937;
}

.markdown-content p {
  margin: 1rem 0;
  line-height: 1.6;
}

.markdown-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin: 0.5rem 0;
}

.markdown-content strong {
  font-weight: 600;
  color: #1f2937;
}

.markdown-content em {
  font-style: italic;
  color: #4b5563;
}
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}