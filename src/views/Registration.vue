<template>
  <div>
    <MainHeader title="Pendaftaran" />
    <div class="">
      <table
        class="table table-bordered table-condensed"
        style="font-size:0.8rem"
      >
        <thead>
          <tr>
            <th>Tarikh Daftar</th>
            <th>Nama</th>
            <th>Negara</th>
            <th>Passport/SPLP</th>
            <th>Appointment Date</th>
            <th>Payment Status</th>
            <th>Payment Option</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in items" v-bind:key="key">
            <td>{{ item.timestamp }}</td>
            <td class="text-left text-uppercase">
              {{ item.data_pemohon.nama }}
            </td>
            <td>{{ item.data_pemohon.negara_dikeluarkan }}</td>
            <td>{{ item.data_pemohon.nombor }}</td>
            <td>
              <div>
                {{ item.appointment_slot }}
                <i>{{ item.appointment_session }}</i>
              </div>
            </td>
            <td>{{ item.payment_status }}</td>
            <td>{{ item.payment_option }}</td>
            <td>
              <div class="btn btn-sm btn-primary py-0"
              @click="goToTicket(item.register_id, item.temporary_id)">
                <i class="far fa-id-badge"></i>
              </div>
              <div
                @click="goToPemohon(item.register_id, item.temporary_id)"
                class="btn btn-sm btn-primary py-0"
              >
                <i class="far fa-id-badge"></i>
              </div>
            </td>
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
import { API } from "../Config";

export default {
  name: "registration",
  components: {
    MainHeader
  },
  data() {
    return {
      items: ""
    };
  },
  mounted() {
    Axios.get(API.baseurl + "register/semua-pemohon").then(response => {
      let resp = response.data.response;
      this.items = resp;
    });
  },
  methods: {
    goToPemohon: function(register_id, temporary_id) {
      this.$router.push({
        name: "pemohon",
        params: {
          register_id: register_id,
          temporary_id: temporary_id
        }
      });
    },
    goToTicket: function(register_id, temporary_id){
      this.$router.push({
        name: "ticket_pemohon",
        params: {
          register_id: register_id,
          temporary_id: temporary_id
        }
      })
    }
  }
};
</script>
