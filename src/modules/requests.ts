import { Module } from 'vuex';
import { conference } from './requests/conference';
import { friend } from './requests/friend';
import { user } from './requests/user';
export const requests: Module<any, any> = {
  namespaced: true,
  modules: { conference, friend, user },
};
