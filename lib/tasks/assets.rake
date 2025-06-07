# lib/tasks/assets.rake
# The webpack task must run before assets:environment task.
# Otherwise Sprockets cannot find the files that webpack produces.
# This is the secret sauce for how a Heroku deployment knows to create the webpack generated JavaScript files.

namespace :assets do
  task precompile: [:environment] do
    sh "bin/vite build"
  end

  desc 'Compile assets with vite'
  task :vite_build do
    sh "bin/vite build"
  end

  task :clobber do
    rm_r Dir.glob(Rails.root.join('app/assets/javascripts/generated/*'))
  end
end
