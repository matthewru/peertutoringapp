
console.log("logged from schedule.js");

(async () => {
    console.log("Ran");
    weekViewButton.classList.add("selected");
    period4Button.classList.add("selected");
    await weekView();
    period4Button.addEventListener("click", async () => {
        clearPeriodSelected();
        period4Button.classList.add("selected");
    })
    period5Button.addEventListener("click", async () => {
        clearPeriodSelected();
        period5Button.classList.add("selected");
    })
    period6Button.addEventListener("click", async () => {
        clearPeriodSelected();
        period6Button.classList.add("selected");
    })

    // switch to week view if this is clicked
    weekViewButton.addEventListener("click", async () => {
        clearDaySelected();
        weekViewButton.classList.add("selected");
        await weekView();
    })

    // switch to day view if any of these are clicked
    monButton.addEventListener("click", async () => {
        clearDaySelected();
        monButton.classList.add("selected");
    })
    tueButton.addEventListener("click", async () => {
        clearDaySelected();
        tueButton.classList.add("selected");
    })
    wedButton.addEventListener("click", async () => {
        clearDaySelected();
        wedButton.classList.add("selected");
    })
    thuButton.addEventListener("click", async () => {
        clearDaySelected();
        thuButton.classList.add("selected");
    })
    friButton.addEventListener("click", async () => {
        clearDaySelected();
        friButton.classList.add("selected");
    })


    async function weekView() {

    }
    async function dayView() {
    
    }

    
    function constructDayView(name, period, classes) {

    }

    // clear the selected day
    function clearDaySelected(){
        monButton.classList.remove("selected");
        tueButton.classList.remove("selected");
        wedButton.classList.remove("selected");
        thuButton.classList.remove("selected");
        friButton.classList.remove("selected");
        weekViewButton.classList.remove("selected");
    }

    function clearPeriodSelected(){
        period4Button.classList.remove("selected");
        period5Button.classList.remove("selected");
        period6Button.classList.remove("selected");
    }

    // reset the displayed schedule, called when switching between day and week view
    function clearInterface(){
        
    }

}) ();