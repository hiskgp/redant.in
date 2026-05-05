import { useState, useEffect } from 'react'
import { BUSINESS_TYPES } from '../lib/businessConfig'

export default function Dashboard() {
  const [businessType, setBusinessType] = useState('retail')
  const [orders, setOrders] = useState([])
  const config = BUSINESS_TYPES[businessType]

  // Load from your backend API
  useEffect(() => {
    fetch(`/api/orders?type=${businessType}`)
      .then(r => r.json())
      .then(d => setOrders(d.data || []))
      .catch(() => setOrders([]))
  }, [businessType])

  const testOrder = async () => {
    const item = config.sampleItems[0]
    await fetch('/api/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        business_type: businessType,
        customer_name: 'Test Customer',
        customer_phone: '919876543210',
        items: [{name: item.name, price: item.price, qty: 1}],
        total: item.price,
        status: 'new'
      })
    })
    // reload
    setBusinessType(b => b)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg text-white grid place-items-center font-bold" style={{background: config.color}}>W</div>
            <span className="font-bold text-lg">Wexo</span>
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {Object.values(BUSINESS_TYPES).map(bt => (
              <button
                key={bt.id}
                onClick={() => setBusinessType(bt.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  businessType === bt.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{bt.icon}</span>
                <span className="hidden sm:inline">{bt.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {config.categories.map(cat => (
            <span key={cat} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium whitespace-nowrap hover:border-gray-300 cursor-pointer">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Orders Board */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">{config.catalogLabel} Orders</h2>
                <button onClick={testOrder} className="px-3 py-1.5 text-white text-sm rounded-lg hover:opacity-90" style={{background: config.color}}>
                  + Test Order
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {config.orderStages.map(stage => {
                    const stageOrders = orders.filter(o => o.status === stage.id)
                    return (
                      <div key={stage.id} className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{stage.labelTa}</span>
                          <span className="text-xs bg-white px-2 py-0.5 rounded-full">{stageOrders.length}</span>
                        </div>
                        <div className="space-y-2 min-h-[200px]">
                          {stageOrders.map(o => (
                            <div key={o.id} className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm cursor-pointer">
                              <div className="font-medium text-sm text-gray-900 truncate">{o.customer_name}</div>
                              <div className="text-xs text-gray-500 mt-1">₹{o.total}</div>
                              <div className="text-[10px] text-gray-400 mt-1">{new Date(o.created_at).toLocaleTimeString('ta-IN')}</div>
                            </div>
                          ))}
                          {stageOrders.length === 0 && (
                            <div className="text-xs text-gray-400 text-center py-8">No orders</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-3">{config.catalogLabelTa}</h3>
              <div className="space-y-3">
                {config.sampleItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{background: `${config.color}15`}}>
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.name_ta}</div>
                      <div className="text-xs text-gray-500">{item.name}</div>
                    </div>
                    <div className="text-sm font-semibold" style={{color: config.color}}>₹{item.price}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-gray-400">
                + Add {config.catalogLabel}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
