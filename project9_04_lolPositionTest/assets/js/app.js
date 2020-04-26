const questionSection = document.querySelector('.question');

let questionNumber = 1;
let typeData = {
    typeA: 0,
    typeB: 0,
    typeC: 0,
    typeD: 0,
    typeE: 0,
};

const pickQuestionData = (questionNumber) => {
    return questionList[questionNumber - 1];
};

const generateQeustion = (questionNum) => {
    const pickedQuestion = pickQuestionData(questionNum);
    createAndRenderQuestion(pickedQuestion);
};

const deleteQuestionElement = () => {
    questionSection.children[0].remove();
};

const getHighestNum = (A, B, C, D, E) => {
    let typeArray = [A, B, C, D, E];
    let maxNum = 0;
    for (const type of typeArray) {
        if (type > maxNum) {
            maxNum = type;
        }
    }
    return maxNum;
};

const showResult = () => {
    const tA = typeData.typeA;
    const tB = typeData.typeB;
    const tC = typeData.typeC;
    const tD = typeData.typeD;
    const tE = typeData.typeE;
    let resultType;

    const hightestTypeNum = getHighestNum(tA, tB, tC, tD, tE);

    if (hightestTypeNum === tA) {
        resultType = resultList[0];
    } else if (hightestTypeNum === tB) {
        resultType = resultList[1];
    } else if (hightestTypeNum === tC) {
        resultType = resultList[2];
    } else if (hightestTypeNum === tD) {
        resultType = resultList[3];
    } else if (hightestTypeNum === tE) {
        resultType = resultList[4];
    } 

    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
    <h1>결과</h1>
    <div>
        <h2>유형</h2>
        <p>${resultType.title}</p>
    </div>
    <div>
        <h2>내용</h2>
        <p>${resultType.content}</p>
    </div>
    <div>
        <h2>추천 라인</h2>
        <h3>${resultType.recommendPos}</h3>
        <p>${resultType.recommendDes}</p>
    </div>
    <div>
        <h2>비추천 라인</h2>
        <h3>${resultType.notRecommendPos}</h3>
        <p>${resultType.notRecommendDes}</p>
    </div>
    `;

    questionSection.append(questionElement);
};

const yesHandler = (question) => {
    switch(question.type) {
        case 'A':   
            typeData.typeA++;
            break;
        case 'B':
            typeData.typeB++;
            break;
        case 'C':
            typeData.typeC++;
            break;
        case 'D':
            typeData.typeD++;
            break;
        case 'E':
            typeData.typeE++;
            break;
    }
    questionNumber++;
    deleteQuestionElement();

    if (questionNumber !== 40) {
        generateQeustion(questionNumber);
        return;
    }
    showResult();
};

const noHandler = () => {
    questionNumber++;
    deleteQuestionElement();

    if (questionNumber !== 40) {
        generateQeustion(questionNumber);
        return;
    }

    showResult();
};

const createAndRenderQuestion = (question) => {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
    <h2>${question.name}</h2>
    <p>${question.content}</p>
    <button class="btn-yes">네</button>
    <button class="btn-no">아니오</button>
    `;
    const btnYes = questionElement.querySelector('.btn-yes');
    const btnNo = questionElement.querySelector('.btn-no');

    btnYes.addEventListener('click', yesHandler.bind(null, question));
    btnNo.addEventListener('click', noHandler);

    questionSection.append(questionElement);
};

generateQeustion(questionNumber);