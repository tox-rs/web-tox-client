<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
@import '~vue-material/dist/theme/engine'; // Import the theme engine

@include md-register-theme(
  'default',
  (
    primary: #acb8d0,
    // The primary color of your brand
      accent: #f2f5f8,
    // The secondary color of your brand
      border-primary: #dee1f3,
    border-accent: #e5e5e5,
  )
);

@import '~vue-material/dist/theme/all';
body {
  height: 100%;
  font-family: 'Nunito', 'Roboto', 'Noto Sans', '-apple-system',
    'BlinkMacSystemFont', sans-serif !important;
}
#app {
  font-family: 'Nunito', Arial, Helvetica, Sans-Serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
div.handle.handle-mr {
  background: none;
  border: unset;
  right: -5px;
  top: 0px;
  height: 100vh;
}
.md-button,
.md-button-clean {
  font-family: 'Nunito', 'Roboto', 'Noto Sans', '-apple-system',
    'BlinkMacSystemFont', sans-serif !important;
}
.md-icon {
  color: var(--md-theme-default-primary) !important;
}

.toolbar .md-icon-button {
  width: 35px;
  min-width: 35px;
  height: 35px;
  margin: 0 0px;
}
.toolbar .md-tabs-navigation .md-ripple {
  padding: 0px;
  width: 20px;
  margin-left: 5px;
  margin-right: 5px;
}
.toolbar .md-tabs-navigation .md-button {
  width: 30px;
  height: 35px;
  min-width: 30px;
}
.sidebar .md-tabs-navigation {
  display: none;
}
.md-list-item-expand > .md-list-item-content.md-ripple {
  flex-direction: row-reverse;
}
.md-list-item-content > .md-icon:last-child {
  margin-left: 0px !important;
}
.list .md-list-item-content {
  min-height: 36px !important;
  height: 36px !important;
  padding: 0px 16px !important;
  background-color: transparent;
}
.list .group .md-list-item-content {
  min-height: 44px !important;
  height: 44px !important;
  padding: 0px !important;
}
.list .files .md-list-item-content, .list .notifications .md-list-item-content {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: unset !important;
}
.md-tabs-content {
  height: 100% !important;
  background-color: transparent !important;
}
.md-tabs-container{
  height: 100% !important;
}
</style>
