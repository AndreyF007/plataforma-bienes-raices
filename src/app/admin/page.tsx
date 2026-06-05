export default function SuperAdminPage() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Agencies', value: '142', trend: '+12%' },
          { label: 'Active Sites', value: '138', trend: '+15%' },
          { label: 'Total Properties', value: '3,492', trend: '+8%' },
          { label: 'Global Leads', value: '18,293', trend: '+24%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-semibold text-gray-900">{stat.value}</h3>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tenants */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-medium text-gray-900">Recent Tenants (Agencies)</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Agency Name</th>
                <th className="px-6 py-3">Domain</th>
                <th className="px-6 py-3">AI Theme applied</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">Sofía Inmobiliaria</td>
                <td className="px-6 py-4 text-gray-500">sofiadelgado.com</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700">
                    cinematic-luxury
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">Manage</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">Andrés Realty</td>
                <td className="px-6 py-4 text-gray-500">andresrealty.com</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                    saas-modern
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">Manage</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
