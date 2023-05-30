import {
  PreloadedState,
  AnyAction,
  combineReducers,
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { render, RenderOptions } from '@testing-library/react-native';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import auth from 'src/store/reducers/auth';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<any>;
  store?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { auth },
      preloadedState,
    }),

    // Automatically create a store instance if no store was passed in
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function setupApiStore<
  A extends {
    reducer: Reducer<any, any>;
    reducerPath: string;
    middleware: Middleware;
    util: { resetApiState(): any };
  },
  R extends Record<string, Reducer<any, any>> = Record<never, never>
>(api: A, extraReducers?: R): { api: any; store: EnhancedStore } {
  const getStore = (): EnhancedStore =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware
        ),
    });

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A['reducer']>;
    } & {
      [K in keyof R]: ReturnType<R[K]>;
    },
    AnyAction,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
      ? M
      : never
  >;

  const initialStore = getStore() as StoreType;
  const refObj = {
    api,
    store: initialStore,
  };
  const store = getStore() as StoreType;
  refObj.store = store;

  return refObj;
}
