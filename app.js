let index = 0;
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",function(e){
    let addTitle = document.getElementById("addTitle");
    let addtxt = document.getElementById("addTxt");

    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [{1:"",2:""}]; 
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTitle.value);
    notesObj.push(addtxt.value);

    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTitle.value = "";
    addtxt.value = "";
    console.log(notesObj);
    showNotes();

})
function showNotes()
{
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = []; 
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
   
    let notesElm = document.getElementById("notesElm");

    if(notesObj.length == 0 )
    {
        notesElm.innerHTML = `Sorry Nothing to show here`;
    }
    else{
        let html = "";

        for(let index =0 ; index < notesObj.length ; index+=2) {
         html += `
         <div class="noteCard my-2  col-sm-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"> ${index/2 + 1}) ${notesObj[index]}</h5>
                <p class="card-text">${notesObj[index+1]}</p>
                <div class="row view">
                    <a href="#" class="btn btn-primary col-sm-4 mx-2" id="${index}" onclick="deleteNote(this.id)"> Delete </a>
                    <a href="#" class="btn btn-primary col-sm-3 mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editModal(this.id)" id="${index+1}"> Edit </a>
                    <a href="#" class="btn btn-primary col-sm-3 mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="viewModal(this.id)"  id="${index+1}"> View </a>

                </div>    
            </div>
        </div>
    </div>
    `

};
notesElm.innerHTML = html;
    }
}
function deleteNote(index)
{
   // console.log("deleting Note ",index);
   let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = []; 
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,2);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
    

}
function viewModal(index){
    console.log("Modal will be showed",index);
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = []; 
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    let modaltext = document.getElementById("modal-text");
    let modaltitle = document.getElementById("modal-title");
    
    let html =  "";
    let html2 =  "";
    html  =  ` ${notesObj[index-1]}`;
    html2  =  ` ${notesObj[index]}`;
    modaltext.innerHTML = html2;
    modaltitle.innerHTML = html;

}
function saveChanges(index){
    console.log("saving changes ",index);
    
    let addTitle = document.getElementById("edit-title");
    let addtxt = document.getElementById("edit-text");

    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [{1:"",2:""}]; 
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    
    // console.log(addTitle.innerHTML);
    // console.log(addtxt.value);

notesObj[index-1] = addTitle.value;
notesObj[index] = addtxt.value;
localStorage.setItem("notes",JSON.stringify(notesObj));
showNotes();
console.log(notesObj);


}

function editModal(index){
    console.log("Modal will be showed",index);
   
    let modaltext = document.getElementById("modal-text");
    let modaltitle = document.getElementById("modal-title");
    let modalbutton = document.getElementById("modBut")
    
    let html =  "";
    let html2 =  "";
    html  =  `TItle<textarea class="form-control" id="edit-title" rows="1">${notesObj[index-1]}</textarea>`;
    html2  =  `Text<textarea class="form-control" id="edit-text" rows="3">${notesObj[index]}</textarea>`;
    modaltext.innerHTML = html2;
    modaltitle.innerHTML = html;
    modalbutton.innerHTML = `<button type="button" class="btn btn-primary editBtn" onclick="saveChanges(this.id)" id="${index}">Save changes</button>`;
}
