'use client';

export default function TopicAnalytics() {
  const analytics = {
    hourlyStats: [
      { hour: '00:00', messages: 1200, bytes: 345600 },
      { hour: '01:00', messages: 980, bytes: 289440 },
      { hour: '02:00', messages: 756, bytes: 223776 },
      { hour: '03:00', messages: 634, bytes: 187656 },
      { hour: '04:00', messages: 823, bytes: 243816 },
      { hour: '05:00', messages: 1456, bytes: 431584 },
      { hour: '06:00', messages: 2134, bytes: 632664 },
      { hour: '07:00', messages: 2987, bytes: 884436 }
    ],
    topicBreakdown: [
      { name: 'Account Audit', messages: 7892, percentage: 45.2, color: 'bg-blue-600' },
      { name: 'Oracle Audit', messages: 4521, percentage: 25.9, color: 'bg-green-600' },
      { name: 'Compute Audit', messages: 2834, percentage: 16.2, color: 'bg-purple-600' },
      { name: 'System Metrics', messages: 1234, percentage: 7.1, color: 'bg-orange-600' }
    ],
    performance: {
      avgConsensusTime: '4.2s',
      successRate: '99.8%',
      throughput: '3,247 msg/s',
      networkLoad: '78%'
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Topic Analytics</h3>
        <p className="text-gray-600 text-sm mt-1">Performance metrics and message distribution</p>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Daily Message Distribution</h4>
          <div className="space-y-3">
            {analytics.topicBreakdown.map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                  <span className="text-sm text-gray-900">{topic.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{topic.messages.toLocaleString()}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${topic.color}`} 
                      style={{width: `${topic.percentage}%`}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-12 text-right">{topic.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Hourly Message Volume</h4>
          <div className="flex items-end space-x-2 h-20">
            {analytics.hourlyStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-600 rounded-sm min-h-1"
                  style={{height: `${(stat.messages / 3000) * 80}px`}}
                ></div>
                <span className="text-xs text-gray-500 mt-1">{stat.hour.slice(0, 2)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Performance Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{analytics.performance.avgConsensusTime}</div>
              <div className="text-sm text-gray-600">Avg Consensus Time</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-green-600">{analytics.performance.successRate}</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{analytics.performance.throughput}</div>
              <div className="text-sm text-gray-600">Throughput</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-orange-600">{analytics.performance.networkLoad}</div>
              <div className="text-sm text-gray-600">Network Load</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}