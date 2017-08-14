// GULP (cada vez que se cambia algo, hay que parar gulp ctrl+C, guardamos y volvemos a darle 'gulp'). Gulp tiene que estar siempre corriendo ('gulp') para que haga lo que decimos que debe hacer.

var gulp = require("gulp"); //importamos la libreria gulp
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");
var tap = require("gulp-tap"); //tap nos permite ejecutar una funcion por cada fichero seleccionado en donde le digamos
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin"); //para minificar HTML
var uglify = require("gulp-uglify"); //para minificar JS
var postcss = require("gulp-postcss"); //con esta y autoprefixer: añadir los prefijos que hacen que algunas funcionalidades funcionen en navegadores antiguos
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano"); //para minificar CSS
var imagemin = require("gulp-imagemin");
var responsive = require("gulp-responsive");

//definimos la tarea por defecto
gulp.task("default", ["img", "html", "sass", "js"], function(){
	
	// iniciamos el servidor de desarrollo
	browserSync.init({
		//server: "dist/",     //aquí le decimos de dónde quiero que me coja la info (server y proxy)
		proxy: "http://127.0.0.1:3100/", //para usar el backend que hemos creado: json-server (puesto en package.json)
		browser: "google chrome" //le indico qué navegador quiero que me abra
	});
	
	//observa cambios en los archivos SASS y entonces ejecuta la tarea 'sass'
	//los ** significa: cualquier archivo.scss dentro de cualquier carpeta dentro de la carpeta scss.
	gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);
	
	// observa cambios en los archivos HTML y entonces recarga el navegador
	gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);

	// observa cambios en los archivos JS y entonces ejecuta la tarea 'js'
    gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
});

//compilar SaSS
gulp.task("sass", function(){
	gulp.src("src/scss/style.scss") //cargamos el archivo style.css
		.pipe(sourcemaps.init()) //comienza a capturar los sourcemaps
		.pipe(sass().on("error", function(error){ // lo compilamos con gulp-sass
			return notify().write(error); // si ocurre un error, mostramos una notificación
	}))
		.pipe(postcss([
            autoprefixer(), // transforma el CSS dándole compatibilidad a versiones antiguas
            cssnano()       // comprime/minifca el CSS
        ]))
		.pipe(sourcemaps.write("./")) // guarda el sourcemap en la misma carpeta 
		.pipe(gulp.dest("dist/")) // guardamos el resultado en la carpeta css
		.pipe(browserSync.stream()) //recargue el CSS del navegador
		.pipe(notify("SASS compilado")); //muestra notificación en pantalla
});

//copiar e importar html
gulp.task("html", function(){
	gulp.src("src/*.html")
		.pipe(gulpImport("src/components/")) // reemplaza los @import de los HTML
		.pipe(htmlmin({collapseWhitespace: true})) // minifica el HTML
		.pipe(gulp.dest("dist/"))
		.pipe(browserSync.stream()) //reload es para recargar por "narices"
		.pipe(notify("HTML importado"));
});

//compilar y generar un único javascript
gulp.task("js", function(){
	gulp.src(["src/js/main.js"], ["src/js/main-detail.js"])
        .pipe(tap(function(file){ // tap nos permite ejecutar una funcion por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasÃ¡ndole el fichero
            file.contents = browserify(file.path, {debug: true}) // creamos una instancia de browserify en base al archivo
                            .transform("babelify", {presets: ["es2015"]}) // traduce nuestro codigo de ES6 -> ES5
                            .bundle() // compilamos el archivo
                            .on("error", function(error){ // en caso de error, mostramos una notificacion
                                return notify().write(error);
                            });
        }))
		.pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
		.pipe(sourcemaps.init({loadMaps: true})) // captura los sourcesmaps del archivo fuente
		.pipe(uglify()) // minificamos el JavaScript
		.pipe(sourcemaps.write('./')) //guarda los sourcemaps en el mismo directorio que el archivo fuente
        .pipe(gulp.dest("dist/")) // lo guardamos en la carpeta dist
        .pipe(browserSync.stream()) // recargamos el navegador
        .pipe(notify("JS compilado"));
});

// tarea que optimiza y crea las imágenes responsive
gulp.task("img", function(){
    gulp.src("src/img/*")
        .pipe(responsive({ // generamos las versiones responsive
            '*': [
                { width: 150, rename: { suffix: "-150px"}},
                { width: 250, rename: { suffix: "-250px"}},
                { width: 300, rename: { suffix: "-300px"}}
            ]
        }))
        .pipe(imagemin()) // optimizamos el peso de las imágenes
        .pipe(gulp.dest("dist/img/"))
});