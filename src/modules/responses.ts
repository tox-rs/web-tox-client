import { Module } from 'vuex';
import { conference } from './responses/conference';
import { friend } from './responses/friend';
import { user } from './responses/user';
export const responses: Module<any, any> = {
  namespaced: true,
  modules: { conference, friend, user },
};
