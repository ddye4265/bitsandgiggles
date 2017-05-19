
 function Player(user, hp, weapon, speed, crew, sensor, location){
	this.user = user; //username
	this.hp = hp; //armor
	this.weapon = weapon; //railgun 
	this.speed = speed; //thrusters, movement and agility
	this.crew = crew; //crew
	this.sensor = sensor;
	this.location = location // location on map (letter,number); 
	this.kills = 0;

	this.life = function(){
		 if (this.hp > 0) {
      console.log(this.user + " is still alive!");
      return true;
    }
    console.log(this.user + " has died!");
    return false;
  	};
   this.attack = function(defender){
   	$("#target").append("<p>"+this.user+ " attacked</p>");
	  	var roll = Math.random() * (20) + this.speed;
		if(roll >= Math.random() * (20) + defender.speed){
		defender.hp -= this.weapon;

		$("#target").append( "<p>" +this.user + " did "+ this.weapon+ " damage. " + defender.user+" has "+ defender.hp + " health remaining</p>"); 

		defender.life();
		}
		else{
			$("#target").append("<p>" +this.user + " missed</p>");
		}	
 	 }
 	this.defend = function(){
 		$("#target").append("<p>" +this.user + " defended</p>");
 		var defend = this.speed * 2;
 		this.speed = defend;   
 	}

}

function Pirate( user, hp, weapon, speed, location){
	this.user = user; //pirate name
	this.hp = hp; //armor
	this.weapon = weapon; //railgun
	this.speed = speed; //thrusters, movement and agility 
	this.location = location // location on map (letter,number);
	this.life = function(){
		 if (this.hp > 0) {
      console.log(this.user + " is still alive!");
      return true;
    }
    console.log(this.user + " has died!");
    return false;
  };
  	this.attack = function(defender){
	   	$("#target").append("<p>"+this.user+ " attacked</p>");
		  	var roll = Math.random() * (20) + this.speed;
			if(roll >= Math.random() * (20) + defender.speed){
			defender.hp -= this.weapon;

			$("#target").append( "<p>" +this.user + " did "+ this.weapon+ " damage. " + defender.user+" has "+ defender.hp + " health remaining</p>"); 

			defender.life();
			}
			else{
				$("#target").append("<p>" +this.user + " missed</p>");
			}	
 	 }	
	this.defend = function(){
 		$("#target").append("<p>" +this.user + " defended</p>");
 		var defend = this.speed * 2;
 		this.speed = defend;   
 	}

}


var tuser = new Player("Test user", 600, 300, 5, 100, "A1");

var tpir = new Pirate("Test Pirate", 500, 60, 5, "A1");

function Load(play, pira){

	$("#stat-target").html("<p>" + "Name: "+ play.user + "</p>"+ "<p>"+"Health remaining: "+ play.hp+ "</p>"+ "<p>"+"Weapon damage: "+ play.weapon + "</p>"+ "<p>"+ "Speed: " + play.speed+ "</p>");
	$("#pirate-target").html("<p>" + "Name: "+ pira.user + "</p>"+ "<p>"+"Health remaining: "+ pira.hp+ "</p>"+ "<p>"+"Weapon damage: "+ pira.weapon + "</p>"+ "<p>"+ "Speed: " + pira.speed+ "</p>");

};
$(document).ready(Load(tuser,tpir));


$("#attack").on("click", function(){
	
	var AI = Math.round(Math.random());
			switch(AI){
			case 0 :
			if(tpir.hp > 0){
				tuser.attack(tpir);
				if(tpir.hp > 0){
				tpir.attack(tuser);
				}
			}
			else{
				$("#target").append("<p>"+tpir.user+" is defeated!"+"</p>");
				$("#buttons").empty();
				tuser.kills++;
				console.log(tuser.kills);
			}
			break;
			case 1 :
				if(tpir.hp > 0){
					var speedholder = tpir.speed;
				tpir.defend();
				tuser.attack(tpir);
				tpir.speed = speedholder;
			}
			else{
				$("#target").append("<p>"+tpir.user+" is defeated!"+"</p>");
				$("#buttons").empty();
				tuser.kills++;
				console.log(tuser.kills);

			}
			break;

			
			}
			if(tuser.hp <= 0){
				$("#target").append("<p font-color='red'> YOU ARE DEFEATED. A CAPTAIN ALWAYS GOES DOWN WITH HIS SHIP.  </p>" );
				$("#buttons").empty();
		}
		if(tpir.hp <= 0){
			$("#target").append("<p>"+tpir.user+" is defeated!"+"</p>");
				$("#buttons").empty();
				tuser.kills++;
				console.log(tuser.kills);

		}
	Load(tuser,tpir);
});
$("#defend").on ("click", function(){
	Load(tuser,tpir);
})
