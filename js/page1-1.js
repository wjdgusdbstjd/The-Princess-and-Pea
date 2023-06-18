var bgm = document.getElementById('bgm');
    var bgm2 = document.getElementById('bgm-2');
    var playBtn = document.getElementById('play-btn');

    playBtn.addEventListener('click', function() {
        playBtn.disabled = true; // 버튼 비활성화
        bgm.play(); // 첫 번째 BGM 재생

        setTimeout(function() {
            bgm.pause(); // 첫 번째 BGM 일시정지
            bgm2.play(); // 두 번째 BGM 재생
            playBtn.disabled = false; // 버튼 활성화
        }, 5000); // 5초 후에 실행
    });



    var bgm3 = document.getElementById('bgm-3');
    var bgm4 = document.getElementById('bgm-4');
    var playBtn2 = document.getElementById('play-btn-2');

    playBtn2.addEventListener('click', function() {
        playBtn2.disabled = true; // 버튼 비활성화
        bgm3.play(); // 세 번째 BGM 재생

        setTimeout(function() {
            bgm3.pause(); // 세 번째 BGM 일시정지
            bgm4.play(); // 네 번째 BGM 재생
            playBtn2.disabled = false; // 버튼 활성화
        }, 2000); // 2초 후에 실행
    });

//background-color를 스크롤 위치에 따라 변경하는 스크립트

window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log("현재 스크롤 위치:", scrollTop);
});

// 'container'라는 id를 가진 요소를 선택하고 'container' 변수에 할당합니다.
var bgcontainer = document.getElementById("container");

// 'changeBgColor'라는 함수를 정의하며 'event' 매개변수를 받습니다.
function changeBgColor(event) {
  // 현재 스크롤 위치를 가져옵니다.
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // 스크롤 위치가 1000보다 큰지 확인합니다.
  if (scrollPosition > 11000) {
    // 만약 크다면, 'container' 요소의 배경색을 '#F2ECD6'로 변경합니다.
    bgcontainer.style.backgroundColor = "#D2E6F9";
  } else {
    // 그렇지 않으면, 'container' 요소의 배경색을 '#5B8DE1'로 변경합니다.
    bgcontainer.style.backgroundColor = "#2A2961";
  }
}

// 'container' 요소에 'wheel' 이벤트에 대한 이벤트 리스너를 추가합니다.
// 'wheel' 이벤트가 발생할 때마다 'changeBgColor' 함수가 호출됩니다.
bgcontainer.addEventListener("wheel", changeBgColor);

//------------------------------------------------------------------------------------------------------------
//main페이지의 배경이미지가 person이미지 이동후에 바뀌도록하는 스크립트
var position = 0;
var images = ["./img/bgi1.png", "./img/bgi2.png"];
var index = 0;

$(document).ready(function () {
  //BGM버튼 숨기기
  $("#bgm_btn").hide();
  $("#page-load-btn").hide();

  // 이미지 이동 애니메이션
  $("#person_img").animate({ left: 940 }, 2500, function () {
    // 이미지 이동 애니메이션 완료 후 2초 대기 후 이미지 전환한다
    //setTimeout함수 사용
    setTimeout(function () {
      var imgUrl = images[index];
      $("#background img").not("#person_img").attr("src", imgUrl);
      index = (index + 1) % images.length;

      //BGM버튼 보이게 하기
      $("#bgm_btn").show();
    }, 500); //인자안에 5초 뒤에 이미지가 변경되도록 설정

    setInterval(function () {
      $("#page-load-btn").show();
    }, 600);

    //BGM버튼 클릭시에 음악 재생
    $("#bgm_btn").click(function () {
      var audio = document.getElementById("bgm");
      audio.play();
    });
  });
  position = 240;
});

//------------------------------------------------------------------------------------------------------------
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

  total = Math.floor((innerWidth * innerHeight) / 4000); /*이 값을 조정해서 비 오는 양을 늘리거나 줄일 수 있다*/ 
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

//------------------------------------------------------------------------------------------------------------
//hand요소의 움직임을 구현한 스크립트
const hand = document.querySelector(".hand"); //.hand클래스를 가진 요소를 불러와서 hand라는 변수에 할당한다.
const container = document.querySelector(".finger-container"); //finger-container 불러와 container에 할당한다.

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  console.log(scrollY); //스크롤값을 구하기위함

  if (scrollY > 200 && scrollY < 300) {
    hand.style.left = "-50px"; //스크롤의 위치가 200보다 크고 300보다 작으면 hand요소를 왼쪽 -30px로 설정한다.
  } else if (scrollY >= 300) {
    hand.style.left = "300px"; //스크롤 위치가 300 이상이면 hand의 왼쪽 위치를 200px로 설정한다.
  } else {
    hand.style.left = "100%"; //그렇지 않으면 왼쪽위치를 100%로 설정한다.
  }
});


//------------------------------------------------------------------------------------------------------------
//완두콩 이미지를 스크롤위치에 따라 나타나도록 하는 스크립트

window.addEventListener("scroll", function () {
  var image = document.getElementById("fixed-pea-1"); //fixed-pea-1 이란 id값을 가진 요소를 가져와 image라는 변수에 할당한다.
  var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
  var windowHeight = window.innerHeight; //화면 창의 높이를 가져온다.
  var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.

  if (scrollY >= 2000 && imagePosition - windowHeight <= 0) {
    //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
    image.style.opacity = 1; //이미지의 투명도를 1로 설정해서 이미지가 화면에 보이도록 한다.
  } else {
    image.style.opacity = 0; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
  }

  if (scrollY >= 4500) {
    // 스크롤 위치가 3000 이상인 경우
    image.style.opacity = 0; // 이미지의 투명도를 0으로 설정하여 이미지를 숨긴다.
  }
});

window.addEventListener("scroll", function () {
  var scrollY = window.scrollY; //현재의 스크롤 위치를 가져온다.
  console.log(scrollY); //현재 스크롤 위치를 콘솔창에 출력한다 - 현재 위치 파악
});

//------------------------------------------------------------------------------------------------------------
//침대 이미지 스크롤에 따른 투명도를 조절하는 스크립트

window.addEventListener("scroll", function () {
  var image = document.getElementById("bed-img"); //bed-img 라는 id를 가진 요소를 가져와 image라는 변수에 할당한다.
  var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
  var windowHeight = window.innerHeight; //현재 화면창의 높이를 가져온다.
  var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.

  // if (scrollY + windowHeight >= document.body.scrollHeight) {
  //     // 스크롤이 맨 아래까지 도달한 경우
  //     var opacity = (document.body.scrollHeight - scrollY - windowHeight) / windowHeight;
  //     image.style.opacity = 0.3; //이미지의 투명도를 0.3으로 설정해 흐리게 보이도록 한다.
  // } else {
  //     // 스크롤이 맨 아래까지 도달하지 않은 경우
  //     image.style.opacity = 1; // 이미지를 완전히 보이게 설정
  // }

  if (scrollY >= 2000 && imagePosition - windowHeight <= 0) {
    //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
    image.style.opacity = 0.7;
  } else {
    image.style.opacity = 0; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
  }
});

//------------------------------------------------------------------------------------------------------------
//section-1의 마지막에 등장하는 텍스트 2줄을 스크롤위치에 따라 서서히 등장하도록 하는 스크립트

// window.addEventListener("scroll", function () {
//   var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
//   var targetElement = document.querySelector(".section-1-last-text");

//   if (scrollPosition >= 5000 && scrollPosition < 6800) {
//     // 서서히 등장
//     var opacity = (scrollPosition - 6000) / 800; // 2000px부터 2800px까지 서서히 등장
//     targetElement.style.opacity = opacity;
//     targetElement.style.position = "fixed";
//   } else if (scrollPosition >= 6800) {
//     // 사라짐
//     targetElement.style.opacity = 0;
//     targetElement.style.position = "static"; // 또는 'relative' 등 필요한 스타일로 변경
//   } else {
//     targetElement.style.opacity = 1;
//     targetElement.style.position = "static"; // 초기 상태 설정
//   }
// });

window.addEventListener("scroll", function () {
  var image = document.querySelector(".section-1-last-text"); //bed-img 라는 id를 가진 요소를 가져와 image라는 변수에 할당한다.
  var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
  var windowHeight = window.innerHeight; //현재 화면창의 높이를 가져온다.
  var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.

  if (scrollY >= 5100 && imagePosition - windowHeight <= 0) {
    //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
    image.style.opacity = 1;
    // image.style.position = "fixed";
  } else {
    image.style.opacity = 0; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
    // image.style.position = "absolute";
  }
});

window.addEventListener("scroll", function () {
  var image = document.querySelector(".section-1-last-text-2"); //bed-img 라는 id를 가진 요소를 가져와 image라는 변수에 할당한다.
  var imagePosition = image.getBoundingClientRect().top; //이미지의 상대적인 위치를 가져온다
  var windowHeight = window.innerHeight; //현재 화면창의 높이를 가져온다.
  var scrollY = window.scrollY; //현재 스크롤 위치를 가져온다.

  if (scrollY >= 5600 && imagePosition - windowHeight <= 0) {
    //스크롤 위치가 3000이상이고 이미지가 화면에 보이는 경우에
    image.style.opacity = 1;
    // image.style.position = "fixed";
  } else {
    image.style.opacity = 0; //그렇지 않은 상황에서는 이미지의 투명도를 0으로 설정해서 안보이도록 한다.
    // image.style.position = "absolute";
  }
});

// var circleElement = document.querySelector('.circle-1');

// circleElement.addEventListener('click', function() {
//   circleElement.classList.add('hidden');
// });

// var circleElement2 = document.querySelector('.circle-2');

// circleElement2.addEventListener('click', function() {
//   circleElement2.classList.add('hidden');
// });

//------------------------------------------------------------------------------------------------------------
//buttn클릭시 답변이 제출되었다는 알람을 띄우는 스크립트
var submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function () {
  alert("답변이 제출되었습니다.");
});

//------------------------------------------------------------------------------------------------------------
// circle을 클릭하면 사라지도록 하는 스크립트

var circleElement3 = document.querySelector(".circle-3");

circleElement3.addEventListener("click", function () {
  circleElement3.classList.add("hidden");
});

//------------------------------------------------------------------------------------------------------------
//박수치는 모습을 구현한 스크립트

window.addEventListener("load", function () {
  var hand2 = document.querySelector(".hand-2"); // 이미지를 불러온다.
  var halfViewportHeight = window.innerHeight / 2; // 현재 뷰포트 높이의 절반을 계산한다. - 이미지의 절반이 화면 안에 들어왔는지를 확인하기 위해
  var hand2TopPosition = hand2.getBoundingClientRect().top; // 이미지의 상단 위치 계산
  var originalTransform = hand2.style.transform; // 원래 위치

  function handleScroll() {
    hand2TopPosition = hand2.getBoundingClientRect().top; // 이미지의 상단 위치를 업데이트 한다.
    if (hand2TopPosition <= halfViewportHeight) {
      // 만약 이미지의 절반 이상이 화면 안에 위치하면
      hand2.style.transform = "translateX( -550px)"; // 이미지를 왼쪽으로 400px 이동한다.
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

//------------------------------------------------------------------------------------------------------------
//text-typing 효과를 구현하는 스크립트

const content = "며칠이 지나도 딱맞는 신붓감을 찾지 못해 전전긍긍하던 때, 어느 비바람이 몰아치는 날 밤 누군가 문을 똑똑 하고 두드렸습니다. 그녀는 다름아닌 어느 이웃나라의 공주였습니다.";
const text = document.querySelector(".text-typing");
let index2 = 0;
let typingInterval;

function typing() {
  text.textContent += content[index2++];
  if (index2 >= content.length) {
    clearInterval(typingInterval); // 타이핑이 끝나면 타이머를 멈춥니다.
  }
}

typingInterval = setInterval(typing, 80);



const content2 = "여왕은 곧바로 하인들에게 두터운 침대보와 이불을 준비하라고 지시를 내렸습니다.하인들은 발빠르게 공주의 잠자리를 준비하였고, 그 두터운 이불 맨아래에 완두콩 한알이 놓여졌습니다.";
const text2 = document.querySelector(".text-typing-2");
let index3 = 0;
let typingInterval2;

function typing2() {
  text2.textContent += content2[index3++];
  if (index3 >= content2.length) {
    clearInterval(typingInterval2); // 타이핑이 끝나면 타이머를 멈춥니다.
  }
}

function startTypingOnScroll() {
  typingInterval2 = setInterval(typing2, 80);
  window.removeEventListener("scroll", startTypingOnScroll); // 스크롤 이벤트 리스너를 제거합니다.
}

window.addEventListener("scroll", startTypingOnScroll);





// const image = document.querySelector(".section-4 .background img");

// function fadeInImage() {
//   image.parentElement.style.opacity = "1";
//   image.parentElement.style.top = "0";
// }

// function handleIntersection(entries) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       fadeInImage();
//       observer.unobserve(image);
//     }
//   });
// }

// const options = {
//   rootMargin: "0px",
//   threshold: 0.5,
// };

// const observer = new IntersectionObserver(handleIntersection, options);
// observer.observe(image);


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

  if (scrollY >= 15000) {
    image.style.opacity = 0;
  }
  
});

// window.addEventListener("scroll", function () {
//   var scrollY = window.scrollY; //현재의 스크롤 위치를 가져온다.
//   // console.log(scrollY); //현재 스크롤 위치를 콘솔창에 출력한다 - 현재 위치 파악
// });



window.addEventListener("scroll", function () {
  var image = document.querySelector(".background-2");
  var imagePosition = image.getBoundingClientRect().top;
  var windowHeight = window.innerHeight;
  var scrollY = window.scrollY;

  // if (scrollY >= 13000 && imagePosition - windowHeight <= 0 && scrollY <= 16000) {
  if (scrollY >= 13000 && imagePosition - windowHeight <= 0) {
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




