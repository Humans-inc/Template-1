window.addEventListener('load', () => {
                        
	const submitBtn = document.querySelector('.submit__btn button');
	let lessonName = document.querySelector('.lesson-title-value').innerText;
    let lessonLink = window.location.href.replace(`https://${window.location.hostname}`, '');
    let moduleName = document.querySelector('h1 a').innerText;
    let moduleLink = document.querySelector('h1 a').href.replace(`https://${window.location.hostname}`, '');

	let inputLessonName = document.querySelector('.lesson__name input[type="hidden"]');
	inputLessonName.value = lessonName;

	let inputLessonLink = document.querySelector('.lesson__link input[type="hidden"]');
	inputLessonLink.value = lessonLink;

	let inputModuleName = document.querySelector('.module__name input[type="hidden"]');
	inputModuleName.value = moduleName;

	let inputModuleLink = document.querySelector('.module__link input[type="hidden"]');
	inputModuleLink.value = moduleLink;

	submitBtn.click();
})
