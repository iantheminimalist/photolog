const imageSelected = (btn) =>{
    
    var targetImg = document.getElementById(btn);
    var classListArr = targetImg.previousElementSibling.classList.contains("clicked");
    let mainContainer = document.getElementsByClassName("main-container");
    var clickedImgUrl = targetImg.previousSibling.src;
    var selectedImgData;
    
    
    mainContainer[0].classList.add("disabled");
    console.log(clickedImgUrl);


    var regex = /\/id\/\d+\//;
    var match = clickedImgUrl.match(regex)[0];
    var infoImg = `https://picsum.photos/${match}/info`;

    fetch(infoImg)
    .then((response) => response.json() )
    .then((data) => {
        selectedImgData = data
        console.log(selectedImgData)
        processImgData(targetImg, classListArr);
    })
    
    // create a button that slides the image to the right position and then have the image's info appear on the left.

    
    if(!classListArr){
        targetImg.previousElementSibling.classList.add("clicked")
        targetImg.parentElement.parentElement.classList.add("clicked")

        const updatedWidth = window.innerWidth;
        const updatedHeight = window.innerHeight;

        console.log(`Updated browser width: ${updatedWidth}px`);
        console.log(`Updated browser height: ${updatedHeight}px`);

        targetImg.previousSibling.style = `
            width: ${(updatedWidth * 0.6)}px; 
            height: ${updatedHeight * 0.7}px; `;
        targetImg.parentElement.style=`top: -100px;`;  

        console.log(targetImg.parentElement.parentElement);
    }else if(classListArr){
        targetImg.previousElementSibling.classList.remove("clicked")
        targetImg.parentElement.parentElement.classList.remove("clicked")
        targetImg.previousSibling.style.width= null;
        targetImg.previousSibling.style.height= null;
        targetImg.parentElement.style.top= 0;
        mainContainer[0].classList.remove("disabled");
    }

    function updateSelectedImg(){
        var allImgClicked = document.querySelectorAll(".imgItem-container .clicked");
        allImgClicked.forEach(function(element) {
            const newWidth = window.innerWidth * 0.9; // Set a new width based on screen width
            const newHeight = window.innerHeight * 0.9; // Set a new height based on screen height
            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;
        })
    }
    window.addEventListener('resize', updateSelectedImg);


    function processImgData(btn, indicator) {
        console.log(selectedImgData);
        console.log(btn)
        let lblContainer = btn.parentElement;
        var innerBtn = document.createElement("button")
        innerBtn.setAttribute('class', 'btn inner-btn')
        innerBtn.setAttribute('id', 'innerBtnReveal')
        innerBtn.textContent = "testing button";
        
        
        if(!indicator){
            lblContainer.append(innerBtn)
        }else{
            document.getElementById("innerBtnReveal").remove(document.getElementById("innerBtnReveal"));
        }

    }
}

const imgGrabber = async (item) =>{
    const response = await fetch(`https://picsum.photos/1920/1080.webp`);
    const imgContainer = document.getElementById("imgLog");
    console.log(response);
    let imgAttr = {
        src: response.url,
        class: 'imgItem'
    }

    let lblAttr = {
        for : 'imgItem' + item, 
        class: 'img-lbl'
    }

    let btnAttr = {
        id: 'imgItem' + item,
        class: 'img-btn'
    }
    let divAttr = {
        class: 'imgItem-container'
    };

    function setAttributes(element ,attributes) {
        Object.keys(attributes).forEach(attr => {
            element.setAttribute(attr,attributes[attr]);
        });
    }

    let imgElement = document.createElement("IMG");
    let lblElement = document.createElement("label");
    let btnElement = document.createElement("button");
    let divElement = document.createElement("div");


    setAttributes(imgElement,imgAttr);
    setAttributes(lblElement,lblAttr);
    setAttributes(btnElement, btnAttr);
    setAttributes(divElement,divAttr);

    lblElement.appendChild(imgElement);
    lblElement.appendChild(btnElement);
    divElement.appendChild(lblElement)
    imgContainer.appendChild(divElement);
    
    btnElement.addEventListener("click", (e) => {
        imageSelected(e.target.id)
    })

}

const fetchImages = async () => {
    const promises = [];
    for (let i = 0; i < 4; i++) {
        promises.push(imgGrabber(i));
    }
    await Promise.all(promises);
    };
    
    fetchImages();









