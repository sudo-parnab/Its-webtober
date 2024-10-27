let imgBox = document.getElementById('imgBox');
let qrText = document.getElementById('qrText');
let qrImage = document.getElementById('qrImage');

function generateQRCode() {
    if (
      qrText.value.length >0
    ) {
      qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
        qrText.value;
      imgBox.classList.add("active");
    }
    else {
      
        qrText.classList.add("error");
        setTimeout(() => {
          qrText.classList.remove("error");
        }, 1000);
    }
    
}