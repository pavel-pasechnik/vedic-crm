# syntax=docker/dockerfile:1

################################################################################
# 1. Common Base Layer #
# Here we install Ruby, system dependencies, Bundler, customize ENV.  #
################################################################################

ARG RUBY_VERSION=3.4.2
FROM ruby:${RUBY_VERSION}-slim AS base

# 1.1. Install the Bundler with the correct version
RUN gem install bundler -v "2.6.9"

# 1.2. Set the working directory. All subsequent COPY/RUNs are performed relative to /app
WORKDIR /app

# 1.3. Install the "base" packages, which will be needed by both dev and prod
RUN apt-get update -qq && \
   apt-get install --no-install-recommends -y \
   git \
   curl \
   build-essential \
   libyaml-dev \
   pkg-config \
   libpq-dev \
   postgresql-client \
   libvips \
   nodejs \
   npm \
   netcat-openbsd \
   && rm -rf /var/lib/apt/lists/*

# 1.4. Customize Bundler: where to stack gems, how many threads, how to reinstall, etc.
ENV BUNDLE_PATH=/usr/local/bundle \
   BUNDLE_JOBS=4 \
   BUNDLE_RETRY=3

################################################################################
# 2. Stage to install the gems #
# Here we just copy the Gemfile/Gemfile.lock and do a `bundle install`.          #
# The result (/usr/local/bundle folder) will then be copied into the final stages. #
################################################################################

FROM base AS gems

# 2.1. Copy only Gemfile and Gemfile.lock (for Docker cache to work properly)
COPY Gemfile Gemfile.lock ./

# 2.2. By default, we skip the :development and :test groups - this is what we need for production builds.
# When building for the development target, we will override the BUNDLE_WITHOUT variable.
ENV BUNDLE_WITHOUT="development test"
RUN bundle install

################################################################################
# 3. Stage for assembling assemblies (production) #
# This stage is only needed for production.                                          #
# This is where the compiled Rails resources (bootsnap + assets) will go.               #
################################################################################

FROM gems AS assets

# 3.1. Copy all the application code (it will be needed for precompile-assets / bootsnap)
COPY . .

# Specify that this is a production environment (so that Rails takes the prod-config)
ENV RAILS_ENV=production

# 3.2. Pre-generate bootsnap (speeds up application loading)
RUN bundle exec bootsnap precompile app/ lib/

# 3.3. Compile Assets (Webpack/Vite => public/assets)
# If you are using Vite, make sure that the `bin/rails assets:precompile` command is set to run in production mode.
# to run Vite in production mode. If you are building via Webpacker, leave precompile as it is.
RUN SECRET_KEY_BASE=placeholder bundle exec rails assets:precompile

################################################################################
# 4. Final production image #
# - From this layer the final image will be fluffed into the production, it is minimal: #
# - Copy only the necessary gems #
# - Copy app to /app #
# - Copy public from assets #
# - User is unprivileged (rails:rails) #
################################################################################

FROM base AS production

# 4.1. Override BUNDLE_WITHOUT to use only production gems
ENV RAILS_ENV=production \
   BUNDLE_WITHOUT="development test"

# 4.2. Copy the gems installed at the gems stage
COPY --from=gems /usr/local/bundle /usr/local/bundle

# 4.3 Copy the entire application source (migrations, app/, config/ etc.)
COPY . .

# 4.4. Copy generated assemblies and bootsnap artifacts from the assets stage
COPY --from=assets /app/public /app/public
COPY --from=assets /app/tmp/cache /app/tmp/cache

# 4.5. Create unprivileged user rails (uid:1000, gid:1000) and give it permissions to /app
RUN groupadd --system --gid 1000 rails && \
   useradd --system --uid 1000 --gid 1000 --create-home --shell /bin/bash rails && \
   chown -R rails:rails /app

USER 1000:1000
WORKDIR /app

# 4.6. The port that the Puma will listen to (usually 3000 or 80)
EXPOSE 3000

# 4.7. Entry point: when starting the container we want to:
# 1) Wait for DB/Redis to start (if needed)
# 2) Perform migrations if you want (or leave it to CI)
# 3) Start Puma in production mode
#
# You can substitute your own entrypoint script (e.g. bin/docker-entrypoint),
# which does db:create/migrate, but the following is the most minimal option:
ENTRYPOINT ["bash", "-lc", "bundle exec rails db:create db:migrate && bundle exec puma -C config/puma.rb"]

################################################################################
# 5. Final image for development #
# Here we don't skip the development group, copy all the code "as is", #
# # install dev gems, run Webpacker/Vite in dev mode and Rails server. #
################################################################################

FROM base AS development

# 5.1. Put all gems, including :develop and :test.
ENV RAILS_ENV=development
ENV BUNDLE_WITHOUT=""

# 5.2. Copy Gemfile/Gemfile.lock and install all gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# 5.3. Copy all the application code (working on a "fresh" local file, which will most likely still be mounted):
COPY . .

# 5.4. Install npm dependencies (if needed), but in dev mode we usually install devDependencies
RUN npm install

# Create rails user (uid:1000) and give it permissions to /app
RUN groupadd --system --gid 1000 rails && \
   useradd --system --uid 1000 --gid 1000 --create-home --shell /bin/bash rails && \
   chown -R rails:rails /app

# Now adjust ownership of Bundler directory
RUN chown -R rails:rails /usr/local/bundle

ENV PATH="/app/bin:/usr/local/bundle/bin:${PATH}"

USER 1000:1000
WORKDIR /app

# 5.6. Open ports: 3000 for Rails and 5173 for Vite (if you are running Vite Dev Server)
EXPOSE 3000 5173

# 5.7. Development command:
# - First, start Vite Dev Server (if using Vite) to pull in hot-reload assets
# - Then start the Rails server with binding 0.0.0.0.0 so that it is accessible outside the container
#
CMD ["bash", "-lc", "\
   bin/vite dev --host 0.0.0.0 & \
   bundle exec rails server -b 0.0.0.0\
   "]