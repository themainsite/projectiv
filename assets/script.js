(() => {
const $ = id => document.getElementById(id);
const get = key => { try { return JSON.parse(localStorage.getItem('projectiv_'+key)) ?? null; } catch { return null; } };
const set = (key,val) => localStorage.setItem('projectiv_'+key, JSON.stringify(val));
const completed = get('completed') || [];
const points = get('points') || 0;
const theme = get('theme');
if(theme === 'light') document.body.classList.add('light');
$('themeBtn')?.addEventListener('click',()=>{document.body.classList.toggle('light');set('theme',document.body.classList.contains('light')?'light':'dark')});
$('menuBtn')?.addEventListener('click',()=> $('nav')?.classList.toggle('open'));
const count = completed.length;
if($('lessonsDone')) $('lessonsDone').textContent=count;
if($('coursesStarted')) $('coursesStarted').textContent=new Set(completed.map(x=>x.slice(0,2))).size;
if($('quizPoints')) $('quizPoints').textContent=points;
if($('goalCount')) $('goalCount').textContent=Math.min(count,3)+'/3';
[['htmlProgress','html'],['cssProgress','css'],['jsProgress','js']].forEach(([id,prefix])=>{if($(id)){let n=completed.filter(x=>x.startsWith(prefix)).length;$(id).style.width=Math.min(n/2*100,100)+'%'}});
document.querySelectorAll('[data-lesson]').forEach(card=>{const id=card.dataset.lesson,btn=card.querySelector('button');if(completed.includes(id)){btn.textContent='✓ Completed';btn.classList.add('done')}btn.addEventListener('click',()=>{let list=get('completed')||[];if(!list.includes(id))list.push(id);set('completed',list);btn.textContent='✓ Completed';btn.classList.add('done');btn.disabled=true})});
$('courseSearch')?.addEventListener('input',e=>{let q=e.target.value.toLowerCase(),shown=0;document.querySelectorAll('.course-card').forEach(c=>{let ok=c.dataset.search.includes(q);c.hidden=!ok;if(ok)shown++});$('noCourses').hidden=shown>0});
const htmlDefault='<h1>Hello, Projectiv!</h1>\\n<p>I am building my first page.</p>\\n<button>Click me</button>';
const cssDefault='body {\\n  font-family: Arial, sans-serif;\\n  padding: 24px;\\n  color: #172033;\\n}\\nh1 { color: #0d9488; }\\nbutton {\\n  padding: 10px 16px;\\n  border: 0;\\n  border-radius: 8px;\\n  background: #0d9488;\\n  color: white;\\n}';
function run(){const h=$('htmlCode'),c=$('cssCode'),f=$('previewFrame');if(h&&c&&f)f.srcdoc='<!doctype html><html><head><style>'+c.value+'</style></head><body>'+h.value+'</body></html>'}
$('runCode')?.addEventListener('click',run);$('resetCode')?.addEventListener('click',()=>{$('htmlCode').value=htmlDefault;$('cssCode').value=cssDefault;run()});if($('previewFrame'))run();
const questions=[
['Which language gives a web page its structure?',['HTML','CSS','JavaScript'],0,'HTML provides the structure and content of a page.'],
['Which language is mainly used to style a web page?',['Python','CSS','SQL'],1,'CSS controls colours, spacing, fonts and layout.'],
['Which tag creates the largest standard heading?',['<h6>','<head>','<h1>'],2,'The h1 element is the highest-level heading.'],
['Which CSS property changes text colour?',['font-size','color','padding'],1,'Use the color property to change text colour.'],
['Which symbol starts a single-line JavaScript comment?',['//','##','<!--'],0,'Two forward slashes start a single-line JavaScript comment.'],
['Which HTML element creates a link?',['<img>','<a>','<p>'],1,'The anchor element, written as a, creates links.']
];
let qi=0,score=0,chosen=false;
function renderQuestion(){if(!$('question'))return;chosen=false;$('feedback').textContent='';$('nextQuestion').disabled=true;$('questionCount').textContent=`QUESTION ${qi+1} OF ${questions.length}`;$('quizBar').style.width=(qi/questions.length*100)+'%';$('question').textContent=questions[qi][0];$('answers').innerHTML='';questions[qi][1].forEach((a,i)=>{let b=document.createElement('button');b.className='answer';b.textContent=a;b.addEventListener('click',()=>choose(i,b));$('answers').appendChild(b)})}
function choose(i,btn){if(chosen)return;chosen=true;let q=questions[qi],buttons=[...$('answers').children];buttons.forEach((b,j)=>{b.disabled=true;if(j===q[2])b.classList.add('correct')});if(i===q[2]){score++;$('feedback').textContent='Correct! '+q[3]}else{btn.classList.add('wrong');$('feedback').textContent='Not quite. '+q[3]}$('nextQuestion').disabled=false;$('nextQuestion').textContent=qi===questions.length-1?'See results →':'Next question →'}
$('nextQuestion')?.addEventListener('click',()=>{if(!chosen)return;if(qi<questions.length-1){qi++;renderQuestion()}else{let old=get('points')||0;set('points',old+score);$('quiz').hidden=true;$('quizResult').hidden=false;$('finalScore').textContent=score+'/6';$('resultMessage').textContent=score>=5?'Excellent work — you are building a strong foundation.':score>=3?'Good effort. Review the lessons and give it another try.':'Keep practising. Every attempt helps you improve.'}});
$('retryQuiz')?.addEventListener('click',()=>{qi=0;score=0;$('quiz').hidden=false;$('quizResult').hidden=true;renderQuestion()});renderQuestion();
})();