let app, app2, app3, app4, app5, app6, app7
document.addEventListener('DOMContentLoaded', () => {

  // let vm = new Vue({
  //   el: '#app',
  //   data: {
  //     name: 'みかん',
  //     price: '200'
  //   },
  //   computed: {
  //     priceWithTax: function () {
  //       return this.price * 1.08
  //     }
  //   }
  // })
  // app1 = new Vue({
  //   el: '#app1',
  //   data: {
  //     items: [{
  //         name: 'みかん',
  //         price: 100
  //       },
  //       {
  //         name: 'もも',
  //         price: 300
  //       },
  //       {
  //         name: 'いちじく',
  //         price: 500
  //       },
  //       {
  //         name: 'メロン',
  //         price: 1000
  //       }
  //     ]
  //   }
  // })
  // app2 = new Vue({
  //   el: "#app2",
  //   data: {
  //     name: '',
  //   },
  //   computed: {
  //     isValid: function () {
  //       result = this.name.length > 0 && +this.name[0] != typeof Number ? true : false;
  //       return result;
  //     }
  //   },
  //   methods: {
  //     updateName: function (e) {
  //       this.name = e.data
  //     }
  //   }  
  // })


  let fruitsChild = Vue.extend({
    template: '<h1>フルーツ一覧</h1>'
  })

  let fruitsParent = Vue.extend({
    template: '<div>親コンポーネント<fruits-list-child></fruits-list-child>',
    component: {
      'fruits-list-child': fruitsListChild
    }
  })

  new Vue({
    el: '#fruit-list',
    component: {
      'fruits-list-parent': fruitsParent
    }
  })
})