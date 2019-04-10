<template>
  <div>
    <MainHeader title="Tetapan Sistem" />
    <div class="row text-left">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">Operasi Pendafaran</div>
          <div class="card-body">
            <form>
              <div class="form-group row">
                <label class="col-sm-8 col-form-label"
                  >Jarak temujanji selepas berjaya daftar</label
                >
                <div class="col-sm-4">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control text-center"
                      value="3"
                      autocomplete="off"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">hari</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">Tarikh Temujanji</div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Tarikh</th>
                  <th>Slot Pagi</th>
                  <th>Slot Petang</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";

export default {
  name: "tetapan_sistem",
  components: {
    MainHeader
  }
};
</script>

<style></style>
