"use strict";

const questions = [
	{
		question: "Укажите свой пол:",
		answers: ["Женщина", "Мужчина"],
		type: "radio",
	},
	{
		question: "В какое время суток Вы чувствуете себя наиболее комфортно?",
		answers: [
			"Утро",
			"Ночь",
			"Вечер",
			"День",
		],
		type: "radio",
	},
	{
		question: "Подскажите, мучает ли Вас бессонница последнее время?",
		answers: [
			"Да",
			"Нет",
			"Иногда", 
		],
		type: "radio",
	},
	{
		question: "Чувствуете ли Вы в последнее время, что вам никак не удается осуществить ваши планы?",
		answers: [
				"Да",
		 		"Нет",
				"Иногда",
		],
		type: "radio",
	},
	{
		question: "Какой Вы видите свою жизнь через 5 лет?",
		answers: [
				"Брак, семья, дети, дом",
		 		"Путешествия по Миру",
				"Успешная карьера",
				"Всё вместе",
		],
		type: "radio",
	},
	{
		question: "Введите дату своего рождения:",
		month: [
			"Месяц",
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь",
		],
		type: "select",
	},
];

const headerConteiner = document.querySelector('#header');
const listConteiner = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
let formList = document.createElement('form');
const divQuiz = document.getElementById('quiz');
const load = document.getElementById('loading');
const content = document.getElementById('content');
const header = document.querySelector('header');
const conteiner = document.getElementById('conteiner');
const wrapper = document.getElementById('wrapper');

let questionIndex = 0; //текуший вопрос

clearPage();
showQuestion();
listConteiner.addEventListener('click', checkAnswer);
submitBtn.addEventListener('click', nextQuestion); 

function nextQuestion () {
	submitBtn.classList.remove('show');
	if(questionIndex === 0) {
		content.remove();
		listConteiner.style.display = "block";
		listConteiner.style.width = "revert";
		header.style = "margin-bottom:3rem";
	}
	if (questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		loading ();
	}
}

function clearPage(){
	headerConteiner.innerHTML = '';
	listConteiner.innerHTML = '';	
	formList.remove();
}

function showQuestion(){
	const headerTemplate = '<h2 class="title">%title%</h2>';
	const title = headerTemplate.replace('%title%',questions[questionIndex]['question']);
	
	headerConteiner.innerHTML = title;

	const saveCurentQsuestion = questions[questionIndex];

	if (saveCurentQsuestion.type === "radio") {
		for (let answerText of questions[questionIndex]['answers']) {

			const questionsTemplate = 
			`<li class="list_answer">
				<lable class="list_lable">
					<input type="radio" class="answer" name="${answerText}" />
					<span class="answers">%answer</span>
				</lable>
			</li>`;
	
			const answerHTML = questionsTemplate.replace('%answer',answerText);
			listConteiner.innerHTML += answerHTML;
		}
	}

	if (saveCurentQsuestion.type === "select") {
		
		divQuiz.removeChild(listConteiner);
		divQuiz.appendChild(formList);
		formList.classList.add('form');
		let selectday = document.createElement('select');
		selectday.classList.add('selectday');

		for (let i = 1; i <= 31; i++) {
		  let optionDay = document.createElement('option');
		  optionDay.classList.add('text_option');
		  optionDay.innerText = i;
		  selectday.appendChild(optionDay);
		}
		formList.appendChild(selectday);
		
		const month = questions[questionIndex]['month'];
		let selectMonth = document.createElement('select');
		selectMonth.classList.add('selectmonth');

		for (let item of month) {
			let optionMonth = document.createElement('option');
			optionMonth.classList.add('text_option');
			optionMonth.innerText = item;
		  	selectMonth.appendChild(optionMonth);
		}
		formList.appendChild(selectMonth);

		let selectYear = document.createElement('select');
		selectYear.classList.add('selectyear');
		for (let i = 1980; i <= 2022; i++) {
		  let optionYear = document.createElement('option');
		  optionYear.classList.add('text_option');
		  optionYear.innerText = i;
		  selectYear.appendChild(optionYear);
		}
		formList.appendChild(selectYear);
		checkData();

	}

}

function checkData () {
	const choseDay = document.querySelector(".selectday");
	const choseMonth = document.querySelector(".selectmonth");
	const choseYear = document.querySelector(".selectyear");

	choseDay.classList.add("select_style");
	choseMonth.classList.add("select_style");
	choseYear.classList.add("select_style");

	let scoreChose = 0;

	choseDay.addEventListener('change', scoreChenge);
	
	choseMonth.addEventListener('change', scoreChenge);

	choseYear.addEventListener('change', scoreChenge);

	function scoreChenge () {
		scoreChose +=1;
		if(scoreChose === 3){
			submitBtn.classList.add('show');
		}
	}
}

function loading () {

	load.innerHTML = `
		<div class="wrapper" id="wrapper">
			<div class="progress">
				<div class="progress_line-bg">
					<div class="progress_line" id="progress_line"></div>
				</div>
			</div>
		</div>
	`;

	let elem = document.getElementById('progress_line'),
		width = 1,
		id = setInterval(progressStatus,10);
		function progressStatus (){
			if(width >= 100){
				clearInterval(id);
			} else {
				width++;
				elem.style.width = width + '%';
				elem.innerHTML = width * 1 + '%';
			}
		}
		headerConteiner.remove();
		setTimeout(loadPage,2000);
}

function loadPage () {

	divQuiz.style = "background-color:#fff";

	divQuiz.innerHTML = `
	<p class="load_page">Анализ введенных данных . . . . . . . <span class="load_done">Выполнено!</span></p>
	<p class="load_page">Коррекция астрологического знака . . . . . . . <span class="load_done">Выполнено!</span></p>
	<p class="load_page">Расчет вариаций ответов . . . . . . . <span class="load_done">Выполнено!</span></p>
	<p class="load_page">Генерация предсказания . . . . . . . <span class="load_done">Выполнено!</span></p>
	<p class="load_page">Сохранение результата . . . . . . . <span class="load_done">Выполнено!</span></p>
	<p class="load_page">Поиск свободного оператора . . . . . . . <span class="load_done">Выполнено!</span></p>
	<p class="load_page">Начала озвучки и записи аудио-сообщения . . . . . . .</P>

	<h2 class="record">Идёт запись!</h2>
	<h2 class="done">Готово!</h2>
	`;
	
	setTimeout(callPage,2000);
	
}

function callPage(){
	
	divQuiz.innerHTML = '';
	divQuiz.style.display = "block";
	divQuiz.style = "padding:3.4rem 1.5rem 2.7rem";
	divQuiz.innerHTML = `
	<h2 class="call-title_page">Спасибо за Ваши ответы!</h2>
	<h2 class="call_title">Поздравляем! Прослушать свой персональный гороскоп возможно уже сейчас!</h2>
	<p class="call_text">
	<span class="call_year">2021 год Вас ошарашит!</span>
	Вас ждёт то, чего Вы никак не ожидали. Первые известия Вы получите совсем скоро, возможно это 17-18 ноября!
	
	Что бы прослушать аудио-сообщение, необходимо нажать на кнопку ниже и позвонить со своего мобильного телефона.
	Позвоните и Прослушайте очень серьезную информацию!
	</p>
	<img class="call_img" src="./img/Vector.png" alt="#">
	<button class="callbtn" id="call" >Звонить и слушать</button>
	`;
	load.remove();
}

function checkAnswer() {
	
	const checkRadio = listConteiner.querySelector('input[type="radio"]:checked');

	if (checkRadio) {
		submitBtn.classList.add('show');
	}

}
