document.addEventListener("DOMContentLoaded", function () {
    // To-Do List 
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", function () {
        const taskValue = taskInput.value.trim();

        if (taskValue === "") {
            showError("Task input cannot be empty");
        } else {
            addTask(taskValue);
            taskInput.value = "";
        }
    });

    function addTask(taskValue) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskValue}</span>
            <button class="delete">Delete</button>
        `;
    
        taskList.appendChild(li);
    
        li.querySelector("button.delete").addEventListener("click", function () {
            showSuccess("Task deleted successfully");
            taskList.removeChild(li);
        });
    
        li.addEventListener("click", function () {
            li.classList.toggle("completed");
        });
    }
    

    // Countdown Timer 
    const durationInput = document.getElementById("durationInput");
    const startTimerButton = document.getElementById("startTimer");
    const timerDisplay = document.getElementById("timer");

    let countdown;

    startTimerButton.addEventListener("click", function () {
        const duration = parseInt(durationInput.value);

        if (isNaN(duration) || duration <= 0) {
            alert("Please enter a valid timer duration (in seconds).");
            return;
        }

        startTimer(duration);
    });

    function startTimer(duration) {
        clearInterval(countdown);

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        displayTimeLeft(duration);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((endTime - Date.now()) / 1000);

            if (secondsLeft <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = "Time's up!";
                return;
            }

            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timerDisplay.textContent = display;
    }

    // Interactive Tabs
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            
            tabContents.forEach((content) => {
                content.style.display = "none";
            });

            tabContents[index].style.display = "block";

            tabs.forEach((t) => {
                t.classList.remove("active");
            });
            tab.classList.add("active");
        });
    });

    
    const animateButton = document.getElementById("animateButton");
    const animatedElement = document.getElementById("animatedElement");

    function animateElement() {

    animatedElement.classList.add("animated");

    
    setTimeout(() => {
        animatedElement.classList.remove("animated");
    }, 1000); 
    }

   
    animateButton.addEventListener("click", animateElement);


    // User Feedback 
    function showError(message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger";
        errorDiv.textContent = message;
        const container = document.querySelector(".container");
        container.insertBefore(errorDiv, taskInput);

        setTimeout(function () {
            errorDiv.remove();
        }, 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement("div");
        successDiv.className = "alert alert-success";
        successDiv.textContent = message;
        const container = document.querySelector(".container");
        container.insertBefore(successDiv, taskInput);
    
        setTimeout(function () {
            successDiv.remove();
        }, 3000);
    }
    
});
