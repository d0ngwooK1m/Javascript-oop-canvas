const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const control = document.querySelector('.control');
const saveBtn = document.querySelector('.save-btn');
const eraserBtn = document.querySelector('.eraser-btn');
const clearBtn = document.querySelector('.clear-btn');
const resultImage = document.querySelector('.result-image');
let drawingMode = false; // true 일 때만 그리기
let drawingTool = 'pen';
let colorVal = 'black' // 색상

const chooseDrawingTool = (e) => {
   if (drawingTool === 'pen') {
      context.globalCompositeOperation = 'source-over';
      context.beginPath();
      context.arc(e.layerX, e.layerY, 10, 0, Math.PI * 2, false);
      context.fill();
   } else if (drawingTool === 'eraser') {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(e.layerX, e.layerY, 10, 0, Math.PI * 2, false);
      context.fill();
   }
};

//마우스 클릭 시 그리기 허용, 점 하나 찍기
canvas.addEventListener('mousedown', (e) => {
   drawingMode = true;
   chooseDrawingTool(e);
});

//마우스가 클릭 된 상태에서 움직일 시 그리기 허용
canvas.addEventListener('mousemove', (e) => {
   // console.log(e.layerX, e.layerY);
   if(!drawingMode) return;
   chooseDrawingTool(e);
});

//마우스 클릭이 없는 상태에서 움직일 시 그려지지 않게끔 하는 기능
canvas.addEventListener('mouseup', () => {
   drawingMode = false;
});

//색깔 버튼 클릭 시 해당 색깔로 바꾸기, 펜 기능으로 바꾸기 getAttribute 이용한 이벤트 위임 활용
control.addEventListener('click', (e) => {
   // console.log(e.target.getAttribute('data-color'));
   colorVal = e.target.getAttribute('data-color');
   context.fillStyle = colorVal;
   drawingTool = 'pen';
});

//지우개 버튼 클릭시 지우개 기능으로 바꾸기
eraserBtn.addEventListener('click', () => {
   drawingTool = 'eraser';
});

//클리어 버튼 클릭시 화면 클리어
clearBtn.addEventListener('click', () => {
   context.clearRect(0, 0, canvas.width, canvas.height);
});

//이미지 저장
saveBtn.addEventListener('click', () => {
   const url = canvas.toDataURL('image/png');
   // console.log(url);
   const imgElem = new Image();
   imgElem.src = url;
   resultImage.appendChild(imgElem);
});