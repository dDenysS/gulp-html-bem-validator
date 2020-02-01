# gulp-html-bem-validator  
> Gulp plugin for validation a bem html

## Usage

First, install `gulp-html-bem-validator` as a development dependency:

```shell
npm install --save-dev gulp-html-bem-validator
```

Then, add it to your `gulpfile.js`:

### Simple usage
```javascript
var gulp = require('gulp');
var gulpHtmlBemValidator = require('gulp-html-bem-validator');

gulp.task('html-bem-validator', () => {
  gulp.src('pages/*.html')
    .pipe(gulpHtmlBemValidator())
    .pipe(gulp.dest('build/'));
});
```

## Example output the error result to the console
 
# Success 
![success-result-example](https://lh3.googleusercontent.com/CI__G-pJAk9uyxFKABAVeePzTYCmBOgDkRGwgnE1xqd0dZNjraxTy0BKpDJ4iI4vLUCsugXCnWTWFqKtXT_irGa-ZGlSdX_yMyRzvwx7Fb4IWPeRvBamuOq-LuLjvA8ZVLNsHvE45Q=w1157-h32-no)

# Error
![error-result-example](https://lh3.googleusercontent.com/aw2V-r8uRt25GeR3NqefAVqhomPef7z-j7zv5-vTeUphd4Rhfwo60J05qvMRMO5faHGVJOeGuWRFLOim0krO-dx2amtn7kHSXUMrdsxBIdyh9QZ0UPJ75XbKsxrz5ROckhl2dh3oAw=w1227-h375-no)
