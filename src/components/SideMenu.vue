<template>
  <div>
    <ul class="nav flex-column text-left">
      <li class="nav-item">
        <router-link to="/" class="nav-link active">Dashboard</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/registration"
          >Registration</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/kutipan">Kutipan</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/tetapan_sistem"
          >Tetapan Sistem</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/agent_verify"
          >Agent Verify</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidemenu"
};
</script>
