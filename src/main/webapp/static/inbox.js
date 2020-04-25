function decrypt()
{

(async () => {
  
   
    const privateKeyArmored = document.getElementById("pvtkey").value;
 // encrypted private key
    const passphrase = document.getElementById("inputPassphrase").value ; // what the private key is encrypted with

    const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
    await privateKey.decrypt(passphrase);

  var encrypted=document.getElementById("cipher").value;
    const { data: decrypted } = await openpgp.decrypt({
        message: await openpgp.message.readArmored(encrypted),              // parse armored message
       
        privateKeys: [privateKey]                                           // for decryption
    });
document.getElementById("output").innerHTML=decrypted;
console.log(decrypted);
})();
}
//INITIALIZATION CODE
function init(){
    $('#decrypt-data').click(decrypt);
}

$(document).ready(init);