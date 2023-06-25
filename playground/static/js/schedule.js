(async () => {
    weekViewButton.classList.add("selected");
    period4Button.classList.add("selected");
    clearInterface();
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
        await dayView();
    })
    tueButton.addEventListener("click", async () => {
        clearDaySelected();
        tueButton.classList.add("selected");
        await dayView();
    })
    wedButton.addEventListener("click", async () => {
        clearDaySelected();
        wedButton.classList.add("selected");
        await dayView();
    })
    thuButton.addEventListener("click", async () => {
        clearDaySelected();
        thuButton.classList.add("selected");
        await dayView();
    })
    friButton.addEventListener("click", async () => {
        clearDaySelected();
        friButton.classList.add("selected");
        await dayView();
    })


    async function weekView() {
        clearInterface();
        weekSchedule.style.display = "grid";
    }

    async function dayView() {
        clearInterface();
        daySchedule.style.display = "grid";
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
        weekSchedule.style.display = "none";
        daySchedule.style.display = "none";
    }

}) ();