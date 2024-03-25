import React, { useState } from 'react';

const Filters = () => {
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedParty, setSelectedParty] = useState('');
    const [selectedChamber, setSelectedChamber] = useState('');

    const handleGoClick = () => {
        // Check if any selection has been made

        if (selectedGender !== '' || selectedParty !== '' || selectedChamber !== '') {
            // Perform action (e.g., fetch data based on selections)
            console.log('Fetching data based on selections:', selectedGender, selectedParty, selectedChamber);
        } else {
            // Inform user that no selection has been made
            alert('Please make a selection before clicking Go.');
        }
        var U_rl =" https://www.capitoltrades.com/trades";
        if((selectedGender && selectedParty)){
            U_rl+=`?gender=${selectedGender}`;
            U_rl+=`&party=${selectedParty}`;
        }
        else if(selectedGender && selectedChamber){
            U_rl+=`?gender=${selectedGender}`;
            U_rl+=`&chamber=${selectedChamber}`;
        }
        else if(selectedParty && selectedChamber){
            U_rl+=`?party=${selectedParty}`;
            U_rl+=`&chamber=${selectedChamber}`;
        }
        else if(selectedParty && selectedChamber && selectedGender){
            U_rl+=`?gender=${selectedGender}`;
            U_rl+=`&party=${selectedParty}`;
            U_rl+=`&chamber=${selectedChamber}`;
        }
        else if(selectedChamber){
            U_rl+=`?chamber=${selectedChamber}`;
        }
        else if(selectedGender){
            U_rl+=`?gender=${selectedGender}`;
        }
        else if(selectedParty){
            U_rl+=`%Party=${selectedParty}`;
        }
        console.log(U_rl);
    };

    return (
        <div className="filters">
            <select name="gender" id="gender" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select name="party" id="party" value={selectedParty} onChange={(e) => setSelectedParty(e.target.value)}>
                <option value="">Select Party</option>
                <option value="Republican">Republican</option>
                <option value="Democrat">Democrat</option>
            </select>
            <select name="chamber" id="chamber" value={selectedChamber} onChange={(e) => setSelectedChamber(e.target.value)}>
                <option value="">Select Chamber</option>
                <option value="Senate">Senate</option>
                <option value="House">House</option>
            </select>
            <div className='Go_button'>
                <button type="button" onClick={handleGoClick} disabled={selectedGender === '' && selectedParty === '' && selectedChamber === ''}>Go</button>
            </div>
        </div>
    );
}

export default Filters;
