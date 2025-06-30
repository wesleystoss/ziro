// Balão flutuante do WhatsApp com mensagens animadas
const whatsappNumber = '6199241137';
const whatsappMsg = 'Olá! Vim pelo site e quero saber mais.';
const messages = [
  'Quer dobrar suas vendas? Fale agora e descubra como!',
  'Seu concorrente já está online. E você? Vamos mudar isso juntos!',
  'Atendimento automático 24h: conquiste mais clientes hoje!',
  'Diagnóstico digital 100% grátis. Aproveite antes que acabe!',
  'Chega de perder vendas! Transforme seu negócio agora mesmo.',
  'Site profissional em dias, não meses. Clique e surpreenda-se!',
  'Transforme seu atendimento e impulsione suas vendas. Fale conosco.',
  'Tem um projeto em mente? Converse com um de nossos especialistas.',
  'Receba um diagnóstico digital gratuito e sem compromisso.',
  'Soluções digitais completas, do planejamento ao resultado.',
  'Pronto para escalar seu negócio? Inicie a conversa aqui.',
  'Precisa de um site profissional? Podemos resolver isso.'
];

function createWhatsappFloat() {
  // Balão do WhatsApp
  const btn = document.createElement('button');
  btn.id = 'ziro-whatsapp-float';
  btn.title = 'Falar no WhatsApp';
  btn.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M19.7,4.3c-1.9-1.9-4.4-2.9-7.1-2.9c-5.5,0-9.9,4.4-9.9,9.9c0,1.8,0.5,3.5,1.4,5l-1.5,5.5l5.6-1.5 c1.4,0.8,3,1.3,4.6,1.3h0.1c5.5,0,9.9-4.4,9.9-9.9C22.7,8.7,21.6,6.2,19.7,4.3z M12.6,20.5c-1.5,0-3-0.5-4.2-1.5l-0.3-0.2 l-3.1,0.8l0.8-3l-0.2-0.3c-1-1.3-1.6-2.8-1.6-4.5c0-4.6,3.7-8.3,8.3-8.3c2.2,0,4.3,0.9,5.9,2.4c1.6,1.6,2.4,3.7,2.4,5.9 C20.9,16.8,17.2,20.5,12.6,20.5z M18.1,14.6c-0.2-0.1-1.3-0.6-1.5-0.7c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.7,0.8-0.8,1 c-0.1,0.2-0.2,0.2-0.4,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.2,0.4-0.4 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.1,0-0.3,0-0.4c-0.1-0.1-0.5-1.3-0.7-1.8c-0.2-0.5-0.4-0.4-0.5-0.4c-0.1,0-0.3,0-0.4,0 s-0.4,0.1-0.6,0.3c-0.2,0.2-0.7,0.7-0.7,1.7c0,1,0.7,1.9,0.8,2.1c0.1,0.2,1.3,2.1,3.3,2.9c0.5,0.2,0.8,0.3,1.1,0.4 c0.5,0.1,1,0.1,1.3,0c0.4-0.1,1.3-0.5,1.5-1c0.2-0.5,0.2-0.9,0.1-1C18.5,14.8,18.3,14.7,18.1,14.6z"/>
    </svg>
  `;
  btn.onclick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
  };
  document.body.appendChild(btn);

  // Balão de mensagem
  const msgDiv = document.createElement('div');
  msgDiv.id = 'ziro-whatsapp-float-msg';
  document.body.appendChild(msgDiv);

  let idx = 0;
  const msgInterval = 15000; // 15 segundos

  const cycleMessages = () => {
    msgDiv.textContent = messages[idx];
    msgDiv.classList.add('show');
    idx = (idx + 1) % messages.length;
    // Esconde a mensagem depois de 15 segundos
    setTimeout(() => {
      msgDiv.classList.remove('show');
    }, msgInterval);
  };

  // Começa o ciclo (15s visível, 15s oculto)
  // A primeira mensagem aparece depois de 2 segundos
  setTimeout(cycleMessages, 2000);
  setInterval(cycleMessages, msgInterval * 2);
}

window.addEventListener('DOMContentLoaded', createWhatsappFloat); 