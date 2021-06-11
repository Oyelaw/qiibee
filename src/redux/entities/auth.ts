import { handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { produce } from "immer";
import { combineEpics } from "redux-observable";
import { ofType, switchMap, of } from "../operators";
import { entitiesMeta, entities, metaReducer as metas } from "../state";
import Actions from "../actions";
import { selector as brandsSelector, action as brands } from "./brands";
import {
  selector as customersSelector,
  action as customers,
} from "./customers";
import { windowExists } from "../globals";

import namespaces from "../namespaces";

export const action = new Actions(namespaces.AUTH);

export const selector = createSelector(entities, (state) => state.auth);
export const metaSelector = createSelector(entitiesMeta, (state) => state.auth);

export const reducer = handleActions(
  {
    [action.create.success]: (state, action$) =>
      produce(state, (draft) => {
        draft = action$.payload;
        return draft;
      }),

    [action.read.success]: (state, action$) =>
      produce(state, (draft) => {
        draft = action$.payload;
        return draft;
      }),
  },
  {}
);

export const metaReducer = metas(action);

function createEpic(action$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      if (payload.type == "brand") {
        return of(
          brands.createAction(payload).loading,
          action.createAction(payload).success
        );
      }

      if (payload.type == "customer") {
        return of(
          customers.createAction(payload).loading,
          action.createAction(payload).success
        );
      }

      return of(
        action.createAction({ message: "Invalid user type provided" }).error
      );
    })
  );
}

function readEpic(action$, store$) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const brands = brandsSelector(store$.value);
      const customers = customersSelector(store$.value);

      if (payload.type == "brand") {
        const brand = brands.find(
          (brand) =>
            brand.email == payload.email && brand.password == payload.password
        );

        if (brand) {
          windowExists.localStorage.setItem(
            "loggedInUser",
            JSON.stringify(brand)
          );
          windowExists.localStorage.setItem("loggedInUserType", "brand");
          return of(action.readAction(payload).success);
        } else {
          return of(
            action.readAction({ message: "Brand does not exist" }).error
          );
        }
      }

      if (payload.type == "customer") {
        const customer = customers.find(
          (customer) =>
            customer.email == payload.email &&
            customer.password == payload.password
        );

        if (customer) {
          windowExists.localStorage.setItem(
            "loggedInUser",
            JSON.stringify(customer)
          );
          windowExists.localStorage.setItem("loggedInUserType", "customer");
          return of(action.readAction(payload).success);
        } else {
          return of(
            action.readAction({ message: "Customer does not exist" }).error
          );
        }
      }

      return of(
        action.readAction({ message: "Invalid user type provided" }).error
      );
    })
  );
}

export const epic = combineEpics(createEpic, readEpic);
