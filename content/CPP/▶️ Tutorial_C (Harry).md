
# Goto Statement In C: C Tutorial In Hindi #17

# Structures In C: C Tutorial In Hindi #37

# [#38 Typedef In C: C Tutorial In Hindi](https://youtu.be/sxQ4hRHLVAc?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR)

- In C and C++, the `typedef` keyword is used to give a new name (alias) to an existing data type.(int, char, int*, struct, etc.) 
- This can improve code readability, simplify complex data types, and make code easier to maintain.
- Syntax `typedef <previous_name> <alias_name>;`

`typedef` for Inbuilt datatype
```c
#include <stdio.h>
typedef long long ll // ll : long long

int main()
{	
	typedf unsigned long ul; // ul : unsigned long
	
	ul u1, u2; // unsigned long
	ll l1, l2; // long long
	intPtr p = &value;
	return 0;
}
```

`typedef` for Structure
```c
typdef struct Student
{
	int marks;
	char name[34];
}std; // std : struct Student

// Or we could use typedef after declaring struct Student
// typedef struct Student std;
```

```c
std s1, s2; // struct Student s1, s2
s1.id = 56; 
s2. id = 89;
```

`typedef` for Pointer

```c
typedef int* intPtr // intPtr : int*
intPtr a, b; // int* a, b
int c = 89;
a = &c;
b = c;
```

# [#42 Static Variables In C: C Tutorial In Hindi](https://youtu.be/u98KvPuaIus)
# [#58 C Pre-processor Introduction & Working: C Tutorial In Hindi](https://youtu.be/P9IAfh89EK8?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR)

- Compiler converts textual form of a c program into an executable.
- There are four phases for a C program to become an executable:
```
PreProcessing -> Compilation -> Assembly -> Linking
```

1. Pre-Processing : Removal of comments, Expansion of macros, Expansion of include files
2. Compilation : Assembly level instructions are generated
3. Assembly : make `.o` or `.exe`, `printf` are not resolved , Assembly Level Instructions are converted to machine code.
4. Links the function implementations

**What is a C Pre-Processor**
- C preprocessor comes under action before the actual compilation process.
- C preprocessor is not a part of the c compiler
- It is a text substitution tool
- All preprocessor commands begin with a hash symbol `#`


- **`#define`**: Used to define a macro.  
- **`#include`**: Include an external header file.  
- **`#undef`**: Undefine preprocessor macros.  
- **`#ifdef`**: Check if a macro is defined (defined: 1, not defined: 0).  
- **`#ifndef`**: Check if a macro is not defined (defined: 0, not defined: 1).  
- **`#if`**: If any compile-time condition is true.  
- **`#elif`**: Alternative of `if`; if not true, then it is checked.  
- **`#else`**: Execute if no condition is true.  
- **`#endif`**: Ends a conditional preprocessor directive.  
- `#pragma`: To issue some special commands to the compiler.

Include
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
```

# [#59 `#define` and `#include` Preprocessor Directives: C Tutorial In Hindi](https://youtu.be/qDIpHL8Al20?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR)

- The `#include` directive causes the preprocessor to fetch the contents of some other file to be included in the present file
- This file may in turn `#include` some other file(s) which may in turn do the same. Most commonly the `#inlcuded` files have a "`.h`" extension, indicating that they are header files.

### `#Include`
```
mostly header files have promises i.e. is function prototypes.
```

In C programming there are two common formats for `#includes`:
- `#include < headerFiIe.h >` // The angle brackets say to look in the standard system directories
- `#include " myFile.h"` // The quotation marks say to look in the current directory.

Disk drive full path is allowed, but discouraged since it is not portable:
- `#include <C:\Program Files\Harry\bhai\somefile.h >` // Too specific
- `#include <sys/file.h>` // Relative and portable path to the standard locations.

### `#define`

- The `#define` directive is used to "define" preprocessor "variables"
- The `#define` preprocessor directive can be used to globally replace a word with a number.
- It acts as if an editor did a global search-and-replace edit of the file.
```
#define PI 3.141
```

`#define` for Debugging
- `#define` directive can be used for debugging 
- We can have printing statements that we only want active when debugging.
- We can "protect" them in a "`ifdef`" block as follows:
```
#define DEBUG
#ifdef DEBUG {print statement...}
#endif ...
#undef DEBUG

```

Macros using `#define`
- We can create macros using `#define`
- Macros operate much like functions, but because they are expanded in place and are generally faster
```
#define SQUARE(x) x*x
float PI = 3.141
area = PI * SQUARE (radius);
```

Notes: Macros are resolved at, preprocessing and so faster and efficient than functions.

`#Include` directive
```c
#include <stdio.h>
#include "Tutorial2.c"  // contain functionDangling();

int main()
{
	int *ptr = functionDangling(); // from `Tutorial2.c` file
	return 0;
}
```

`#Define` directive
```c
# define PI 3.141

int main()
{
	float var = PI;
	printf("The value of PI is %f\n", var); // 3.141
	return 0;
}
```

`#define` Macros
```c
#define SQUARE(r) r*r

int main()
{
	int r = 4;
	printf("The area of this circle is %f\n", PI*SQUARE(r));
}
```

# [#60 Predefined Macros & Other Pre-processor Directives: C Tutorial In Hindi](https://youtu.be/iOTf_ZgrU20)


- Preprocessor is a kind of automated editor that modifies a copy of the original source code 
- The `#include` directive causes the preprocessor to fetch the contents of some other file to be included in the present file
- In C programming there are two common formats for `#includes`
- This  file may in turn `#include` some other file(s) which may in turn do the same.
- Most commonly the `#include` files have a "`.h`" extension, indicating that they are header files.
- The `#define` directive is used to "`define`" preprocessor "`variables`"

### Predefined Macros in C

1. `__DATE__`: The current date as character literal in "MMM DD YYYY" format
2. 1. `__TIME__`: This contains the current time as a character literal in "HH:MM:SS" format.
3. 1. `__FILE__`: The current filename as a string literal.
4. 1. `__LINE__`: The current line number as a decimal constant.
5. 1. `__STDC__`: Define as 1(one) when the compiler complies with the ANSI standard.

```c
int main()
{
 printf("FILE name is %s\n", __FILE__ ); // tutorial60.c
 printf("Today's Date is %s\n", __DATE__); // Oct 06 2024
 printf("Time Now is %s\n", __TIME__); // 12:16:31
 printf("Line No. is %d\n", __LINE__); // 7
 printf("ANSI: %d\n", __STDC__); // 1 
}
```


# [#47 Dynamic Memory Allocation Malloc Calloc Realloc & Free(): C Tutorial In Hindi](https://youtu.be/q8j8EqCZcWM) ⭐

### Recap

- An statically allocated variable or array has a fixed size in memory.
- Dynamic Memory Allocation is a way in which the size of a data structure can be changed during the runtime.
- Memory assigned to a program in a typical architecture can be broken down into four segments:

1. Code
2. Static/global variables
3. Stack
4. Heap

#### Stack
`int arr[10]`
`int a`

### Global and Static Variable

## Functions for Dynamic Memory Allocation in C

- In Dynamic memory allocation, the memory is allocated at runtime from the heap segment 
- We have four functions that help us achieve this task:
1. malloc
2. calloc
3. realloc
4. free

## C MALLOC()

- `malloc()` stands for memory allocation
- It reserves a block of memory With the given amount of bytes.
```           
              |--------|
int *ptr ------> Heap  |
              |________|
```
- The return value is a void pointer to the allocated space
- Therefore the void pointer needs to be casted to the appropriate type as per the requirements
- However, if the space is insufficient. allocation of memory fails and it returns a NULL pointer.
- the values at allocated memory are initialized to `garbage values` 
- Syntax: `ptr = (ptr_type*) malloc(size_in_bytes)`

for ex, for an array If we need `3 integer` space -> `3*sizeof(int)`;
```cpp
ptr = (int*) malloc(3*sizeof(int));
```

Void Pointer:
- A **void pointer** is a generic pointer that can point to any data type.
- It cannot be dereferenced directly without casting to another pointer type.
- It is useful for writing flexible functions and for memory allocation functions.
## C CALLOC()

- `calloc()` stands for contiguous allocation
- It reserves `n` blocks of memory with the given amount of bytes.
```           
              |--------|
int *ptr ------> Heap  |
              |________|
```
- The return value is a void pointer to the allocated space
- Therefore the void pointer needs to be casted to the appropriate type as per the requirements
- However, if the space is insufficient, allocation of memory fails and it returns a NULL pointer.
- All the values at allocated memory are initialized to `0` 
- Syntax: `ptr = (ptr_type*) calloc(n, size_in_bytes)`

for ex, for an array If we need `3 integer` space -> `3*sizeof(int)`;
```cpp
ptr = (int*) malloc(3, sizeof(int));
```


## C REALLOC()

- `realloc()` stands for reallocation
- If the dynamically allocated memory is insufficient we can change the size of previously allocated memory using `realloc()` function
```
              |--------|-----|
int *ptr ------> Heap  |  +  |
              |________|_____|  
```
- Syntax: `ptr = (ptr_type) realloc(ptr, new_size_in_bytes)`

## C FREE()

- fee() is used to free the allocated memory
- If the dynamically allocated memory is not required anymore, we can free it using free function.
- This will free the memory being used by the program in the heap
- Syntax: `free(ptr)`


Note: `Malloc()` vs `Calloc()`
- **`malloc`**: Allocates a block of memory but **does not initialize** the memory. The memory block will contain **garbage values**.
- **`calloc`**: Allocates memory and **initializes all bits to zero**. This means all the values in the allocated memory will initially be set to zero.

## Lets Code

- We can use dynamic memory allocation to allocate memory during runtime.
- Dynamic memory allocation functions are under `<stdilib.h>` file

# Malloc 
```c
#include <stdio.h>
#include <stdlib.h>

int main(){
	// Use of malloc
	int *ptr;
	int n;
	printf("Enter the size of the array you want to create\n");
	scanf("%d", &n);
	
	ptr = (int *)malloc(n*sizeof(int));

	for(int i=0; i<n; i++){
		// ptr[i]=*(ptr+i):value at pointer (ptr+i), 
		// &ptr[i]=(ptr+i):address of pointer (ptr+i)
		printf("Enter the value no %d of this array\n", i);
		scanf("%d", &ptr[i]);
	}

	for(int i=0; i<n; i++){
		print("The value at %d of this array is %d\n", i, ptr[i]);
	}
}
```
input
```
Enter the size of the array you want to create
3
Enter the value no 0 of this array
5
Enter the value no 1 of this array
6
Enter the value no 2 of this array
7
```

Output : Memory is allocated at runtime i.e. size `n`
```
The value at 0 of this array is 5
The value at 1 of this array is 6
The value at 2 of this array is 7
```

Value at out of bound of pointer
```c
print("The value at ptr[3] is %d\n", ptr[3]); // 12838462834 Garbage Value
```


# Calloc

```c
#include <stdio.h>
#include <stdlib.h>

int main(){
	// Use of calloc
	int *ptr;
	int n;
	printf("Enter the size of the array you want to create\n");
	scanf("%d", &n);
	
	ptr = (int *)calloc(n,sizeof(int));

	//for(int i=0; i<n; i++){
	//	print("Enter the value no %d of this array\n", i);
	//	scanf("%d", &ptr[i]);
	//}

	for(int i=0; i<n; i++){
		print("The value at %d of this array is %d\n", i, ptr[i]);
	}
}
```

Input
```
Enter the size of the array you want to create
4
```

Output : If value not Initialised in Calloc, it is set to `0`
```
The value at 0 of this array is 0
The value at 1 of this array is 0
The value at 2 of this array is 0
The value at 2 of this array is 0
```


## Realloc


Consider Code Connected after the Calloc i.e ptr assigne 4 byte of memory
```cpp
// Use of calloc
printf("Enter the size of the new array you want to create\n");
scanf("%d", &n);

ptr = (int *)realloc(ptr,n*sizeof(int));

for(int i=0; i<n; i++){
	print("Enter the new value no %d of this array\n", i);
	scanf("%d", &ptr[i]);
}

for(int i=0; i<n; i++){
	print("The new value at %d of this array is %d\n", i, ptr[i]);
}
```

Input
```
Enter the size of the new array you want to create\n
6
Enter the new value no 0 of this array
1
Enter the new value no 1 of this array
2
Enter the new value no 2 of this array
3
Enter the new value no 3 of this array
4
Enter the new value no 4 of this array
5
Enter the new value no 5 of this array
6
```

Output
```
The new value at 0 of this array is 1
The new value at 1 of this array is 2
The new value at 2 of this array is 3
The new value at 3 of this array is 4
The new value at 4 of this array is 5
The new value at 5 of this array is 6
```

## Free

```c
free(ptr);  // its a good practice to use free
```