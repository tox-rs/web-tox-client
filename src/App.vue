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
    default: #f2f5f8,
    icon-on-background: #acb8d0,
    icon: #acb8d0,
    primary: #03b381,
    accent: #f44b56,
    border-primary: #dee1f3,
    border-accent: #e5e5e5,
  )
);

@import '~vue-material/dist/theme/all';
body {
  height: 100%;
  overflow: hidden;
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
.md-snackbar.banner {
  // max-width: 100%;
  max-height: 600px;
  left: unset !important;
  .title {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 15px;
    img {
      margin: 0px 5px;
      margin-top: -14px;
      width: 30px;
      height: 30px;
    }
  }
  .md-snackbar-content {
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;
    .md-button {
      min-width: 0;
      margin: 0px -8px 0px -8px;
    }
  }
}
.md-button,
.md-button-clean {
  font-family: 'Nunito', 'Roboto', 'Noto Sans', '-apple-system',
    'BlinkMacSystemFont', sans-serif !important;
}
.md-raised {
  color: white !important;
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
.list .group_detail .md-list-item-content {
  height: unset !important;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}
.md-list.detail {
  .md-subheader {
    min-height: 20px;
    margin-top: 10px;
  }
  background-color: transparent;
  & .md-list-item-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.list .files .md-list-item-content,
.list .notifications .md-list-item-content {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: unset !important;
}
.md-tabs-content {
  height: 100% !important;
  background-color: transparent !important;
}
.md-tabs-container {
  height: 100% !important;
}
.date_search {
  display: block;
  white-space: nowrap;
  color: #acacac;
  font-size: 12px;
  margin-right: 10px;
  width: 52px;
}
.author_search {
  display: block;
  white-space: nowrap;
  color: var(--md-theme-default-primary);
  font-size: 12px;
  width: 52px;
  margin-right: 10px;
}

// .md-menu-content{
//   max-width: 260px!important;
// }
.md-tabs.md-theme-default .md-tabs-navigation .md-button.md-active .md-icon {
  color: var(--md-theme-default-icon-on-background);
}
.md-tabs.md-theme-default .md-tabs-navigation .md-button .md-icon {
  color: var(--md-theme-default-icon-on-background);
}
.md-menu .md-icon.md-theme-default.md-icon-font.md-primary {
  color: var(--md-theme-default-icon-on-background);
}
#prompt {
  width: 100%;
  max-width: 600px;
}
@media (max-width: 1300px) {
  .tox-area .msg {
    max-width: 450px !important;
  }
}
@media (max-width: 750px) {
  .room-header .md-tabs {
    display: none;
  }
  .room-header .divider {
    display: none;
  }
  .room .sidebar {
    width: 100%;
  }
  .room .sidebar .md-tabs {
    max-width: 100%;
  }
}
@media (max-width: 500px) {
  .tox-area .msg {
    max-width: 250px !important;
  }
}
</style>
