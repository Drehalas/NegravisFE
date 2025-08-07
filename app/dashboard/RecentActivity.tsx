'use client';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'consensus',
      message: 'Oracle consensus reached for BTC/USD price feed',
      timestamp: '2 minutes ago',
      status: 'success',
      icon: 'ri-check-line'
    },
    {
      id: 2,
      type: 'hcs',
      message: 'New message submitted to Oracle audit topic',
      timestamp: '5 minutes ago',
      status: 'info',
      icon: 'ri-message-3-line'
    },
    {
      id: 3,
      type: 'contract',
      message: 'PriceFeed contract updated with latest data',
      timestamp: '8 minutes ago',
      status: 'success',
      icon: 'ri-file-code-line'
    },
    {
      id: 4,
      type: 'warning',
      message: 'Tellor oracle response time exceeded threshold',
      timestamp: '12 minutes ago',
      status: 'warning',
      icon: 'ri-alert-line'
    },
    {
      id: 5,
      type: 'account',
      message: 'New account created: 0.0.1234567',
      timestamp: '15 minutes ago',
      status: 'info',
      icon: 'ri-user-add-line'
    },
    {
      id: 6,
      type: 'file',
      message: 'Digital ID document encrypted and stored',
      timestamp: '18 minutes ago',
      status: 'success',
      icon: 'ri-file-shield-2-line'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-8">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p className="text-gray-600 text-sm mt-1">Latest events across all services</p>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.status === 'success' ? 'bg-green-100' :
                activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <i className={`${activity.icon} ${
                  activity.status === 'success' ? 'text-green-600' :
                  activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                }`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium">{activity.message}</p>
                <p className="text-gray-500 text-sm mt-1">{activity.timestamp}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                activity.status === 'success' ? 'bg-green-100 text-green-800' :
                activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {activity.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}