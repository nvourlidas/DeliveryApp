<template>
  <div>
    <div class="container">
      <h1 class="header">Καλώς Ήρθατε</h1>
      <p class="subheader">Αρχική Σελίδα <img src="@/assets/images/Logo2.png"></p>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      userid: localStorage.getItem('userid'),
    }
  },

  created() {
    setTimeout(() => {
      if (this.userid == null) {
        window.location.reload();
      }
    }, 1000);

  }
}

</script>
  


<style scoped>
.container {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.831);
  padding: 20px;
}

.header {
  font-size: 3rem;
  color: #333;
  padding-left: 25%;
}

.subheader {
  font-size: 1.5rem;
  color: #777;
  text-align: center;
}

img {
  width: 50%;
}

@media (max-width: 600px) {
  img {
    width: 100%;
  }

  .header {
    font-size: 2rem;
    color: #333;
    padding-left: 0%;
  }
}
</style>