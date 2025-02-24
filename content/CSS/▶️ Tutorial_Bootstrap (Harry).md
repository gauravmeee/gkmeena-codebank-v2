# [Bootstrap Tutorial In Hindi](https://youtu.be/vpAJ0s5S2t0)

Bootstrap is a free, open-source front-end development framework for creating websites and web apps. It's designed to help developers create responsive, mobile-first websites faster and more easily. Bootstrap includes pre-built HTML and CSS design templates for many elements, such as typography, forms, buttons, tables, navigation, modals, and image carousels. It also includes optional JavaScript plugins for features like toggleable hidden elements, modals, offcanvas menus, popovers, and tooltips.

Open Visual Studio Code Editor

[Boot Strap Documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/)


Create `index.html`

1. In the VScode `index.html` file, type `!` and press `Shift + 1` or `Tab` to use the Emmet Abbreviation feature. This will paste the basic HTML template.

Html basic syntax:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
</html>
```

but we will use starter template given at bootstrap documentation:
```html
```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>
```

**Optional: Use Live Server or Live Preview Extension for Live Reload**

This is the Code responsible to add style in html
```html
<!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
```

This is the Stylesheet that html is getting from bootstrap website to style the page
https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css

### Now, let's move on to the next step.

Go to the Component's section in the Bootstrap documentation: https://getbootstrap.com/docs/4.1/components/

Bootstrap allows you to pick any components and use them in your HTML template. Let's copy any Bootstrap's Navigation bar from the components section and paste it into the HTML file.

Hurray! Your HTML page now has a navbar.

>_Note:_ Make sure to use the correct Bootstrap HTML code in the right place of your HTML file. For example, if you have a `navbar`, paste it at the top of the `<body>`, and if it's a `footer`, paste it at the bottom of the `<body>`.

>Also, remember that if you remove the stylesheet from `<link href....>`, your styles will be removed, regardless of whether the Component code is present or not.


Now you can change the, nabar hyperlinks and names according to you

