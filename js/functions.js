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
    
    btnElement.addEventListener("click", (e) => {
        var targetImg = document.getElementById(e.target.id);
        targetImg.previousElementSibling.classList.add("clicked")
        targetImg.parentElement.parentElement.classList.add("clicked")
        const updatedWidth = window.innerWidth;
        const updatedHeight = window.innerHeight;
        console.log(`Updated browser width: ${updatedWidth}px`);
        console.log(`Updated browser height: ${updatedHeight}px`);

        targetImg.previousSibling.style = `width: ${(updatedWidth - 400)}px ; height: ${updatedHeight - 200}px; top: -100px;`;  

        console.log(targetImg.parentElement.parentElement);
        // targetImg.parentElement.parentElement.style.position="absolute"
        // targetImg.parentElement.parentElement.style.zIndex="10"

        
        
    }
    )
}


    const fetchImages = async () => {
        const promises = [];
        for (let i = 0; i < 4; i++) {
          promises.push(imgGrabber(i));
        }
        await Promise.all(promises);
      };
      
      fetchImages();









