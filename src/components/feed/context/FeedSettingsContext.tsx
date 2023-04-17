import { createContext, useReducer, useMemo } from 'react';
import {
  Action,
  State,
  feedSettingsReducer,
} from 'src/components/feed/context/feedSettingsReducer';

type Dispatch = (action: Action) => void;
type FeedSettingsProviderProps = { readonly children: React.ReactNode };

export const FeedSettingsContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const initialState: State = { filterBy: {}, currView: 'photos' };

export const FeedSettingsProvider = ({
  children,
}: FeedSettingsProviderProps) => {
  const [state, dispatch] = useReducer(feedSettingsReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <FeedSettingsContext.Provider value={value}>
      {children}
    </FeedSettingsContext.Provider>
  );
};
