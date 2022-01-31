class Game {
  constructor(){
    this.answerinput = createInput("Answer");
    this.buttonanswer = createButton('Submit');
    this.question = createElement('h2');
    this.squestion = "A";
    this.sanswer = "A";
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  getrandomQuestion(){

    let rngquestions = [
      "Name this ion:HCO3-",
      "The Chemical Compound for Rubidium Phospate is:Rb3PO4",
      "What is Nh4Cl?:ammonium chloride",
      "Name the following ionic compound Cr(SO4)3:chromium(VI) sulfate",
      "Are two atoms of the same element identical?(yes/no):no",
      "Can water stay in a liquid state below 0 degrees Celsius?(yes/no):yes",
      "What is the name of AgNO3?:silver(i) nitrate",
      "What is the formula for Calcium Chlorate?:Ca(ClO3)2",
      "What is the correct name of Fr2CO3?:francium carbonate",
      "What is the ion p3-?:phosphide",
    ]

    let random = Math.floor(Math.random() * rngquestions.length);

    let qinfo = rngquestions[random]

    let qinfo2 = qinfo.split(":");

    let sendq = qinfo2[0],
    senda = qinfo2[1];

    return {
      sendq,
      senda
    }
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    let qinfo = this.getrandomQuestion();

    this.squestion = qinfo.sendq,
    this.sanswer = qinfo.senda;

    car1 = createSprite(100,200);
    car1.addImage(imagecar1)

    car2 = createSprite(300,200);
    car2.addImage(imagecar2)

    car3 = createSprite(500,200);
    car3.addImage(imagecar3)

    car4 = createSprite(700,200);
    car4.addImage(imagecar4)

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    this.question.html(this.squestion)
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767")
      image(trackimage1, 0, -displayHeight*4, displayWidth, displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    this.buttonanswer.mousePressed(()=>{
      if (this.answerinput.value() === this.sanswer){
        let qinfo = this.getrandomQuestion();
        this.squestion = qinfo.sendq,
        this.sanswer = qinfo.senda;
        player.distance +=771
        player.update();
      }
    });


    drawSprites();
  }
  end(){
    console.log("GAME END")
  }
}
