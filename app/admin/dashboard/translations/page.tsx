'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Translation {
  key: string;
  en: string;
  hi: string;
  [key: string]: string;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', direction: 'ltr' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳', direction: 'ltr' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦', direction: 'rtl' },
];

const DEFAULT_TRANSLATIONS: Translation[] = [
  { key: 'nav.home', en: 'Home', hi: 'होम' },
  { key: 'nav.menu', en: 'Menu', hi: 'मेनू' },
  { key: 'nav.about', en: 'About', hi: 'हमारे बारे में' },
  { key: 'nav.contact', en: 'Contact', hi: 'संपर्क करें' },
  { key: 'hero.title', en: 'From Humble Stall to Culinary Legend', hi: 'छोटे स्टॉल से पाक कला की किंवदंती तक' },
  { key: 'hero.subtitle', en: 'Experience the Magic That Transformed Sherghati\'s Street Food Scene', hi: 'शेरघाटी के स्ट्रीट फूड को बदलने वाले जादू का अनुभव करें' },
  { key: 'cta.order', en: 'Order Now', hi: 'अभी ऑर्डर करें' },
  { key: 'cta.story', en: 'Our Story', hi: 'हमारी कहानी' },
  { key: 'menu.steamed', en: 'Steamed Momos', hi: 'स्टीम्ड मोमोज' },
  { key: 'menu.fried', en: 'Fried Momos', hi: 'फ्राइड मोमोज' },
  { key: 'menu.kurkure', en: 'Kurkure Momos', hi: 'कुरकुरे मोमोज' },
  { key: 'menu.pizza', en: 'Pizza Momos', hi: 'पिज्जा मोमोज' },
];

export default function TranslationsManagementPage() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKey, setNewKey] = useState('');

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      const response = await fetch('/api/cms/translations');
      if (response.ok) {
        const data = await response.json();
        setTranslations(data.translations || DEFAULT_TRANSLATIONS);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      setTranslations(DEFAULT_TRANSLATIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/cms/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ translations }),
      });

      if (response.ok) {
        setSaveMessage('✅ Translations saved successfully!');
      } else {
        setSaveMessage('❌ Failed to save translations');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving translations');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateTranslation = (key: string, lang: string, value: string) => {
    setTranslations(prev =>
      prev.map(t => (t.key === key ? { ...t, [lang]: value } : t))
    );
  };

  const addNewKey = () => {
    if (!newKey.trim()) return;
    
    const newTranslation: Translation = {
      key: newKey,
      en: '',
      hi: '',
    };
    
    LANGUAGES.forEach(lang => {
      if (!newTranslation[lang.code]) {
        newTranslation[lang.code] = '';
      }
    });

    setTranslations([...translations, newTranslation]);
    setNewKey('');
    setShowAddModal(false);
  };

  const deleteKey = (key: string) => {
    if (confirm(`Delete translation key "${key}"?`)) {
      setTranslations(prev => prev.filter(t => t.key !== key));
    }
  };

  const filteredTranslations = translations.filter(t =>
    t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(t).some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🌍</div>
          <p className="text-golden-glow">Loading translations...</p>
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
              Multi-Language Management
            </h1>
            <p className="text-foreground/70">
              Manage translations for all supported languages
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={() => setShowAddModal(true)}>
              ➕ Add Key
            </Button>
            <Button variant="primary" size="lg" onClick={handleSave}>
              💾 Save All
            </Button>
          </div>
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

        {/* Language Selector */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  selectedLang === lang.code
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-deep-space border border-charcoal text-foreground hover:border-golden-glow'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                {lang.name}
                {lang.direction === 'rtl' && <span className="text-xs">(RTL)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
            placeholder="🔍 Search translations..."
          />
        </div>

        {/* Translations Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-charcoal">
                  <th className="text-left py-3 px-4 text-golden-glow font-bold">Key</th>
                  <th className="text-left py-3 px-4 text-golden-glow font-bold">English</th>
                  <th className="text-left py-3 px-4 text-golden-glow font-bold">
                    {LANGUAGES.find(l => l.code === selectedLang)?.name || selectedLang}
                  </th>
                  <th className="text-center py-3 px-4 text-golden-glow font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTranslations.map((translation) => (
                  <tr key={translation.key} className="border-b border-charcoal/50 hover:bg-deep-space/50">
                    <td className="py-3 px-4">
                      <code className="text-xs text-premium-orange bg-pitch-black px-2 py-1 rounded">
                        {translation.key}
                      </code>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={translation.en}
                        onChange={(e) => updateTranslation(translation.key, 'en', e.target.value)}
                        className="w-full px-3 py-2 bg-pitch-black border border-charcoal rounded text-sm text-foreground focus:outline-none focus:border-golden-glow"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={translation[selectedLang] || ''}
                        onChange={(e) => updateTranslation(translation.key, selectedLang, e.target.value)}
                        className="w-full px-3 py-2 bg-pitch-black border border-charcoal rounded text-sm text-foreground focus:outline-none focus:border-golden-glow"
                        dir={LANGUAGES.find(l => l.code === selectedLang)?.direction}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteKey(translation.key)}
                        className="px-3 py-1 bg-warm-orange/20 text-warm-orange rounded text-xs font-bold hover:bg-warm-orange hover:text-white transition-colors"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTranslations.length === 0 && (
              <div className="text-center py-8 text-foreground/60">
                No translations found
              </div>
            )}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-deep-space/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-premium-orange">{translations.length}</div>
              <div className="text-sm text-foreground/70">Total Keys</div>
            </div>
          </Card>
          <Card className="bg-deep-space/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-golden-glow">{LANGUAGES.length}</div>
              <div className="text-sm text-foreground/70">Languages</div>
            </div>
          </Card>
          <Card className="bg-deep-space/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-vegetarian-green">
                {Math.round((translations.filter(t => t[selectedLang]).length / translations.length) * 100)}%
              </div>
              <div className="text-sm text-foreground/70">Completion</div>
            </div>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mt-6 bg-deep-space/50">
          <h3 className="text-lg font-bold text-golden-glow mb-3">
            💡 Translation Tips
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>• Use dot notation for keys (e.g., nav.home, hero.title)</li>
            <li>• Keep translations concise and culturally appropriate</li>
            <li>• Test RTL languages (Arabic) for proper display</li>
            <li>• Add new languages by updating the LANGUAGES array</li>
            <li>• Use the language switcher component in frontend to change languages</li>
          </ul>
        </Card>
      </motion.div>

      {/* Add Key Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-deep-space border border-charcoal rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-golden-glow mb-4">Add Translation Key</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                Key (use dot notation)
              </label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                placeholder="e.g., footer.copyright"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" onClick={addNewKey} className="flex-1">
                Add Key
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
