import Vue from "vue";
import { AxiosInstance, AxiosStatic } from "axios";

declare module "vue/types/vue" {
  export interface VueConstructor {
    $axios: AxiosInstance;
  }

  // Properties added to Vue interface are added to Vue instance
  export interface Vue {
    $axios: AxiosInstance;
  }
}
