<template>
  <div class="no-print">
    <ul class="nav flex-column text-left">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="active" exact=""
          >Dashboard</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/registration" active-class="active"
          >Registration</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/kutipan" active-class="active"
          >Kutipan</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/tetapan_sistem" active-class="active"
          >Tetapan Sistem</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/cdm-consilation"
          active-class="active"
          >CDM Consilation</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/agent_verify" active-class="active"
          >Agent Verify</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidemenu",
  data: function() {
    return {
      home_link: ""
    };
  },
  mounted: function() {
    var link = this.$route.name;
  }
};
</script>
