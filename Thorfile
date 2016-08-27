require 'thor/group'

module Middleman
  class Generator < ::Thor::Group
    include ::Thor::Actions

    source_root File.expand_path(File.dirname(__FILE__))


    def copy_default_files
      directory 'template', '.', exclude_pattern: /\.DS_Store$/
    end

    def ask_about_compass
      @use_compass = yes?('Do you want to use Compass?')
    end

    def ask_about_livereload
      @use_livereload = yes?('Do you want to use LiveReload?')
    end

    def ask_about_css
      @has_sass_framework = true
      @sass_framework = ask("Which SASS Framework would you prefer?\n", ["Bootstrap", "Foundation", "Bourbon", "PureCSS", "None"])
      case @sass_framework
        when "Bootstrap"
          insert_into_file 'package.json', "    \"bootstrap-sass\": \"~3.0\",\n", after: "  \"devDependencies\": {\n"
        insert_into_file 'brunch-config.js', "\"node_modules/bootstrap-sass/assets/stylesheets\"\n", after: "        includePaths: [\n"
        when "Foundation"
          insert_into_file 'package.json', "    \"foundation-sites\": \"~6.0\",\n", after: "  \"devDependencies\": {\n"
        insert_into_file 'brunch-config.js', "\"node_modules/foundation-sites\"\n", after: "        includePaths: [\n"
        when "Bourbon"
          insert_into_file 'package.json', "    \"bourbon-neat\": \"~1.0\",\n", after: "  \"devDependencies\": {\n"
          insert_into_file 'package.json', "    \"node-bourbon\": \"~4.0\",\n", after: "  \"devDependencies\": {\n"
          insert_into_file 'brunch-config.js', "\"node_modules/bourbon/app/assets/stylesheets\"\n", after: "        includePaths: [\n"
          insert_into_file 'brunch-config.js', "\"node_modules/bourbon-neat/app/assets/stylesheets\",\n", after: "        includePaths: [\n"
        when "PureCSS"
          insert_into_file 'package.json', "    \"purecss": "~0.6\",\n", after: "  \"devDependencies\": {\n"
        else
          puts "No CSS Framework selected\n"
          @has_sass_framework = false
        end
    end

    def ask_about_font_awesome
      @use_font_awesome = yes?('Would you like to use Font Awesome?')
      
      @line_ending = (@has_sass_framework) ? ',' : ''
      if @use_font_awesome
        insert_into_file 'package.json', "    \"font-awesome\": \"^4.6.3\",\n", after: "  \"devDependencies\": {\n"
        insert_into_file 'brunch-config.js', "\"node_modules/font-awesome/fonts\"\n", after: "      \"fonts\": [\n"
        insert_into_file 'brunch-config.js', "\"node_modules/font-awesome/scss\"#{@line_ending}\n", after: "        includePaths: [\n"
      end
    end

    def ask_about_turbolinks
      @use_turbolinks = yes?('Would you like to use Turbolinks?')
      if @use_turbolinks
        insert_into_file 'package.json', "    \"turbolinks\": \"^5.0.0\",\n", after: "  \"devDependencies\": {\n"
        insert_into_file 'brunch-config.js', "      \"turbolinks\"\n", after: "    whitelist: [\n"
      end
    end

    def build_gemfile
      if @use_compass
        insert_into_file 'Gemfile', "gem 'middleman-compass', '>= 4.0.0'\n", after: "# Middleman Gems\n"
      end

      if @use_livereload
        insert_into_file 'Gemfile', "gem 'middleman-livereload'\n", after: "# Middleman Gems\n"
        insert_into_file 'config.rb', <<-eos, after: "# General configuration\n"

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end
eos
      end

      insert_into_file 'Gemfile', "gem 'middleman', '>= 4.0.0'\n", after: "# Middleman Gems\n"
    end

    def ask_about_rackup
      if yes?('Do you want a Rack-compatible config.ru file?')
        template 'optional/config.ru', 'config.ru'
      end
    end

    def instructions
      puts "Thank you for using middleman-brunch.\n"
      puts "Please run npm install to finish the setup.\n"
    end
  end
end
