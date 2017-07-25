module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src/assets/scss',
          src: ['*.scss'],
          dest: './public/css/',
          ext: '.css'
        }]
      }
    },

    copy: {
      img: {
        files: [{
          expand: true,
          cwd: 'src/assets/img',
          src: ['**/*.jpg', '**/*.png', '**/*.svg'],
          dest: './public/img/'
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html', '**/*.php'],
          dest: './public/'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ],
        browsers: ['last 3 versions', 'iOS > 6', 'IE > 10']
      },
      dist: {
        src: 'public/css/**.css'
      }
    },

    watch: {
      css: {
        files: 'src/assets/scss/**/*.scss',
        tasks: ['sass:dev', 'postcss']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:html']
      },
      images: {
        files: ['src/assets/img/**'],
        tasks: ['copy:img']
      }
    }

  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['sass:dev', 'copy', 'postcss']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');
};

