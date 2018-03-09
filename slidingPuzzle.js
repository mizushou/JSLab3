
let piecesArr = [1,2,3,4,5,6,7,8];
let randomArr = new Array(9);
// let puzzleValArr;
let count;

function init(){

    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    randomArr = makeRandomArr(piecesArr);
    randomArr.push(null);

    count = 0;
    let counter = document.getElementById("count");
    counter.textContent = "Moves : " + count;
    let startTimer = document.getElementById("startTime");
    startTimer.textContent = "Start Time : " + h + ":" + m + ":" + s;
    let puzzle = document.getElementById("puzzle");
    puzzle.innerHTML = "<table class='table1'><tr><td id='1' onmouseover=\"isMovable(1)\" onmouseout=\"colorOff(1)\" onclick=\"movePiece(1)\"></td><td id='2' onmouseover=\"isMovable(2)\" onmouseout=\"colorOff(2)\" onclick=\"movePiece(2)\"></td><td id='3' onmouseover=\"isMovable(3)\" onmouseout=\"colorOff(3)\" onclick=\"movePiece(3)\"></td></tr><tr><td id='4' onmouseover=\"isMovable(4)\" onmouseout=\"colorOff(4)\" onclick=\"movePiece(4)\"></td><td id='5' onmouseover=\"isMovable(5)\" onmouseout=\"colorOff(5)\" onclick=\"movePiece(5)\"></td><td id='6' onmouseover=\"isMovable(6)\" onmouseout=\"colorOff(6)\" onclick=\"movePiece(6)\"></td></tr><tr><td id='7' onmouseover=\"isMovable(7)\" onmouseout=\"colorOff(7)\" onclick=\"movePiece(7)\"></td><td id='8' onmouseover=\"isMovable(8)\" onmouseout=\"colorOff(8)\" onclick=\"movePiece(8)\"></td><td id='9' onmouseover=\"isMovable(9)\" onmouseout=\"colorOff(9)\" onclick=\"movePiece(9)\"></td></tr></table>";
    for(let i=1; i<9; i++){
      let piece = document.getElementById(i);
      piece.textContent = randomArr[i - 1];
    };
}

function initArr(arr){
  for(let i=0; i<arr.length; i++){
    delete arr[i];
  };
  return arr;
}

function endGame(){
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  let endTimer = document.getElementById("endTime");
  endTimer.textContent = "End Time : " + h + ":" + m + ":" + s;
}

function makeRandomArr(arr){
    arrb = arr.slice();
    // randomArr = arrb.sort(function(a,b){return 0.5 - Math.random()});
    randomArr = arrb.sort(function(a,b){return 0.5 - Math.random()}).slice();
  return randomArr;
}

function isMovable(point){
  let flag = judgeMovable(point);
  colorOn(point,flag);
}

function isMovableUp(point){
  let upCellVal = randomArr[point-4];
  if(upCellVal == null){
    return true;
  } else {
    return false;
  }
}

function isMovableDown(point){
  let downCellVal = randomArr[point+2];
  if(downCellVal == null){
    return true;
  } else {
    return false;
  }
}

function isMovableLeft(point){
  let leftCellVal = randomArr[point-2];
  if(leftCellVal == null){
    return true;
  } else {
    return false;
  }
}

function isMovableRight(point){
  let rightCellVal = randomArr[point];
  if(rightCellVal == null){
    return true;
  } else {
    return false;
  }
}

function judgeMovable(point){
  let flag = false;
  switch (point) {
    case 1:
      if(isMovableRight(point) || isMovableDown(point)){
        flag = true;
      }
      break;
    case 2:
      if(isMovableRight(point) || isMovableDown(point) || isMovableLeft(point)){
        flag = true;
      }
      break;
    case 3:
      if(isMovableDown(point) || isMovableLeft(point)){
        flag = true;
      }
      break;
    case 4:
      if(isMovableUp(point) || isMovableRight(point) || isMovableDown(point)){
        flag = true;
      }
      break;
    case 5:
      if(isMovableUp(point) || isMovableRight(point) || isMovableDown(point) || isMovableLeft(point)){
        flag = true;
      }
      break;
    case 6:
      if(isMovableUp(point) || isMovableDown(point) || isMovableLeft(point)){
        flag = true;
      }
      break;
    case 7:
      if(isMovableUp(point) || isMovableRight(point)){
        flag = true;
      }
      break;
    case 8:
      if(isMovableUp(point) || isMovableRight(point) || isMovableLeft(point)){
        flag = true;
      }
      break;
    case 9:
      if(isMovableUp(point) || isMovableLeft(point)){
        flag = true;
      }
      break;
  }
  return flag;
}

function colorOn(point, flag){
  let currentCell = document.getElementById(point);
  if(flag == true) {
    currentCell.style.backgroundColor = "Green";
  } else {
    currentCell.style.backgroundColor = "Red";
  }
}

function colorOff(point){
  let currentCell = document.getElementById(point);
  currentCell.style.backgroundColor = "White";
}

function movePiece(point){
  // count up
  count++;
  let counter = document.getElementById("count");
  counter.textContent = "Moves : " + count;
  if(judgeMovable(point)){
    let blankIndex
    for(let i=0; i<randomArr.length; i++){
      if(randomArr[i] == null)
      blankIndex = i;
    };
    randomArr[blankIndex] = randomArr[point-1]
    randomArr[point-1] = null
    for(let i=1; i<10; i++){
      let piece = document.getElementById(i);
      piece.textContent = randomArr[i - 1];
    };
    // Judge game is comleted.
    if(arrEqual(piecesArr, randomArr)){
      alert("Solved!!");
      endGame();
    } else {
      alert("Not Solved!!");
    }
  } else {
    // not Movable is doing nothing.
  }
}

function arrEqual(piecesArr, randomArr) {
  for(let i=0; i<piecesArr.length; i++){
    if(piecesArr[i] != randomArr[i]){
      return false
    }
  };
  return true;
}
