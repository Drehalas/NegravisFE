import { Database, Brain, Shield, Network, Zap, BarChart3 } from 'lucide-react'

export default function Features() {
    return (
        <section className="py-12 md:py-20 bg-black text-white">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Enterprise-Grade Oracle & Analytics Platform</h2>
                    <p className="text-gray-300">Negravis delivers production-ready multi-source data aggregation with real-time analytics, powered by Hedera Hashgraph blockchain technology.</p>
                </div>

                <div className="relative mx-auto grid max-w-4xl divide-x divide-y divide-gray-800 border border-gray-800 *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Database className="size-5 text-blue-400" />
                            <h3 className="text-lg font-medium">Multi-Source Oracle</h3>
                        </div>
                        <p className="text-sm text-gray-300">Chainlink, CoinGecko, Weather APIs, NASA, Wikipedia with advanced consensus algorithms and real-time data feeds</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Brain className="size-5 text-purple-400" />
                            <h3 className="text-lg font-medium">Interactive Queries</h3>
                        </div>
                        <p className="text-sm text-gray-300">AI-powered Oracle Assistant with support for crypto prices, weather data, and general knowledge queries</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Network className="size-5 text-green-400" />
                            <h3 className="text-lg font-medium">Hedera Integration</h3>
                        </div>
                        <p className="text-sm text-gray-300">HCS consensus service, HashScan explorer integration, and immutable transaction logging</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-5 text-yellow-400" />
                            <h3 className="text-lg font-medium">Real-time Dashboard</h3>
                        </div>
                        <p className="text-sm text-gray-300">Live Oracle metrics, provider health monitoring, and consensus algorithm visualization</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Shield className="size-5 text-red-400" />
                            <h3 className="text-lg font-medium">Enterprise Security</h3>
                        </div>
                        <p className="text-sm text-gray-300">Blockchain verification, data integrity checks, and comprehensive audit trails</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="size-5 text-cyan-400" />
                            <h3 className="text-lg font-medium">Advanced Analytics</h3>
                        </div>
                        <p className="text-sm text-gray-300">Cost tracking, performance monitoring, network analytics with interactive charts and reports</p>
                    </div>
                </div>
            </div>
        </section>
    )
}