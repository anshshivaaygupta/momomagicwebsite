'use client';

import React, { useState, useEffect } from 'react';
import { ContentAnalytics } from '@/components/cms/ContentAnalytics';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';
import { PublishControls } from '@/components/cms/PublishControls';

export default function FranchiseCMSPage() {
  const [activeTab, setActiveTab] = useState('settings');
  const [franchiseData, setFranchiseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchFranchiseData();
  }, []);

  const fetchFranchiseData = async () => {
    try {
      const response = await fetch('/api/cms/franchise');
      const data = await response.json();
      setFranchiseData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching franchise data:', error);
      setLoading(false);
    }
  };

  const handleSaveSettings = async (settings: any) => {
    try {
      const response = await fetch('/api/cms/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'settings', data: settings }),
      });
      const result = await response.json();
      if (result.success) {
        setSaveMessage('✅ Settings saved successfully!');
        fetchFranchiseData();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveMessage('❌ Failed to save settings');
    }
  };

  const handleUpdateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const application = franchiseData.applications.find((app: any) => app.id === applicationId);
      const response = await fetch('/api/cms/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'application',
          data: { ...application, status: newStatus },
        }),
      });
      const result = await response.json();
      if (result.success) {
        fetchFranchiseData();
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const saveFranchiseData = async () => {
    await fetchFranchiseData();
  };

  if (loading) {
  return (
      <div className="p-8">
        <div className="text-center">Loading franchise data...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PublishControls
        pageName="franchise"
        onSave={saveFranchiseData}
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Franchise Management</h1>
        <p className="text-gray-600">Manage franchise settings, applications, and locations</p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {saveMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'settings'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Settings
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'applications'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Applications ({franchiseData?.applications?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('locations')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'locations'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Locations
        </button>
      </div>

      {/* Settings Tab */}
      {activeTab === 'settings' && franchiseData?.settings && (
        <div className="space-y-8">
          {/* Investment Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Investment Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Franchise Fee
                </label>
                <input
                  type="number"
                  value={franchiseData.settings.investment.franchiseFee}
                  onChange={(e) => {
                    const newSettings = {
                      ...franchiseData.settings,
                      investment: {
                        ...franchiseData.settings.investment,
                        franchiseFee: Number(e.target.value),
                      },
                    };
                    setFranchiseData({ ...franchiseData, settings: newSettings });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Inventory
                </label>
                <input
                  type="number"
                  value={franchiseData.settings.investment.initialInventory}
                  onChange={(e) => {
                    const newSettings = {
                      ...franchiseData.settings,
                      investment: {
                        ...franchiseData.settings.investment,
                        initialInventory: Number(e.target.value),
                      },
                    };
                    setFranchiseData({ ...franchiseData, settings: newSettings });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kitchen Setup Min
                </label>
                <input
                  type="number"
                  value={franchiseData.settings.investment.kitchenSetupMin}
                  onChange={(e) => {
                    const newSettings = {
                      ...franchiseData.settings,
                      investment: {
                        ...franchiseData.settings.investment,
                        kitchenSetupMin: Number(e.target.value),
                      },
                    };
                    setFranchiseData({ ...franchiseData, settings: newSettings });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kitchen Setup Max
                </label>
                <input
                  type="number"
                  value={franchiseData.settings.investment.kitchenSetupMax}
                  onChange={(e) => {
                    const newSettings = {
                      ...franchiseData.settings,
                      investment: {
                        ...franchiseData.settings.investment,
                        kitchenSetupMax: Number(e.target.value),
                      },
                    };
                    setFranchiseData({ ...franchiseData, settings: newSettings });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <button
              onClick={() => handleSaveSettings(franchiseData.settings)}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Investment Settings
            </button>
          </div>

          {/* Royalty Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Royalty Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Royalty Percentage
                </label>
                <input
                  type="number"
                  value={franchiseData.settings.royalty.percentage}
                  onChange={(e) => {
                    const newSettings = {
                      ...franchiseData.settings,
                      royalty: {
                        ...franchiseData.settings.royalty,
                        percentage: Number(e.target.value),
                      },
                    };
                    setFranchiseData({ ...franchiseData, settings: newSettings });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Type
                </label>
                <select
                  value={franchiseData.settings.royalty.calculationType}
                  onChange={(e) => {
                    const newSettings = {
                      ...franchiseData.settings,
                      royalty: {
                        ...franchiseData.settings.royalty,
                        calculationType: e.target.value,
                      },
                    };
                    setFranchiseData({ ...franchiseData, settings: newSettings });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => handleSaveSettings(franchiseData.settings)}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Royalty Settings
            </button>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-lg shadow">
          {franchiseData?.applications?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No applications yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {franchiseData?.applications?.map((application: any) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{application.applicantName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{application.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{application.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {application.preferredLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={application.status}
                          onChange={(e) =>
                            handleUpdateApplicationStatus(application.id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="meeting-scheduled">Meeting Scheduled</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Locations Tab */}
      {activeTab === 'locations' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Franchise Locations</h2>
          <p className="text-gray-600">Location management coming soon...</p>
        </div>
      )}

      {/* Content Analytics */}
      <div className="mt-8">
        <ContentAnalytics
          contentId="franchise-page"
          contentType="page"
          analytics={{
            views: 5400,
            engagement: 68,
            conversions: 145,
            lastUpdated: new Date().toISOString(),
            performance: {
              loadTime: 1.1,
              seoScore: 84,
            },
          }}
        />
      </div>

      {/* Visual Design Controls */}
      <VisualDesignPanel pageName="franchise" onSave={() => fetchFranchiseData()} />
    </div>
  );
}
