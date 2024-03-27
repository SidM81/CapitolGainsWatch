import React, { useState } from 'react';

const Filters = ({ onUpdateUrl }) => {
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedParty, setSelectedParty] = useState('');
    const [selectedChamber, setSelectedChamber] = useState('');

    const handleGoClick = () => {
        // Check if any selection has been made
        const params = [];
        
        const filtered  = (filter,filtername) =>{
            if(filter!==''){
                let str = filtername+'='+filter.toLowerCase();
                params.push(str);
            }
        };

        console.log('Fetching data based on selections:', selectedGender, selectedParty, selectedChamber);
        filtered(selectedChamber,"chamber");
        filtered(selectedGender,"gender");
        filtered(selectedParty,"party");
        const base_url = "https://www.capitoltrades.com/trades?";
        var url = base_url + params.join('&');
        console.log(url);
        onUpdateUrl(url);

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
