//=================================================================//





var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/play',function(req, res) {
	res.sendFile(__dirname + '/client/play.html');
});

app.get('/contact',function(req, res) {
	res.sendFile(__dirname + '/client/contact.html');
});		

app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");





//===============================================================//



//===============================================================//



var SOCKET_LIST = {};
var PLAYER_LIST = {};

var bulletdir;






var vertiwall =[];
vertiwall.push({y1:0,y2:60,x:230});
vertiwall.push({y1:60,y2:125,x:330});
vertiwall.push({y1:105,y2:125,x:260});
vertiwall.push({y1:75,y2:105,x:155});
vertiwall.push({y1:75,y2:145,x:63});
vertiwall.push({y1:145,y2:206,x:167});
vertiwall.push({y1:206,y2:296,x:69});
vertiwall.push({y1:221,y2:296,x:218});
vertiwall.push({y1:221,y2:399,x:330});
vertiwall.push({y1:0,y2:60,x:510});
vertiwall.push({y1:62,y2:118,x:397});
vertiwall.push({y1:92,y2:118,x:473});
vertiwall.push({y1:95,y2:150,x:577});
vertiwall.push({y1:150,y2:225,x:724});
vertiwall.push({y1:225,y2:288,x:606});
vertiwall.push({y1:251,y2:288,x:542});
vertiwall.push({y1:251,y2:338,x:465});
vertiwall.push({y1:338,y2:398,x:396});
vertiwall.push({y1:0,y2:36,x:249});
vertiwall.push({y1:0,y2:38,x:297});
vertiwall.push({y1:0,y2:4,x:335});
vertiwall.push({y1:0,y2:67,x:364});
vertiwall.push({y1:0,y2:47,x:400});
vertiwall.push({y1:0,y2:35,x:433});
vertiwall.push({y1:0,y2:38,x:482});
vertiwall.push({y1:148,y2:195,x:218});
vertiwall.push({y1:142,y2:190,x:149});
vertiwall.push({y1:137,y2:185,x:513});
vertiwall.push({y1:171,y2:213,x:696});
vertiwall.push({y1:148+274,y2:195+274,x:218});
vertiwall.push({y1:142+274,y2:190+274,x:149});
vertiwall.push({y1:137+274,y2:185+274,x:513});
vertiwall.push({y1:171+274,y2:213+274,x:696});
vertiwall.push({y1:75+274,y2:105+274,x:155});
vertiwall.push({y1:75+274,y2:145+274,x:63});
vertiwall.push({y1:145+274,y2:206+274,x:167});
vertiwall.push({y1:75+274,y2:105+274,x:155});
vertiwall.push({y1:274+206,y2:274+296,x:69});
vertiwall.push({y1:221+274,y2:105+296,x:218});
vertiwall.push({y1:221+274,y2:577,x:330});
vertiwall.push({y1:257+274,y2:577,x:465});
vertiwall.push({y1:251+274,y2:288+274,x:542});
vertiwall.push({y1:225+274,y2:288+274,x:606});
vertiwall.push({y1:150+274,y2:225+274,x:724});
vertiwall.push({y1:90+274,y2:150+274,x:577});
vertiwall.push({y1:92+274,y2:125+274,x:473});



var horiwall=[];
horiwall.push({x1:230,x2:330,y:60});
horiwall.push({x1:397,x2:510,y:60});
horiwall.push({x1:473,x2:577,y:92});
horiwall.push({x1:397,x2:473,y:118});
horiwall.push({x1:258,x2:330,y:128});
horiwall.push({x1:155,x2:260,y:105});
horiwall.push({x1:63,x2:155,y:75});
horiwall.push({x1:577,x2:724,y:150});
horiwall.push({x1:606,x2:724,y:225});
horiwall.push({x1:542,x2:606,y:288});
horiwall.push({x1:465,x2:542,y:250});
horiwall.push({x1:396,x2:465,y:338});
horiwall.push({x1:63,x2:167,y:145});
horiwall.push({x1:70,x2:167,y:206});
horiwall.push({x1:70,x2:219,y:298});
horiwall.push({x1:218,x2:330,y:221});
horiwall.push({x1:258,x2:330,y:399});
horiwall.push({x1:249,x2:296,y:37});
horiwall.push({x1:438,x2:481,y:39});
horiwall.push({x1:79,x2:136,y:98});
horiwall.push({x1:76,x2:134,y:128});
horiwall.push({x1:254,x2:406,y:152});
horiwall.push({x1:254,x2:406,y:190});
horiwall.push({x1:496,x2:552,y:114});
horiwall.push({x1:484,x2:541,y:158});
horiwall.push({x1:575,x2:696,y:171});
horiwall.push({x1:79,x2:136,y:98+274});
horiwall.push({x1:76,x2:134,y:128+274});
horiwall.push({x1:254,x2:406,y:152+274});
horiwall.push({x1:254,x2:406,y:190+274});
horiwall.push({x1:496,x2:552,y:114+274});
horiwall.push({x1:484,x2:541,y:158+274});
horiwall.push({x1:575,x2:696,y:171+274});
horiwall.push({x1:155,x2:260,y:105+274});
horiwall.push({x1:63,x2:155,y:75+274});
horiwall.push({x1:63,x2:167,y:145+274});
horiwall.push({x1:69,x2:167,y:206+274});
horiwall.push({x1:69,x2:219,y:296+274});
horiwall.push({x1:218,x2:330,y:221+274});
horiwall.push({x1:331,x2:466,y:577});
horiwall.push({x1:465,x2:542,y:257+274});
horiwall.push({x1:542,x2:606,y:288+274});
horiwall.push({x1:606,x2:724,y:171+225});
horiwall.push({x1:577,x2:724,y:171+150});
horiwall.push({x1:473,x2:577,y:171+90});
horiwall.push({x1:396,x2:473,y:396});



var verno=vertiwall.length;
var horno=horiwall.length;







var Player = function(id){
	var self = {
		x:364,
		y:93,
		
		a:-100,
		b:-100,
		
		m:0,
		n:0,
		k:1,
		
		present : 2,//Math.floor(Math.random() * 3),
		
		x1:190,
		x2:120,
		x3:660,
		y1:550,
		


		id:id,
		
		pressingRight:false,
		pressingLeft:false,
		pressingUp:false,
		pressingDown:false,	
		maxSpd:1,


		t1_x:-100,
		t1_y:-100,
		t2_x:-100,
		t2_y:-100,
		counter:0,
		vil:0,


	}
	self.updatePosition = function(){


		var t1=[];
		var t2=[];


		t1.push({x:Math.random()*750,y:Math.random()*600});
		t1.push({x:Math.random()*750,y:Math.random()*600});
		t1.push({x:Math.random()*750,y:Math.random()*600});
		t1.push({x:Math.random()*750,y:Math.random()*600});
		t2.push({x:Math.random()*750,y:Math.random()*600});
		t2.push({x:Math.random()*750,y:Math.random()*600});
		t2.push({x:Math.random()*750,y:Math.random()*600});
		t2.push({x:Math.random()*750,y:Math.random()*600});
		
		var i=0;
		while(i<4){
		if((self.x>t1[i].x-2&&self.x<t1[i].x+2)&&(self.y>t1[i].y-2&&self.y<t1[i].y+2)){
			self.t1_x=self.x-5;
			self.t1_y=self.y-5;
			self.vil=1;
			break;
		}
		else if((self.x>t2[i].x-2&&self.x<t2[i].x+2)&&(self.y>t2[i].y-2&&self.y<t2[i].y+2)){
			self.t2_x=self.x-5;
			self.t2_y=self.y-5;

			self.vil=1;


			break;
		}
		i++;
	}

	if(self.vil==1){
	self.counter++;
	if(self.counter>=500){
		self.vil=0;
		
		self.counter=0;
		self.t1_x=-100;
		self.t1_y=-100;
		self.t2_x=-100;
		self.t2_y=-100;
	}
	}


	else{
    if(self.pressingUp)
		{
			var flag=1;
			for(var i=0;i<horno;i++){
				if(self.y==horiwall[i].y&&self.x>=horiwall[i].x1&&self.x<=horiwall[i].x2){
					flag=0;
					self.y+=3;
					break;
				}
			}
			if(flag)
				self.y -= self.maxSpd;
			self.k = 1;
		}
		if(self.pressingDown)
		{
			var flag=1;
			for(var i=0;i<horno;i++){
				if(self.y==horiwall[i].y&&self.x>=horiwall[i].x1&&self.x<=horiwall[i].x2){
					flag=0;
					self.y-=3;
					break;
				}
			}
			if(flag)
				self.y += self.maxSpd;
			self.k = 2;
		}
		if(self.pressingLeft)
		{
			var flag=1;
			for(var i=0;i<verno;i++){
				if(self.x==vertiwall[i].x&&self.y>=vertiwall[i].y1&&self.y<=vertiwall[i].y2){
					flag=0;
					self.x+=3;
					break;
				}
			}
			if(flag)
				self.x -= self.maxSpd;
			self.k = 3;
		}
		if(self.pressingRight)
		{
			var flag=1;
			for(var i=0;i<verno;i++){
				if(self.x==vertiwall[i].x&&self.y>=vertiwall[i].y1&&self.y<=vertiwall[i].y2){
					flag=0;
					self.x-=3;
					break;
				}
			}
			if(flag)
				self.x += self.maxSpd;
			self.k = 4;
		}



		//====================LOGIC FOR PRESSING BULLET==================

		if(self.pressingSpace)
		{
			if(self.n==0)
			{
				self.m = 1;
				bulletdir = self.k;
			}
		}	
		if(self.m == 1)
		{
			self.m=0;
			self.n=1;
			self.a = self.x;
			self.b = self.y;
		}

		if(self.n == 1)
		{
			if(bulletdir === 4)
				self.a += 15;
			if(bulletdir === 3)
				self.a -= 15;
			if(bulletdir === 1)
				self.b -= 15;
			if(bulletdir === 2)
				self.b += 15;
		}
		
		if(self.a > 800 || self.a < 0 || self.b > 600 || self.b < 0)
		{
			self.a = -200;
			self.b = -100;
			self.n = 0;
		}

	} 











		



		self.y1 -= 10;
		if(self.y1 < 400)
		{
			self.y1 = 550;
		}

		self.x1 -= 10;
		if(self.x1 < 50)
		{
			self.x1 = 190;
		}

		self.x2 += 10;
		if(self.x2 >200 )
		{
			self.x2 = 90;
		}

		self.x3 -= 10;
		if(self.x3 < 520)
		{
			self.x3 = 640;
		}













	}
	return self;
}

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;

	var player = Player(socket.id);
	PLAYER_LIST[socket.id] = player;
	
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});
	
	socket.on('keyPress',function(data){
		if(data.inputId === 'left')
			player.pressingLeft = data.state;
		else if(data.inputId === 'right')
			player.pressingRight = data.state;
		else if(data.inputId === 'up')
			player.pressingUp = data.state;
		else if(data.inputId === 'down')
			player.pressingDown = data.state;
		else if(data.inputId === 'space')
			player.pressingSpace = data.state;
	});
	
	
});

setInterval(function(){
	var pack = [];
	
	for(var i in PLAYER_LIST){
		var player = PLAYER_LIST[i];
		player.updatePosition();
		pack.push({
			x:player.x,
			y:player.y,
			a:player.a,
			b:player.b,
			k:player.k,
			present:player.present,
			y1:player.y1,
			x1:player.x1,
			x2:player.x2,
			x3:player.x3,
			t1_x:player.t1_x,
			t1_y:player.t1_y,
			t2_x:player.t2_x,
			t2_y:player.t2_y,
		});		
	}
	
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('newPositions',pack);
	}
	
},40);

//===============================================================