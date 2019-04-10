<template>
  <div>
    <MainHeader title="Maklumat Pemohon" />
    <div class="row mb-3">
      <div class="col-12 text-center">
        <div class="card " :class="payment.status">
          <div class="card-body text-white py-2">
            <strong>{{ payment.label }}</strong>
          </div>
        </div>
      </div>
    </div>
    <form id="borang_daftar" @submit.prevent="getFormValues">
      <div class="card mb-2">
        <div class="card-header text-left text-uppercase">
          MAKLUMAT PERIBADI
        </div>
        <div class="card-body">
          <div class="row text-left">
            <div class="col-sm-12">
              <div class="form-group">
                <label for>
                  Nama
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="nama"
                  v-model="info.nama"
                  class="form-control form-control-sm text-uppercase"
                  required
                  autocomplete="off"
                />
              </div>
            </div>

            <div class="col-sm-12 mb-3">
              <div class="form-groups">
                <div class>
                  <label>
                    Jantina
                    <i class="fas fa-pencil-paintbrush"></i>
                  </label>
                </div>
                <div class>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        name="jantina"
                        class="form-check-input"
                        v-model="info.jantina"
                        value="LELAKI"
                      />Lelaki
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        name="jantina"
                        class="form-check-input"
                        v-model="info.jantina"
                        value="PEREMPUAN"
                      />Perempuan
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label for>
                  Tempat Negara Lahir
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>

                <select
                  v-model="info.tempat_lahir"
                  class="form-control form-control-sm text-uppercase"
                >
                  <option
                    v-for="(option, key) in options.negara"
                    v-bind:key="key"
                    v-bind:value="option.value"
                    >{{ option.text }}</option
                  >
                </select>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label for>
                  Tarikh Lahir
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <datepicker
                  bootstrap-styling
                  class="input-group-sm"
                  name="tarikh_lahir"
                  v-model="info.tarikh_lahir"
                  calendar-button
                  calendar-button-icon="far fa-calendar-alt"
                ></datepicker>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label for>
                  Warganegara
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <select
                  v-model="info.warganegara"
                  class="form-control form-control-sm text-uppercase"
                >
                  <option
                    v-for="(option, key) in options.negara"
                    v-bind:key="key"
                    v-bind:value="option.value"
                    >{{ option.text }}</option
                  >
                </select>
              </div>
            </div>

            <div class="col-sm-6 text-left">
              <div class="form-group">
                <label>
                  Pekerjaan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="pekerjaan"
                  v-model="info.pekerjaan"
                  class="form-control form-control-sm text-uppercase"
                  aria-describedby="helpId"
                />
              </div>
            </div>

            <div class="col-sm-12 text-left">
              <div class="form-group mb-1">
                <label for>
                  Alamat
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="alamat_1"
                  v-model="info.alamat_1"
                  id
                  class="form-control form-control-sm text-uppercase"
                />
              </div>
            </div>

            <div class="col-sm-12 text-left">
              <div class="form-group mb-1">
                <input
                  type="text"
                  name="alamat_2"
                  v-model="info.alamat_2"
                  id
                  class="form-control form-control-sm text-uppercase"
                />
              </div>
            </div>
            <div class="col-sm-12 text-left">
              <div class="form-group">
                <input
                  type="text"
                  name="alamat_3"
                  v-model="info.alamat_3"
                  class="form-control form-control-sm text-uppercase"
                />
              </div>
            </div>

            <div class="col-sm-12 mb-4">
              <div class="form-groups">
                <div>
                  <label for>
                    Taraf Pekahwinan
                    <i class="fas fa-pencil-paintbrush"></i>
                  </label>
                </div>
                <div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="taraf_perkahwinan"
                        v-model="info.taraf_perkahwinan"
                        value="BELUM BERKAHWIN"
                      />Belum Berkahwin
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="taraf_perkahwinan"
                        v-model="info.taraf_perkahwinan"
                        value="BERKAHWIN"
                      />Berkahwin
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-6">
              <div class="form-group">
                <label for>
                  Email
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  v-model="info.email"
                  class="form-control form-control-sm"
                  required
                />
              </div>
            </div>

            <div class="col-sm-12 col-md-6">
              <div class="form-group">
                <label for>
                  No Telefon
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="no_telefon"
                  v-model="info.no_telefon"
                  class="form-control form-control-sm text-uppercase"
                  autocomplete="off"
                  required
                  @keypress="onlyNumber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-2">
        <div class="card-header text-left">
          <div>Maklumat Pasport perjalanan / dokumen perjalanan</div>
          <div>
            <i>particulars of passport / travel document</i>
          </div>
        </div>

        <div class="card-body">
          <div class="row text-left">
            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Jenis Dokumen Perjalanan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <select
                  v-model="info.jenis_dokumen_perjalanan"
                  class="form-control form-control-sm"
                  @change="changeNomborPlaceholder"
                >
                  <option value="PASSPORT">PASSPORT</option>
                  <option value="SPLP">SPLP</option>
                </select>
              </div>
            </div>

            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Nombor
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="nombor"
                  v-model="info.nombor"
                  class="form-control form-control-sm text-uppercase"
                  :placeholder="placeholder.nombor"
                />
              </div>
            </div>

            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Tempat / Negara Dikeluarkan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <select
                  v-model="info.negara_dikeluarkan"
                  class="form-control form-control-sm text-uppercase"
                >
                  <option
                    v-for="(option, key) in options.negara"
                    v-bind:key="key"
                    v-bind:value="option.value"
                    >{{ option.text }}</option
                  >
                </select>
              </div>
            </div>

            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  **Sah Sehingga
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <datepicker
                  bootstrap-styling
                  name="sah_sehingga"
                  v-model="info.sah_sehingga"
                  calendar-button
                  calendar-button-icon="far fa-calendar-alt"
                ></datepicker>
              </div>
            </div>

            <div class="col-12 text-uppercase mb-4"></div>
          </div>
        </div>
      </div>

      <div class="card mb-2">
        <div class="card-header text-left">
          <div>Butir - butir penganjur di malaysia</div>
          <div>
            <i>particulars of sponsor in malaysia</i>
          </div>
        </div>
        <div class="card-body">
          <div class="row text-left">
            <div class="col-sm-12 text-left">
              <div class="form-group">
                <label for>
                  Nama Penuh
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="nama_penuh_penaja"
                  v-model="info.nama_penuh_penaja"
                  class="form-control form-control-sm text-uppercase"
                />
              </div>
            </div>

            <div class="col-sm-12 col-md-6 text-left">
              <div class="form-group">
                <label for>
                  No Kad Pengenalan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="kad_pengenalan_penaja"
                  v-model="info.kad_pengenalan_penaja"
                  class="form-control form-control-sm"
                />
              </div>
            </div>

            <div class="col-sm-12 col-md-6 text-left">
              <div class="form-group">
                <label for>
                  No Telefon
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="no_telefon_penaja"
                  v-model="info.no_telefon_penaja"
                  class="form-control form-control-sm"
                />
              </div>
            </div>

            <div class="col-sm-12 text-left">
              <div class="form-group mb-1">
                <label for>
                  Alamat
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <input
                  type="text"
                  name="alamat_penaja_1"
                  v-model="info.alamat_penaja_1"
                  class="form-control form-control-sm text-uppercase"
                />
              </div>
            </div>

            <div class="col-sm-12 text-left">
              <div class="form-group mb-1">
                <input
                  type="text"
                  name="alamat_penaja_2"
                  v-model="info.alamat_penaja_2"
                  id
                  class="form-control form-control-sm text-uppercase"
                />
              </div>
            </div>

            <div class="col-sm-12 text-left">
              <div class="form-group">
                <input
                  type="text"
                  name="alamat_penaja_3"
                  v-model="info.alamat_penaja_3"
                  class="form-control form-control-sm text-uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header text-left">
          <div>butir - butir permohonan</div>
          <div>
            <i>detail off application</i>
          </div>
        </div>
        <div class="card-body">
          <div class="row text-left">
            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Tempoh Tinggal Yang Dicadangkan Bulan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <div class="input-group">
                  <input
                    type="text"
                    name="tempoh_tinggaL_yang_dicadangkan"
                    v-model="info.tempoh_tinggaL_yang_dicadangkan"
                    class="form-control form-control-sm"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"
                      >bulan</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-lg-6 text-left">
              <div class="form-group">
                <label for>
                  Tujuan Perjalanan
                  <i class="fas fa-pencil-paintbrush"></i>
                </label>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="Bercuti"
                      name="tujuan_perjalanan"
                      v-model="info.tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Bercuti
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="urusan perniagaan"
                      name="tujuan_perjalanan"
                      v-model="info.tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Urusan Perniagaan
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="melawat saudara mara / kawan"
                      name="tujuan_perjalanan"
                      v-model="info.tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Melawat Saudara Mara / Kawan
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="bekerja"
                      name="tujuan_perjalanan"
                      v-model="info.tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Bekerja
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="transit"
                      v-model="info.tujuan_perjalanan"
                      name="tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Transit
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="urusan rasmi"
                      name="tujuan_perjalanan"
                      v-model="info.tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Urusan Rasmi
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="persidangan"
                      name="tujuan_perjalanan"
                      v-model="info.tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Persidangan
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      value="lain-lain"
                      name="tujuan_perjalanan"
                      v-model="info.tujuan_perjalanan"
                      @change="radioTujuanPerjalanan"
                    />Lain-lain
                  </label>
                </div>

                <div
                  v-if="info.tujuan_perjalanan == 'lain-lain'"
                  class="form-group"
                >
                  <label for>
                    Lain - lain (Nyatakan)
                    <i class="fas fa-pencil-paintbrush"></i>
                  </label>
                  <input
                    type="text"
                    name="tujuan_perjalanan_lain"
                    v-model="info.tujuan_perjalanan_lain"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row d-none">
        <div class="col-12 mt-4">
          <div class="form-group">
            <button type="submit" class="btn btn-block btn-primary">
              {{ button.next }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader";
import Datepicker from "vuejs-datepicker";
import Axios from "axios";
import { API } from "../Config";
import Swal from "sweetalert2";

export default {
  name: "pemohon",
  data: function() {
    return {
      mode: "baru",
      ref: {
        register_id: "",
        temporary_id: ""
      },
      payment: {},
      placeholder: {
        nombor: "NOMBOR PASSPORT"
      },
      button: {
        next: "Seterunya"
      },
      options: {
        negara: [
          { text: "INDONESIA", value: "INDONESIA" },
          { text: "BANGLADESH", value: "BANGLADESH" },
          { text: "MYANMAR", value: "MYANMAR" },
          { text: "NEPAL", value: "NEPAL" },
          { text: "VIETNAM", value: "VIETNAM" },
          { text: "THAILAND", value: "THAILAND" },
          { text: "LAOS", value: "LAOS" },
          { text: "KEMBOJA", value: "KEMBOJA" },
          { text: "PHILIPINA", value: "PHILIPINA" },
          { text: "CHINA", value: "CHINA" },
          { text: "INDIA", value: "INDIA" },
          { text: "PAKISTAN", value: "PAKISTAN" },
          { text: "SRI LANKA", value: "SRI LANKA" },
          { text: "KAZAKHSTAN", value: "KAZAKHSTAN" },
          { text: "UZBEKISTAN", value: "UZBEKISTAN" },
          { text: "TURKMENISTAN", value: "TURKMENISTAN" }
        ]
      },
      info: {
        nama: "",
        jantina: "LELAKI",
        tempat_lahir: "INDONESIA",
        tarikh_lahir: "",
        warganegara: "INDONESIA",
        pekerjaan: "",
        alamat_1: "",
        alamat_2: "",
        alamat_3: "",
        taraf_perkahwinan: "BELUM BERKAHWIN",
        email: "",
        no_telefon: "",
        jenis_dokumen_perjalanan: "PASSPORT",
        nombor: "",
        negara_dikeluarkan: "INDONESIA",
        sah_sehingga: "",
        nama_penuh_penaja: "",
        kad_pengenalan_penaja: "",
        no_telefon_penaja: "",
        alamat_penaja_1: "",
        alamat_penaja_2: "",
        alamat_penaja_3: "",
        tempoh_tinggaL_yang_dicadangkan: "",
        tujuan_perjalanan: "Bercuti",
        tujuan_perjalanan_lain: ""
      }
    };
  },
  components: {
    datepicker: Datepicker,
    MainHeader
  },
  mounted() {
    Axios.get(
      API.baseurl +
        "register/info?regid=" +
        this.$route.params.register_id +
        "&tempid=" +
        this.$route.params.temporary_id
    ).then(response => {
      this.mode = "edit";
      let resp = response.data.response;
      this.button.next = "Kemaskini dan Seterusnya";
      this.info = resp.data_pemohon;
      this.payment = {
        label: resp.payment.status === "" ? "NOT PAID" : "PAID"
      };
      if (resp.payment.status === "") {
        this.payment.status = "bg-danger";
      } else {
        this.payment.status = "bg-success";
      }
    });
  },
  methods: {
    getFormValues: function() {
      if (this.mode == "baru") {
        Axios.post(API.baseurl + "register/new", {
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
          },
          body: this.info
        }).then(response => {
          let resp = response.data.response;
          window.location.href =
            "./payment/" + resp.register_id + "/" + resp.temporary_id;
        });
      } else {
        this.kemaskiniMaklumat();
      }
    },
    changeNomborPlaceholder: function() {
      let dokumen = this.info.jenis_dokumen_perjalanan;
      switch (dokumen) {
        case "PASSPORT":
          this.placeholder.nombor = "NOMBOR PASSPORT";
          break;
        case "SPLP":
          this.placeholder.nombor = "NOMBOR SPLP";
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    kemaskiniMaklumat: function() {
      Axios.post(API.baseurl + "register/updateinfo", {
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          input: this.info,
          ref: this.ref
        }
      }).then(response => {
        let resp = response.data.response;
        console.log(resp);
        if (resp.payment.status == "paid") {
          Swal.fire({
            title: "Success!",
            text: "Compound has been paid",
            type: "success",
            confirmButtonText: "View ticket"
          }).then(() => {
            this.$router.push({
              name: "ticket",
              params: {
                register_id: resp.register_id,
                temporary_id: resp.temporary_id
              }
            });
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Personal particular has been updated!",
            type: "success",
            confirmButtonText: "Proceed to payment options!"
          }).then(function() {
            window.location.href =
              "./payment/" + resp.register_id + "/" + resp.temporary_id;
          });
        }
      });
    },
    radioTujuanPerjalanan: function() {
      // let tujuan = this.info.tujuan_perjalanan;
      // if (tujuan == "lain-lain") {
      // } else {
      // }
    }
  }
};
</script>
