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

  class TImeController{
    constructor(props){
      this.now = new Date()
      setInterval(function(){
        this.now = new Date()
        console.log(this.now)
      },1000)
    }

    calculatTimediff(date1,date2){
      return date1 - date2
    }

    dateShaping(millisecond) {
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
        }
      }
      return result;
    }

    date2string(date){
      let year,month,day,hour,minute,seconds  
      year = date.getFullYear()
      month = (date.getMonth() + 1) % 12
      day = date.getDate()
      hour = date.getHours()
      minute = date.getMinutes()
      return (`${year}:${month}:${day} ${hour}:${minute}`)
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('js-datePicker')
    const timePicker = document.getElementById('js-timePicker')
    const taskNameinput = document.getElementById('js-taskNameInput')
    const fixBtn = document.getElementById('js-dateBtn')
    const nowBtn = document.getElementById('js-getNowBtn')
    const calcBtn = document.getElementById('js-calcBtn')
    const showBtn = document.getElementById('js-showBtn')



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
        }
      }
      return result;
    }

    function date2string(date){
      let year,month,day,hour,minute,seconds  
      year = date.getFullYear()
      month = (date.getMonth() + 1) % 12
      day = date.getDate()
      hour = date.getHours()
      minute = date.getMinutes()
      return (`${year}年${month}月${day}日${hour}時${minute}分`)
    }

    // タスクリスト
    const taskController = document.getElementById('js-listController')
    const addTaskBtn = document.getElementById('js-addTask')
    const taskList = document.getElementById('js-taskList')
    addTaskBtn.addEventListener('click',()=>{
      console.log('addTask')
    })

    addTaskBtn.addEventListener('click',()=>{
      const setTime = new Date(datePicker.value + ' ' + timePicker.value)
      const now = new Date()
      console.log(setTime - now)
      createParentTask(
        taskNameinput.value,
        {
          limit: date2string(setTime),
          remainingTime : dateShaping(setTime - now)
        }
      )
    })


    function createParentTask(taskName,timeObj){
      const taskList = document.getElementById('js-listArea')
      let parentTask = document.createElement('div')
      parentTask.className = 'js-taskList task-list'
      const taskTemplate = `
      <div class="parent-task">
      <div class='task-header'>
        <div class='task-name'>${taskName}</div>
        <div class='task-time'>
          <div class='task-time-limit'>${timeObj.limit}</div>
          <div class='task-time-past'>${timeObj.remainingTime}</div>
        </div>
      </div>
      <div class='task-btns'>
        <button>Stop!</button>
        <button>start!</button>
        <button>resch!</button>
        <button>done!</button>
        <button>split!</button>
        <button>+show child task</button>
      </div>
      </div>`
      parentTask.insertAdjacentHTML('afterbegin',taskTemplate)
      taskList.appendChild(parentTask)
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
    const tc = new TImeController() 
  })
})()