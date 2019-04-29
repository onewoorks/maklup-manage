<template>
  <div>
    <MainHeader title="CDM Consilation"/>cdm consilation
    <div>
      <FileUpload target="http://localhost/pulkam-api/upload/" action="POST"/>
    </div>
    <div>{{ ssedata }}</div>

    <table class='table table-bordered text-left'>
        <thead>
            <tr>
                <th>No </th>
                <th>Tarikh Upload</th>
                <th>Status Screening</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>a</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";
import FileUpload from "vue-simple-upload/dist/FileUpload";

const sseSource = new EventSource("http://localhost:3000/sse/cdm-stream");

export default {
  name: "cdm_consilation",
  components: {
    MainHeader,
    FileUpload
  },
  data: function() {
    return {
      ssedata: this.messageData()
    };
  },
  methods: {
    messageData: function() {
      sseSource.addEventListener("message", e => {
        this.ssedata = e.data
      });
    }
  }
};
</script>
