<template>
  <div>
    <MainHeader title="CDM Consilation"/>

    <div class="card mb-3">
      <div class="card-header text-left">UPLOAD NEW TRANSACTION FILE</div>
      <div class="card-body">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="inputGroupFileAddon01"
              style="font-size:0.9rem"
            >Upload</span>
          </div>
          <div class="custom-file">
            <input
              ref="file"
              type="file"
              class="text-left custom-file-input"
              @change="resetUploadButton"
            >
            <label
              class="text-left custom-file-label"
            >{{ (file == '' ) ? 'Choose File' : file.name }}</label>
          </div>
        </div>
        <div class="text-right mt-3">
          <div
            class="btn"
            :class="alert.upload.buttonColor"
            @click="uploadNewCdm"
          >{{ alert.upload.buttonLabel }}</div>
        </div>
      </div>
    </div>

    <div
      v-if="alert.load_transaction"
      class="alert alert-info"
    >Contacting backend for list of uploaded transactions</div>

    <table v-if="tables.cdmList" class="table table-bordered">
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

    <div
      v-if="alert.no_cdm_transaction"
      class="alert alert-warning"
    >NO CDM CASH DEPOSIT FOUND IN TRANSACTION RECORD</div>

    <div v-if="tables.verify">
      <table v-if="items.length > 0" class="table table-bordered text-left">
        <thead>
          <tr>
            <th class="text-center">Date/Time</th>
            <th class="text-center">Transaction Detail</th>
            <th class="text-center">Transaction No</th>
            <th class="text-center">Jumlah Deposit</th>
            <th class="text-center" style="width:400px;">Pemohon</th>
            <th class="text-center">
              Verify
              <input type="checkbox" @click="selectAll($event)">
            </th>
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
                <i
                  class="small-text"
                >{{ (item.transaction.cdm_data) ? item.transaction.cdm_data.data_pemohon.warganegara :'' }}</i>
              </div>
            </td>
            <td class="text-center">
              <div v-if="item.transaction.cdm_data.status === 'semakan'">
                {{ item.transaction.cdm_data.status }}
                <input
                  type="checkbox"
                  v-model="verify[key]"
                  :value="item"
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="items.length > 0" class="text-right">
        <div class="btn btn-outline-primary mr-1" @click="backToTransactionList">Back to cdm list</div>
        <div class="btn btn-primary" @click="pickedVerify">Verify</div>
      </div>
    </div>
  </div>
</template>

<style>
.small-text {
  font-size: 0.7rem;
}
</style>


<script>
import MainHeader from "@/components/MainHeader";
import Axios from "axios";
import Swal from "sweetalert2";

import { CimbParser } from "@/packages/CimbParser";
import { version } from "punycode";

export default {
  name: "cdm_consilation",
  components: {
    MainHeader
  },
  data: function() {
    return {
      // ssedata: this.messageData(),
      csvData: [],
      items: [],
      files: [],
      verify: [],
      pickitem: [],
      file: "",
      alert: {
        info: false,
        no_cdm_transaction: false,
        upload: {
          buttonColor: "btn-primary",
          buttonLabel: "UPLOAD"
        },
        load_transaction: true
      },
      tables: {
        verify: false,
        cdmList: true
      }
    };
  },
  mounted: function() {
    this.listFiles();
  },
  computed: {
    verifyAll: function() {}
  },
  methods: {
    backToTransactionList: function() {
      this.verify = [];
      this.tables.verify = false;
      this.tables.cdmList = true;
    },
    selectAll: function(event) {
      this.verify = [];
      let checked = event.target.checked;
      if (checked) {
        this.items.forEach((value, key) => {
          this.verify.push(true);
        });
      }
    },
    pickedVerify: async function() {
      this.pickitem = [];
      let totalTrue = 0;
      let listPicked = this.verify;
      this.verify.forEach((value, key) => {
        if (value == true) {
          if (this.items[key].transaction.cdm_data.status === "semakan") {
            this.pickitem.push(this.items[key]);
            totalTrue++
          }
        }
      });
      Swal.fire({
        title: "Are you sure!",
        text: `Are you sure to verify ${totalTrue} pulkam registration?`,
        type: "question",
        confirmButtonText: "Yes Verified",
        showCancelButton: true,
        cancelButtonText: "No..."
      }).then(result => {
        if (result.dismiss == "cancel") {
          this.pickitem = [];
          Swal.fire({
            title: "Ok, order received!!",
            type: "info",
            text: "Please make your decision again."
          });
        }
        if (result.value) {
          this.approveTransaction();
          Swal.fire({
            title: "Verified!!!",
            text: "Item picked is successfully verified",
            type: "success"
          });
        }
      });
    },
    approveTransaction: function() {
      let approveList = [];
      this.pickitem.forEach(value => {
        if (value) approveList.push(value.transaction);
      });
      Axios.post(
        `${process.env.VUE_APP_BASE_API}cdm/approve-list`,
        approveList
      ).then(response => {
        let resp = response.data.response;
      });
    },
    listFiles: function() {
      Axios.get(process.env.VUE_APP_ENGINE_URL + "reader/list-files").then(
        response => {
          let resp = response.data;
          this.files = resp;
          this.alert.load_transaction = false;
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
      this.alert.info = true;
      Axios.get(
        process.env.VUE_APP_ENGINE_URL + "reader/cdm-consolidate/" + filename
      ).then(response => {
        this.alert.info = false;
        let resp = response.data;
        this.items = CimbParser.parserBulk(resp);
        if (resp.length > 0) {
          this.alert.no_cdm_transaction = false;
          this.tables.verify = true;
          this.tables.cdmList = false;
        } else {
          this.alert.no_cdm_transaction = true;
        }
      });
    },
    resetUploadButton: function() {
      this.alert.upload.buttonLabel = "UPLOAD";
      this.alert.upload.buttonColor = "btn-primary";
      this.file = this.$refs.file.files[0];
    },
    uploadNewCdm: function() {
      this.alert.upload.buttonLabel = "Uploading to server..., Please wait";
      this.alert.upload.buttonColor = "btn-secondary";
      let formData = new FormData();
      formData.append("book", this.$refs.file.files[0]);
      Axios.post(`${process.env.VUE_APP_ENGINE_URL}upload/cdm`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(() => {
          this.alert.upload.buttonLabel = "Upload Success";
          this.alert.upload.buttonColor = "btn-success";
          this.listFiles();
        })
        .catch(() => {
          this.alert.upload.buttonLabel = "Upload Failed!!";
          this.alert.upload.buttonColor = "btn-danger";
        });
    }
  }
};
</script>
