class Monster {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;

        this.damage_point = 0;
        this.alive = true;

        
        this.Init();
    }
    
    Init() {
        let comment = document.getElementById('comment');
        
        let monsters = document.getElementById('monsters');
        
        let sitai = document.getElementsByClassName('nodisp');
        let renda = document.getElementsByClassName('renda');
        let maou = document.getElementsByClassName('maou');

        let music = new Audio(); //効果音追加

        this.ref = document.createElement('img');
        this.ref.src = "img/" + this.name + ".png";
        this.ref.classList.add("renda");// 連打クラスを付ける
        if (this.name === '魔王') {
            this.ref.classList.add("maou");// 魔王クラスを付ける
        }
        monsters.appendChild(this.ref);

        this.ref.addEventListener('click', () => {
            // 魔王戦のダメージ調整
            if (this.name === '魔王' && sitai.length !== 4) {
                this.damage(this.damage_point * 0);
                comment.innerHTML = "取り巻きに攻撃を阻まれた！<br>全然効いてない！";
            } else {
                this.damage_point = Math.floor(Math.random() * 5) + 1;
                this.damage(this.damage_point);
            }
        });

        this.ref.addEventListener('animationend', () => {
            monsters.classList.remove("noclick"); // 攻撃可能状態に戻る

            this.ref.classList.remove("damage_motion");
            this.ref.classList.remove("kaisin_motion");
            this.ref.classList.remove("mukou_motion");// 無効モーション追加


            if (!this.alive) {
                this.ref.classList.add("nodisp");
                comment.innerHTML += this.name + "をやっつけた！<br>";
                // 勝利時コメントを追加
                if (renda.length === sitai.length) {
                    // bgm.stop();// bgm追加
                    bgm.pause();// bgm追加
                    bgm.currentTime = 0;// bgm追加
                    bgm.src = "bgm/魔王魂 旧ゲーム音楽 ダンジョン11.mp3";// bgm追加
                    bgm.play();// bgm追加
                    bgm.loop = true;// bgm追加

                    comment.innerHTML += "戦闘に勝利した！";
                    if (maou.length === 1) {
                        comment.innerHTML += "<br>世界に平和が訪れた☆";// 魔王戦終了時

                        Ending(1);
                        setTimeout(function () {
                            // ～何かの処理～
                            Ending(2);
                        }, 8000);
                    } else {
                        BattleEnd();
                    }
                }
                // console.log(sitai.length);
                // console.log(renda.length);
            }else{
                let n = Math.floor(Math.random() * 5) + 1;
                if(this.name === '魔王') n *= 2;
                p.damage(this.name, n);

            }
        });
    }

    damage(damage) {
        comment.innerHTML = "";

        let sitai = document.getElementsByClassName('nodisp');// 死体クラス追加
        
        let music = new Audio(); //効果音追加

        let r = Math.floor(Math.random() * 2);
        if (this.name === '魔王' && sitai.length !== 4) { // 魔王無効時
            music.src = "bgm/魔王魂  銃05.mp3"; // 効果音
            music.play();
            this.ref.classList.add("mukou_motion");
            monsters.classList.add("noclick"); // 攻撃不可
        } else if (r == 0) {
            music.src = "bgm/魔王魂  爆発06.mp3"; // 効果音
            music.play();
            comment.innerHTML += "会心の一撃！！<br>";
            damage *= 10;
            this.ref.classList.add("kaisin_motion");
            monsters.classList.add("noclick"); // 攻撃不可
        } else {
            music.src = "bgm/魔王魂  戦闘01.mp3"; // 効果音
            music.play();
            this.ref.classList.add("damage_motion");
            monsters.classList.add("noclick"); // 攻撃不可
        }

        this.hp -= damage;
        if (this.hp <= 0) this.alive = false;
        comment.innerHTML += this.name + "に " + damage + " ポイントの<br>ダメージをあたえた！";

        console.log(this.name + ":" + this.hp);
    }
}
