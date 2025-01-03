# [JSON Tutorial in Hindi 🔥🔥](https://youtu.be/whNFPBEI-wM)

Earlier XML is used for APIs
JSON - Java Script Object Notation

Syntax - Single Quotes are not allowed JSON.
## Creating a `JSON` Object
```json
{
	// "Property Keys" : Property Values
	"name" : "Gaurav",  // String : String
	"score" : 11.75 ,    //String : Number
	"isAdmin" : false ,   //String : Boolean
	"license" : null      //String : 
}
```
Note: Property Keys are always String (Double Quoted)
While using JSON in programs, Error are not shown. So it is difficult to find the bug.
### Parsing `JSON` into `JavaScript` Object

Write in Console
```js
//Assigning JSON to Variable
myJSON = `{
	"name" : "Gaurav",
	"score" : 11.75 , 
	"isAdmin" : false , 
	"license" : null
}`;

// Return: "{\n  \"name\": \"Gaurav\",\n  \"Score\": 11.75,\n  \"isAdmin\": fase\n  \"license\": null\n}"
```

```js
// Parisng 
JSON.parse(myJSON);

//Return: {name: "Harry", score: 11.75, isAdmin: false license: null}
```
Note: use `backticks`  to assign `json` string to variable

## Adding Array and Objects in JSON as Value
```js
myJSON = `{
	"name" : "Gaurav",
	"score" : 11.75 , 
	"isAdmin" : false , 
	"license" : null,
	"shopItems" : [ "food", "clothes", "sunflower oil"],
	"myObj" : {
		"name" : "nested",
		"marks" : 45
	}
}`;

//'{\n\t"name" : "Gaurav",\n\t"score" : 11.75 , \n\t"isAdmin" : false , \n\t"license" : null,\n\t"shopItems" : [ "food", "clothes", "sunflower oil"],\n\t"myObj" : {\n\t\t"name" : "nested",\n\t\t"marks" : 45\n\t}\n}'

JSON.parse(myJSON)
//{name: 'Gaurav', score: 11.75, isAdmin: false, license: null, shopItems: Array(3), …}

// Return Details : 

// isAdmin: false
// license: null
// myObj:
// marks: 45
// name: "nested"
// name: "Gaurav"
// score: 11.75
// shopItems: Array(3)
// 0: "food"
// 1: "clothes"
// 2: "sunflower oil"
// length: 3
```

Accessing Elements.
```js
myJSON = `{
	"name" : "Gaurav",
	"score" : 11.75 , 
	"isAdmin" : false , 
	"license" : null,
	"shopItems" : [ "food", "clothes", "sunflower oil"],
	"myObj" : {
		"name" : "nested",
		"marks" : 45,
		"shopItem2" : ["food", "clothers", {"a", true}]
	}
}`;

parsed = JSON.parse(myJSON);

parsed["isAdmin]
// false

parsed["shopItem"][2]
// "sunflower oil"

parsed["shopItem2"] ❌ // Can't Access Nested Object direclty
// Undefined

parsed["myObj"]["shopItem2"] ✅
//  (3) ["food", "clothes", {...}]

parsed["myObj"]["shopItem2"]["a"] ❌ // Can't Access Object in Array without Index direclty
// Undefined

pparsed["myObj"]["shopItem2"][2]["a"] ✅
// true
```
Note: Last`commas(,)`  is invalid in JSON if there is no next element after it


Summary: 
In JSON : you can use strings, boolea;n , numbers, nulls, array.
You can even nest object in it, you can nest object up to any level,
You can event put array in object, than a new object in the array, and again a array in the object and repeat up to any level.

It is good habit to make JSON Readable


# -------------------- The End ✅-----------------------


My JSON Example:

```json
{

    "Energybill": [

      {

        "type": "electricity",

        "amount": 100,

        "unit": "kWh",

        "financial_year": "current"

      },

      {

        "type": "electricity",

        "amount": 150,

        "unit": "kWh",

        "financial_year": "previous"

      },

      {

        "type": "fuel",

        "subtype": "coal",

        "amount": 200,

        "unit": "kg",

        "financial_year": "current"

      },

      {

        "type": "fuel",

        "subtype": "petrol",

        "amount": 50,

        "unit": "liters",

        "financial_year": "current"

      },

      {

        "type": "fuel",

        "subtype": "coal",

        "amount": 250,

        "unit": "kg",

        "financial_year": "previous"

      },

      {

        "type": "other",

        "amount": 300,

        "unit": "kWh",

        "financial_year": "current"

      }

    ],

    "turnover": {

      "current": 1000000,

      "previous": 900000

    }

,

  
  

    "Waterbill": [

      {

        "source": "Surface",

        "amount": 100,

        "unit": "litres",

        "financial_year": "current"

      },

      {

        "source": "Surface",

        "amount": 150,

        "unit": "litres",

        "financial_year": "previous"

      },

      {

        "source": "Ground",

        "amount": 200,

        "unit": "kg",

        "financial_year": "current"

      },

      {

        "source": "Sea",

        "amount": 50,

        "unit": "liters",

        "financial_year": "current"

      }

    ],

    "WithDrawal": {

      "current": 1000000,

      "previous": 900000

    }

    ,

    "Consumed": {

      "current": 1000000,

      "previous": 900000

    } ,

  
  

   "nonghg-emissions": [

        {

            "parameter": "NOx",

            "unit": "kg",

            "current": 100,

            "previous": 90

        },

        {

            "parameter": "SOx",

            "unit": "kg",

            "current": 80,

            "previous": 70

        },

        {

            "parameter": "PM",

            "unit": "kg",

            "current": 60,

            "previous": 50

        },

        {

            "parameter": "POP",

            "unit": "kg",

            "current": 40,

            "previous": 30

        },

        {

            "parameter": "VOC",

            "unit": "kg",

            "current": 20,

            "previous": 15

        },

        {

            "parameter": "HAP",

            "unit": "kg",

            "current": 10,

            "previous": 5

        },

        {

            "parameter": "Others",

            "unit": "kg",

            "current": 5,

            "previous": 3,

            "description": "Other pollutants"

        }

    ]

    ,

  

    "ghg-emissions": {

      "scope1": {

          "unit": "Metric tonnes of CO2 equivalent",

          "current": 1000,

          "previous": 950

      },

      "scope2": {

          "unit": "Metric tonnes of CO2 equivalent",

          "current": 1200,

          "previous": 1150

      },

      "turnover": {

          "current": 1000000,

          "previous": 900000

      }

  }

  ,

  

  "waste": {

        "generated": {

            "plastic": {"unit": "metric tonnes", "current": 200, "previous": 180},

            "e_waste": {"unit": "metric tonnes", "current": 50, "previous": 45},

            "bio_medical": {"unit": "metric tonnes", "current": 30, "previous": 25},

            "construction_demolition": {"unit": "metric tonnes", "current": 100, "previous": 90},

            "battery": {"unit": "metric tonnes", "current": 15, "previous": 12},

            "radioactive": {"unit": "metric tonnes", "current": 5, "previous": 3},

            "other_hazardous": {"unit": "metric tonnes", "current": 10, "previous": 8},

            "other_non_hazardous": {"unit": "metric tonnes", "current": 20, "previous": 18}

        },

        "recovered": {

            "recycled": {"unit": "metric tonnes", "current": 100, "previous": 90},

            "reused": {"unit": "metric tonnes", "current": 50, "previous": 40},

            "other_recovery_operations": {"unit": "metric tonnes", "current": 20, "previous": 18}

        },

        "disposed": {

            "incineration": {"unit": "metric tonnes", "current": 30, "previous": 25},

            "landfilling": {"unit": "metric tonnes", "current": 40, "previous": 35},

            "other_disposal_operations": {"unit": "metric tonnes", "current": 10, "previous": 8}

        }

    }

    ,

  

    "operations": [

    {

      "location": "National Park A",

      "type": "Office",

      "compliance": {

        "isCompliant": "Y",

        "reasons": null,

        "correctiveActions": null

      }

    }

  ]

  

  ,

  

  "projects": [

    {

      "name": "Project A",

      "details": "Construction of a new factory",

      "eiaNotificationNo": "EIA1234",

      "date": "2024-01-15",

      "independentAgency": "Yes",

      "publicDomain": "Yes",

      "webLink": "http://example.com/projectA"

    }

  ]

  ,

  

  "non_compliances": [

    {

      "law": "Water (Prevention and Control of Pollution) Act",

      "details": "Exceeded permissible limits of pollutants",

      "penalties": "Fine of $10,000 by pollution control board",

      "correctiveAction": "Implemented new water filtration system"

    }

  ]

  

  }
```
