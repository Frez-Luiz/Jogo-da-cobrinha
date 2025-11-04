let cobra = [];
let direcao;
let tam =20;
let comida;
let pontuacao = 0;


function setup() {
  createCanvas(400, 400);
  frameRate(10);
  resetarJogo();
}

function draw() {
  background(0);
  fill(255);
  textSize(16);
  text("Pontos: ",+pontuacao, 10, 20);
  
  // movimentação
  
  let cabeca = cobra[cobra.length -1].copy();
  cabeca.x += direcao.x * tam;
  cabeca.y += direcao.y * tam;
  
  // verifica colisões
  if(colidiu(cabeca)){
    gameOver();
    return;
  }
  
  // adiciona nova cabeça
  cobra.push(cabeca);
  
  // Se comeu a comida
  if(cabeca.x === comida.x && cabeca.y === comida.y){
     pontuacao++
      gerarComida();
     }else{
       cobra.shift();
     }
  
    // Desenhar comida
  fill(255, 0, 0);
  rect(comida.x, comida.y, tam, tam);
  
  // desenhar a cobra
  fill(0,255,0);
  for(let parte of cobra){
    rect(parte.x, parte.y, tam,tam);
    
  }
  
}

function colidiu(cabeca){
  
  // Colisão com a borda
  if(cabeca.x < 0 || cabeca.y < 0 || cabeca.x >= width || cabeca.y >= height){
    return true;
  }
  
  // Colisão com o próprio corpo 
  for(let parte of cobra){
    if(parte.x === cabeca.x && parte.y === cabeca.y){
      return true;
    }
  }
  
  return false;
}

function gerarComida(){
  let colunas = floor(width /tam);
  let linhas = floor(height /tam);
  comida = createVector(floor(random(colunas)) * tam,
                       floor(random(linhas))* tam);
}
function resetarJogo(){
  cobra = [];
  cobra.push(createVector(100,100));

  direcao = createVector(1,0);
  gerarComida();
  pontuacao = 0;
}
// Finaliza o jogo
function gameOver(){
  background(100,0,0);
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("Game Over", width /2, height /2);
  textSize(16);
  text("Clique aqui para reiniciar", width /2, height /2);
  noLoop() // pausa o draw.
}

// Reinicia ao clicar
function mouseIsPressed(){
  lopp();
  resetarJogo();
  
}


// Função que controla a cobrinha 
function keyPressed(){
  if (keyCode === UP_ARROW && direcao.y !== 1){
    direcao.set(0, -1);
    
  }else if(keyCode === DOWN_ARROW && direcao.y !== -1){
    direcao.set(0,1);
    
  }else if(keyCode === LEFT_ARROW && direcao.x !== 1){
    direcao.set(-1,0);
    
  }else if(keyCode === RIGHT_ARROW && direcao.x !== -1){
    direcao.set(1,0);
  }
  
  
}