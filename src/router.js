import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Registration from "./views/Registration";
import Pemohon from "./views/Pemohon";
import Kutipan from "@/views/Kutipan";
import TetapanSistem from "@/views/TetapanSistem";
import AgentVerify from "@/views/AgentVerify";
import CdmConsilation from "@/views/CdmConsilation";
import TicketPemohon from "@/views/TicketPemohon";
import Login from '@/views/Login'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/pemohon/:register_id/:temporary_id",
      name: "pemohon",
      component: Pemohon
    },
    {
      path: "/kutipan",
      name: "kutipan",
      component: Kutipan
    },
    {
      path: "/tetapan_sistem",
      name: "tetapan_sistem",
      component: TetapanSistem
    },
    {
      path: "/agent_verify",
      name: "agent_verify",
      component: AgentVerify
    },
    {
      path: "/cdm-consilation",
      name: "cdm_consilation",
      component: CdmConsilation
    },
    {
      path: "/ticket-pemohon/:register_id/:temporary_id",
      name: "ticket_pemohon",
      component: TicketPemohon
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
