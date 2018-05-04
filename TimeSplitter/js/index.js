(() => {
  'use strict'

  //todo ボタンを押したらタスクが追加されるコンポーネント
  // const taskController = document.getElementById('js-listControlle')
  // const btns = taskController.getElementsByClassName('btn')

  // class TaskController {
  //   constructor(props) {
  //     this.el = document.getElementById('js-listArea')
  //     this.tasks = []
  //   }

  //   addTask(title, limit) {
  //     const template = document.createElement('div')

  //   }
  //   removeTask() {

  //   }
  //   taskMove() {

  //   }
  // }

  // Dateクラスのインスタンスであれば計算が簡単
  // ということは締め切りの時間を設定するときに新たにdateクラスのインスタンスを生成すればよい


  document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('js-datePicker')
    const timePicker = document.getElementById('js-timePicker')
    const fixBtn = document.getElementById('js-dateBtn')
    const nowBtn = document.getElementById('js-getNowBtn')
    const calcBtn = document.getElementById('js-calcBtn')
    const showBtn = document.getElementById('js-showBtn')

    let nowTime, setTime

    fixBtn.addEventListener('click', () => {
      let date = datePicker.value
      let time = timePicker.value
      setTime = new Date(date + ' ' + time)
    })
    nowBtn.addEventListener('click', () => {
      nowTime = new Date()
    })
    calcBtn.addEventListener('click', () => {
      //計算すると秒で帰ってくる
      let diff = setTime - nowTime
      dateShaping(diff)
    })

    showBtn.addEventListener('click', () => {
      console.log(`${setTime}\n${nowTime}`)
    })

    // ミリ秒を日/時/分/秒に整形する
    function dateShaping(millisecond) {
      let milli = ~~(millisecond / 1000)
      let day, hour, minute, seconds
      let result = ''

      while (!seconds) {
        if (milli > (60 * 60 * 24)) {
          day = ~~(milli / (60 * 60 * 24))
          result += day + '日'
          milli -= (day * (60 * 60 * 24))
        } else if (milli > (60 * 60)) {
          hour = ~~(milli / (60 * 60))
          result += hour + '時'
          milli -= (hour * 60 * 60)
        } else if (milli > 60) {
          minute = ~~(milli / 60)
          result += minute + '分'
          milli -= minute * 60
        } else {
          seconds = ~~(milli)
          result += milli + '秒'
          break;
        }
      }
      console.log(result)
    }

    // canvas
    const canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth / 2
    canvas.height = window.innerHeight
    const ctx = canvas.getContext("2d")

    const center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
    console.log(center)
    let radius = 100
    const numbers = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ]
    let angle = 360 / numbers.length
    ctx.fillStyle = 'green'

    // ctx.fillRect(10, 10, 100, 100)
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius + 10, 0, Math.PI * 2, false)
    ctx.stroke()
    numbers.map((el, idx) => {
      let degree = angle * idx - 60
      console.log(degree)
      let rad = degree * Math.PI / 180
      let posX = Math.cos(rad) * radius + center.x
      let posY = Math.sin(rad) * radius + center.y
      // console.log(posX, posY)
      ctx.fillText(el, posX, posY)
    })
  })
})()