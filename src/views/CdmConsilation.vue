<template>
  <div>
    <MainHeader title="CDM Consilation"/>
    <div class="d-none">
      <FileUpload target="http://localhost/pulkam-api/upload/" action="POST"/>
    </div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>No</th>
          <th>Upload Time</th>
          <th>File Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, key) in files" v-bind:key="key">
          <td>{{ key+1 }}</td>
          <td class="text-left">{{ file.uploadTime }}</td>
          <td class="text-left">{{ file.fileName }}</td>
          <td>
            <div class="btn btn-outline-secondary btn-sm" @click="consolidate(file.fileName)">View</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="alert.info" class="alert alert-info">TRANSACTION FETCH & CHECKING... PLEASE WAIT!</div>
    <div v-if="alert.no_cdm_transaction" class="alert alert-warning">NO CDM CASH DEPOSIT FOUND IN TRANSACTION RECORD</div>

    <table v-if="items.length > 0" class="table table-bordered text-left">
      <thead>
        <tr>
          <th class="text-center">Date/Time</th>
          <th class="text-center">Transaction Detail</th>
          <th class="text-center">Transaction No</th>
          <th class="text-center">Jumlah Deposit</th>
          <th class="text-center" style="width:400px;">Pemohon</th>
          <th class="text-center">Verify</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in items" :key="key">
          <td>{{ item.datetime }}</td>
          <td>{{ item.transaction.type }}</td>
          <td>{{ item.transaction.detail.trans_ref }}</td>
          <td class="text-right">{{ item.moneyIn }}</td>
          <td class="text-uppercase">
            <div>{{ (item.transaction.cdm_data) ? item.transaction.cdm_data.data_pemohon.nama :'' }}</div>
            <div>
              <i class='small-text'>{{ (item.transaction.cdm_data) ? item.transaction.cdm_data.data_pemohon.warganegara :'' }}</i>
            </div>
          </td>
          <td class="text-center">
            <input type="checkbox" v-model="verify[key]">
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="items.length > 0" class="text-right">
      <div class="btn btn-primary" @click="pickedVerify">Verify</div>
    </div>
  </div>
</template>

<style>
.small-text {
  font-size: 0.7rem
}
</style>


<script>
import MainHeader from "@/components/MainHeader";
import FileUpload from "vue-simple-upload/dist/FileUpload";
import Axios from "axios";

import { CimbParser } from "@/packages/CimbParser";

// const sseSource = new EventSource("http://localhost:8888/sse/cdm-stream");

export default {
  name: "cdm_consilation",
  components: {
    MainHeader,
    FileUpload
  },
  data: function() {
    return {
      // ssedata: this.messageData(),
      csvData: [],
      items: [],
      files: [],
      verify: [],
      alert: {
        info: false,
        no_cdm_transaction: false
      }
    };
  },
  mounted: function() {
    this.listFiles();
  },
  methods: {
    pickedVerify: function() {
      console.log(this.verify);
    },
    // messageData: function() {
    //   sseSource.addEventListener("message", e => {
    //     this.ssedata = e.data
    //   });
    // },
    listFiles: function() {
      Axios.get(process.env.VUE_APP_ENGINE_URL + "reader/list-files").then(
        response => {
          let resp = response.data;
          this.files = resp;
        }
      );
    },
    loadCsv: function() {
      Axios.get(
        process.env.VUE_APP_ENGINE_URL + "reader/cdm-consolidation"
      ).then(response => {
        let resp = response.data;
        this.items = CimbParser.parserBulk(resp);
      });
    },
    consolidate: async function(filename) {
      this.alert.info = true
      Axios.get(
        process.env.VUE_APP_ENGINE_URL + "reader/cdm-consolidate/" + filename
      ).then(response => {
        this.alert.info = false
        let resp = response.data;
        this.items = CimbParser.parserBulk(resp);
        if(resp.length > 0){
          this.alert.no_cdm_transaction = false
        } else {
          this.alert.no_cdm_transaction = true
        }
      });
    }
  }
};
</script>
