function getKeyUrl(){
    var baseUrl = $("meta[name=baseUrl]").attr("content")
    return baseUrl + "/api/getkeyserver";
}


function encrypt(pubkey)
{
(async () => {
  //  await openpgp.initWorker({ path: 'openpgp.worker.js' }); // set the relative web worker path

    // put keys in backtick (``) to avoid errors caused by spaces or tabs
    const publicKeyArmored = pubkey;
   
var plaintext=document.getElementById("inputBody").value;

    const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText(plaintext),                 // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
      
    });
  	console.log(encrypted);
})();


}
function searchKey()
{
var email=document.getElementById("inputEmail").value;
var url = getKeyUrl();
var json = {
        "email":email
    };

//get public key from keyserver
 $.ajax({
       url: url,
       type: 'POST',
       data: JSON.stringify(json),
       headers: {
        'Content-Type': 'application/json'
       },     
       success: function(response) {
            encrypt(response.public_key); 
       },
       error: handleAjaxError
    });

    
}
//INITIALIZATION CODE
function init(){
    $('#encrypt-data').click(searchKey);
}

$(document).ready(init);