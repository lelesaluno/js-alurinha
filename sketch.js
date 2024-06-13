//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 17;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;
let contagem = 3


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
if (contagem > 0) {
textSize(72);
fill(255);
textAlign(CENTER, CENTER);
text(contagem, width/2, height/2);
if (frameCount % 60 == 0) {
contagem--;
}
} else {
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  limitaMinhaRaquete();
  limitaRaqueteDoOponete();
  finalDoJogo();
}
}
  
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function limitaMinhaRaquete(){
  if(yRaquete<0){
    yRaquete=0
  }
  if(yRaquete>310){
    yRaquete=310
  }
}

function limitaRaqueteDoOponete(){
  if(yRaqueteOponente<0){
    yRaqueteOponente=0
  }
  if(yRaqueteOponente>310){
    yRaqueteOponente=310
  }
}


function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
                              xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 50;
  yRaqueteOponente += velocidadeYOponente
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0))
  rect(130,10,40,20)
  fill(255);
  text(meusPontos, 150, 22);
  fill(color(255,140,0))
  rect(430,10,40,20)
  fill(255);
  text(pontosDoOponente, 450, 22)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play()
  }
}
function finalDoJogo(){
  if(meusPontos >= 10){
    textoFinalDoJogo()
    sys.exit()
  }  
  if(pontosDoOponente >= 10){
    textoFinalDoJogo()
    sys.exit()  
  }
}

function textoFinalDoJogo(){
  text("Fim de jogo",300,200)
  textSize(100) 
}
