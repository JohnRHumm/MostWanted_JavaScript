/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    // ! Added promptFor to validate the type of info the user is searching for person information
    let messageToUser = "Found " + person[0].firstName + " " + person[0].lastName + "\n";
    messageToUser += "Type 'I' for (I)nfo, 'F' for (F)amily, 'D' for (D)escendants, 'R' for (R)estart, or 'Q' for (Q)uit";
    let displayOption = promptFor(
        messageToUser,
        personInformationSearchType
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "i": 'Info'
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "f": //Family
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
			// Done
            let personFamily = findPersonFamily(person[0], people);
            displayPeople(personFamily);
            break;
        case "d": //Descendants
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
			// Done
            let personDescendants = findPersonDescendants(person[0], people);
            displayPeople(personDescendants);
            break;
        case "r": //Restart
            // Restart app() from the very beginning
            app(people);
            break;
        case "q": //Quit
            // Stop application execution
            return;
        case "t": //Try it
            // Will use to test the code for determining siblings - JHumm
            return;
        default:
            // Prompt user again. Another instance of recursion 
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height (in): ${person.height}\n`;
    personInfo += `Weight (lbs): ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupantion: ${person.occupation}`;
    
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    // Done JHumm //
    return(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * JHumm
 * This helper function limits the users input to 'I' for (I)nfo, 'F' for (F)amily,
 *  'D' for (D)escendants, 'R' for (R)estart, or 'Q' for (Q)uit
 * @param {String} input        A string of one letter corresponding to the first letter of the desired action.
 * @returns {Boolean}           The result of our condition evaluation.
 */
 function personInformationSearchType(input) {
    return input.toLowerCase() === "i" || input.toLowerCase() === "f" || input.toLowerCase() === "d"  || input.toLowerCase() === "t";
}
// End of personInformationSearchType()

/**
 * JHumm
 * This function will return all the people in a person's family
 * @param {Object} personOfInterest       A singular object. Looking for this person's family
 * @param {Array} people        A collection of person objects.
 * @returns {string}           A string of everyone in the person's family
 */
 function findPersonFamily(personOfInterest,people) {
    let family = people.filter(function (person) {
        if (person.lastName === personOfInterest.lastName && person.id != personOfInterest.id) {
            return true;
        }
	})
	
	return family;
}
// End findPersonFamily()

/**
 * JHumm
 * This function will return all the descendants from the selected person
 * @param {Object} personOfInterest       A singular object. Looking for all the descendents in this person's family
 * @param {Array} people        A collection of person objects.
 * @returns {string}           A string personofInterest's descendants
 */
 function findPersonDescendants(personOfInterest,people,family = []) {
	let descendant = people.filter(function(person)  {
		for (let i = 0; i<person.parents.length; i++){
			if (person.parents[i] === personOfInterest.id) {
				return true;
			}
		}
	})
     
	if (descendant.length === 0) {
		return family;
	} else{
		
		for (let i = 0 ; i<descendant.length ; i++) {
			family.push(descendant[i]);
			findPersonDescendants(descendant[i],people,family);
		}
	}
	
	return family;
	
	
}
// End findPersonDescendants()
