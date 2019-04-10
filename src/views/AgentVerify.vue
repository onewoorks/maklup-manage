<template>
  <div>
    <MainHeader title="Agent Verify" />
    <div>
      <table class="table table-bordered" style="font-size:0.8rem">
        <thead>
          <tr>
            <th>Tarikh Dan Masa</th>
            <th>Pemohon</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in items" :key="key">
            <td scope="row">{{ item.tarikh_verify }}</td>
            <td class="text-uppercase text-left">
              {{ item.data_pemohon.nama }},
              <span class="text-lowercase">{{ item.data_pemohon.email }}</span>
            </td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
tr td {
  padding: 2px !important;
  margin: 2px !important;
}
</style>

<script>
import MainHeader from "@/components/MainHeader";
import Axios from "axios";
import { API } from "@/Config";

export default {
  name: "agent_verify",
  components: {
    MainHeader
  },
  data: function() {
    return {
      items: ""
    };
  },
  mounted: function() {
    Axios.get(API.baseurl + "verify/data-verify").then(response => {
      let resp = response.data.response;
      this.items = resp;
    });
  }
};
</script>
