(function () {

    /*
     * Interfaces
     */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;

    }//-- end of ITraveler interface

    //interface describing what the passenger array should look like
    interface IPassengerArray {
        [index: number]: Traveler
    }//-- end of IPassengerArray interface

    // food(wagon)
    // Return the total amount of food among all occupants of the wagon.

    //interface describing attributes and methods a wagon should have
    interface IWagon {
        capacity: number;
        passengerArray: IPassengerArray;

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }//-- end of IWagon interface

    /*
     * Classes
     */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy = true;

        constructor(food: number, name: string) {
            this.food = food;
            this.name = name;
        }

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt() {
            // console.log("Traveler " + this.name + " has " + this.food + " food left.");
            if (Math.random() >= .5) {
                this.food = this.food + 100;
            }
            // console.log("Traveler " + this.name + " has " + this.food + " food left.");
            return this.food;
        }
        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat() {
            // console.log("Traveler " + this.name + " has " + this.food + " food left.");
            if (this.food < 20) {
                this.isHealthy = false;
            } else {
                //subtract 20 & check health
                this.food = this.food - 20;
            }
            // console.log("Traveler " + this.name + " has " + this.food + " food left.");

            return this.isHealthy;
        }
    } //--end of traveler class

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity = 0;
        passengerArray = [];

        constructor(capacity: number) {
            this.capacity = capacity;
        }//-- end of constructor

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler) {
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler);
                return "added";
            } else {
                return "sorry";
            }
        } //-- end of addPassenger

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined() {
            for (let i = 0; i < this.passengerArray.length; i++) {
                if (this.passengerArray[i].isHealthy == false) {                
                    return true;
                }
            }
            return false;
        }//-- end of isQuarantined

        //Return the total amount of food among all passengers of the wagon.
        getFood() {
            let totalFood = 0;
            //loop through the array and get each traveler's food
            for (let i = 0; i < this.passengerArray.length; i++) {
                totalFood = totalFood + this.passengerArray[i].food;
                // console.log(this.passengerArray[i].name + " food is = " + this.passengerArray[i].food);
            }
            return totalFood;
        }

    } //-- end of wagon class


    //  * Play the game
    //  *
    //  * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    let tLooney = new Traveler(Math.floor(Math.random() * 100), "Looney");
    let tLucky = new Traveler(Math.floor(Math.random() * 100), "Lucky");
    let tInmate = new Traveler(Math.floor(Math.random() * 100), "Inmate");
    let tLost = new Traveler(Math.floor(Math.random() * 100), "Lost");
    let tCrazy = new Traveler(Math.floor(Math.random() * 100), "Crazy");

    //  * Create wagon with an empty passenger list and a capacity of 4.
    let wOregonExpress = new Wagon(4); //-- this was tested with (2) to validate a "sorry" reply with a full wagon

    //  * Make 3 of 5 the travelers eat by calling their eat methods
    console.log("");
    console.log("#################################");
    console.log("");
    console.log(tLooney.name + " has now eaten and their is healthy status = " + tLooney.eat());
    console.log(tInmate.name + " has now eaten and their is healthy status = " + tInmate.eat());
    console.log(tCrazy.name + " has now eaten and their is healthy status = " + tCrazy.eat());

    console.log("");
    console.log("#################################");
    console.log("");
    //  * Make the remaining 2 travelers hunt
    console.log(tLucky.name + " has hunted and now has " + tLucky.hunt() + " food remaining!");
    console.log(tLost.name + " has hunted and now has " + tLost.hunt() + " food remaining!");

    console.log("");
    console.log("#################################");
    console.log("");
    //  * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    //  * of attempting to be being added to the wagon using the wagons addPassenger method.
    let myTravelers = [tLooney, tLucky, tInmate, tLost, tCrazy];

    for (let i = 0; i < myTravelers.length; i++) {
        // console.log("myTravelers Loop # " + i);

        if (Math.random() >= .5) {
            console.log(myTravelers[i].name + " wagon status = " + wOregonExpress.addPassenger(myTravelers[i]));
        }
    }
    console.log("");
    console.log(wOregonExpress.passengerArray.length + " passengers are aboard the Oregon Express.");

    console.log("");
    console.log("#################################");
    console.log("");
    //  *
    //  * Run the isQuarantined method for the wagon
    console.log("OregonExpress Wagon is quarantined = " + wOregonExpress.isQuarantined());

    //  * Run the getFood method for the wagon
    console.log("OregonExpress Wagon Total Food = " + wOregonExpress.getFood());
    console.log("");

    //  * the return values of all the methods should be displayed in the console using console.log()
    //  * the console.log statements should not live inside any methods on the objects 

})();