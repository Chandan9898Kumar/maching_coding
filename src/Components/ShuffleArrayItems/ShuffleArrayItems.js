import React, { useState } from "react";
import "./shuffle.css";
import singletonCounter from "../../PATTERN_MODULES/SingletonPatternExample";
const ShuffleItems = () => {
  const [arrayOfItems, setArrayOfItems] = useState(["Apple", "Ball", "Bat", "Call", "Doll", "Tally", "John"]);

  //    Method 1.
  const handleShuffle = () => {
    singletonCounter.increment();
    const sortedItem = [...arrayOfItems];
    const Length = sortedItem.length - 1;

    for (let i = Length; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sortedItem[i], sortedItem[j]] = [sortedItem[j], sortedItem[i]];
    }

    setArrayOfItems(sortedItem);
  };

  //    Method 2.   Using the sort() Method with a Random Comparison Function
  const handleShuffleTwo = () => {
    const sortedItem = [...arrayOfItems];
    sortedItem.sort(() => Math.random() - 0.5);
    setArrayOfItems(sortedItem);
  };

  //    Method 3: Using the JS Array.map() Function
  const handleShuffleThree = () => {
    const sortedItem = arrayOfItems
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    setArrayOfItems(sortedItem);
  };

  return (
    <div>
      <h2>Shuffle Items of an array</h2>
      <table id="customers">
        <tr>
          <th>Index</th>
          <th>Items</th>
        </tr>

        {arrayOfItems.map((item, index) => (
          <tr key={item}>
            <td>{index}</td>
            <td>{item}</td>
          </tr>
        ))}
      </table>

      <div style={{ top: "40px", position: "relative", width: "100%" }}>
        <button className="shuffle-btn" onClick={handleShuffle}>
          Shuffle 1
        </button>
        <button className="shuffle-btn" onClick={handleShuffleTwo}>
          Shuffle 2
        </button>
        <button className="shuffle-btn" onClick={handleShuffleThree}>
          Shuffle 3
        </button>
        <br />
        Singleton Example :{"  "}
        {singletonCounter.getCount()}
      </div>
    </div>
  );
};
export default ShuffleItems;

/**
 *                                                                        Method 1: Fisher-Yates Sorting Algorithm
This algorithm's basic premise is to iterate over the items, swapping each element in the array with a randomly selected element from the remaining un-shuffled portion of the array.
 * 


                                                                                    Explanation
First, you create a for loop. This will allow you to loop over each item in the array, swapping its position with another item in the array.

You then create the i variable assigning it the value of length of the array - 1.

You do this because we're starting at the last element of the array, and all array indexes start at 0 – so the last index would be 4 (as there are 5 items in the array).

If you were to try and access myArray[i] with i equalling 5 (the length) it would throw an exception stating there is no item at index 5. So we subtract 1 from the length.

By starting from the last element and working your way backwards, you guarantee that elements towards the end of the array have an equal chance of being swapped with any other element.

If you were to shuffle the array from the beginning to the end, the elements towards the beginning of the array would have a higher chance of being swapped multiple times,
 leading to a biased or uneven shuffle.‌‌‌‌ You then create a j variable which will be used for your index pointer for the big swap.

You then assign the array at index i to the array at index j, and visa versa. This swaps the values and shuffles them up for each item in the array.







Array Destructuring Assignment Explained :

The syntax [array[i], array[j]] = [array[j], array[i]] is called an array destructuring assignment. It allows for the swapping of values between two variables 
or array elements without the need for a temporary variable.

Here's how the array destructuring assignment works in the context of shuffling an array using the Fisher-Yates shuffle algorithm:

1. array[i] and array[j] represent two elements in the array that need to be swapped.

2. [array[j], array[i]] creates a temporary array containing the values of array[j] and array[i], but in reverse order.

3. By assigning [array[j], array[i]] to [array[i], array[j]], the values of array[j] and array[i] are swapped in place.


 */

/**
                                                                Method 2: Using the sort() Method with a Random Comparison Function

This is a simple sorting() function that returns a random number, which would either work out as a negative, 0, or positive number.‌‌‌‌
The sort() method internally compares pairs of elements in the array and determines their relative order based on the return value of the comparison function.

If the comparison function returns a negative value, the first element is considered smaller and should be placed before the second element in the sorted array.
If the comparison function returns a positive value, the first element is considered larger and should be placed after the second element in the sorted array
If the comparison function returns 0, the relative order of the elements remains unchanged.





                                                    Why do you subtract 0.5 from the result of Math.random()?
By subtracting 0.5 from the result of Math.random(), you introduce a random value between -0.5 and 0.5. This random value will cause the comparison function to return 
negative, positive, or zero values in a random manner for different pairs of elements. Consequently, the sort() method shuffles the array randomly.



 */
