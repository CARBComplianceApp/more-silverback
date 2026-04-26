import { useState, useEffect } from 'react';

export type FeatureFlags = {
  enable_silverback: boolean;
  enable_showcase: boolean;
  enable_rentdmc: boolean;
  enable_toolkit: boolean;
  enable_admin: boolean;
  enable_gilly_security: boolean;
  enable_pc_investments: boolean;
  enable_ai_lab: boolean;
  enable_hot_button: boolean;
};

const defaultFlags: FeatureFlags = {
  enable_silverback: true,
  enable_showcase: true,
  enable_rentdmc: true,
  enable_toolkit: true,
  enable_admin: true,
  enable_gilly_security: true,
  enable_pc_investments: true,
  enable_ai_lab: true,
  enable_hot_button: true,
};

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);

  useEffect(() => {
    // 1. Start with defaults
    const newFlags = { ...defaultFlags };

    // 2. Override with LocalStorage (for persistent testing)
    const stored = localStorage.getItem('silverback_ff');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        Object.assign(newFlags, parsed);
      } catch (e) {
        console.warn('Failed to parse feature flags from local storage');
      }
    }

    // 3. Override with URLSearchParams (for A/B testing & dynamic injection)
    // Example: ?ff_enable_showcase=false&ff_enable_rentdmc=true
    const params = new URLSearchParams(window.location.search);
    let hasUrlOverrides = false;

    Object.keys(defaultFlags).forEach(key => {
      const urlValue = params.get(`ff_${key}`);
      if (urlValue !== null) {
        newFlags[key as keyof FeatureFlags] = urlValue === 'true' || urlValue === '1';
        hasUrlOverrides = true;
      }
    });

    // Save back to local storage if there were URL overrides to persist them
    if (hasUrlOverrides) {
      localStorage.setItem('silverback_ff', JSON.stringify(newFlags));
    }

    setFlags(newFlags);
  }, []);

  const setFlag = (key: keyof FeatureFlags, value: boolean) => {
    setFlags(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem('silverback_ff', JSON.stringify(next));
      return next;
    });
  };

  return { flags, setFlag };
}
