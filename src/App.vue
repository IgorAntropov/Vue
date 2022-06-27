<template>
  <Header />
  <Body />
  <Footer />
</template>

<script>
import Header from './components/Header.vue';
import Body from './components/Body.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Body,
    Footer
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

span {
  cursor: default;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-text-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex-text-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  height: 35px;
  width: 35px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.btn-success {
  background-color: #22a822;
  border: 1px solid #257c25;
}

.btn-success:hover {
  background-color: #14d914;
}

.btn-warning {
  background-color: #d78b1e;
  border: 1px solid #b07318;
}

.btn-warning:hover {
  background-color: #fd9c00;
}

.btn-danger {
  background-color: #c04a46;
  border: 1px solid #9f3c3a;
}

.btn-danger:hover {
  background-color: #e3110d;
}

.header,
.footer,
.body {
  border: 1px solid #656565;
  color: #656565;
  background-color: #c7c6c6;
  font-size: 24px;
  padding-left: 30px;
}

.header,
.footer {
  height: 50px;
}
</style>
