import { Module } from 'vuex';
import { conference } from './events/conference';
import { friend } from './events/friend';
import { user } from './events/user';
export const events: Module<any, any> = {
  namespaced: true,
  modules: { conference, friend, user },
};
