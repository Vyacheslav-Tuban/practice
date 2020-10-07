	//создание объекта в localStorage
	let db = localStorage.getItem("db") ? JSON.parse(localStorage.getItem("db")) :
	 {authors:[],books:[],genres:[]};

	window.addEventListener("load", ()=>{
	var get=function(id){
		return document.getElementById(id);
			}
	//ф-я сохранения и обновления страницы
	const saveDb = (db)=>{
		localStorage.setItem("db",JSON.stringify(db));
		location.reload();
	}

	//копирование свойств объекта в новый, передаваемый объект
	const assignObject = (object)=>{
		return Object.assign({},object)
	}

	/*const assignArray = (array)=>{
		return Object.assign([],array)
	}*/

// функция валидации	
	const validation = (elem, pattern)=>{
		var res=elem.value.search(pattern);
		if (res==-1) {
			elem.style.border="1px solid red";
			elem.style.borderColor="red";
		}else {
			elem.style.border="1px solid green";
			elem.style.borderColor="green";
		};
	}

//валадация на сохранениe редактирования атвора
	get("editAuthorLastName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);
	get("editAuthorName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);

//валидaция на сохранение нового атвора
	get("createAuthorLastName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);
	get("createAuthorName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);

//валидaция на сохранение редактирования книги
	get("editBookName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);
//валидaция на сохранение новой книги
	get("createBookName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);

//валидaция на сохранение редактирования жанра
	get("editGenreName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);
//валидaция на сохранение нового жанра
	get("createGenreName").addEventListener("change", function(){
			var pattern = /\S/;
    		validation(this, pattern);
		}, false);

//кнопки открытия создания
	get("createNewAuthor").addEventListener("click", ()=> {
		get("AuthorCreate").style.display="grid";
		get("createNewAuthor").style.display="none";		
	}, false);

	get("createNewBook").addEventListener("click", ()=>{
		get("BookCreate").style.display="grid";
		get("createNewBook").style.display="none";
	}, false);

	get("createNewGenre").addEventListener("click", ()=>{
		get("GenreCreate").style.display="grid";
		get("createNewGenre").style.display="none";
	}, false);

//кнопки отмены создания
	get("createAuthorCancel").addEventListener("click", ()=> {
		get("AuthorCreate").style.display="none";
		get("createAuthorLastName").value="";
		get("createAuthorLastName").style.border="none";
		get("createAuthorName").value="";
		get("createAuthorName").style.border="none";
		get("createAuthorPatronymic").value="";
		get("createAuthorPatronymic").style.border="none";
		get("createAuthorDate").value="";
		get("createAuthorSelectBooks").value="";
		get("createNewAuthor").style.display="block";
	}, false);
	get("createBookCancel").addEventListener("click", ()=>{
		get("BookCreate").style.display="none";
		get("createBookName").value="";
		get("createBookName").style.border="none";
		get("createBookPage").value="";
		get("createBookGenre").value="";
		get("createNewBook").style.display="block";
	}, false);
	get("createGenreCancel").addEventListener("click", ()=>{
		get("GenreCreate").style.display="none";
		get("createGenreName").value="";
		get("createGenreName").style.border="none";
		get("createNewGenre").style.display="block";
	}, false);




//ф-я заполняет массив книг авторов выбранными options из селекта
const getAuthorsBooksSelect = (select)=> {  
  let result = [];
  let options = select && select.options;
  let opt;
  if (select.selectedOptions != undefined) {
  for (let i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];
   console.log(opt);
    if (opt.selected && opt.value) {
      result.push(opt.text);
    }}
  }
  return result;
}
//кнопка сохранения при создании
	//автор
	get("createAuthorSave").addEventListener("click", ()=>{
		let invalid=false;
		let lastnameAuthor=get("createAuthorLastName");
		let nameAuthor=get("createAuthorName");
		if(lastnameAuthor.style.borderColor=="green" && nameAuthor.style.borderColor=="green" ){
			db.authors.push({
			lastName:get("createAuthorLastName").value,
			name:get("createAuthorName").value,
			patronymic:get("createAuthorPatronymic").value,
			date:new Date(get("createAuthorDate").value),
			books:getAuthorsBooksSelect(get("createAuthorSelectBooks"))
			});
			saveDb(db);
		} else if(lastnameAuthor.style.borderColor=="red" && nameAuthor.style.borderColor=="red") { 
			invalid = true;
		} else {
			invalid = true;
		};

		if(invalid){
			alert("Допущены ошибки при заполнении формы.");
			return false;
		};
	}, false);

	//книга
	get("createBookSave").addEventListener("click", ()=>{
		let invalid=false;
		let nameBook=get("createBookName");
		if(nameBook.style.borderColor=="green"){
		db.books.push({
			name:get("createBookName").value,
			page:get("createBookPage").value,
			genre:db.genres[get("createBookGenre").value].name
		})
		saveDb(db);
		} else if(nameBook.style.borderColor=="red") {
			invalid = true;
		} else {
			invalid = true;
		};

		if(invalid){
			alert("Допущены ошибки при заполнении формы.");
			return false;
		};
	}, false);

	//жанр
	get("createGenreSave").addEventListener("click", ()=>{
		let invalid=false;
		let nameGenre=get("createGenreName");
		if(nameGenre.style.borderColor=="green"){
		db.genres.push({
			name:get("createGenreName").value
		});
		saveDb(db);		
		} else if(nameGenre.style.borderColor=="red") {
			invalid = true;
		} else {
			invalid = true;
		};

		if(invalid){
			alert("Допущены ошибки при заполнении формы.");
			return false;
		};

	}, false);



//переменные сохраняют в себя индексы выбранных элементов
	let selectedGenre; 
	let selectedBook;
	let selectedAuthor;

//обработчик выбора объекта из дропдаун списка
	 //жанр
	get("selectEditGenre").addEventListener("change",(event)=>{
		get("GenreEdit").style.display="grid";
		let index = event.srcElement.selectedOptions[0].value;
		selectedGenre = {
			index
		};
		get("editGenreName").value =assignObject(db.genres[index]).name;
	},false)

	//книга
	get("selectBookEdit").addEventListener("change",(event)=>{
		get("BookEdit").style.display="grid";
		let index = event.srcElement.selectedOptions[0].value;
		selectedBook = {
			index
		};
		get("createBookGenre").value = assignObject(db.genres[index]).name;
		get("editBookName").value = assignObject(db.books[index]).name;
		get("editBookPage").value = assignObject(db.books[index]).page;
		optionsHandle("editBookGenre",db.genres);
		let elOptions=get("editBookGenre").options;
		for(let i=0;i=elOptions.length;i++){
			if(elOptions[i].text===db.books[index].genre){
				elOptions[i].selected = true;
				return ;
			}
		}
	},false)

	//автор
	get("selectAuthorEdit").addEventListener("change",(event)=>{
		get("AuthorEdit").style.display="grid";
		let index = event.srcElement.selectedOptions[0].value;
		selectedAuthor = {
			index
		};
		get("editAuthorLastName").value = assignObject(db.authors[index]).lastName;
		get("editAuthorName").value = assignObject(db.authors[index]).name;
		get("editAuthorPatronymic").value = assignObject(db.authors[index]).patronymic;
		get("editAuthorDate").value = assignObject(db.authors[index]).date;
		optionsHandle("editAuthorSelectBooks",db.books);
	},false)
	


//функции вывода массивов в дропдаун списки 
	//книги, жанры
	const optionsHandle = (id,array)=>{ 
		let optionList = document.getElementById(id).options;
	array.forEach((option,index)=>
		optionList.add(
			new Option(option.name, index)
			)
		);
	}
	//авторы
	const optionsAuthorHandle = (id,array)=>{  
		let optionList = document.getElementById(id).options;
	array.forEach((option,index)=>
			optionList.add(
			new Option(`${option.lastName} ${option.name} ${option.patronymic}`,index)
			)
		);
	}

//ВЫЗОВ функции вывода массивов в дропдаун списки 
	optionsHandle("selectEditGenre",db.genres); //вывод жанров для редактирования

	optionsHandle("createBookGenre",db.genres); //вывод жанра для создания книги

	optionsHandle("selectBookEdit",db.books); //вывод книги для редактирования

	optionsHandle("createAuthorSelectBooks", db.books); //вывод книги для создания автора

	optionsAuthorHandle("selectAuthorEdit",db.authors); //вывод автора для редактирования



	
	

//отмена редактирования
	//авторы
	get("editAuthorCancel").addEventListener("click", ()=>{ 
		get("AuthorEdit").style.display="none";
		get("selectAuthorEdit").value="Выберите автора для редактирования";
	}, false);

	//книги
	get("editBookCancel").addEventListener("click", ()=>{ 
			get("BookEdit").style.display="none";
			get("selectBookEdit").value="Выберите книгу для редактирования";
	}, false);

	//жанры
	get("editGenreCancel").addEventListener("click", ()=>{ 
		get("GenreEdit").style.display="none";
		get("selectEditGenre").value="Выберите жанр для редактирования";
	}, false);




//кнопка сохранения при редактировании
	//авторы
get("editAuthorSave").addEventListener("click", ()=>{ 
	let invalid=false;
		let editlastnameAuthor=get("editAuthorLastName");
		let editnameAuthor=get("editAuthorName");
		if((editlastnameAuthor.style.borderColor=="red" && editnameAuthor.style.borderColor=="red")||editlastnameAuthor.style.borderColor=="red" || editnameAuthor.style.borderColor=="red") { 
			invalid = true;
		} else {
			db.authors[selectedAuthor.index] = assignObject({
			lastName:get("editAuthorLastName").value,
			name:get("editAuthorName").value,
			patronymic:get("editAuthorPatronymic").value,
			date:get("editAuthorDate").value,
			books:get("editAuthorSelectBooks")
			});
			saveDb(db);
		}

		if(invalid){
			alert("Допущены ошибки при заполнении формы.");
			return false;
		};	
	}, false);

	//книги
get("editBookSave").addEventListener("click", ()=>{ 
		let invalid=false;
		let editnameBook=get("editBookName");
		if(editnameBook.style.borderColor=="red"){
			invalid = true;			
		} else { 
			db.books[selectedBook.index] = assignObject({
			name:get("editBookName").value,
			page:get("editBookPage").value,
			genre:get("editBookGenre").value
			});
			saveDb(db);
		};

		if(invalid){
			alert("Допущены ошибки при заполнении формы.");
			return false;
		};	
	
	}, false);
	
	//жанры
get("editGenreSave").addEventListener("click", ()=>{
		let invalid=false;
		let editnameGenre=get("editGenreName");
		if(editnameGenre.style.borderColor=="red"){
			invalid = true;			
		} else { 
			db.genres[selectedGenre.index] = assignObject({
			name:get("editGenreName").value
			});
			saveDb(db);
		};

		if(invalid){
			alert("Допущены ошибки при заполнении формы.");
			return false;
		};	 
	
	}, false);
	
//кнопка удаления
	//авторы
	get("deleteAuthor").addEventListener("click", ()=>{ 
		db.authors.splice(selectedAuthor.index,1);
		saveDb(db);
	}, false);

	//книги
	get("deleteBook").addEventListener("click", async()=>{ 
		db.books.splice(selectedBook.index,1);
		saveDb(db);
	}, false);
	
//функция поискa
	get("searchBookButton").addEventListener("click", ()=>{
    get("searchBookResult").style.display="grid";
    let bookInput = get("searchBookInput").value;
    let currentAuthor;
    if(bookInput=="" || bookInput==undefined ){
		get("BookNameSearch").innerHTML= "Введите название книги выше!";
		get("BookPageSearch").innerHTML  = "";
    	get("GenreSearch").innerHTML = "";
    	get("LastNameSearch").innerHTML = "";
    	get("NameSearch").innerHTML = "";
   		get("PatronymicSearch").innerHTML = "";
  }else{ 
  	get("BookNameSearch").innerHTML  = db.books.find(currentObj => currentObj.name === bookInput).name;
    get("BookPageSearch").innerHTML  = `Количество страниц: ${db.books.find(currentObj => currentObj.name === bookInput).page}`;
    get("GenreSearch").innerHTML = `Жанр: ${db.books.find(currentObj => currentObj.name === bookInput).genre}`;
    get("LastNameSearch").innerHTML = db.authors.find(currentObj => currentObj.books.find(currentBook => currentBook === bookInput) === bookInput).lastName;
    get("NameSearch").innerHTML = db.authors.find(currentObj => currentObj.books.find(currentBook => currentBook === bookInput) === bookInput).name;
    get("PatronymicSearch").innerHTML = db.authors.find(currentObj => currentObj.books.find(currentBook => currentBook === bookInput) === bookInput).patronymic;
    }
  }, false); 	

}, false);
	


