let hoy = new Date();

let dia = hoy.getDate();
let mes = hoy.getMonth() + 1;
let agnio = hoy.getFullYear();

dia = ("0" + dia).slice(-2);
mes = ("0" + mes).slice(-2);

let fecha = `${agnio}-${mes}-${dia}`;
