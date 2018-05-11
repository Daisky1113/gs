(() => {
  'use strict'

  // TimeController => 時間を管理するクラス
  // @prop now => 現在時刻
  // @prop today => 現在の日にち
  // @method calculateTimediff => データクラスのインスタンス同士の差を計算して結果を返す
  // @method dateShaping => dateクラスのインスタンス同士の演算結果を整形する
  // @method date2string => dateクラスのインスタンスを year/month/day hour:minuteの形に整形する
  // @method string2Date => year/month/day hour:minute の形で渡ってくる文字列をDate型に変換する
  // @method updateNow => ページが読み込まれた時に設定した現在時刻を毎秒更新する
  class TimeController{
    constructor(){
      this.now = new Date()
      this.today = this.now.getDate()
      this.updateNow()
    }

    calculateTimediff(date1,date2){
      return date1 - date2
    }

    // dateShaping
    // @parm millisecond => ミリ秒に換算された時間
    // @return => 日時分秒形式string
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

    // date2String 
    // @parm date => dateクラスのインスタンス
    // @return year/month/day hour:minuteの文字列
    date2string(date){
      let year,month,day,hour,minute,seconds  
      year = date.getFullYear()
      month = (date.getMonth() + 1) % 12
      day = date.getDate()
      hour = date.getHours()
      minute = date.getMinutes()
      return (`${year}/${month}/${day} ${hour}:${minute}`)
    }

    // string2Date
    // @parm str => year/month/day hour:minute の形の文字列
    // @return Dateクラスのインスタンス
    string2Date(str){
      let date = str.split(' ')[0].split('/')
      let time = str.split(' ')[1].split(':')
      return new Date(date[0],date[1] -1,date[2],time[0],time[1])

    }

    // updateNow
    updateNow(){
      setInterval(()=>{
        this.now.setSeconds(this.now.getSeconds() + 1)
        if(this.today != this.now.getDate()) this.today = this.now.getDate()
      },1000)
    }
  }

  // tabController => タブとコンテンツを管理するクラス
  class TabController{
    constructor(props){
      this.currentIndex = 0
      this.tabs = Array.from(document.getElementsByClassName(props.tabs))
      this.contents = Array.from(document.getElementsByClassName(props.contents))
      this.show(this.currentIndex)
      this.tabs.map((el)=>{
        el.addEventListener('click',()=>{
          this.currentIndex = this.tabs.indexOf(el)
          this.show(this.currentIndex)
        })
      })
    }
    show(){
      this.contents.map((el)=>{
        if(this.contents.indexOf(el) != this.currentIndex){
          el.style.display = 'none'
        }else{
          el.style.display = 'block'
        }
      })
      this.contents[this.currentIndex].style.display = 'block'
    }
  }

  // ChildTask => 子タスク
  // @prop name => タスク名
  // @prop status => 実行中かどうかを判断するステータス
  // @prop time => 子タスクに関する時間を管理するオブジェクト
  // @prop time.start => タスク開始時の時間をDate型のインスタンスで保存
  // @prop time.stop => タスク終了時の時間をDate型のインスタンスで保存
  // @prop time.past => 経過時間をstring型でキャッシュ
  // @method updatePastTime => タスク開始時の時間からの経過時間を計算する
  // @method createTask => 子タスクのDOMを返す
  class ChildTask{
    constructor(props){
      this.name = props.name
      this.status = {
        stop:1,
        start:0
      }
      this.time = {
        start: '',
        stop:'',
        past: ''
      }
    }

    updatePastTime(now){
      this.time.past = now - this.time.start
    }
    createTask(){
      return `
      <div class='child-task'>
      <div class='task-header'>
        <div class='task-name'>${this.name}</div>
        <div class='task-time'>${this.time.past}</div>
      </div>
      <div class='task-btns'>
        <button>start!</button>
        <button>strop!</button>
        <button>delete</button>
        <button>done!</button>
      </div>
      </div>`
    }
  }

  // ParentTask => 親タスク。締め切り時間、小タスクを管理する
  // @prop name => タスク名
  // @parm childrenTask => 自分に関連づいている小タスク
  // @parm timeLimit => タスクの期限
  // @parm remainigTIme => タスクの期限までの残り時間
  // @parm status => 完了か否かのステータス
  class ParentTask{
    constructor(props){
      this.name = props.name
      this.childrenTask = props.childrenTask || []
      this.timeLimit = props.timeLimit
      this.remainingTime = ''
      this.status = {
        completion:0,
        incompletion:1
      }
    }
    rescheduled(date){
      this.timeLimit = date
    }
    createChild(name){
      this.childrenTask.push(new ChildTask({name : name}))
    }

    createTask(remainingTime){
      let parentTask = document.createElement('div')
      parentTask.className = 'js-taskList task-list'
      const taskTemplate = `
      <div class='parent-task'>
        <div class='l-task-left'>
          <div class='task-name'>${taskName}</div>
          <div class='task-btns'>
            <a class="waves-effect waves-light btn-small btn-flat teal lighten-5">DONE !</a>
            <a class="waves-effect waves-light btn-small btn-flat teal lighten-5">RESCHE</a>
            <a class="waves-effect waves-light btn-small btn-flat teal lighten-5">SPLIT</a>
            <a class="waves-effect waves-light btn-small  btn-flat red lighten-5">cancel</a>
          </div>    
        </div>
        <div class='l-task-right'>
          <div class='task-time'>
              <div class='task-time-limit'><span>Time limit</span>${timeLimit}</div>
              <div class='task-time-past'><span>Remaining Time</span>${remainingTime}</div>
          </div>
        </div>
      </div>`
      parentTask.insertAdjacentHTML('afterbegin',taskTemplate)
      Array.from(parentTask.getElementsByTagName('a')).map((el)=>{
        el.addEventListener('click',()=>{
          console.log(el.textContent)
        })
      })
    }
    updateTimelimit(timeLimit){
      this.timeLimit = timeLimit
    }
  }

  class TaskController{
    constructor(props){
      this.TC = new TimeController()
      this.today = this.TC.today
      this.parentTasks = props.parentTasks || {}
      this.finishTasks = props.finishTasks || []
      this.archive = props.archive || {}
      this.el = props.el
    }
    addParentTask(task){
      this.parentTasks.push(new ParentTask(
        {
          name:task.name,
          timeLimit:task.timeLimit
        }
      ))
      this.el.appendChild
    }
    sortParentTaks(){
      let sortedTaks = []
    }
  }

  document.addEventListener('DOMContentLoaded', () => {

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


    function createParentTask(taskName,timeLimit,remainingTime){
      const taskList = document.getElementById('js-listArea')
      let parentTask = document.createElement('div')
      parentTask.className = 'js-taskList task-list'
      const taskTemplate = `
      <div class='parent-task'>
      <div class='l-task-left'>
          <div class='task-name'>${taskName}</div>
          <div class='task-btns'>
              <a class="waves-effect waves-light btn-small btn-flat teal lighten-5">DONE !</a>
            <a class="waves-effect waves-light btn-small btn-flat teal lighten-5">RESCHE</a>
            <a class="waves-effect waves-light btn-small btn-flat teal lighten-5">SPLIT</a>
            <a class="waves-effect waves-light btn-small  btn-flat red lighten-5">cancel</a>
          </div>    
      </div>
      <div class='l-task-right'>
          <div class='task-time'>
              <div class='task-time-limit'><span>Time limit</span>${timeLimit}</div>
              <div class='task-time-past'><span>Remaining Time</span>${remainingTime}</div>
            </div>    
      </div>
`
      parentTask.insertAdjacentHTML('afterbegin',taskTemplate)
      Array.from(parentTask.getElementsByTagName('button')).map((el)=>{
        el.addEventListener('click',()=>{
          console.log(el.textContent)
        })
      })
      taskList.appendChild(parentTask)
    }

    function createChildtask(target){
      const targetDOM = document.getElementById(target)
      let childTask = document.createElement('div')
      const template = `
      <div class='child-task'>
        <div class='task-header'>
          <div class='task-name'>${this.name}</div>
          <div class='task-time'></div>
        </div>
        <div class='task-btns'>
          <button>start!</button>
          <button>strop!</button>
          <button>delete</button>
          <button>done!</button>
        </div>
      </div>
      `
    }

    class TaskRegistar{
      constructor(props){
        this.timeController = new TimeController()
        this.el = document.getElementById(props.el)
        this.dpel = document.querySelectorAll('.datepicker')
        this.dpop = {format : 'yyyy/mm/dd' }
        this.dp = M.Datepicker.init(this.dpel,this.dpop)
        this.tpel = document.querySelectorAll('.timepicker')
        this.tpop = { defaultTime: 'now', twelveHour: false}
        this.tp = M.Timepicker.init(this.tpel,this.tpop)
        this.view = {
          date : document.getElementById(props.dateInput),
          time : document.getElementById(props.timeInput),
          name : document.getElementById(props.nameInput),
          cancelBtn : document.getElementsByClassName(props.cancelBtn)[0],
          addBtn : document.getElementsByClassName(props.addBtn)[0]
        }

        this.view.addBtn.addEventListener('click',()=>{
          let remainingTime = this.timeController.dateShaping(
            this.timeController.calculateTimediff(
              new Date(this.timeController.string2Date(this.view.date.value + ' '+ this.view.time.value)),
              this.timeController.now,
            )
        )
          createParentTask(this.view.name.value,
            this.view.date.value + ' '+ this.view.time.value,
            remainingTime
          )
          this.clearInputVal()
        })
        this.view.cancelBtn.addEventListener('click',()=>{
          this.clearInputVal()
        })
      }
      clearInputVal(){
        this.view.date.value = ''
        this.view.time.value = ''
        this.view.name.value = ''

      }
    }

    const taskRegistar = new TaskRegistar({
      el:'js-task-register',
      dateInput: 'js-date',
      timeInput: 'js-time',
      nameInput : 'js-nameInput',
      cancelBtn : 'js-cancelBtn',
      addBtn : 'js-addBtn'
    })
    const tabContents = new TabController({
      tabs : 'js-taskTab',
      contents : 'js-tab-contents'
    })
    console.log(tabContents)
  })
})()