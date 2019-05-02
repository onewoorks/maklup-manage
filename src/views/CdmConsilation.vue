<template>
  <div>
    <MainHeader title="CDM Consilation" />
    <div class="d-none">
      <FileUpload target="http://localhost/pulkam-api/upload/" action="POST" />
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
          <td class='text-left'>{{ file.uploadTime }}</td>
          <td class='text-left'>{{ file.fileName }}</td>
          <td><div class="btn btn-primary btn-sm" @click="consolidate(file.fileName)">View</div></td>
        </tr>
      </tbody>
    </table>

    <table v-if="items.length > 0" class="table table-bordered text-left">
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Transaction Detail</th>
          <th>Transaction No</th>
          <th>Money In</th>
          <th>Money Out</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in items" :key="key">
          <td>{{ item.datetime }}</td>
          <td>{{ item.transaction.type }}</td>
          <td>{{ item.transaction.transaction_no }}</td>
          <td class='text-right'>{{ item.moneyIn }}</td>
          <td class='text-right'>{{ item.moneyOut }}</td>
          <td class='text-right'>{{ item.balance }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";
import FileUpload from "vue-simple-upload/dist/FileUpload";
import Axios from 'axios'

import { CimbParser } from '@/packages/CimbParser'

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
      files: []
    };
  },
  mounted: function() {
    this.loadCsv()
    this.listFiles()
  },
  methods: {
    // messageData: function() {
    //   sseSource.addEventListener("message", e => {
    //     this.ssedata = e.data
    //   });
    // },
    listFiles: function(){
      Axios.get(process.env.VUE_APP_ENGINE_URL + 'reader/list-files')
      .then(response => {
        let resp = response.data
        this.files = resp
      })
    },
    loadCsv: function(){
      Axios.get(
        process.env.VUE_APP_ENGINE_URL + "reader/cdm-consolidation"
      ).then(
        response => {
          let resp = response.data
          this.items = CimbParser.parserBulk(resp)
        }
      )
    },
    consolidate: async function(filename){
      Axios.get(
        process.env.VUE_APP_ENGINE_URL + "reader/cdm-consolidate/" + filename
      ).then(response => {
        let resp = response.data
        this.items = CimbParser.parserBulk(resp)
      })
    }
  }
};
</script>
