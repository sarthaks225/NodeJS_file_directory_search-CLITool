
# NodeJS_file_directory_search-CLITool

Node.js script for searching files and directories within specified paths. It offers robust functionality including exact and partial matching, directory traversal, and customizable search parameters. The script enhances user experience with dynamic loading animations

# GitHub Documentation for `loadingAnimation.js`

## Overview
The loadingAnimation.js script provides a class LoadingAnimation that facilitates displaying a loading animation on the terminal screen. This animation helps indicate ongoing processes, enhancing user experience during tasks such as file searches or data processing.

## Class: LoadingAnimation
### Constructor

 `constructor()`

* Description: Initializes the LoadingAnimation object.

* Attributes:

    **`loadChars`**: An array of strings representing the animation frames
    
    **`_stopLoadingAnimation`**: Flag to control animation state.`
    
    **interval**: Interval identifier for animation timing.
    **Side Effects**: Hides the cursor when instantiated.

### Method: startLoadingAnimation()

* Description: Initiates the loading animation sequence.
* Behavior: Prints animation frames to stdout at intervals.

`Example:`

    let la = new LoadingAnimation();
    la.startLoadingAnimation();
### Method: stopLoadingAnimation()

* Description: Stops the loading animation.
* Behavior: Clears the loading animation line and * * restores cursor visibility.

`Example:`

    let la = new LoadingAnimation();
    la.startLoadingAnimation();
    setTimeout(function() {
    la.stopLoadingAnimation();
    }, 2000);

### Usage
* **To use LoadingAnimation in project:**

1. Import the module:

`const { LoadingAnimation } = require('./        loadingAnimation');`

2. Create an instance:

`let loadingAnimation = new LoadingAnimation();`

3. Start the animation:

`loadingAnimation.startLoadingAnimation();`

4. Stop the animation:

`loadingAnimation.stopLoadingAnimation();`

### Notes
Ensure Node.js environment to execute the script due to dependencies on process.stdout and event handling.
Customize loadChars for different animation sequences if desired.
This documentation provides a clear understanding of how to integrate and use the LoadingAnimation class effectively within your Node.js applications. For further details or modifications, refer to the source code at loadingAnimation.js.

### 
This documentation provides a clear understanding of how to integrate and use the LoadingAnimation class effectively within your Node.js applications. For further details or modifications, refer to the source code at loadingAnimation.js.
# 

# GitHub Documentation for `find.js`
## Overview
**`find.js`** is a Node.js script designed to search for files and directories based on user input. It supports both exact and partial matches for file and directory names, providing real-time feedback through a loading animation.

## Dependencies
* **`fs.promises`**: Provides asynchronous file system operations.
* **`path`**: Offers utilities for handling file paths.
* **`loadingAnimation`** (from `./loadingAnimation`): Manages the loading animation during file and directory traversal.

## Global Variables
* **`exactDirectories`**: Array to store directories that match the exact search criteria.
* **`similarDirectories`**: Array to store directories with names similar to the search criteria.
* **`similarFiles`**: Array to store files with names similar to the search criteria.
* **`found`**: Boolean flag to track if an exact match has been found during the search process.

## Functions and Methods
## **`exactFilePrintInstant(location)`**
* **Purpose**: Prints the location of an exact file match and manages the loading animation.
* **Parameters**:
    * **`location (String)`**: Path of the exact file found.
* **Logic:**
    * Stops the loading animation (`loadingAnimation.stopLoadingAnimation()`).
    * Prints the location of the exact file found.
    * Restarts the loading animation (`loadingAnimation.startLoadingAnimation()`).

## **`async function walkPath(folderPath)`**
* **Purpose**: Recursively traverses directories starting from folderPath to search for files and directories matching the search criteria.
* **Parameters**: folderPath (String): Path to start the search from.
* **Logic:**
* Reads the contents of folderPath using `fs.readdir()`.
* Iterates through each item and determines if it is a directory or file using `fs.stat()`.
* For directories:
    * If searching for directories (`dir` `is true`):
        * Adds exact matches to `exactDirectories`.   
        * Adds similar matches to `similarDirectories`.
    * Recursively calls `walkPath(folderPath + path.sep + file)` to traverse subdirectories.
* For files:
    * If searching without file extensions, checks for exact name matches without considering extensions.
    * If searching with file extensions, checks for exact matches including extensions.
    * Adds similar matches to `similarFiles`.
* Handles errors using `try...catch blocks` to ensure robustness during directory traversal.

## **`Recursion Logic:`**
* **Base Case:** When there are no more directories to read, the recursion stops.
* **Recursive Case:** For each directory, walkPath is called with the new path (`folderPath + path.sep + file`), allowing the function to explore all subdirectories.


## Command-line Argument Parsing
* **Purpose:** Parses command-line arguments to determine the search type (`file` or `dir`), search term, and search location.
* **Logic:**
    * Checks if the search is for a directory by evaluating the second argument.
    * Assigns the search term to find and the search location to `findIn`.
    * Provides usage instructions if the search term is missing.

## **`Main()`**
* **Purpose:** Main function to initiate and control the search process based on command-line arguments.
* **Flow:**
    * Initializes the loading animation (`loadingAnimation.startLoadingAnimation()`).
    * Calls `walkPath(findIn)` to start the search process.
    * Stops the loading animation (`loadingAnimation.stopLoadingAnimation()`) once the search is complete.
    * Outputs results for exact matches (`exactDirectories`), similar directories (`similarDirectories`), and similar files (`similarFiles`).
    * Handles cases where no matches are found and displays appropriate messages.

## Command-line Usage
The script is intended to be executed from the command line with parameters specifying the **search type (file or dir)**, the search term, and the optional search location.


`Examples`

**1. Search for a file by exact name:**

**`node find.js file resume.pdf /path/to/search`**

**2. Search for a directory by exact name:**

**`node find.js dir example_dir /path/to/search`**

**3. Search for files or directories with a partial name:**

**`node find.js dir part_of_name /path/to/search
`**

**`node find.js file part_of_name /path/to/search
`**


## Error Handling
* Directory Access Errors: Managed using try...catch blocks around file system operations (`fs.readdir() and fs.stat()`).
* Command-line Argument Validation: Ensures correct usage and provides usage instructions if parameters are missing or incorrect.

## Conclusion
`find.js` provides a flexible and efficient solution for searching files and directories in Node.js environments. Its modular structure, error handling mechanisms, and real-time feedback features make it suitable for a variety of search scenarios.

# GitHub Documentation for `findJs.bat`
## Overview
The findJs.bat file is a Windows Batch script designed to execute the find.js Node.js script with command-line arguments. This batch file simplifies the process of running the Node.js script by allowing users to invoke it with a single command, passing any necessary arguments directly.

## Code Explanation

`@echo off
node C:\gitFolder\NodeJS_file_directory_search-CLITool\find.js %*`

## Detailed Breakdown
1. **`@echo off`**:

* Purpose: This command disables the display of the command itself in the terminal, making the output cleaner. Without this, each command in the batch file would be printed to the terminal before being executed.

2. **`node C:\gitFolder\NodeJS_file_directory_search-CLITool\find.js %*`**:

* Purpose: This command runs the find.js script using Node.js.
* Details:
    * **`node`**: The command to invoke the Node.js runtime.
    * **`C:\gitFolder\NodeJS_file_directory_search-CLITool\find.js`**: The full path to the find.js script. Make sure this path is correct and points to the location of your find.js file.
    * **'%*'**: A batch parameter that represents all the arguments passed to the batch script. This allows you to forward any arguments given to the batch file directly to the Node.js script.

## Usage Instructions
1. Preparation:

* Ensure you have Node.js installed on your system and the node command is accessible from the command line.
* **Place the `findJs.bat` file in a convenient location, preferably one that is included in your system's PATH environment variable for easy access.**

2. Execution:

* Open a Command Prompt window.
* `Run the findJs.bat` script followed by the arguments required by find.js
`findJs.bat [searchType] [searchTerm] [searchLocation]
`

* **Examples:**
    * Search for a file named `resume.pdf` in `C:\Documents`:

            `findJs.bat file resume.pdf C:\Documents`

    * Search for a directory named example_dir in D:\Projects:

            `findJs.bat dir example_dir D:\Projects`


## Integration with find.js
The `findJs.bat` script is designed to work seamlessly with `find.js`. When you run the batch script with the appropriate arguments, it delegates the execution to `find.js`, passing all provided arguments. This allows `find.js` to process the arguments and perform the file or directory search as intended.

By using `findJs.bat`, you streamline the process of executing the `find.js` script, making it more accessible and user-friendly, especially for users who may not be familiar with `Node.js` or `command-line operations`.

## Conclusion
The `findJs.bat` batch script is a convenient wrapper for the `find.js` `Node.js` script, enabling easy execution with command-line arguments. It enhances usability and ensures that users can quickly and efficiently perform file and directory searches without needing to directly interact with `Node.js` commands.


## Demo Video by running batch 

![App Screenshot](https://i9.ytimg.com/vi/JgWhJY-P9Xg/mqdefault.jpg?sqp=CNydjLMG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCwgZSgqMA8=&rs=AOn4CLBFEXl3-LuCHc3oINSg955WoIrlMg)
(https://www.youtube.com/watch?v=JgWhJY-P9Xg)

