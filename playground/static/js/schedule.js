(async () => {

    // fetch tutor data and create a list of tutor objects
    const tutorsJson = await fetch("/static/testdata.json").then(res => res.json());
    const tutors = tutorsJson.peerTutors;
    const classes = await fetch("/static/classestutored.json").then(res => res.json());

    let classFilters = {}; // object to keep track of which classes are selected for filtering
    // each subject/class is a key that returns true/false, initialized in createFilters() and set through event listeners

    await createFilters(classes);

    // create a seperate list of tutor objects for each period
    let p4Tutors = tutors.filter(tutor => tutor.lunch.includes("4"));
    let p5Tutors = tutors.filter(tutor => tutor.lunch.includes("5"));
    let p6Tutors = tutors.filter(tutor => tutor.lunch.includes("6"));

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

    // update the schedule when the apply filters button is clicked
    applyFiltersButton.addEventListener("click", async () => {
        if(selectedDay == 0){
            await weekView();
        }
        else{
            await dayView(selectedDay);
        }
    })

    // clear all filters when the clear filters button is clicked
    clearFiltersButton.addEventListener("click", async () => {
        for(const subject in classes){
            document.getElementById(subject).checked = false;
            classFilters[subject] = false;
        }
        const forms = document.getElementsByClassName("filter-radio-form");
        for(let i = 0; i < forms.length; i++){
            forms[i].style.display = "none";
            classFilters[forms[i].id] = false;
            for(let j = 0; j < forms[i].children.length; j++){
                if(forms[i].children[j].type == "radio"){
                    forms[i].children[j].checked = false;
                }
            }
        }

        // Refresh the schedule
        if(selectedDay == 0){
            await weekView();
        }
        else{
            await dayView(selectedDay);
        }
    })

    // populate week-view div with tutor data for each day - only include name and grade
    async function weekView() {
        let displayedTutors = updateFilters();

        // create an array for each day using displayedTutors
        let monTutors = displayedTutors.filter(tutor => tutor.days.includes("Monday"));
        let tueTutors = displayedTutors.filter(tutor => tutor.days.includes("Tuesday"));
        let wedTutors = displayedTutors.filter(tutor => tutor.days.includes("Wednesday"));
        let thuTutors = displayedTutors.filter(tutor => tutor.days.includes("Thursday"));
        let friTutors = displayedTutors.filter(tutor => tutor.days.includes("Friday"));

        // clear each divs innerHTML
        monSchedule.innerHTML = "";
        tueSchedule.innerHTML = "";
        wedSchedule.innerHTML = "";
        thuSchedule.innerHTML = "";
        friSchedule.innerHTML = "";

        // populate each days div with tutor names
        for(let i = 0; i < monTutors.length; i++){
            let tutor = monTutors[i];
            let tutorDiv = document.createElement("div");
            tutorDiv.classList.add("tutor-week-view");
            tutorDiv.innerHTML = tutor.name+ "  (" + tutor.grade + ")";
            monSchedule.appendChild(tutorDiv);
        }
        for(let i = 0; i < tueTutors.length; i++){
            let tutor = tueTutors[i];
            let tutorDiv = document.createElement("div");
            tutorDiv.classList.add("tutor-week-view");
            tutorDiv.innerHTML = tutor.name+ "  (" + tutor.grade + ")";
            tueSchedule.appendChild(tutorDiv);
        }
        for(let i = 0; i < wedTutors.length; i++){
            let tutor = wedTutors[i];
            let tutorDiv = document.createElement("div");
            tutorDiv.classList.add("tutor-week-view");
            tutorDiv.innerHTML = tutor.name+ "  (" + tutor.grade + ")";
            wedSchedule.appendChild(tutorDiv);
        }
        for(let i = 0; i < thuTutors.length; i++){
            let tutor = thuTutors[i];
            let tutorDiv = document.createElement("div");
            tutorDiv.classList.add("tutor-week-view");
            tutorDiv.innerHTML = tutor.name+ "  (" + tutor.grade + ")";
            thuSchedule.appendChild(tutorDiv);
        }
        for(let i = 0; i < friTutors.length; i++){
            let tutor = friTutors[i];
            let tutorDiv = document.createElement("div");
            tutorDiv.classList.add("tutor-week-view");
            tutorDiv.innerHTML = tutor.name+ "  (" + tutor.grade + ")";
            friSchedule.appendChild(tutorDiv);
        }

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
        const tutorName = document.createElement("h2");
        tutorName.className = "tutor-name";
        const tutorGrade = document.createElement("p");
        tutorGrade.className = "tutor-grade";
        const tutorDays = document.createElement("p");
        tutorDays.className = "tutor-days";
        const tutorHeader = document.createElement("div");
        tutorHeader.className = "tutor-header";
        const tutorExpertise = tutorExpertiseToDiv(tutor);
        tutorExpertise.className = "tutor-expertise";
        
        daysString = "Days: ";
        for(let i = 0; i < tutor.days.length; i++){
            daysString += tutor.days[i];
            if(i != tutor.days.length - 1){
                daysString += ", ";
            }
        }
        tutorName.innerHTML = tutor.name;
        tutorGrade.innerHTML = "Gr: " + tutor.grade;
        tutorDays.innerHTML = daysString;
        tutorHeader.appendChild(tutorName);
        tutorHeader.appendChild(tutorDays);
        tutorHeader.appendChild(tutorGrade);
        tutorDiv.appendChild(tutorHeader);
        tutorDiv.appendChild(tutorExpertise);
        return tutorDiv;
    }

    /**
     *  This function creates a div that displays the tutors expertise, formatted as follows:
     *     Expertise: class: classes| class: classes| class: classes|...
     *  -- called only in constructTutorDiv(), used for dayview
     * @param {*} tutor 
     * @returns 
     */
    function tutorExpertiseToDiv(tutor){
        const tutorExpertise = document.createElement("div");
        const tutorExpertiseHeader = document.createElement("h3");
        tutorExpertiseHeader.className = "tutor-expertise-header";
        tutorExpertiseHeader.innerHTML = "Expertise: ";
        tutorExpertise.appendChild(tutorExpertiseHeader);

        for(const subject in tutor.expertise){
            if(tutor.expertise[subject].length == 0){continue;} // skip subjects with no expertise (empty array)
            const tutorSubject = document.createElement("h4");
            tutorSubject.className = "tutor-expertise-subject";
            tutorSubject.innerHTML = subject + ": ";
            tutorExpertise.appendChild(tutorSubject);
            let expertise = document.createElement("p");
            expertise.className = "tutor-expertise-classes";
            for(let i = 0; i < tutor.expertise[subject].length; i++){
                
                expertise.innerHTML += tutor.expertise[subject][i];
                if (i != tutor.expertise[subject].length - 1){expertise.innerHTML += ", ";}
            } 
            expertise.innerHTML += "|"
            tutorExpertise.appendChild(expertise);
        }
        return tutorExpertise;
    }

    // clear the selected day every time a new day is selected
    // -- called in week view and day button event listeners
    function clearDaySelected(){
        weekViewButton.classList.remove("selected");
        monButton.classList.remove("selected");
        tueButton.classList.remove("selected");
        wedButton.classList.remove("selected");
        thuButton.classList.remove("selected");
        friButton.classList.remove("selected");
    }

    // clear the selected period every time a new period is selected
    // -- called in period button event listeners
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
     * Creates the filters for the interface using the subjects and classes tutored in the database
     * -- called only once when the page is loaded
     * @param {Array} classes - an object containing each subject: all the classes tutored in that subject
     * @returns null - this function updates the interface
     * */
    async function createFilters(classes){
        for(const subject in classes){

            // create subject filter as a checkbox
            const subjectDiv = document.createElement("div");
            subjectDiv.className = "filter-div";
            const subjectCheckbox = document.createElement("input");
            subjectCheckbox.type = "checkbox";
            subjectCheckbox.className = "filter-checkbox";
            subjectCheckbox.id = subject;
            const subjectName = document.createElement("label");
            subjectName.className = "filter-name";
            subjectName.htmlFor = subject;
            subjectName.innerHTML = subject;
            subjectDiv.appendChild(subjectCheckbox);
            subjectDiv.appendChild(subjectName);

            classFilters[subjectCheckbox.id] = false;
            subjectCheckbox.addEventListener("change", function(){
                if(subjectCheckbox.checked){
                    classFilters[subjectCheckbox.id] = true;
                }
                else{
                    // uncheck all the classes in the subject
                    document.getElementById(classes[subject][0]).checked = true;
                    document.getElementById(classes[subject][0]).checked = false;
                    classFilters[subjectCheckbox.id] = false;
                }
            });

            const radioFiltersForm = document.createElement("form");
            radioFiltersForm.className = "filter-radio-form";

            // create class filters as radio buttons inside a form
            for(let i = 0; i < classes[subject].length; i++){
                const classRadioButton = document.createElement("input");
                classRadioButton.type = "radio";
                classRadioButton.className = "filter-radio-button";
                classRadioButton.name = subject;
                classRadioButton.id = classes[subject][i];
                const classLabel = document.createElement("label");
                classLabel.htmlFor = classes[subject][i];
                classLabel.className = "filter-radio-label";
                classLabel.innerHTML = classes[subject][i];
                const newLine = document.createElement("br");
                radioFiltersForm.appendChild(classRadioButton);
                radioFiltersForm.appendChild(classLabel);
                radioFiltersForm.appendChild(newLine);

                classFilters[classRadioButton.id] = false;
                classRadioButton.addEventListener("change", function(){
                    if(classRadioButton.checked){
                        classFilters[classRadioButton.id] = true;
                    }
                    else{
                        classFilters[classRadioButton.id] = false;
                    }
                });
            }
            subjectDiv.appendChild(radioFiltersForm);

            // hide the class filters until the subject filter is checked
            subjectCheckbox.addEventListener("change", async () => {
                if(subjectCheckbox.checked){
                    radioFiltersForm.style.display = "block";
                }
                else{
                    radioFiltersForm.style.display = "none";
                }
            })

            filters.appendChild(subjectDiv);
        }
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
        // check if the tutor passes all the filters
        for(const subject in classes){
            if(classFilters[subject] == false){continue;} // skip subjects that are not selected
            for(let i = 0; i < classes[subject].length; i++){
                if(classFilters[classes[subject][i]] == true && (tutor.expertise[subject] == null || !tutor.expertise[subject].includes(classes[subject][i]))){
                    return false;
                }
            }
        }
        return true;
    }

}) ();