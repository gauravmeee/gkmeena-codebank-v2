
https://youtu.be/JKccS9k56_I
1. React-Native CLI - More control, Customization
2. Expo CLI - Easy, Already Built components


We will use React-Native.

Install Chocolatey - used to install node and open JDK
```sh
# Powershell (Copy and paste code from chocolatey official website to Powershell)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Install Nodejs - Required for backend code
```sh
# cmd
choco install -y nodejs-lts
```

Install OpenJDK - To Run Android studio tools, which require Java to run
```sh
# cmd
choco install -y microsoft-openjdk17
```
- Make Sure JDK 17 is installed

Check Nodejs
```sh
node -v
```

Check Java
```sh
java -version
```

Download and Install Android Studio from Official Website

Open Android Studio

Setup Android Studio
- welcome -> Next
- Install Type -> Standard
- Verify Setting -> Next
- License Agreement -> Accept and Finish

Setup 2
- Welcome to Android Studio  -> More Actions -> SDK Manager
	- SDK Platforms
		- Checkmark Show Package Details
		- Now Make sure to Check and Install -  Latest (or 2nd latest if latest not stable ) Android's `Android SDK Platform 35` + `Google APIs Intel x86_64 Atom System Image` or `Intel x86_64 Atom System Image`
	- SDK Tools
		- Checkmark Show Package Details
		- Check and Install - `Android Emulator`, `Android SDK Platform- Tools` , `Android Emulator hypervisor driver(installer)` and Latest Android SDK Build Tools 36-rc3's  - Second Latest Version let `35.0.0`

Note: In Android SDK Installation Location, There should be no Space in Path i.e take care on User name
```
C:\Users\Gaurav PC\AppData\Local\Android\Sdk
```
- SDK doesn't support space and will give error

Set this Path to the both `User Variable` and `system Variable`
- New User Variable -> Name=`ANDROID_HOME` and Value=`Path`


Set the Java (JDK) Path ex (`C:Program Files\Microsoft\jdk-17.0.13.11-hotspot`) to the both `User Variable` and `system Variable`
- New User Variable -> Name=`JAVA_HOME` and Value=`Path`

Add these Paths  `C:\Users\Gaurav PC\AppData\Local\Android\Sdk\platform-tools`, `...\Sdk\platforms` `...Sdk\emulator` , `...\Sdk\build-tools` to both System and Users `Path` Variable

Add these Paths  `C:Program Files\Microsoft\jdk-17.0.13.11-hotspot\bin` to both System and Users `Path` Variable



Make Virtual Device
- More Actions -> Virtual Device Manager
	- + -> Model -> Android Version -> Play



---

[React Native Documentation]
### Create Project


```sh
npx @react-native-community/cli init <ProjectName>

# old
npx react-native init
```

Go to Project Directoy
```sh
cd <ProjectName>
```

Open Virtual Device

Start
```sh
npm start
```

Error--- Fix
```sh
npm run android --clear-cache
```

Extension to Install
- React Native
- ES7+

---

### Lets Start

`App.jsx`

Pre Setup
```jsx
// Import
import { 
	StyleSheet, 
	Text, 
	View, 
	Image, 
	Pressable, 
	SafeAreaView, 
	StyleSheet, 
	TouchableOpacity, 
	TouchableHighlight 
} from 'react-native'

import React from 'react'
```

Mane Function
```jsx
const App = () => {
	return (
		<View>
			<Text> Hello World </Text>
		</View>
```

Post Setup
```jsx
export default App
const styles = StyleSheet.create({})
```

---

### Fundamental Concepts

```jsx
<View>...</View> same as div? 

<SafeAreaView>...</SafeAreaView>

<Text> </Text>

<Image ...>...</Image>
// or
<Image 
	style={{width:200, height:300}} // Necessary
	source={{uri:xxx}}
/>

<Button title='Press'></Button>

<TouchableOpacity onPress{()=>} >
	<Text> Press Me</Text>
</TouchableOpacity>

<TouchableHighlight>
	<Text> Press Me</Text>
</TouchableHighlight>

<Pressable> // Best
	<Text> Press Me</Text>
</Pressable>

```

```jsx
// style inline 
Attribute={{a:vala, b:valb}}

// Style from Json or Stylesheet
Attribute={Style.container}

```
#### React Native Styling

**Difference Case then CSS**
- CSS : kabab-case ` 
- React Native : CamelCase 

**Syntax**


**Unique or Properties not same as CSS**
```jsx
// basic
width:"100%", 
height:"100%", 
backgroundColor:"#999",
color:"white",
fontSize:20,
fontWeight:"bold" // or 500
borderRadius:5,
borderWidth:6,
borderColor:"white"

// Space Around Element
padding: 10
paddingVertical:5,
paddingHorizontal:10,
marginTop:10



// Property Written in Parent, Applied to All its children
gap:10
flex:1 
justifyContent: "center", // (flex-start, flex-end), (space-between, space-around, space-evenly)
alighnItems:"center", // stretch

// Property of children Relative to the Parent/ or overwritte parent
alignSelf : "flex-start" // flex-end
```

**Flex**
- Divide the Space into fix no. of Area = Sum of All childrens. And give Each Children Elment a Fraction of Area => [area of children / Total Area ]

```jsx
// Flex Direction -> Column(By Deafault)

<View style={{height:"100%", width:"100%"}}> 
	<View style={{flex:1}}/>
	<View style={{flex:3}}/>
	<View style={{flex:2}}/>
</View>
// Children Views are of Flex = 1,3,2
// Total height of Parent divided into 1+3+2=6 parts
// Each Get the fraction of height, 1/6, 3/6, 2/6 parts

```

```jsx
// Flex Direction -> Row
<View style={{flex:1, flexDirection:"row"}}/>

// Flex Direction Column from bottom to top
<View style={{flex:1, flexDirection:"column-reverse"}}/>

// Flex Direction row, from right to left
<View style={{flex:1, flexDirection:"row-reverse"}}/>

```

**Align Item & Justify Content**
- In CSS
	- Justify Content  - Horizontally center
	- Align Item - Vertically Center
- In React Native Style (Change on flex direction)
	- Justify Content  - Center Along Main Axis
	- Align Item - Center Along Cross Axis
Note: 
- If flex Direction is Column(Default) -> Main Axis is Vertical and Cross axis is Horizontal
- If flex Direction is Row: -> Main Axis is Horizontal, and Cross axis is vertical



**Responsive vs Non Responsive Value**
- width: 10 -> Fixed no. of pixel -> Non Responsive
- width: 10% -> Depend on screen size -> Responsive

**Types of Style**

- Inline Style (Preferred if only few style)
```jsx
<tag style = {{ property:value }} >
```

- Javascript object (Not Preferred, Render every time page load)
```jsx
const App = () =>{

// Java Script Object
	const style ={
		container: {
			property1:value1,
			preperty2:value2
		},
		text:{
			preperty3:value3,
			property4:value4
		}
	}
	
	// JSX in Return 
	Return(
		<View style = {{ style.container }} >
			<Text style = {{ style.text }}> </Text>
		</View>
	)	
}
export default App
```

- Style sheet (Preferred for better performance, if Too many Styles, Because it Render or Load one time when application run)
```jsx
const App = () =>{
	
	// JSX in Return 
	Return(
		<View style = {{ styles.container }} >
			<Text style = {{ styles.text }}> </Text>
		</View>
	)	
}
export default App
// Style Sheet
const  styles = StyleSheet.create({

	container: {
		property1:value1,
		preperty2:value2
	},
	Text:{
		preperty3:value3,
		property4:value4	
})

// For the Dynamic Style, like change in hover, change on button press, we can't use this stylesheet method because it loads one time and can't change.
// Solution -> So we use combination of Stylesheet and Inline style
```

Theme Based Styling
```jsx
import {useColorScheme} from 'react-native'
const App = () =>{
	// It Return the current system them i.e. Dark or Light
	const theme = useColorScheme() 
	
	// True if Dark Mode
	const isDarkMode = theme === 'dark'; 

	// Store the Dynamic bg and text color
	const bgColor = isDarkMode? "black" : "white";
	const textColor = isDarkMode? "white" : "black";
	
	Return(
		// Write Inline for theme Mode BG Color
		<View style = {{ styles.container, {backgroundColor: bgColor} }} >
			
			<Text style = {{ styles.text, {color : textColor}}}> </Text>
		</View>
	)
}
...
```

