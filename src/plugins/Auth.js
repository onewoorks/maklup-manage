function checkAuth () {
    let logged = false
    if(typeof(Storage) !== "undefined"){
        if(localStorage.getItem('jwt-auth') == null){
            logged = false
        } else {
            logged = true
        }
        return logged
    } else {
        // console.log('not supported')
    }
}

  const Auth = {
    install(Vue, options) {
        Vue.prototype.$checkAuth = function(){
            checkAuth()
        }
        Vue.mixin({
        mounted() {
            checkAuth()
        //   console.log('Auth Mounted!');
        }
      });
    }
  };

module.exports = {
    Auth
}