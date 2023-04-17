import { useContext, useMemo } from 'react';
import { FeedSettingsContext } from 'src/components/feed/context/FeedSettingsContext';

export const useFeedSettings = () => {
  const context = useContext(FeedSettingsContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return useMemo(() => context, [context]);
};
