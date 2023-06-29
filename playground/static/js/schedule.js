(async () => {

    // fetch tutor data and create a list of tutor objects
    const tutorsJson = await fetch("/static/testdata.json").then(res => res.json());
    const tutors = tutorsJson.peerTutors;

    // create a seperate list of tutor objects for each period
    let p4Tutors = tutors.filter(tutor => tutor.lunch.includes("4"));
    let p5Tutors = tutors.filter(tutor => tutor.lunch.includes("5"));
    let p6Tutors = tutors.filter(tutor => tutor.lunch.includes("6"));
    console.log(p4Tutors);
    console.log(p5Tutors);
    console.log(p6Tutors);

    // to keep track of the selected period and day
    let selectedPeriod = 4; 
    let selectedDay = 0;  // 0 is weekview, 1 is mon, 2 is tue, etc.

    // initialize the interface
    weekViewButton.classList.add("selected"); // default to week view and period 4
    period4Button.classList.add("selected");
    clearInterface();
    await weekView();

    // update the schedule when a new period is selected
    period4Button.addEventListener("click", async () => {
        clearPeriodSelected();
        period4Button.classList.add("selected");
        selectedPeriod = 4;
        updateFilters();
    })
    period5Button.addEventListener("click", async () => {
        clearPeriodSelected();
        period5Button.classList.add("selected");
        selectedPeriod = 5;
        updateFilters();
    })
    period6Button.addEventListener("click", async () => {
        clearPeriodSelected();
        period6Button.classList.add("selected");
        selectedPeriod = 6;
        updateFilters();
    })

    // switch to week view
    weekViewButton.addEventListener("click", async () => {
        clearDaySelected();
        weekViewButton.classList.add("selected");
        selectedDay = 0;
        await weekView();
    })

    // switch to day view
    monButton.addEventListener("click", async () => {
        clearDaySelected();
        monButton.classList.add("selected");
        selectedDay = 1;
        await dayView(1);
    })
    tueButton.addEventListener("click", async () => {
        clearDaySelected();
        tueButton.classList.add("selected");
        selectedDay = 2;
        await dayView(2);
    })
    wedButton.addEventListener("click", async () => {
        clearDaySelected();
        wedButton.classList.add("selected");
        selectedDay = 3;
        await dayView(3);
    })
    thuButton.addEventListener("click", async () => {
        clearDaySelected();
        thuButton.classList.add("selected");
        selectedDay = 4;
        await dayView(4);
    })
    friButton.addEventListener("click", async () => {
        clearDaySelected();
        friButton.classList.add("selected");
        selectedDay = 5;
        await dayView(5);
    })

    // update the filter tab when a subject is checked
    mathFilter.addEventListener("change", async () => {
        if(mathFilter.checked){
            mathRadioFilters.style.display = "block";
        }
        else{
            mathRadioFilters.style.display = "none";
        }
    })
    scienceFilter.addEventListener("change", async () => {
        if(scienceFilter.checked){
            scienceRadioFilters.style.display = "block";
        }
        else{
            scienceRadioFilters.style.display = "none";
        }
    })
    commArtsFilter.addEventListener("change", async () => {
        if(commArtsFilter.checked){
            commArtsRadioFilters.style.display = "block";
        }
        else{
            commArtsRadioFilters.style.display = "none";
        }
    })
    socialScienceFilter.addEventListener("change", async () => {
        if(socialScienceFilter.checked){
            socialScienceRadioFilters.style.display = "block";
        }
        else{
            socialScienceRadioFilters.style.display = "none";
        }
    })
    foreignLangFilter.addEventListener("change", async () => {
        if(foreignLangFilter.checked){
            foreignLangRadioFilters.style.display = "block";
        }
        else{
            foreignLangRadioFilters.style.display = "none";
        }
    })
    electivesFilter.addEventListener("change", async () => {
        if(electivesFilter.checked){
            electivesRadioFilters.style.display = "block";
        }
        else{
            electivesRadioFilters.style.display = "none";
        }
    })
        

    // populate week-view div with tutor data for each day - only include name
    async function weekView() {
        let displayedTutors = updateFilters();
        // create an array for each day using displayedTutors

        // clear each divs innerHTML

        // populate each days div with tutor names

        clearInterface();
        weekSchedule.style.display = "grid";
    }

    /**
     * populate day-schedule div with tutor names and expertie for a specific day
     * @param {int} day | 1 2 3 4 5
     * @returns null - this function updates the interface
     */
    async function dayView(day) {
        let displayedTutors = updateFilters();
        // filter displayedTutors to only include tutors available on the selected day

        // clear the dayview divs innerHTML

        // populate the dayview div with tutor names and expertise
        clearInterface();
        daySchedule.style.display = "grid";
    }

    // clear the selected day every time a new day is selected
    function clearDaySelected(){
        weekViewButton.classList.remove("selected");
        monButton.classList.remove("selected");
        tueButton.classList.remove("selected");
        wedButton.classList.remove("selected");
        thuButton.classList.remove("selected");
        friButton.classList.remove("selected");
    }

    // clear the selected period every time a new period is selected
    function clearPeriodSelected(){
        period4Button.classList.remove("selected");
        period5Button.classList.remove("selected");
        period6Button.classList.remove("selected");
    }

    /**
     * Resets the displayed schedule, called when switching between day and week view
     * @parm null - this function uses local variables
     * @returns null - this function updates the interface
     */
    function clearInterface(){
        weekSchedule.style.display = "none";
        daySchedule.style.display = "none";
    }

    /**
     * Updates the interface and populates the divs with tutors
     * -- called every time a filter is updated or the period/day is changed
     * @param null - this function uses local variables
     * @returns {Array} filteredTutors - a list of tutor objects that should be displayed
     * */ 
    function updateFilters(){
        let filteredTutors = [];
        if(selectedPeriod == 4){
            filteredTutors = p4Tutors;
        }
        else if(selectedPeriod == 5){
            filteredTutors = p5Tutors;
        }
        else{filteredTutors = p6Tutors;}

        


        return filteredTutors;
    }

    /**
     * This function decides whether or not a tutor should be displayed based on the filters
     * -- called only in updateFilters()
     * @param {Object} tutor - the tutor object to be filtered
     * @returns {Boolean} - true if the tutor should be displayed, false if not
     */
    function classFilter(tutor){

    }

    
}) ();