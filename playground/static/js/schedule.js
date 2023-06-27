(async () => {

    // fetch tutor data and create objects/lists
    const tutorsJson = await fetch("/static/testdata.json").then(res => res.json());

    const tutors = tutorsJson.peerTutors;

    // create a seperate list of tutor objects for each period
    let p4Tutors = tutors.filter(tutor => tutor.lunch.includes("4"));
    let p5Tutors = tutors.filter(tutor => tutor.lunch.includes("5"));
    let p6Tutors = tutors.filter(tutor => tutor.lunch.includes("6"));
    console.log(p4Tutors);
    console.log(p5Tutors);
    console.log(p6Tutors);

    // initialize the interface
    weekViewButton.classList.add("selected");
    period4Button.classList.add("selected");
    clearInterface();
    await weekView();

    // create variables to keep track of the selected period and day
    let selectedPeriod = 4; // default to period 4
    let selectedDay = 0;  // 0 is weekview, 1 is mon, 2 is tue, etc.

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

    // populate interface with tutor data for every day - only include name
    async function weekView() {
        clearInterface();
        weekSchedule.style.display = "grid";
    }

    // populate interface with tutor data for the selected day
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

    /**
     * This function resets the displayed schedule, called when switching between day and week view
     * @parm null - this function uses local variables
     * @returns null - this function updates the interface, there is no return value
     */
    function clearInterface(){
        weekSchedule.style.display = "none";
        daySchedule.style.display = "none";
    }

    // Create a list of tutor objects for each period
    function sortTutorsByPeriod(tutors){

    }

    /**
     * This function updates the interface and populates the divs with tutors
     * -- call this every time a filter is changed or the period is changed
     * @param null - this function uses local variables
     * @returns null - this function updates the interface, there is no return value
     * */ 
    function updateFilters(){

    }

    
}) ();