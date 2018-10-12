//인트로 사진
var intro = box().append().size('auto').border(0).image('/assets/566_올림피아드용 인트로.png').timerOnce(Timer , 3000);
//모든걸 담아둔 박스
var origin = box().append().size('auto').border('0').hide();
//제목을 써 놓은 박스
var maintitle = box().appendTo(origin).size(200,'5%').color('white').text('D-day 달력');
//현재 날짜를 가져옴
var d = new Date();
//현재 날짜중 연도를 불러옴
var yeardate = d.getFullYear();
//현재 날짜중 월을 불
var monthdate = d.getMonth();
//현재 날짜중 일자를 불러옴
var daydate = d.getDate();
//월별 날짜의 배열
var lastdays = [31,28,31,30,31,30,31,31,30,31,30,31];
//년,월 표기를 담아주는 상자
var timebox = box().appendTo(origin).size(300,'5%').color('white');
//연도를 나타내주는 박스
var year = box().appendTo(timebox).border(3).borderRadius(3).text(yeardate).size('auto'); 
//'년' 텍스트
var yearback = box().appendTo(timebox).border(0).text('년').size('auto');
//월을 나타내주는 박스
var wall = box().appendTo(timebox).border(3).borderRadius(3).text(monthdate+1).size('auto');
//'월' 텍스트
var backtext = box().appendTo(timebox).border(0).text('월').size('auto');
//월별 배열
var month = [1,2,3,4,5,6,7,8,9,10,11,12];
//배경 박스
var bgbox = box().appendTo(origin).size('80%','70%').border(0);
//일정을 쓰는 박스의 배경
var editBox = box().size('50%').append().hide().positionFixed().center().border(3).color('gray');
//editBox 상단의 뒤로가기,저장,수정(종료),일반(D-day) 변화를 담는 배경 박스
var moBox = box().appendTo(editBox).size('100%', 21).border(0);
//editBox에서 나가기
var backBox = box().size(20).image('back').appendTo(moBox).click(back).border(0).float('left');
//fsBox에 수정 기능 부여
var et = box().appendTo(moBox).size(50,20).color('white').text('수정').click(edit).right(70);
//moBox 하단에 일정 쓰는 목적의 박스
var faBox = box().appendTo(editBox).size('100%',228).border(0);
//editBox에 수정기능 종료
var etend = box().appendTo(moBox).size(50,20).color('white').text('수정완료').textSize(10).right(70).hide().click(editend);
//저장 기능의 박스
var save = box().appendTo(moBox).size(30,20).color("DarkSlateGray").text('저장').textSize(10).textColor('white').left(-60).click(savememo);
//D-day 상태인걸 알려주며, 클릭시 일반화
var ddaybox = box().appendTo(moBox).size(50,20).color('Crimson').text('D-day').textColor('white').left(20).click(ddaymove);
//일반 상태인걸 알려주며, 클릭시 D-day 화
var ddayend = box().appendTo(moBox).size(50,20).color('Crimson').text('일반').textColor('white').click(ddayreturn).left(20).hide().textSize(10);
//월 하나 이동(+)
var forward = box().appendTo(timebox).image("arrow_forward").size(20).left(100).click(plusmonth);
//월 하나 이동(-)
var backward = box().appendTo(timebox).image("arrow_backward").size(20).right(-160).click(minusmonth);
//밑에 D-day 리스트를 나타내주는 박스
var listBox = box().appendTo(origin).size(202,'auto').border(3);

editBox.overflow('hidden', 'auto');
//인트로 작동시 쓰는 타이머
function Timer(bx){
    intro.hide();
    origin.show();
    
}


//월 이동 함수(+)
function plusmonth() {

var plus = wall.text();
var yeart = year.text();

plus++;
if(plus > 12){
    plus=1;
    yeart++;
}
wall.text(plus);
year.text(yeart);
getdays(wall.text());
}



//월 이동 함수(-)
function minusmonth() {
var minus = wall.text();
var yeart2 = year.text();
minus--;
if(minus < 1){
    minus=12;
    yeart2--;
    
}
wall.text(minus);
getdays(wall.text());
year.text(yeart2);    
}
//연도
function years() {

var yearplus = wall.text();
if(yearplus == 1){
    yearplus++;
}
year.text(yearplus);    
}
//editBox 출현
function editBoxshow(bx) {
    faBox.text('');
editBox.show();    
saveday=bx.text();
savemonth=wall.text();
    if(bx.color() == 'MediumBlue') {
    ddaybox.show();
    ddayend.hide();
    }
    
    else {
    ddaybox.hide();
    ddayend.show();
    }

    if(datastore().get(year.text()+wall.text()+saveday)) {
    faBox.text(datastore().get(year.text()+wall.text()+saveday));
    }
}
// editBox에서 나오기
function back(bx) {
editBox.hide();
et.show();
etend.hide();
ddaybox.show();
ddayend.hide();
}
//editBox에 edit 부여
function edit(bx) {
faBox.editable();
et.hide();
etend.show();
}
//editBox edit 해제
function editend(bx) {
et.show();
etend.hide();
faBox.editable('disable');

    
}

//달력의 박스 배열 생성
function getdays(mt) {
    bgbox.clear();
    listBox.clear();
    for(var i = 1; i <= lastdays[mt-1]; i++) {
         var isToday = 0;

        if(i == daydate && year.text() == yeardate && wall.text() == monthdate+1) {
            isToday = 1;
        }
        
        
        var isblue = 0;
        
        for(var j = 0; j < ddayload.length; j++) {
            //day 설정기능 isblue가 1일경우 파랗게 생성 그리고 겹치지 않도록 break
            if(ddayload[j] == year.text()+wall.text()+i){
              isblue=1;
              break;
            }
        }
        if(isToday==1 && isblue ==1){
            var todayBoxblue = box().appendTo(bgbox).size('10%').color('MediumBlue').textColor('orange').text(i).click(editBoxshow).id(i);
             var retVal = confirm('저장해둔 메모를 보시겠습니까?');

             if( retVal == true ){
                 alert(datastore().get(year.text()+wall.text()+i, faBox.text()));
             }else{
                 alert("취소했습니다");
             }   
        }else if(isToday==1){
            var todayBox = box().appendTo(bgbox).size('10%').color('white').textColor('orange').text(i).click(editBoxshow).id(i);
        }else if(isblue ==1){
            var dayBoxcolor = box().appendTo(bgbox).size('10%').color('MediumBlue').textColor('white').text(i).click(editBoxshow).id(i);
            var ddaylist = box().appendTo(listBox).size(200,'auto').text(year.text()+"-"+wall.text()+"-"+i);
        }else
        var dayBox = box().appendTo(bgbox).size('10%').color('white').textColor('black').text(i).click(editBoxshow).id(i);
        
        
        
        }
}

//메모 저장
function savememo() {
 datastore().put(year.text()+wall.text()+saveday , faBox.text());
alert('저장되었습니다');

    
}



var a =[];
//D-day에서 일반적인 날으로 
function ddaymove(bx) {

var dayfind = findBox(saveday);
if(dayfind) {
    dayfind.color('white');
    dayfind.textColor('black');
    ddaybox.hide();
    ddayend.show();
    cancle()
    
    }
   
     
}
//일반적인 날인걸 저장
function cancle(){
    var aaa = datastore().get('dday')

    for(var k=0; k < aaa.length; k++) {
        if(aaa[k] == year.text()+wall.text()+saveday) {
            delete aaa[k];
        } 
    }
    
    datastore().put('dday' , aaa )
    
}



var ddayload = [];

if(datastore().get("dday")){
    ddayload = datastore().get('dday')
}
getdays(1);


//일반적인 날에서 D-day로
function ddayreturn(bx) {
    var dayfind = findBox(saveday);
    if(dayfind) {
     dayfind.color('MediumBlue');
     dayfind.textColor('white');
     ddaybox.show();
     ddayend.hide();
    }
    //D-day인걸 저장
    if(datastore().get("dday")){
    a = datastore().get("dday");
    }
    a.push(year.text()+wall.text()+saveday);
    datastore().put("dday", a);
}