export function converteUrl(
  url: string,
  porta: any,
  modulo: string,
  contexto: string
) {
  let novaUrl: string[] = url.split('/');
  let servico = novaUrl[4].replace(`${modulo}_Sync`, '').replace(`?wsdl`, '');
  let urlFinal = `${novaUrl[0]}//${novaUrl[2]}/${contexto}/G5Rest?server=${novaUrl[0]}//${novaUrl[2]}&module=${modulo}&service=${servico}&port=${porta}`;
  console.log(urlFinal);
  return urlFinal;
}
