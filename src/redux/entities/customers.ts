import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';
import { ofType, switchMap, of } from '../operators';
import { entitiesMeta, entities, metaReducer as metas } from '../state';
import Actions from '../actions';

import namespaces from '../namespaces';

export const action = new Actions(namespaces.CUSTOMERS);

export const selector = createSelector(entities, (state) => state.customers);
export const metaSelector = createSelector(entitiesMeta, (state) => state.customers);

const customers = [
  {
    id: 1,
    email: 'ted.mosby@gmail.com',
    password: 'customer1@',
    firstName: 'Ted',
    lastName: 'Mosby',
    following: [
      {
        brandId: 1,
        loyaltyPoint: 0,
      },
      {
        brandId: 3,
        loyaltyPoint: 0,
      },
    ],
  },
  {
    id: 2,
    email: 'simon.fisher@gmail.com',
    password: 'customer1@',
    firstName: 'Simon',
    lastName: 'Fisher',
    following: [
      {
        brandId: 2,
        loyaltyPoint: 0,
      },
      {
        brandId: 3,
        loyaltyPoint: 0,
      },
    ],
  },
  {
    id: 3,
    email: 'jane.ann@gmail.com',
    password: 'customer3@',
    firstName: 'Jane',
    lastName: 'Ann',
    following: [
      {
        brandId: 1,
        loyaltyPoint: 0,
      },
      {
        brandId: 2,
        loyaltyPoint: 0,
      },
    ],
  },
];
export const reducer = handleActions(
  {
    [action.create.success]: (state, action$) =>
      produce(state, (draft) => {
        draft = action$.payload;
        return draft;
      }),
  },
  customers,
);

export const metaReducer = metas(action);

function createEpic(action$, store$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const customers = selector(store$.value);
      const data = customers.map((item) => item);
      data.push({ ...payload, id: data.length + 1 });

      return of(action.createAction(data).success);
    }),
  );
}

export const epic = combineEpics(createEpic);
