/* =========================
   국악기 데이터
========================= */

const instruments = [
    {
        name: "장구",
        file: "audio/janggu.mp3"
    },
    {
        name: "북",
        file: "audio/buk.mp3"
    },
    {
        name: "가야금",
        file: "audio/gayageum.mp3"
    },
    {
        name: "해금",
        file: "audio/haegeum.mp3"
    },
    {
        name: "대금",
        file: "audio/daegeum.mp3"
    }
];

/* =========================
   장단 데이터
========================= */

const rhythms = [
    {
        name: "세마치",
        file: "audio/semachi.mp3"
    },
    {
        name: "자진모리",
        file: "audio/jajinmori.mp3"
    },
    {
        name: "굿거리",
        file: "audio/gutgeori.mp3"
    }
];

/* =========================
   현재 문제
========================= */

let currentInstrument = "";
let currentRhythm = "";
let concertCount = 0;

/* =========================
   배지 상태
========================= */

const badges = {
    instrument: false,
    rhythm: false,
    chuimsae: false,
    concert: false
};

/* =========================
   화면 전환
========================= */

function showStage(id){

    const stages =
        document.querySelectorAll(".stage");

    stages.forEach(stage=>{
        stage.classList.add("hidden");
    });

    document
        .getElementById(id)
        .classList.remove("hidden");
}

/* =========================
   국악기 탐정
========================= */

function playInstrumentSound(){

    const random =
        instruments[
            Math.floor(
                Math.random() *
                instruments.length
            )
        ];

    currentInstrument =
        random.name;

    const audio =
        new Audio(random.file);

    audio.play();
}

function checkInstrument(answer){

    const result =
        document.getElementById(
            "instrumentResult"
        );

    if(answer === currentInstrument){

        result.textContent =
            "🎉 정답입니다!";

        unlockBadge(
            "instrument"
        );

    }else{

        result.textContent =
            "❌ 다시 도전해 보세요!";
    }
}

/* =========================
   장단 마스터
========================= */

function playRhythmSound(){

    const random =
        rhythms[
            Math.floor(
                Math.random() *
                rhythms.length
            )
        ];

    currentRhythm =
        random.name;

    const audio =
        new Audio(random.file);

    audio.play();
}

function checkRhythm(answer){

    const result =
        document.getElementById(
            "rhythmResult"
        );

    if(answer === currentRhythm){

        result.textContent =
            "🥁 정답입니다!";

        unlockBadge(
            "rhythm"
        );

    }else{

        result.textContent =
            "❌ 다시 도전해 보세요!";
    }
}

/* =========================
   추임새 챌린지
========================= */

function startChuimsae(){

    const audio =
        document.getElementById(
            "pansori"
        );

    audio.currentTime = 0;
    audio.play();

    document
        .getElementById(
            "chuimsaeResult"
        )
        .textContent =
        "적절한 순간에 추임새를 넣어 보세요!";
}

function giveChuimsae(word){

    document
        .getElementById(
            "chuimsaeResult"
        )
        .textContent =
        "👏 " + word + "!";

    unlockBadge(
        "chuimsae"
    );
}

/* =========================
   공연 완성
========================= */

function playConcert(name){

    concertCount++;

    const audio =
        new Audio(
            "audio/" +
            name +
            ".mp3"
        );

    audio.play();

    if(concertCount >= 5){

        unlockBadge(
            "concert"
        );
    }
}

/* =========================
   배지 획득
========================= */

function unlockBadge(type){

    if(badges[type]){
        return;
    }

    badges[type] = true;

    const badgeMap = {

        instrument:
        "badgeInstrument",

        rhythm:
        "badgeRhythm",

        chuimsae:
        "badgeChuimsae",

        concert:
        "badgeConcert"
    };

    const badge =
        document.getElementById(
            badgeMap[type]
        );

    badge.classList.remove(
        "locked"
    );

    badge.classList.add(
        "unlocked"
    );

    updateBadgeCount();

    checkMaster();
}

/* =========================
   배지 개수
========================= */

function updateBadgeCount(){

    const count =
        Object.values(
            badges
        ).filter(
            value => value
        ).length;

    document
        .getElementById(
            "badgeCount"
        )
        .textContent =
        count + " / 4";
}

/* =========================
   인증서 확인
========================= */

function checkMaster(){

    const complete =
        badges.instrument &&
        badges.rhythm &&
        badges.chuimsae &&
        badges.concert;

    if(complete){

        document
            .getElementById(
                "certificate"
            )
            .classList.remove(
                "hidden"
            );

        setTimeout(()=>{

            alert(
                "👑 축하합니다!\n\n국악 마스터가 되었습니다!"
            );

        },300);
    }
}

/* =========================
   시작 시 인증서 숨기기
========================= */

window.onload = function(){

    document
        .getElementById(
            "certificate"
        )
        .classList.add(
            "hidden"
        );
};