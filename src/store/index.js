import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './slices/authSlice';
import registerReducer from './slices/registerUserSlice';
import redditFeedReducer from "./slices/redditFeedSlice";
import postActionReducer from "./slices/postActionSlice";
import adminReducer from "./slices/adminSlice";
import userProfileReducer from './slices/userProfileSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    redditFeed: redditFeedReducer,
    postAction : postActionReducer,
    admin:adminReducer,
    userProfile: userProfileReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','redditFeed'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


