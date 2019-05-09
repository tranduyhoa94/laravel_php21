<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <title>Target Material Design Bootstrap Admin Template</title>
      <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="{{mix('css/app.css')}}">
      <link rel="stylesheet" type="text/css" href="{{url('css/rbox.min.css')}}">

   </head>
   <body>
      <div id="app">
      </div>
      <!-- /. WRAPPER  -->
      <script type="text/javascript" src="{{mix('js/app.js')}}"></script>
   </body>
</html>