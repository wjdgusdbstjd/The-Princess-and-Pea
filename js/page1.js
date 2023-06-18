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

//배경에 비오는 효과를 구현하는 스크립트

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const randomBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};
let total;
let rains = [];

//빗줄기 클래스
class Rain {
  constructor(x, y, velocity) {
    //x와 y를 밖에서 받아와서
    this.x = x; //this.x와 this.y로 저장한다
    this.y = y;
    this.velocity = velocity;
  }

  draw() {
    //가져온 x와y의 값을 draw함수에서 그려준다
    const { x, y, velocity } = this;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + velocity.x * 2, y + velocity.y * 2);
    ctx.strokeStyle = "#8899a6";
    ctx.lineWhidth = 1.5;
    ctx.stroke();
    //기본적인 4가지 과정들 beginPath는 path를 그리겠다고 미리 알리고 moveTo로 시작할 x,y좌표를 알리고 이 두 점을 lineTo로 라인을 그리겠다고 알리고 stroke함수로 선을 그려준다는 의미이다.
  }

  animate() {
    if (this.y > innerHeight) {
      this.x = randomBetween(0, innerWidth);
      this.y = -20;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

//초기화 작업
function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  total = Math.floor(
    (innerWidth * innerHeight) / 4000
  ); /*이 값을 조정해서 비 오는 양을 늘리거나 줄일 수 있다*/
  rains = [];

  for (let i = 0; i < total; i++) {
    const x = randomBetween(0, innerWidth);
    const y = randomBetween(0, innerHeight);
    const velocity = {
      x: randomBetween(-1, 1),
      y: randomBetween(13, 18),
    };
    rains.push(new Rain(x, y, velocity));
  }
}

//렌더 함수
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rains.forEach((rain) => rain.animate());

  window.requestAnimationFrame(render);
}

//resize 이벤트
window.addEventListener("resize", () => init());

init();
render();

//--------------------------------------------------------
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


//--------------------------------------------------------

const content =
  "며칠이 지나도 딱맞는 신붓감을 찾지 못해 전전긍긍하던 때, 어느 비바람이 몰아치는 날 밤 누군가 문을 똑똑 하고 두드렸습니다. 그녀는 다름아닌 어느 이웃나라의 공주였습니다.";
const text = document.querySelector(".text-typing");
let index2 = 0;
let typingInterval;

function typing() {
  text.textContent += content[index2++];
  if (index2 >= content.length) {
    clearInterval(typingInterval); // 타이핑이 끝나면 타이머를 멈춥니다.
  }
}

typingInterval = setInterval(typing, 50);


//--------------------------------------------------------

const hand = document.querySelector(".hand");
const container = document.querySelector(".finger-container");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  console.log(scrollY);

  if (scrollY > 700 && scrollY < 800) {
    const leftPosition = 300 - ((scrollY - 700) * (300 - 0)) / (800 - 700);
    hand.style.position = "absolute";
    hand.style.left = `${leftPosition}px`;
  } else if (scrollY >= 800) {
    hand.style.position = "absolute";
    hand.style.left = "300px";
  } else {
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

//============================================================================

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


// typingInterval2 = setInterval(typing2, 50);
const content1 = "여왕은 곧바로 하인들에게 두터운 침대보와 이불을 준비하라고 지시를 내렸습니다. 하인들은 발빠르게 공주의 잠자리를 준비하였고, 그 두터운 이불 맨 아래에 완두콩 한알이 놓여졌습니다.";
const text1 = document.querySelector(".text-typing-2");
let index1 = 0;
let typingInterval1;

function typing1() {
  text1.textContent += content1[index1++];
  if (index1 >= content1.length) {
    clearInterval(typingInterval1); // 타이핑이 끝나면 타이머를 멈춥니다.
  }
}

function startTypingOnScroll() {
  typingInterval1 = setInterval(typing1, 80);
  window.removeEventListener("scroll", startTypingOnScroll); // 스크롤 이벤트 리스너를 제거합니다.
}

window.addEventListener("scroll", startTypingOnScroll);




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

var bgcontainer = document.getElementById("container");

function changeBgColor(event) {
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollPosition > 17000) {
    bgcontainer.style.backgroundColor = "#7E6666"; // 분홍색으로 변경
  } else if (scrollPosition > 10000) {
    bgcontainer.style.backgroundColor = "#D2E6F9";
  } else if (scrollPosition > 5000) {
    bgcontainer.style.backgroundColor = "#4984A6";
  } else {
    bgcontainer.style.backgroundColor = "#141a7a";
  }
}

window.addEventListener("scroll", changeBgColor);

  

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

  
  new Rellax('.rellax');


// new IntersectionObserver(()=>{})
// observer.observer()



let observer = new IntersectionObserver((e) => {
  e.forEach((박스) => {
      if(박스.isIntersecting){
          박스.target.style.opacity = 1;
          박스.target.style.transform = "translateY(-160px)";
      }else{
          박스.target.style.opacity = 0;
          박스.target.style.transform = "translateY(0)";
      }
      //console.log("박스")
  })
})

let divs = document.querySelectorAll('.p-1');
divs.forEach((div) => {
  observer.observe(div);
});


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


const background2BlackImg = document.querySelector('.background-2-black');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY >= 14000) {
    const opacity = (scrollY - 14000) / 100; // 원하는 속도 및 변화에 따라 조정
    background2BlackImg.style.opacity = opacity;
  }
});

const background2BlackImg2 = document.querySelector('.background-2');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY >= 14000) {
    const opacity = (scrollY - 14000) / 0; // 원하는 속도 및 변화에 따라 조정
    background2BlackImg.style.opacity = opacity;
  }
});



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

