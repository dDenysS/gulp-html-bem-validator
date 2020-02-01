# gulp-html-bem-validator  
[![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]
> Gulp plugin for validation a bem html

# Usage

First, install `gulp-html-bem-validator` as a development dependency:

```shell
npm install --save-dev gulp-html-bem-validator
```

Then, add it to your `gulpfile.js`:

# Simple example
```javascript
var gulp = require('gulp');
var gulpHtmlBemValidator = require('gulp-html-bem-validator');

gulp.task('html-bem-validator', () => {
  gulp.src('pages/*.html')
    .pipe(gulpHtmlBemValidator())
    .pipe(gulp.dest('build/'));
});
```

# An example of outputting results to a console
 
## Success 
![success-result-example](https://lh3.googleusercontent.com/CI__G-pJAk9uyxFKABAVeePzTYCmBOgDkRGwgnE1xqd0dZNjraxTy0BKpDJ4iI4vLUCsugXCnWTWFqKtXT_irGa-ZGlSdX_yMyRzvwx7Fb4IWPeRvBamuOq-LuLjvA8ZVLNsHvE45Q=w1157-h32-no)

## Error
![error-result-example](https://lh3.googleusercontent.com/aw2V-r8uRt25GeR3NqefAVqhomPef7z-j7zv5-vTeUphd4Rhfwo60J05qvMRMO5faHGVJOeGuWRFLOim0krO-dx2amtn7kHSXUMrdsxBIdyh9QZ0UPJ75XbKsxrz5ROckhl2dh3oAw=w1227-h375-no)

[travis-url]: https://travis-ci.com/dDenysS/gulp-html-bem-validator
[travis-image]: https://travis-ci.org/dDenysS/gulp-html-bem-validator.svg?branch=master
[npm-url]: https://npmjs.org/package/gulp-html-bem-validator
[npm-image]: https://badge.fury.io/js/gulp-html-bem-validator.svg
