//  Example Contact List
var contactList = [  
	{ 
		name: "Raquel Ervin", 
		phone: "+1 555 555-5555", 
		address: "123 front st, Unit #1, Dakota City",    
		email: "rocket@gmail.com",  
	},   
	{    
		name: "Contact Name",    
		phone: "Contact Phone",    
		address: "Contact Address",    
		email: "Contact Email",  
	}
];
//-----------------------------------
//  Helper Functions

function insertDOMIndex(contact) {
    return `
        <a href="page3.html"><div class="contact">${contact}</div></a>

    `
}

function insertDOMCreate(contact = contactList[1]){
    return `
    <div class="contactedit">
    <div class="contactimg">
        <img src="./img/profile.jpg" class ="profilepic" alt="Profile picture">
    </div>
    <div class="form">
        <form>
            <div class="inputcontainer">
                <input type="text" id="contactname" name="contactname" placeholder='${contact.name}'>
                <button class="extrafield" id="extranamefield" name="extranamefield">+</button>
            </div>

            <div class="inputcontainer">
                <input type="tel" id="contactphone" name="contactphone" placeholder="${contact.phone}">
                <button class="extrafield" id="extraphonefield" name="extraphonefield">+</button>
            </div>

            <div class="inputcontainer">
                <input type="text" id="contactaddress" name="contactaddress" placeholder="${contact.address}">
                <button class="extrafield" id="extraaddressfield" name="extraaddressfield">+</button>
            </div>
            
            <div class="inputcontainer">
                <input type="email" id="contactemail" name="contactemail" placeholder="${contact.email}">
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
//-----------------------------------
//  Index Page

function cleanUpIndex(){
    const clean = document.querySelectorAll('div.contact')
    for (i=0; i<clean.length; i++){
        clean[i].remove()
    }
}

function createSingleIndex(contact){
    const section = document.querySelector('.main')
    section.insertAdjacentHTML('beforeend', insertDOMIndex(contact.name))
}

function renderIndex(contactList){
    console.log('Clicked')
    const section = document.querySelector('.main')
    for (var obj of contactList){
        section.insertAdjacentHTML('beforeend', insertDOMIndex(obj.name))
    }
}

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
    renderIndex(contactList)
});

home.onclick = addEventListener('click',function(evt){

})


var new_cont = document.querySelector('.nav');
new_cont.addEventListener('click',function(evt){
    evt.preventDefault()
    evt.stopImmediatePropagation()
    if (document.querySelector('div.contact') !=null)
        cleanUpIndex()
    if (document.querySelector('.contactedit') !=null){
        cleanUpCreate()
    }
    renderCreate()
})

//-----------------------------------
//  View Page

function cleanUpView(){
    const clean = document.querySelector('div.contactinfo')
    clean.remove()
}

function renderView(contact){
    const section = document.querySelector('.main')
    section.insertAdjacentHTML("afterbegin",insertDOMView(contact))
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
}
