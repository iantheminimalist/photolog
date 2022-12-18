const imgGrabber = async (item) =>{
    const response = await fetch(`https://picsum.photos/1920/1080`);
    const imgContainer = document.getElementById("imgLog");

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
}

 
for(let i = 0; i < 5; i++){
    imgGrabber(i); 
}

