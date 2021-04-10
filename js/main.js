let p = Start();
Btn_sousa();
let bgm = new Audio();

const enemies = [
  { name: "スライム", hp: 10 },
  { name: "こうもり", hp: 20 },
  { name: "魔法使い", hp: 30 },
  { name: "ゴーレム", hp: 40 },
  { name: "ドラゴン", hp: 50 },
];

function Start() {
  const syuzinkou = [
    { name: "もょもと", hp: 30 },
    { name: "アベル", hp: 50 },
    { name: "N島", hp: 100 },
  ];
  let n = Math.floor(Math.random() * syuzinkou.length);
  const yuusya = new Player(syuzinkou[n].name, syuzinkou[n].hp);

  let comment = document.getElementById('comment');
  comment.innerHTML = yuusya.name + "(HP:" + yuusya.hp + ")" + "は魔王を倒すべく進む";
  console.log(yuusya);
  return yuusya;
}

function Btn_sousa() {
  const saiyomikomi_btn = document.getElementById('saiyomikomi_btn');
  saiyomikomi_btn.addEventListener('click', Reload);
  const battle_btn = document.getElementById('battle_btn');
  battle_btn.addEventListener('click', FirstBattle);
}

function FirstBattle() {
  let nyuuryokuti = GetRedio();

  ClearSetu();
  ClearMons();
  Encounter(nyuuryokuti);
}

function LastBattle() {
  let last_enemy_list = [
    { name: "魔法使い", hp: 30 },
    { name: "ドラゴン", hp: 50 },
    { name: "魔王", hp: 100 },
    { name: "ドラゴン", hp: 50 },
    { name: "ゴーレム", hp: 40 },
  ];

  // let bgm = new Audio();
  bgm.src = "bgm/魔王魂  オルゴール09.mp3";// bgm追加
  bgm.play();// bgm追加
  bgm.loop = true;// bgm追加

  let enemy = [];
  last_enemy_list.forEach(e => {
    enemy.push(new Monster(e.name, e.hp));
  });

  return enemy;
}

function Reload() {
  window.location.reload();
}


function GetRedio() { // ラジオボタン
  let target = document.getElementById("target");
  let s = target.hoge.value
  // console.log(s);
  return s;
}

function Rensen() {
  ClearMons();
  Encounter('random');
}

function ClearMons() {
  const monsters = document.getElementById('monsters');
  while (monsters.firstChild) {
    monsters.removeChild(monsters.firstChild);
  };
}

function ClearSetu() {
  let setumei = document.getElementById('setumei');
  setumei.remove();
}

function Encounter(x) {
  console.log(x);
  let ninzuu = 0;
  if (x === 'random') ninzuu = Math.floor(Math.random() * 6) + 1;
  if (x === 'absolutely_zako') ninzuu = Math.floor(Math.random() * 5) + 1;
  if (x === 'absolutely_maou') ninzuu = 6;
  // ninzuu = 6; // 魔王戦強制フラグ

  let enemy_list = [];
  if (ninzuu === 6) {
    enemy_list = LastBattle();
    comment.innerHTML = "魔王戦！</br>" + "絶対に負けられない戦いです！</br>";
  } else {
    bgm.src = "bgm/魔王魂 旧ゲーム音楽 ダンジョン19.mp3";// bgm追加
    bgm.play();// bgm追加
    bgm.loop = true;// bgm追加
    comment.innerHTML = "";
    for (let i = 0; i < ninzuu; i++) {
      let n = Math.floor(Math.random() * enemies.length);
      enemy_list.push(new Monster(enemies[n].name, enemies[n].hp));
      comment.innerHTML += enemy_list[i].name + "が現れた！</br>";
    }
  }
  return enemy_list;
}

function fadeIn(className, time) {
  className.animate(
    // キーフレーム
    [
      { opacity: 0 },     // 最初の状態 (非表示)
      { opacity: 1 }      // 最後の状態（表示）
    ],
    // 1500   // 2000ミリ秒の長さでアニメーションを実行
    // オプション
    {
      duration: time,      // アニメが終了するまでの時間(ミリ秒)
      fill: 'forwards',    // アニメ完了後に最初の状態に戻さない
    }
  );
}

function fadeOut(className, time) {
  className.animate(
    // キーフレーム
    [
      { opacity: 1 },    // 最後の状態（表示）
      { opacity: 0 }     // 最初の状態 (非表示)
    ],
    // 1500   // 2000ミリ秒の長さでアニメーションを実行
    // オプション
    {
      duration: time,      // アニメが終了するまでの時間(ミリ秒)
      fill: 'forwards'    // アニメ完了後に最初の状態に戻さない
    }
  );
}

function BattleEnd() {
  ClearMons();
  let monsters = document.getElementById('monsters');
  let syouri = document.createElement('img');
  syouri.src = "img/ダンジョン.png";
  syouri.className = "syouri";
  monsters.appendChild(syouri);
  fadeIn(syouri, 1500);
  setTimeout(function () {
    // ～何かの処理～
    syouri.addEventListener('click', Rensen);
  }, 1500);

  comment.innerHTML += "</br>俺たちの戦いはこれからだ…！";// 通常戦闘時
}

function Ending(n) {
  ClearMons();
  const monsters = document.getElementById('monsters');
  const end = document.createElement('img');

  let kome = ["",
    "エンディング",
    "終わり",
  ];
  // end.id = "end1";
  end.src = "img/エンディング" + n + ".png";
  end.className = "end";
  monsters.appendChild(end);
  fadeIn(end, 1500);
  setTimeout(function () {
    // ～何かの処理～
    fadeOut(end, 3500);
    comment.innerHTML = kome[n];
  }, 3000);
  // comment.innerHTML += "</br>世界に平和が訪れた☆";// 魔王戦終了時
}
