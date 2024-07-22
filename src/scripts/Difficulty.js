let difficultySelected, stringSelected;

const difficulty = {
    veryeasy: 20,
    easy: 20,
    medium: 0,
    hard: -10,
    expert: -20,
    insane: -25,
    hiHuman: -30,
}

const diffcultyString ={
    veryeasy: "Very Easy",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    expert: "Expert",
    insane: "Insane",
    hiHuman: "InHuman",
}

function getSelectionOption(){
    var dropdown = document.getElementById('options');
    var selectedValue = dropdown.value;
    return selectedValue;
}

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

