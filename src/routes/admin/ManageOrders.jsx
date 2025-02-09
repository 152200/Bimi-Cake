import React, { useState, useMemo } from "react";
import { Search, Trash2, Check, X } from "lucide-react";
import { users } from "../../../server/auth";
import { toast } from "react-hot-toast";

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      userId: 1,
      items: 3, 
      totalPrice: 420,
      status: 'pending'
    },
    { 
      id: 2, 
      userId: 2,
      items: 4, 
      totalPrice: 560,
      status: 'pending'
    },
  ]);

  // Memoize filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const user = users.find(u => u.id === order.userId);
      return (
        user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.phone.includes(searchTerm) ||
        order.id.toString().includes(searchTerm)
      );
    });
  }, [orders, searchTerm]);

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all orders?')) {
      setOrders([]);
      toast.success('All orders deleted successfully');
    }
  };

  const handleOrderAction = (orderId, action) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: action } 
          : order
      )
    );
    toast.success(`Order ${orderId} ${action}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header and Controls */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Orders</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, or order ID"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E5C1C1] focus:border-transparent"
            />
          </div>
          
          {/* Delete All Button */}
          <button
            onClick={handleDeleteAll}
            disabled={orders.length === 0}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={20} />
            <span>Delete All</span>
          </button>
        </div>
      </div>

      {/* Orders Table/Cards */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-gray-600">Order ID</th>
                <th className="px-6 py-3 text-gray-600">Customer</th>
                <th className="px-6 py-3 text-gray-600">Phone</th>
                <th className="px-6 py-3 text-gray-600">Items</th>
                <th className="px-6 py-3 text-gray-600">Total</th>
                <th className="px-6 py-3 text-gray-600">Status</th>
                <th className="px-6 py-3 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const user = users.find(u => u.id === order.userId);
                return (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">#{order.id}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full bg-gray-100"
                      />
                      {user?.name}
                    </td>
                    <td className="px-6 py-4">{user?.phone}</td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4">{order.totalPrice} ₪</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                          order.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {order.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOrderAction(order.id, 'accepted')}
                            className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleOrderAction(order.id, 'rejected')}
                            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {filteredOrders.map((order) => {
            const user = users.find(u => u.id === order.userId);
            return (
              <div key={order.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium">{user?.name}</h3>
                      <p className="text-sm text-gray-500">{user?.phone}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">#{order.id}</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Items:</span>
                    <span className="font-medium">{order.items}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-medium">{order.totalPrice} ₪</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                        order.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {order.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderAction(order.id, 'accepted')}
                      className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleOrderAction(order.id, 'rejected')}
                      className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
