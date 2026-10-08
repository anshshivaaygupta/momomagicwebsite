'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface APIConfig {
  service: string;
  apiKey: string;
  isEnabled: boolean;
  config: Record<string, any>;
}

const API_SERVICES = [
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    icon: '📊',
    description: 'Track website traffic and user behavior',
    fields: [
      { key: 'measurementId', label: 'Measurement ID', placeholder: 'G-XXXXXXXXXX' },
    ],
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    icon: '🗺️',
    description: 'Display location and directions',
    fields: [
      { key: 'apiKey', label: 'API Key', placeholder: 'AIzaSy...' },
      { key: 'placeId', label: 'Place ID', placeholder: 'ChIJ...' },
    ],
  },
  {
    id: 'google-reviews',
    name: 'Google Reviews',
    icon: '⭐',
    description: 'Fetch and display Google Business reviews',
    fields: [
      { key: 'apiKey', label: 'API Key', placeholder: 'AIzaSy...' },
      { key: 'placeId', label: 'Place ID', placeholder: 'ChIJ...' },
    ],
  },
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business',
    icon: '💬',
    description: 'Enable WhatsApp ordering and support',
    fields: [
      { key: 'phoneNumber', label: 'Phone Number', placeholder: '+919955955191' },
      { key: 'defaultMessage', label: 'Default Message', placeholder: 'Hello! I want to order...' },
    ],
  },
];

export default function APIIntegrationsPage() {
  const [apiConfigs, setApiConfigs] = useState<APIConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [testResults, setTestResults] = useState<Record<string, string>>({});

  useEffect(() => {
    loadAPIConfigs();
  }, []);

  const loadAPIConfigs = async () => {
    try {
      const response = await fetch('/api/cms/api-integrations');
      if (response.ok) {
        const data = await response.json();
        setApiConfigs(data.configs || []);
      }
    } catch (error) {
      console.error('Error loading API configs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/cms/api-integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configs: apiConfigs }),
      });

      if (response.ok) {
        setSaveMessage('✅ API configurations saved successfully!');
      } else {
        setSaveMessage('❌ Failed to save API configurations');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving API configurations');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const getConfig = (serviceId: string): APIConfig => {
    return apiConfigs.find(c => c.service === serviceId) || {
      service: serviceId,
      apiKey: '',
      isEnabled: false,
      config: {},
    };
  };

  const updateConfig = (serviceId: string, updates: Partial<APIConfig>) => {
    setApiConfigs(prev => {
      const existing = prev.findIndex(c => c.service === serviceId);
      const updated = { ...getConfig(serviceId), ...updates };
      
      if (existing >= 0) {
        const newConfigs = [...prev];
        newConfigs[existing] = updated;
        return newConfigs;
      }
      return [...prev, updated];
    });
  };

  const testConnection = async (serviceId:string) => {setTestResults({...testResults,[serviceId]:'Provider is not connected. Saved keys do not verify a live integration.'});};
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔌</div>
          <p className="text-golden-glow">Loading API integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              API Integrations
            </h1>
            <p className="text-foreground/70">
              Manage third-party API connections and configurations
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={handleSave}>
            💾 Save All Changes
          </Button>
        </div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-deep-space border border-charcoal rounded-lg text-center"
          >
            {saveMessage}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {API_SERVICES.map((service) => {
            const config = getConfig(service.id);
            
            return (
              <Card key={service.id}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-golden-glow mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-foreground/70">{service.description}</p>
                  </div>
                  <button
                    onClick={() => updateConfig(service.id, { isEnabled: !config.isEnabled })}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      config.isEnabled
                        ? 'bg-vegetarian-green/20 text-vegetarian-green'
                        : 'bg-warm-orange/20 text-warm-orange'
                    }`}
                  >
                    {config.isEnabled ? '✓ Enabled' : '✕ Disabled'}
                  </button>
                </div>

                <div className="space-y-3">
                  {service.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-foreground/80 mb-2">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={config.config[field.key] || ''}
                        onChange={(e) => updateConfig(service.id, {
                          config: { ...config.config, [field.key]: e.target.value }
                        })}
                        className="w-full px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground text-sm focus:outline-none focus:border-golden-glow"
                        placeholder={field.placeholder}
                        disabled={!config.isEnabled}
                      />
                    </div>
                  ))}

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => testConnection(service.id)}
                      disabled={!config.isEnabled}
                      className="flex-1"
                    >
                      🧪 Test Connection
                    </Button>
                  </div>

                  {testResults[service.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-center py-2 px-3 bg-deep-space border border-charcoal rounded"
                    >
                      {testResults[service.id]}
                    </motion.div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Integration Status */}
        <Card className="mt-6">
          <h3 className="text-xl font-bold text-golden-glow mb-4">
            Integration Status
          </h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-deep-space rounded-lg">
              <div className="text-3xl font-bold text-premium-orange">
                {apiConfigs.filter(c => c.isEnabled).length}
              </div>
              <div className="text-sm text-foreground/70">Active</div>
            </div>
            <div className="text-center p-4 bg-deep-space rounded-lg">
              <div className="text-3xl font-bold text-golden-glow">
                {API_SERVICES.length}
              </div>
              <div className="text-sm text-foreground/70">Total Services</div>
            </div>
            <div className="text-center p-4 bg-deep-space rounded-lg">
              <div className="text-3xl font-bold text-vegetarian-green">
                {apiConfigs.filter(c => c.isEnabled && c.config && Object.keys(c.config).length > 0).length}
              </div>
              <div className="text-sm text-foreground/70">Configured</div>
            </div>
            <div className="text-center p-4 bg-deep-space rounded-lg">
              <div className="text-3xl font-bold text-warm-orange">
                {Math.round((apiConfigs.filter(c => c.isEnabled).length / API_SERVICES.length) * 100)}%
              </div>
              <div className="text-sm text-foreground/70">Coverage</div>
            </div>
          </div>
        </Card>

        {/* Tips */}
        <Card className="mt-6 bg-deep-space/50">
          <h3 className="text-lg font-bold text-golden-glow mb-3">
            💡 Integration Tips
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>• <strong>Google Analytics:</strong> Get Measurement ID from Google Analytics 4 property settings</li>
            <li>• <strong>Google Maps:</strong> Enable Maps JavaScript API and Places API in Google Cloud Console</li>
            <li>• <strong>Google Reviews:</strong> Use same API key as Maps, get Place ID from Google My Business</li>
            <li>• <strong>WhatsApp Business:</strong> Use international format (+91...) for phone number</li>
            <li>• Keep API keys secure - never share them publicly</li>
            <li>• Test connections after configuration to ensure they work</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}

