const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const fomatArray = array => {
  let colors = ['#f85858', '#21a2fd', '#a3d001', '#ffda4d']
  let arr = array;
  let u = 0;
  for(let i in arr){
    if(u==4){
      u = 0;
    }
    arr[i].color = colors[u]
    u++;
  }
  return arr;
}

module.exports = {
  formatTime: formatTime,
  fomatArray: fomatArray
}