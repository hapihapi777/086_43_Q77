class Player {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;

    this.damage_point = 0;
    this.alive = true;
    this.comment = null;
    this.content = null;
    
    this.Hangeki();
    this.Status();
  }
  
  Status() {
    this.status = document.getElementById('hero');
    if(this.hp <= 0) this.hp = 0;
    this.status.innerHTML = this.name + "<br>HP: " + this.hp;
  }

  Hangeki() {

    this.comment = document.getElementById('comment');
    
    this.content = document.getElementById('commentbox');
    this.content.addEventListener('animationend', () => {
      this.content.classList.remove("damage_motion");
    });
  }
  
  damage(name, point) {
    this.content.classList.add("damage_motion");
    this.hp -= point;
    console.log(this.name + ": " + this.hp);
    this.Status();

    let music = new Audio(); //効果音追加
    music.preload = "auto"; // 効果音
    music.src = "bgm/魔王魂  戦闘16.mp3";
    // music.load();
    music.play();

    // this.comment.innerHTML += "<br>";
    this.comment.innerHTML += "<br>" + name + "の反撃";
    this.comment.innerHTML += "<br>" + this.name + "は" + point + "のダメージを受けた";

    if(this.hp <= 0) {
      this.alive = false;
      this.GameOver();

    }
  }

  GameOver() {
    this.comment.innerHTML += "<br>" + this.name + "は 死んでしまった";
    document.getElementById('content').classList.add('noclick');
  }
}