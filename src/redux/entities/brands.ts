import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';
import { ofType, switchMap, of } from '../operators';
import { entitiesMeta, entities, metaReducer as metas } from '../state';
import Actions from '../actions';

import namespaces from '../namespaces';

export const action = new Actions(namespaces.BRANDS);

export const selector = createSelector(entities, (state) => state.brands);
export const metaSelector = createSelector(entitiesMeta, (state) => state.brands);

const brands = [
  {
    id: 1,
    email: 'acme@gmail.com',
    password: 'password1@',
    brandName: 'acme',
    brandMaxLoyaltyPoint: 1000,
    brandLogo: '',
    brandSymbol: '',
    followers: [
      {
        customerId: 1,
        loyaltyPoint: 0,
      },
      {
        customerId: 2,
        loyaltyPoint: 0,
      },
    ],
  },
  {
    id: 2,
    email: 'regent@gmail.com',
    password: 'password2@',
    brandName: 'regent',
    brandMaxLoyaltyPoint: 1000,
    followers: [
      {
        customerId: 3,
        loyaltyPoint: 0,
      },
      {
        customerId: 2,
        loyaltyPoint: 0,
      },
    ],
  },
  {
    id: 3,
    email: 'lexcorp@gmail.com',
    password: 'password3@',
    brandName: 'lexcorp',
    brandMaxLoyaltyPoint: 2000,
    followers: [
      {
        customerId: 3,
        loyaltyPoint: 0,
      },
      {
        customerId: 1,
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
    [action.update.success]: (state, action$) =>
      produce(state, (draft) => {
        draft = action$.payload;
        return draft;
      }),
  },
  brands,
);

export const metaReducer = metas(action);

// gets vendor available stores
function createEpic(action$, store$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const brands = selector(store$.value);
      const data = brands.map((item) => item);

      data.push({ ...payload, id: data.length + 1 });

      return of(action.createAction(data).success);
    }),
  );
}

// gets vendor available stores
function upateEpic(action$, store$) {
  return action$.pipe(
    ofType(action.update.loading),
    switchMap(({ payload }) => {
      const brands = selector(store$.value);
      const data = brands.map((item) => {
        if (item.id == payload.id) {
          item.brandMaxLoyaltyPoint = item.brandMaxLoyaltyPoint - payload.points;
          return item;
        }
      });

      return of(action.updateAction(data).success);
    }),
  );
}

export const epic = combineEpics(createEpic, upateEpic);
