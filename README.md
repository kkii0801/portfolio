# Portfolio
사용된 도구 : JavaScript, Swiper, GSAP, Lenis, HTML, CSS <br />
:point_right: [Portfolio](https://kkii0801.github.io/portfolio/)

***

## 주요 인터렉션 설명

1. 스크롤시 회전하는 particle 구현하기 
2. Swiper 스왑시 배경 이미지 변경하기
3. 특정 해상도에서 Swiper로 구동하기

***

## 스크롤시 회전하는 particle 구현하기 

### 작동 예시
<div align="center"><img src=""></div>

### 코드 설명
```
let clover=document.querySelector("#start .deco");

gsap.utils.toArray(".deco img").forEach(particle => {
		gsap.to(particle, {
			rotation: 360,
			ease: "linear",
			duration: 2.5,
			scrollTrigger: {
			trigger: "#start",
			start: "top top",
			end: "bottom top",
			scrub: 1.5
			}
		});
});
```
#start라는 ID를 가진 요소 내에 있는 .deco 클래스를 가진 요소를 선택합니다.<br />
선택자를 사용하여 모든 이미지 요소를 배열로 변환하고, 각 이미지에 대해 반복 처리를 합니다. <br /><br />

각 이미지에 대해 다음과 같은 애니메이션을 설정합니다. <br />
- rotation: 360: 이미지를 360도 회전시킵니다. <br />
- ease: "linear": 애니메이션의 속도를 일정하게 유지합니다. <br />
- duration: 2.5: 회전하는 데 2.5초가 걸립니다. <br />
- scrollTrigger: 스크롤에 반응하는 설정을 지정합니다. <br />
- trigger: "#start": #start 요소가 스크롤 트리거입니다. <br />
- start: "top top": 뷰포트의 상단과 #start 요소의 상단이 일치할 때 애니메이션이 시작됩니다. <br />
- end: "bottom top": #start 요소의 하단에 도달할 때 애니메이션이 끝납니다. <br />
- scrub: 1.5: 스크롤과 애니메이션의 동기화를 위해 1.5초의 지연을 줍니다. <br /><br />

위와 같이 작성함으로써, 페이지를 스크롤할 때 이미지가 부드럽게 회전하는 효과를 만들어 줍니다.
***

## Swiper 스왑시 배경 이미지 변경하기

### 작동 예시
<div align="center"><img src=""></div>

### 코드 설명
```
let img_bg=document.querySelectorAll("#page3 ul li");
```
#page3 요소 내의 모든 리스트 항목(li)를 선택하여 img_bg 변수에 저장합니다.<br />
이 요소들은 슬라이드와 관련된 배경을 나타냅니다.
```
function backgroundAnimation(i){
  img_bg.forEach((item, j) => {
    if(j==i){
      item.classList.add("active");
    }
    else{
      item.classList.remove("active");
    }
  });
}
```
backgroundAnimation 함수는 인자로 받은 인덱스 i에 따라 img_bg의 각 항목에 active 클래스를 추가하거나 제거합니다. <br />
j가 i와 같을 때 해당 항목에 active 클래스를 추가하고, 그렇지 않으면 클래스를 제거합니다. 이로 인해 현재 슬라이드에 해당하는 배경만 활성화됩니다.
```
const mainSwiper=new Swiper(".mainSwiper", {
  speed: 800,
  loop: true,
  // autoplay: {
  // 	delay: 4000,
  // },
  breakpoints: {
    350: {
      slidesPerView: 1,
      spaceBetween: 5
    },
    700: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    900: {
      slidesPerView: 2.5,
      spaceBetween: 30
    }
  },
  on: {
    init: function(){
      backgroundAnimation(i);
    },
    slideChange: function(){
      i=this.realIndex;
      backgroundAnimation(i);
    }
  }
});
```
on 옵션으로 두 가지 이벤트를 처리합니다. <br />
init: 슬라이더가 초기화될 때 backgroundAnimation(i)를 호출하여 현재 슬라이드에 맞는 배경을 설정합니다. <br />
slideChange: 슬라이드가 변경될 때 this.realIndex를 통해 현재 슬라이드의 인덱스를 가져와 backgroundAnimation(i)를 호출하여 배경을 업데이트합니다. <br />
위와 같이 작성함으로써, 슬라이드 변경 시 배경 요소가 자연스럽게 변경되는 효과를 제공합니다.
***

## 특정 해상도에서 Swiper로 구동하기

### 작동 예시
<div align="center"><img src=""></div>

### 코드 설명
```
let con4List=document.querySelectorAll("#page4 .content ul li");
let page4Tl = null;

function resetPositions() {
  con4List.forEach(item => {
    gsap.set(item, { yPercent: 0 });
  });
}
```
resetPositions 함수는 con4List의 모든 항목을 yPercent: 0으로 설정하여 초기 위치를 리셋합니다. <br />
이는 애니메이션이 항상 시작할 수 있는 상태로 만듭니다.
```
function page4Tlinit(){

  if(!isMobile){
    if (page4Tl) {
          page4Tl.kill();
    }

    resetPositions();

    page4Tl=gsap.timeline({
      scrollTrigger: {
        trigger: "#page4",
        start: "top center",
        end: "bottom-=50% top",
        scrub: true,
      }
    })
```
page4Tlinit 함수는 타임라인을 초기화합니다. <br /> 
!isMobile 조건을 통해 모바일 환경이 아닐 경우에만 애니메이션을 설정합니다. <br />
이미 존재하는 타임라인이 있으면 kill() 메서드를 사용하여 해당 타임라인을 종료합니다.
```
      page4Tl.from(con4List[0], { yPercent: 100 })
      page4Tl.from(con4List[1], { yPercent: 130 }, '-=100%')
      page4Tl.from(con4List[2], { yPercent: 160 }, '-=100%')
      page4Tl.from(con4List[3], { yPercent: 190 }, '-=100%')
      page4Tl.from(con4List[4], { yPercent: 220 }, '-=100%')
      page4Tl.from(con4List[5], { yPercent: 250 }, '-=100%')
      page4Tl.from(con4List[6], { yPercent: 280 }, '-=100%')
      page4Tl.from(con4List[7], { yPercent: 310 }, '-=100%')
  }
```
각 리스트 항목에 대해 from 메서드를 사용하여 애니메이션을 설정합니다. <br />
각 항목은 yPercent 값을 통해 아래에서 위로 올라오는 애니메이션을 적용받습니다. yPercent 값이 클수록 더 아래에서 시작하게 됩니다. <br />
'-=100%'를 사용하여 이전 애니메이션과 겹치게 시작합니다. 즉, 첫 번째 항목이 애니메이션을 시작하는 동안 다음 항목이 조금씩 겹쳐서 올라옵니다.
```
  else{
    if (page4Tl) {
          page4Tl.kill();
          page4Tl = null;
    }
    resetPositions();
  }	
}
```
모바일 환경일 경우, 타임라인을 종료하고 page4Tl을 null로 설정한 후 위치를 초기화합니다. <br />
이는 모바일에서 애니메이션을 비활성화하기 위한 설정입니다.
```
page4Tlinit();

window.addEventListener("resize", page4Tlinit);
```
페이지가 로드될 때 page4Tlinit() 함수를 호출하여 타임라인을 초기화합니다. <br />
또한, 윈도우의 크기가 변경될 때마다 page4Tlinit()을 호출하여 적절한 애니메이션을 설정하도록 합니다. <br />
위와 같이 작성함으로써, 스크롤할 때 리스트 항목들이 부드럽게 올라오는 애니메이션을 제공하며, 화면 크기에 따라 모바일 환경에서는 애니메이션을 비활성화합니다.

