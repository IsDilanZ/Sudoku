let difficultySelected, stringSelected;


//This object maps difficulty names to numeric values ​​representing the difficulty level.
const difficulty = {
    veryeasy: 20,
    easy: 20,
    medium: 0,
    hard: -10,
    expert: -20,
    insane: -25,
    hiHuman: -30,
}

//This object maps difficulty names to their string representations.
const diffcultyString ={
    veryeasy: "Very Easy",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    expert: "Expert",
    insane: "Insane",
    hiHuman: "InHuman",
}

//The getSelectionOption function: Gets the selected value in a dropdown with the ID options.
function getSelectionOption(){
    var dropdown = document.getElementById('options');
    var selectedValue = dropdown.value;
    return selectedValue;
}


/*The selectedOption function: Based on the selected value, sets and returns
 the numeric value of the selected difficulty.*/
 
function selectedOption(){
    switch (getSelectionOption()){
        case 'veryEasy':
            difficultySelected = difficulty.veryeasy;
            break;
        case 'easy':
            difficultySelected = difficulty.easy;
            break;   
        case 'hard':
            difficultySelected = difficulty.hard;
            break; 
        case 'expert':
            difficultySelected = difficulty.expert;
            break;
        case 'insane':
            difficultySelected = difficulty.insane;
            break;
        case 'hiHuman':
            difficultySelected = difficulty.hiHuman;
            break;
        default:
            difficultySelected = difficulty.medium;                              
    }
    return difficultySelected;
}

/*The selectedOptionAsString function: Based on the selected value,
 sets and returns the string representation of the selected difficulty.*/

function selectedOptionAsString(){
    switch (getSelectionOption()){
        case 'veryEasy':
            stringSelected = diffcultyString.veryeasy;
            break;
        case 'easy':
            stringSelected = diffcultyString.easy;
            break;   
        case 'hard':
            stringSelected = diffcultyString.hard;
            break; 
        case 'expert':
            stringSelected = diffcultyString.expert;
            break;
        case 'insane':
            stringSelected = diffcultyString.insane;
            break;
        case 'hiHuman':
            stringSelected = diffcultyString.hiHuman;
            break;
        default:
            stringSelected = diffcultyString.medium;                              
    }
    return stringSelected;
}

