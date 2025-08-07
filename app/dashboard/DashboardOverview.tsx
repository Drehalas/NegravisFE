'use client';

export default function DashboardOverview() {
  const stats = [
    {
      label: 'Active Oracles',
      value: '9',
      change: '+2',
      trend: 'up',
      icon: 'ri-database-2-line'
    },
    {
      label: 'HCS Topics',
      value: '4',
      change: '100%',
      trend: 'up',
      icon: 'ri-message-3-line'
    },
    {
      label: 'Daily Transactions',
      value: '12.4K',
      change: '+8.2%',
      trend: 'up',
      icon: 'ri-exchange-line'
    },
    {
      label: 'Network TPS',
      value: '3,247',
      change: '+5.1%',
      trend: 'up',
      icon: 'ri-speed-line'
    },
    {
      label: 'Consensus Time',
      value: '4.2s',
      change: '-0.3s',
      trend: 'down',
      icon: 'ri-timer-line'
    },
    {
      label: 'Success Rate',
      value: '99.8%',
      change: '+0.1%',
      trend: 'up',
      icon: 'ri-check-line'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className={`${stat.icon} text-white text-xl`}></i>
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              stat.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}