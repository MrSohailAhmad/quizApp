// getting all required elements.

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line")
let option_list = document.querySelector(".option_list");

const timeoff = quiz_box.querySelector(".timer .time_left_txt");


// if start btn clicked

start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // the activeInfo Class For show info box
}

// if Exit-btn clicked

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
}

// if continue btn clicked


continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.classList.add("activeQuiz"); // show the quiz box 
    showQuestion(0); // calling function is for the questions 
    queCounter(1)
    startTime(15)
    startTimerLine(0);

}

let que_count = 0;
let que_numb = 1
let userScore = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;

const next_btn = quiz_box.querySelector(".next_btn")
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit")

restart_quiz.onclick = () => {
        quiz_box.classList.add("activeQuiz");
        result_box.classList.remove("activeResult");
        let que_count = 0;
        let que_numb = 1
        let userScore = 0;
        let timeValue = 15;
        let widthValue = 0;
        // 
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter)
        startTime(timeValue);
        // 
        clearInterval(counterLine)
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeoff.textContent = "Time left";
    }
    // for quit quiz btn
quit_quiz.onclick = () => {
    window.location.reload()
}

// if next_btn clciked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter)
        startTime(timeValue);

        clearInterval(counterLine)
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeoff.textContent = "Time left";

    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Question Complete");
        showResultBox();
    }
}

// getting question and option from array

const showQuestion = index => {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' +
        questions[index].numb + ". " + questions[index].question + '</span>'; // here question 0 is for queston index
    let option_tag = '<div class="option"> ' + questions[index].options[0] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");

    }

}


let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

const optionSelected = (answer) => {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct")
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect")
        console.log("Your Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        //if answer is incorrect then automataically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }
    //when user select the option then disable all option

    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";

}
const showResultBox = () => {
    info_box.classList.remove("activeInfo"); // hide info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); // show the result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span>and Congrats!, You Got only <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    // 
    else if (userScore > 1) {
        let scoreTag = '<span>and Nice!, You Got only <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    // 
    else {
        let scoreTag = '<span>and Sorry, You Got only <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
};




const startTime = (time) => {
    counter = setInterval(() => {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeoff.textContent = "Time off";


            // 
            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;
            // 
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct")
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }, 1000);
}

// //////////
const startTimerLine = (time) => {
    counterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }, 29);
}



// bottom question counter


const queCounter = index => {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';

    bottom_ques_counter.innerHTML = totalQuesCountTag;
}