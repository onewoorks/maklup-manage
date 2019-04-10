<template>
  <div>
    <MainHeader title="Kutipan" />
    <div class="row">
      <div class="col-sm-4">
        <div class="card border-primary">
          <div class="card-header billplz text-white">BillPlz</div>
          <div class="card-body">RM {{ bayar.billplz }}</div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-header">Bank Transfer</div>
          <div class="card-body">RM {{ bayar.cdm }}</div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card">
          <div class="card-header">Jumlah Kutipan</div>
          <div class="card-body">RM {{ bayar.semua }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.billplz {
  background-color: #037aff;
}
</style>

<script>
import MainHeader from "@/components/MainHeader";
import { API } from "@/Config";
import Axios from "axios";

export default {
  name: "kutipan",
  components: {
    MainHeader
  },
  data: function() {
    return {
      bayar: {
        billplz: "",
        cdm: "",
        semua: ""
      }
    };
  },
  mounted: function() {
    Axios.get(API.baseurl + "koleksi/dashboard").then(response => {
      let resp = response.data.response;
      console.log(resp);
      this.bayar = {
        billplz: resp.total_bayar.billplz,
        cdm: resp.total_bayar.cdm,
        semua: resp.total_bayar.semua
      };
      // this.bayar.billplz = resp.total_bayar.billplz
      // this.bayar.cdm = resp.cdm
    });
  }
};
</script>
