type FilterByPayload = { userId?: number; photoId?: number; albumId?: number };

export type Action =
  | { type: 'APPLY_FILTER'; payload: FilterByPayload }
  | { type: 'CLEAR_FILTERS' };

export type State = {
  readonly filterBy: FilterByPayload;
  readonly currView: 'photos' | 'albums';
};

export const feedSettingsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'APPLY_FILTER': {
      return {
        ...state,
        filterBy: {
          ...action.payload,
        },
      };
    }
    case 'CLEAR_FILTERS': {
      return {
        ...state,
        filterBy: {},
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
