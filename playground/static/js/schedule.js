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
        if(selectedPeriod == 4){return;} // do nothing if already in period 4
        clearPeriodSelected();
        period4Button.classList.add("selected");
        selectedPeriod = 4;
        if(selectedDay == 0){await weekView();}
        else{await dayView(selectedDay);}
    })
    period5Button.addEventListener("click", async () => {
        if(selectedPeriod == 5){return;} 
        clearPeriodSelected();
        period5Button.classList.add("selected");
        selectedPeriod = 5;
        if(selectedDay == 0){await weekView();}
        else{await dayView(selectedDay);}
    })
    period6Button.addEventListener("click", async () => {
        if(selectedPeriod == 6){return;}
        clearPeriodSelected();
        period6Button.classList.add("selected");
        selectedPeriod = 6;
        if(selectedDay == 0){await weekView();}
        else{await dayView(selectedDay);}
    })

    // switch to week view
    weekViewButton.addEventListener("click", async () => {
        if(selectedDay == 0){return;} // do nothing if already in week view
        clearDaySelected();
        weekViewButton.classList.add("selected");
        selectedDay = 0;
        await weekView();
    })

    // switch to day view
    monButton.addEventListener("click", async () => {
        if(selectedDay == 1){return;}
        clearDaySelected();
        monButton.classList.add("selected");
        selectedDay = 1;
        await dayView(1);
    })
    tueButton.addEventListener("click", async () => {
        if(selectedDay == 2){return;}
        clearDaySelected();
        tueButton.classList.add("selected");
        selectedDay = 2;
        await dayView(2);
    })
    wedButton.addEventListener("click", async () => {
        if(selectedDay == 3){return;}
        clearDaySelected();
        wedButton.classList.add("selected");
        selectedDay = 3;
        await dayView(3);
    })
    thuButton.addEventListener("click", async () => {
        if(selectedDay == 4){return;}
        clearDaySelected();
        thuButton.classList.add("selected");
        selectedDay = 4;
        await dayView(4);
    })
    friButton.addEventListener("click", async () => {
        if(selectedDay == 5){return;}
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

    // update the schedule when the apply filters button is clicked
    applyFiltersButton.addEventListener("click", async () => {
        updateFilters();
        if(selectedDay == 0){
            await weekView();
        }
        else{
            await dayView(selectedDay);
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
        let dayString = "";
        if(day == 1){dayString = "Monday";}
        else if(day == 2){dayString = "Tuesday";}
        else if(day == 3){dayString = "Wednesday";}
        else if(day == 4){dayString = "Thursday";}
        else if(day == 5){dayString = "Friday";}

        // filter displayedTutors to only include tutors available on the selected day
        displayedTutors = displayedTutors.filter(tutor => tutor.days.includes(dayString));
        console.log(displayedTutors)
        
        // clear the dayview divs innerHTML
        daySchedule.innerHTML = "";

        // populate the dayview div with tutor names and expertise
        for(let i = 0; i < displayedTutors.length; i++){
            let tutorDiv = constructTutorDiv(displayedTutors[i]);
            daySchedule.appendChild(tutorDiv);
        }
        clearInterface();
        daySchedule.style.display = "grid";
    }

    /**
     * This function creates a div for an individual tutor that includes their name and expertise
     *  -- called only in dayView()
     * @param {*} tutor 
     * @returns 
     */
    function constructTutorDiv(tutor){
        const tutorDiv = document.createElement("div");
        tutorDiv.className = "tutor-div";
        const tutorName = document.createElement("h3");
        tutorName.className = "tutor-name";
        const tutorGrade = document.createElement("p");
        tutorGrade.className = "tutor-grade";
        const tutorDays = document.createElement("p");
        tutorDays.className = "tutor-days";
        const tutorHeader = document.createElement("div");
        tutorHeader.className = "tutor-header";
        const tutorExpertise = document.createElement("p");
        tutorExpertise.className = "tutor-expertise";
        
        daysString = "Days: ";
        for(let i = 0; i < tutor.days.length; i++){
            daysString += tutor.days[i] + " ";
        }
        tutorName.innerHTML = tutor.name;
        tutorGrade.innerHTML = tutor.grade;
        tutorDays.innerHTML = daysString;
        tutorExpertise.innerHTML = tutorExpertiseToString(tutor);
        tutorHeader.appendChild(tutorName);
        tutorHeader.appendChild(tutorDays);
        tutorHeader.appendChild(tutorGrade);
        tutorDiv.appendChild(tutorHeader);
        tutorDiv.appendChild(tutorExpertise);
        return tutorDiv;
    }

    function tutorExpertiseToString(tutor){
        let tutorString = "";

        for(const subject in tutor.expertise){
            tutorString += "  " +subject + ": ";
            console.log(subject)
            for(let i = 0; i < tutor.expertise[subject].length; i++){
                tutorString += tutor.expertise[subject][i] + " ";
            }
        }

        return tutorString;
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
     * -- called through weekview()/dayview() every time a filter is updated or the period/day is changed
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

        filteredTutors = filteredTutors.filter(tutor => filterTutor(tutor));

        return filteredTutors;
    }

    /**
     * This function decides whether or not a tutor should be displayed based on the filters
     * -- called only in updateFilters()
     * @param {Object} tutor - the tutor object to be filtered
     * @returns {Boolean} - true if the tutor should be displayed, false if not
     */ 
    function filterTutor(tutor){

        return true;
    }

    

    
}) ();