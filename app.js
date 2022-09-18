const uploadder = document.getElementById("uploader");
const wrapper = document.getElementById("wrapper")
const infoText = document.getElementById("infoText");
const fileClick = document.querySelector("input");
const copyBtn = document.getElementById("copyBtn");
const closeBtn = document.getElementById("closeBtn");


uploadder.addEventListener("click", () => fileClick.click());


fileClick.addEventListener("change", e => {
    let file = e.target.files[0];
    let formdata = new FormData();
    formdata.append("file", file);
    decodeQRCode(formdata, file);
})


function decodeQRCode(formdata, file) {
    infoText.innerHTML = "Scanning QR Code.....";
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formdata
    }).then(res => res.json()).then(result => {
        let qrResult = result[0].symbol[0].data;
        infoText.innerHTML = "Upload QR Code";
        wrapper.classList.add("active");
        document.querySelector("textarea").innerHTML = qrResult;
        document.querySelector("img").src = URL.createObjectURL(file)
        console.log(qrResult);
    });
}


copyBtn.addEventListener("click", () => {
    let copyText = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(copyText);
})


closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active");
})


