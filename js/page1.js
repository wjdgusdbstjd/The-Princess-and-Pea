$(document).ready(function() {
    var images = ["./img/bgi1.png", "./img/bgi2.png"];
    var index = 0;
  
    // 이미지 전환
    setTimeout(function() {
      $("#bg1").fadeOut(1000, function() {
        var imgUrl = images[index];
        $("#bg1").attr("src", imgUrl).fadeIn(1000);
        index = (index + 1) % images.length;
      });
    }, 2000);
  
    // 5초 후에 bg1 이미지 숨기기
    setTimeout(function() {
      $("#bg1").fadeOut(1000);
    }, 5000);

  });

//========================================================================================

//배경에 비오는 효과를 구현하는 스크립트

//캔버스요소와 그리기 컨텍스트 선택
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//최소값과 최대값 사이의 랜덤한 숫자를 반환하는 함수
const randomBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};
let total;
let rains = [];

//빗줄기 클래스
class Rain {
  constructor(x, y, velocity) {
    //x와 y를 밖에서 받아와서 this.x와 this.y로 저장한다
    this.x = x; //빗줄기의 x좌표
    this.y = y; //빗줄기의 y좌표
    this.velocity = velocity; //빗줄기의 속도 (velocity)
  }

  //빗줄기를 그리는 메서드
  draw() {
    //가져온 x와y의 값을 draw함수에서 그려준다
    const { x, y, velocity } = this;
    //빗줄기를 그리기 위한 캔버스 그리기 컨텍스트에 관련된 설정
    ctx.beginPath(); //새로운 그리기 경로를 시작
    ctx.moveTo(x, y); //시작점으로 이동
    ctx.lineTo(x + velocity.x * 2, y + velocity.y * 2); //시작점에서 속도에 따라 선을 그림
    ctx.strokeStyle = "#8899a6"; //그려진 선의 색상을 지정
    ctx.lineWhidth = 1.5; //그려진 선의 너비를 지정
    ctx.stroke(); //그려진 선을 그림
    //기본적인 4가지 과정들 beginPath는 path를 그리겠다고 미리 알리고 moveTo로 시작할 x,y좌표를 알리고 이 두 점을 lineTo로 라인을 그리겠다고 알리고 stroke함수로 선을 그려준다는 의미이다.
  }

  //빗줄기를 애니메이션으로 움직이게 하는 메서드
  animate() {
    //빗줄기가 화면 아래로 벗어난 경우 위치를 재설정
    if (this.y > innerHeight) {
      this.x = randomBetween(0, innerWidth);
      this.y = -20;
    }
    //빗줄기의 위치를 속도에 따라 업데이트하고 그림
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

//초기화 작업
function init() {
  //캔버스의 너비와 높이를 현재 창의 너비와 높이로 설정
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  //빗줄기의 총 개수 계산(캔버스 너비 * 캔버스 높이) / 4000
  total = Math.floor(
    (innerWidth * innerHeight) / 4000
  ); /*이 값을 조정해서 비 오는 양을 늘리거나 줄일 수 있다*/
  rains = []; //빗줄기 객체들을 저장하는 배열을 초기화

  //total 개수만큼 반복하여 비 줄기 객체를 생성하고 배열에 추가
  for (let i = 0; i < total; i++) {
    //빗줄기의 x,y좌표를 랜덤하게 생성
    const x = randomBetween(0, innerWidth);
    const y = randomBetween(0, innerHeight);
    //빗줄기의 x,y 속도를 랜덤하게 생성
    const velocity = {
      x: randomBetween(-1, 1),
      y: randomBetween(13, 18),
    };
    rains.push(new Rain(x, y, velocity)); //생성된 빗줄기 객체를 rains배열에 추가
  }
}

//캔버스를 지우고 빗줄기를 애니메이션으로 그리는 함수
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rains.forEach((rain) => rain.animate());

  window.requestAnimationFrame(render);
}

//resize 이벤트 - 윈도우 리사이즈 이벤트가 발생할때 초기화 작업을 수행하는 함수 호출
window.addEventListener("resize", () => init());

//초기화 작업을 수행하고 빗줄기 애니메이션 시작 
init();
render();


//========================================================================================

var bgm = document.getElementById("bgm");
var bgm2 = document.getElementById("bgm-2");
var playBtn = document.getElementById("play-btn");
var isBgmPlaying = false; // BGM 재생 여부를 저장하는 변수

playBtn.addEventListener("click", function () {
  if (!isBgmPlaying) {
    playBtn.disabled = true; // 버튼 비활성화
    bgm.play(); // 첫 번째 BGM 재생

    setTimeout(function () {
      bgm.pause(); // 첫 번째 BGM 일시정지
      bgm2.play(); // 두 번째 BGM 재생
      playBtn.disabled = false; // 버튼 활성화
      isBgmPlaying = true; // BGM 재생 중 상태로 설정
    }, 3000); // 5초 후에 실행
  } else {
    bgm.pause(); // BGM 일시정지
    bgm2.pause(); // BGM2 일시정지
    isBgmPlaying = false; // BGM 재생 중 상태 해제
    playBtn.disabled = false; // 버튼 활성화
  }
});

var bgm3 = document.getElementById("bgm-3");
var bgm4 = document.getElementById("bgm-4");
var playBtn2 = document.getElementById("play-btn-2");
var isBgmPlaying2 = false; // BGM 재생 여부를 저장하는 변수

playBtn2.addEventListener("click", function () {
  if (!isBgmPlaying2) {
    playBtn2.disabled = true; // 버튼 비활성화
    bgm3.play(); // 세 번째 BGM 재생

    setTimeout(function () {
      bgm3.pause(); // 세 번째 BGM 일시정지
      bgm4.play(); // 네 번째 BGM 재생
      playBtn2.disabled = false; // 버튼 활성화
      isBgmPlaying2 = true; // BGM 재생 중 상태로 설정
    }, 2000); // 2초 후에 실행
  } else {
    bgm3.pause(); // BGM3 일시정지
    bgm4.pause(); // BGM4 일시정지
    isBgmPlaying2 = false; // BGM 재생 중 상태 해제
    playBtn2.disabled = false; // 버튼 활성화
  }
});


//========================================================================================

const content =
  "며칠이 지나도 딱맞는 신붓감을 찾지 못해 전전긍긍하던 때, 어느 비바람이 몰아치는 날 밤 누군가 문을 똑똑 하고 두드렸습니다. 그녀는 다름아닌 어느 이웃나라의 공주였습니다.";
const text = document.querySelector(".text-typing");
let index2 = 0;
let typingInterval;

function typing() {
  text.textContent += content[index2++]; //content의 index2번째 문자를 text요소에 추가

  //index2가 content의 길이와 같거나 크다면 타이핑이 끝났으므로 타이핑을 멈춘다
  if (index2 >= content.length) {
    clearInterval(typingInterval); // 타이핑이 끝나면 타이머를 멈춥니다.
  }
}

//50밀리초마다 typing 함수를 호출하여 타이핑을 수행
typingInterval = setInterval(typing, 50);


//========================================================================================

//hand 요소와 container요소 선택
const hand = document.querySelector(".hand");
const container = document.querySelector(".finger-container");

//스크롤 이벤트 리스너 등록
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY; //현재 스크롤 위치
  console.log(scrollY); //스크롤 위치 출력

  //스크롤 위치에 따라 hand요소의 위치 조정
  if (scrollY > 700 && scrollY < 800) {
    const leftPosition = 300 - ((scrollY - 700) * (300 - 0)) / (800 - 700); //스크롤 위치에 따라 leftPosition의 값을 계산
    hand.style.position = "absolute"; //hand요소의 위치와 속성을 설정
    hand.style.left = `${leftPosition}px`;
  } else if (scrollY >= 800) { //스크롤 위치가 800이상인 경우 hand요소를 고정 위치로 설정
    hand.style.position = "absolute";
    hand.style.left = "300px";
  } else { //스크롤 위치가 700미만인 경우 hand요소를 왼쪽 화면 밖으로 이동
    hand.style.position = "absolute";
    hand.style.left = "-100px";
  }
});

window.addEventListener("scroll", function () {
    var image = document.getElementById("fixed-pea-1"); //fixed-pea-1 이란 id값을 가진 요소를 가져와 image라는 변수에 할당한다.
    var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
    var windowHeight = window.innerHeight; //화면 창의 높이를 가져온다.
    var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.
  
    if (scrollY >= 1500 && imagePosition - windowHeight <= 0) {
      //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
      image.style.opacity = 1; //이미지의 투명도를 1로 설정해서 이미지가 화면에 보이도록 한다.
    } else {
      image.style.opacity = 0; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
    }
  
  
    if (scrollY >= 4000) {
      // 스크롤 위치가 3000 이상인 경우
      image.style.opacity = 0; // 이미지의 투명도를 0으로 설정하여 이미지를 숨긴다.
    }
  });
  
  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY; //현재의 스크롤 위치를 가져온다.
    console.log(scrollY); //현재 스크롤 위치를 콘솔창에 출력한다 - 현재 위치 파악
  });
  

  window.addEventListener("scroll", function () {
    var image = document.getElementById("bed-img"); //bed-img 라는 id를 가진 요소를 가져와 image라는 변수에 할당한다.
    var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
    var windowHeight = window.innerHeight; //현재 화면창의 높이를 가져온다.
    var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.
  
    if (scrollY >= 2000 && imagePosition - windowHeight <= 0) {
      //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
      image.style.opacity = 0.7;
    } else {
      image.style.opacity = 0; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
    }
  });


//========================================================================================


window.addEventListener("scroll", function () {
  var image = document.getElementById("black-bed"); //bed-img 라는 id를 가진 요소를 가져와 image라는 변수에 할당한다.
  var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
  var windowHeight = window.innerHeight; //현재 화면창의 높이를 가져온다.
  var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.

  if (scrollY >= 3000 && imagePosition - windowHeight <= 0) {
    //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
    image.style.opacity = 0.7;
  } else {
    image.style.opacity = 1; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
  }
});


//========================================================================================

// typingInterval2 = setInterval(typing2, 50);
const content1 = "여왕은 곧바로 하인들에게 두터운 침대보와 이불을 준비하라고 지시를 내렸습니다. 하인들은 발빠르게 공주의 잠자리를 준비하였고, 그 두터운 이불 맨 아래에 완두콩 한알이 놓여졌습니다.";
const text1 = document.querySelector(".text-typing-2");
let index1 = 0; //타이핑 인덱스
let typingInterval1; //타이버 변수 초기화

//실제로 타이핑을 수행하는 함수
function typing1() {
  text1.textContent += content1[index1++]; //티이핑할 텍스트를 한글자씩 추가
  if (index1 >= content1.length) { 
    clearInterval(typingInterval1); // 타이핑이 끝나면 타이머를 멈춥니다.
  }
}

//스크롤 이벤트가 발생했을 때 타이핑을 시작하는 함수
function startTypingOnScroll() {
  typingInterval1 = setInterval(typing1, 80); //일정한 간격으로 typing1함수를 실행하는 타이머 설정
  window.removeEventListener("scroll", startTypingOnScroll); // 스크롤 이벤트 리스너를 제거합니다.
}

//스크롤 이벤트 리스너를 제거 = 한번만 실핼하기 위함
window.addEventListener("scroll", startTypingOnScroll);


//========================================================================================

const content2 = "그렇게 완두콩은 잠자는 공주의 베개밑에 살포시 놓여졌습니다.";
const text2 = document.querySelector(".text-typing-3");
let index3 = 0;
let typingInterval2;
let isTypingStarted = false;

function startTyping2() {
  if (isTypingStarted) {
    return;
  }

  isTypingStarted = true;
  typingInterval2 = setInterval(typing2, 50);
}

function typing2() {
  text2.textContent += content2[index3++];
  if (index3 >= content2.length) {
    clearInterval(typingInterval2); // 타이핑이 끝나면 타이머를 멈춥니다.
  }
}
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY >= 4700) {
    startTyping2();
  }
});

window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log("현재 스크롤 위치:", scrollTop);
});


//========================================================================================


//베경 컨테이너 요소 선택
var bgcontainer = document.getElementById("container");

//스크롤 이벤트 리스너 등록
function changeBgColor(event) {
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  //스크롤 위치에 따라 배경 색 변경
  if (scrollPosition > 17000) {
    bgcontainer.style.backgroundColor = "#7E6666"; // 마지막 배경색
  } else if (scrollPosition > 10000) {
    bgcontainer.style.backgroundColor = "#D2E6F9";
  } else if (scrollPosition > 5000) {
    bgcontainer.style.backgroundColor = "#4984A6";
  } else {
    bgcontainer.style.backgroundColor = "#141a7a";
  }
}

window.addEventListener("scroll", changeBgColor);


//========================================================================================
  

  window.addEventListener("load", function () {
    var hand2 = document.querySelector(".hand-2"); // 이미지를 불러온다.
    var halfViewportHeight = window.innerHeight / 2; // 현재 뷰포트 높이의 절반을 계산한다. - 이미지의 절반이 화면 안에 들어왔는지를 확인하기 위해
    var hand2TopPosition = hand2.getBoundingClientRect().top; // 이미지의 상단 위치 계산
    var originalTransform = hand2.style.transform; // 원래 위치
  
    function handleScroll() {
      hand2TopPosition = hand2.getBoundingClientRect().top; // 이미지의 상단 위치를 업데이트 한다.
      if (hand2TopPosition <= halfViewportHeight) {
        // 만약 이미지의 절반 이상이 화면 안에 위치하면
        hand2.style.transform = "translateX( -620px)"; // 이미지를 왼쪽으로 400px 이동한다.
      } else {
        hand2.style.transform = originalTransform; // 그렇지 않다면 원래의 이미지 위치로 이동한다.
      }
  
  //박수치는 순간 텍스트가 등장하도록 하는 스크립트
      var textContainer = document.querySelector(".text-container-p"); // 이미지 이동이 끝나고 나타나게 할 텍스트를 불러온다.
  
      if (hand2.style.transform === originalTransform) {
        // 손 이미지의 위치가 원래의 위치라면
        textContainer.style.display = "none"; // 텍스트는 보이지 않는다.
        textContainer.classList.remove("fade-in");
      } else {
        textContainer.style.display = "block"; // 그렇지 않다면 (이미지의 이동이 완료된 상태라면) 텍스트를 보이게 한다.
        textContainer.classList.add("fade-in");
      }
    }
  
    handleScroll(); // 페이지 로드 시 한 번 실행하여 초기 상태를 설정한다.
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 감지 시에 handleScroll 함수를 호출한다.
  });


//========================================================================================
  
  new Rellax('.rellax');


//========================================================================================


let observer = new IntersectionObserver((e) => {
  //IntersectionObserver의 콜백 함수. entries는 관찰 대상 요소의 배열
  e.forEach((박스) => {
    //관찰 대상요소가 화면에 진입한 경우
      if(박스.isIntersecting){
          박스.target.style.opacity = 1; //요소의 투명도를 1로 설정
          박스.target.style.transform = "translateY(-160px)"; //요소를 위로 160px이동
      }else{ // 관찰 대상 요소가 화면에서 벗어난 경우
          박스.target.style.opacity = 0; //요소의 투명도를 0으로 설정
          박스.target.style.transform = "translateY(0)"; //요소를 원래 위치로 이동
      }
      //console.log("박스")
  })
})

let divs = document.querySelectorAll('.p-1');
divs.forEach((div) => {
  observer.observe(div); //각 div요소를 관찰 대상으로 등록
});


//========================================================================================


let imgobserver = new IntersectionObserver((e) => {
  e.forEach((img) => {
      if(img.isIntersecting){
        img.target.style.transform = "translateX(-1600px)";
      }else{
        img.target.style.transform = "translateX(0)";
      }
      //console.log("박스")
  })
})

let img = document.querySelector('.persons-img');
imgobserver.observe(img);


//========================================================================================


let imgobserver2 = new IntersectionObserver((e) => {
  e.forEach((img) => {
      if(img.isIntersecting){
        img.target.style.transform = "translateX(1600px)";
      }else{
        img.target.style.transform = "translateX(0)";
      }
      //console.log("박스")
  })
})

let img2 = document.querySelector('.persons-img-2');
imgobserver2.observe(img2);


//========================================================================================


let pea = new IntersectionObserver((e) => {
  e.forEach((pea) => {
      if(pea.isIntersecting){
        pea.target.style.transform = "translateX(1600px)";
        pea.target.classList.add('animate');
      }else{
        pea.target.style.transform = "translateX(0)";
        pea.target.classList.remove('animate');
      }
      //console.log("박스")
  })
})

let peaimg = document.querySelector('.pea-3');
pea.observe(peaimg);


//========================================================================================



let textobserver = new IntersectionObserver((e) => {
  e.forEach((textobserver) => {
      if(textobserver.isIntersecting){
        textobserver.target.style.transform = "scale(1.5)";
      }else{
        textobserver.target.style.transform = "scale(1)";
      }
      //console.log("박스")
  })
})

let h1 = document.querySelector('.text-effect');
textobserver.observe(h1);


//========================================================================================

window.addEventListener("scroll", function () {
  var image = document.querySelector(".background"); //fixed-pea-1 이란 id값을 가진 요소를 가져와 image라는 변수에 할당한다.
  var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
  var windowHeight = window.innerHeight; //화면 창의 높이를 가져온다.
  var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.

  if (scrollY >= 12000 && imagePosition - windowHeight <= 0) {
    //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
    image.style.opacity = 1; //이미지의 투명도를 1로 설정해서 이미지가 화면에 보이도록 한다.
    image.style.position = "fixed";
    image.style.top = "-50px";
    image.style.left = "0";
  } else {
    image.style.opacity = 0; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
  }

  if (scrollY >= 14000) {
    image.style.opacity = 0;
  }
  
});


//========================================================================================

window.addEventListener("scroll", function () {
  var image = document.querySelector(".wedding");
  var imagePosition = image.getBoundingClientRect().top;
  var windowHeight = window.innerHeight;
  var scrollY = window.scrollY;

  // if (scrollY >= 13000 && imagePosition - windowHeight <= 0 && scrollY <= 16000) {
  if (scrollY >= 12000 && imagePosition - windowHeight <= 0) {
    // 스크롤 위치가 13000 이상이고 이미지가 화면에 보이는 경우에
    image.style.opacity = 1;
    image.style.position = "fixed";
    image.style.top = "0";
    image.style.left = "0";
  } else {
    image.style.opacity = 0;
    image.style.position = "absolute";
    image.style.top = "0";
    image.style.left = "0";
  }

  if (scrollY >= 15000) {
    image.style.opacity = 0;
  }
});


//========================================================================================


const background2BlackImg = document.querySelector('.background-2-black');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY >= 14000) { //스크롤 위치가 14000 이상인 경우에 실행
    const opacity = (scrollY - 14000) / 100; // 원하는 속도 및 변화에 따라 조정
    background2BlackImg.style.opacity = opacity; //이미지의 투명도 설정
  } 
});

//========================================================================================


const background2BlackImg2 = document.querySelector('.background-2');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY >= 14000) {
    const opacity = (scrollY - 14000) / 0; // 원하는 속도 및 변화에 따라 조정
    background2BlackImg.style.opacity = opacity;
  }
});


//========================================================================================


window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;

  if (scrollPosition >= 18080) {
    var image = document.querySelector('.small-pea');
    image.style.width = '600px';
    image.style.opacity = '1';
  } else {
    var image = document.querySelector('.small-pea');
    image.style.width = '44px';
    image.style.opacity = '0';
  }
});


//========================================================================================
