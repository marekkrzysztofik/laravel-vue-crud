<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>laravel-vue-crud</title>
        <link href="{{ asset('css/app.css') }}" ref="stylesheet">
        <script type="module" scr="{{ asset('js/app.js') }}" defer></script>
        @vite('resources/sass/app.scss', 'resources/css/app.css')
        
    </head>
    <body>
        <div class="card">
            <p>fdsafdsfs</p>
            <router-view />
          </div>
          {{-- tutaj header jak nie dasz rady w komponencie domowym --}}
        <div id="app">
            <router-view></router-view>
        </div>
        @vite('resources/js/app.js')
    </body>
</html>
