let isEditing = false;

const personalityList = ["Extroverted", "Creative", "Sweet", "Jester"];
const activitiesList = ["Swimming", "Painting", "Hiking", "PLaying Guitar"];
const livingList = ["In Dorms", "With Parents"];
const supportList = ["Find Community", "Study Buddy"];
const categories = ["personality", "activities", "living", "support"];

function editProfile() {
  isEditing = true;

  const name = document.getElementById("name");
  name.contentEditable = true;

  categories.forEach((category) => {
    const container = document.getElementById(category);

    const pElements = container.querySelectorAll("p");
    pElements.forEach((p) => {
      p.style.cursor = "pointer";
      p.onclick = () => {
        if (isEditing) p.remove();
      };
    });

    if (!container.querySelector("button.littleButton")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "+";
      btn.className = "littleButton";
      btn.onclick = () => addRandomTrait(category);
      container.appendChild(btn);
    }
  });
}

function addRandomTrait(category) {
  let list = [];
  if (category === "personality") list = personalityList;
  if (category === "activities") list = activitiesList;
  if (category === "living") list = livingList;
  if (category === "support") list = supportList;

  const text = list[Math.floor(Math.random() * list.length)];
  addTrait(category, text);
}

function createButton(category) {
    const newButton = document.createElement('button');
    newButton.textContent = '+';
    newButton.className = 'littleButton';
    newButton.addEventListener('click', function() {
        var text = "";
        if (category === "personality") {
            text = personalityList[Math.floor(Math.random() * personalityList.length)];
        } else if (category === "activities") {
            text = activitiesList[Math.floor(Math.random() * activitiesList.length)];
        } else if (category === "living") {
            text = livingList[Math.floor(Math.random() * livingList.length)];
        } else if (category === "support") {
            text = supportList[Math.floor(Math.random() * supportList.length)];
        }
        addTrait(category, text);
    });
    document.getElementById(category).appendChild(newButton);
}


function addTrait(category, text) {
    var per = document.getElementById(category);
    const newP = document.createElement('p');
    newP.textContent = text;
    per.appendChild(newP);
}

function saveTraits(category) {
    const traitDiv = document.getElementById(category);
    const traits = [];
 
    const pElements = traitDiv.getElementsByTagName('p');
    
    for (let i = 0; i < pElements.length; i++) {
        traits.push(pElements[i].textContent);
    }
    
    let str = category.concat("traits");
    localStorage.setItem(str, JSON.stringify(traits));
}

function loadTraits(category) {
    let str = category.concat("traits");
    const savedTraits = localStorage.getItem(str);
    if (savedTraits) {
        const traits = JSON.parse(savedTraits);
        const personalityDiv = document.getElementById(category);
        
        personalityDiv.innerHTML = '';
        
        traits.forEach(trait => {
            const newP = document.createElement('p');
            newP.textContent = trait;
            personalityDiv.appendChild(newP);
        });
    }
}

function saveProfile() {
  const nameEl = document.getElementById("name");
  localStorage.setItem("name", nameEl.innerHTML);

  categories.forEach((category) => saveTraits(category));

  isEditing = false;
  nameEl.contentEditable = false;

  categories.forEach((category) => {
    const container = document.getElementById(category);

    const btn = container.querySelector("button.littleButton");
    if (btn) btn.remove();

    const pElements = container.querySelectorAll("p");
    pElements.forEach((p) => {
      p.style.cursor = "default";
      p.onclick = null;
    });
  });
}


const checkEdits = () => {
    let name = localStorage.getItem('name');
    if(name != null) {
        document.getElementById("name").innerHTML = name;
    }
    loadTraits('personality');
    loadTraits('activities');
    loadTraits('living');
    loadTraits('support');
    }

window.addEventListener('DOMContentLoaded', checkEdits);



