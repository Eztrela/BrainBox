export abstract class AMensagem {
  abstract sucesso(mensagem: string): void;

  abstract erro(mensagem: string): void;

  abstract info(mensagem: string): void;

  abstract alerta(mensagem: string): void;

}
