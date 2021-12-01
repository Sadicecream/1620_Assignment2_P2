//  Example Contact List
const contactList = [  
	{ 
		name: "Raquel Ervin", 
		phone: "+1 555 555-5555", 
		address: "123 front st, Unit #1, Dakota City",    
		email: "rocket@gmail.com"
	},   
    {	
        name: "Jeremy McNinch",    
        phone: "604 718 1043",    
        address: "8631 Granville St, Vancouver",    
        email: "email@email.com"
    }
];

let captureList = []/*Sorry for the second global variable*/

//-----------------------------------
//  Helper Functions

function insertDOMIndex(contact) {
    return `
        <a href="page3.html"><div class="contact">${contact}</div></a>

    `
}

function insertDOMCreate(){
    return `
    <div class="contactedit">
    <div class="contactimg">
        <img src="./img/profile.jpg" class ="profilepic" alt="Profile picture">
    </div>
    <div class="form">
        <form>
            <div class="inputcontainer">
                <input type="text" id="contactname" name="contactname" placeholder='Contact Name'>
                <button class="extrafield" id="extranamefield" name="extranamefield">+</button>
            </div>

            <div class="inputcontainer">
                <input type="tel" id="contactphone" name="contactphone" placeholder="Contact Phone">
                <button class="extrafield" id="extraphonefield" name="extraphonefield">+</button>
            </div>

            <div class="inputcontainer">
                <input type="text" id="contactaddress" name="contactaddress" placeholder="Contact Address">
                <button class="extrafield" id="extraaddressfield" name="extraaddressfield">+</button>
            </div>
            
            <div class="inputcontainer">
                <input type="email" id="contactemail" name="contactemail" placeholder="Contact Email">
                <button class="extrafield" id="extraemailfield" name="extraemailfield">+</button>
            </div>

            <div class="buttons">
                <button type="submit" class="button save" id="savecontact" name="savecontact">Save Contact</button>
                <button type="reset" class="button cancel" id="cancel" name="cancel">Cancel</button>
            </div>
        </form>
    </div>
    </div>
    
    `
}

function insertDOMView(contact){
    return `
    <div class="contactinfo">
            <div class="contactname">
                ${contact.name}
                <img src="./img/profile.jpg" class="profilepic" alt="Profile picture">
            </div>
            <div class="contactemail">email: ${contact.email}</div>
            <div class="contactphone">cell: ${contact.phone}</div>
            <div class="contactaddress">address: ${contact.address}</div>
            <div class="buttons">
                <button class="button edit" value="Edit">Edit</button>
                <button class="button close" value="Close">Close</button>
            </div>
        </div>
    `
}

function createSingleIndex(evt){
    let search = evt.target.textContent
    let cName = getContactName(search)
    if (cName !=null){
        cleanUpIndex()
        renderView(cName)
    }}

function getContactName(search){
    for(let names in contactList){
        if(search == contactList[names].name){
            return contactList[names]
        }
    }
    alert("Contact not found")
}

//-----------------------------------
//  Index Page

function cleanUpIndex(){
    const clean = document.querySelectorAll('div.contact')
    for (let i=0; i<clean.length; i++){
        clean[i].remove()
    }
    var links = document.querySelectorAll('a[href="page3.html"]');
    for (let i=0; i<links.length; i++){
        links[i].remove()
    }
}

function renderIndex(contactList){
    const section = document.querySelector('.main')
    for (let obj of contactList){
        section.insertAdjacentHTML('beforeend', insertDOMIndex(obj.name))
    }
    const singleDom = document.querySelectorAll('a[href="page3.html"]')
    for (let doms of singleDom){
        doms.addEventListener('click', function(evt){
            evt.preventDefault()
            evt.stopImmediatePropagation()
            createSingleIndex(evt)
        })
    }
}


//-----------------------------------
//  View Page

function cleanUpView(){
    const clean = document.querySelector('div.contactinfo')
    clean.remove()
}

function renderView(contact){
    const section = document.querySelector('.main')
    section.insertAdjacentHTML("afterbegin",insertDOMView(contact))
    const editBtn = document.querySelector('.edit')
    editBtn.addEventListener('click',function(evt){
        evt.preventDefault()
        evt.stopImmediatePropagation()
        let getInfo = document.querySelector(".contactname").firstChild.textContent.trim()
        let cName = getContactName(getInfo)
        let edit = Object.values(cName)
        captureList = edit
        cleanUpView()
        renderCreate()
        let fields = document.querySelectorAll('.inputcontainer')
        for(let i=0; i<fields.length; i++){
            fields[i].firstElementChild.value = edit[i]
        }
    })
    const closeBtn = document.querySelector('.close')
    closeBtn.addEventListener('click',function(evt){
        cleanUpView()
        renderIndex(contactList)
    })
}
//-----------------------------------
//  Create Page

function cleanUpCreate(){
    const clean = document.querySelector('div.contactedit')
    clean.remove()
}

function renderCreate(){
    const section = document.querySelector('.main')
    section.insertAdjacentHTML('afterbegin',insertDOMCreate())
    let cancelBtn = document.querySelector('.cancel')
    cancelBtn.addEventListener('click', function(evt){
        evt.preventDefault()
        cleanUpCreate()
        renderIndex(contactList)
        captureList = []
    })
    let saveBtn = document.querySelector('.save')
    saveBtn.addEventListener('click', function(evt){
        evt.preventDefault()
        let info = []
        let exists = 0
        let getInfo = document.querySelectorAll('.inputcontainer')
        for(let i =0; i <getInfo.length; i++){
            info.push(getInfo[i].firstElementChild.value)
        }
        for(let names in contactList){
            if(captureList[0] == contactList[names].name){
                contactList.splice(names,1,{name:info[0],phone:info[1],address:info[2],email:info[3]})
                exists++
            }
        }
        captureList = []
        if(exists == 0){
            contactList.push({name:info[0],phone:info[1],address:info[2],email:info[3]})
            }
        cleanUpCreate()
        renderIndex(contactList)
    })
}

//-----------------------------------
//  Event Handlers

var home = document.querySelector('.nav-home');
home.addEventListener('click',function(evt){
    evt.preventDefault()
    evt.stopImmediatePropagation()
    if (document.querySelector('div.contact') != null){
       cleanUpIndex() 
    }
    if (document.querySelector('.contactedit') !=null){
        cleanUpCreate()
    }
    if (document.querySelector('.contactinfo') !=null){
        cleanUpView()
    }
    renderIndex(contactList)
});


var new_cont = document.querySelector('.nav');
new_cont.addEventListener('click',function(evt){
    evt.preventDefault()
    evt.stopImmediatePropagation()
    if (document.querySelector('div.contact') !=null)
        cleanUpIndex()
    if (document.querySelector('.contactedit') !=null){
        cleanUpCreate()
    }
    if (document.querySelector('.contactinfo') !=null){
        cleanUpView()
    }
    renderCreate()
})

document.addEventListener("DOMContentLoaded", evt => {
    renderIndex(contactList)
})