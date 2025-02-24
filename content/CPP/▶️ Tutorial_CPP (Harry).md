# [#14Structures, Unions & Enums in C++ | C++ Tutorials for Beginners](https://youtu.be/jCfR7CFlzts?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL)

### Structures

The structure is a user-defined data type that is available in C++. Structures are used to combine different types of data types, just like an array is used to combine the same type of data types.


```cpp
struct employee
{
    /* data */
    int eId; 
    char favChar; 
    float salary; 
};
```

```cpp
int main() {
     struct employee harry; 
     harry.eId = 1;
     harry.favChar = 'c';
     harry.salary = 12;
     cout<<harry.eId<<endl;  // 1
     cout<<<<harry.favChar<<endl; // 'c'
     cout<<<<harry.salary<<endl; // 12
     return 0;
}
```

Note: by convention  Capitalize Name like 'Harry' is used for Class Name and Smaller like 'harry' for structure Name

**Use typedef**

`typedef` for inbuilt data type
```cpp
typedef long long ll
ll number;
```

`typedef` for Structure
```cpp
typedef struct employee
{
    /* data */
    int eId; //4
    char favChar; //1
    float salary; //4
} ep;
```

used a keyword “**typedef**” before struct and after the closing bracket of structure, we have written “ep”. Now we can create structure variables without using the keyword “struct” and name of the struct.

```cpp
int main() {
	// struct employee harry
     ep harry; 
     return 0;
}
```

### Unions

Unions are similar to structures but they provide better memory management then structures.  Unions use shared memory so only 1 variable can be used at a time.

- Memory between variables are shared 
- in union, we can use only one variable at a time. 
- Previous allocated variable will be deallocated to a garbage value.

```cpp
union money{
	int rupees; // size 4
	char bitCoin; // size 1
	float pounds; // size 4
}
```

size of struct = sum of size of all data = 4+1+4 = 9
size of union = maximum data size in union = 4

```cpp
union money m1;
m1.rupees = 34;
cout<<m1.rupees; // 34

m1.bitCoin = 'C'
cout<<m1.bitCoin; // 'C'
cout<<m1.rupees; // Garbage Value
```


### Enumeration

Enums are user-defined types which consist of named integral constants. Enums are used to make the program more readable.
- It is used to assign names to a set of values, making code easier to read and maintain.
- Each name in an enum represents an integer value, starting from 0 by default (unless you explicitly set values).

```cpp
int main(){
	// value =     0       1       2
    enum Meal{ breakfast, lunch, dinner};
    Meal m = lunch;
    cout<<m1; // 1
    cout<<breakfast // 0
    return 0;
}
```


# [#63 C++ Templates: Must for Competitive Programming | C++ Tutorials for Beginners](https://youtu.be/kKJeekDKU30)

```
Class -> Object
Template -> Class>
```

If we want to make array variable  `arr` with different datatype: int, float, char at same time
```cpp
class intVector{
int *arr;
...
}

class floatVector{
float *arr;
...
}

class charVector{
char *arr;
...
}
```

It violates Don-Not-Repeat (DRY) principle.

#### Template
```cpp
template <class T>
class vector{
	T*arr;
	public:
		vector(T*arr){
			// code....
		}
		// other methodes...
}

int main(){
vector<int> intVec
vector<char> charVec(4) // constructor invoke
}

```
where T= int, float or char etc.

**Template Syntax**
Through template, we can make class one time, and for different different datatypes class will be automatically formed. and so Templates are sometime called **parameterised class**.

Why use Template
- To follow DRY principle
- Generic Programming (that is generalization of programming)
- Much use in competitive programming

`STL + Template` : master or give an edge in competitive programming.