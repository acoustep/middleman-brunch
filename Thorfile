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
      @sass_framework = ask("Which SASS Framework would you prefer?", ["Bootstrap", "Foundation", "Bourbon", "PureCSS", "None"])
      case @sass_framework
        when "Bootstrap"
          insert_into_file 'package.json', '    "bootstrap-sass": "~3.0"\n', after: '  "devDependencies": {\n'
          puts "Added bootstrap-sass to package.json\n"
        when "Foundation"
          insert_into_file 'package.json', '    "foundation-sites": "~6.0"\n', after: '  "devDependencies": {\n'
          puts "Added foundation-sites to package.json\n"
        when "Bourbon"
          insert_into_file 'package.json', '    "bourbon-neat": "~1.0"\n', after: '  "devDependencies": {\n'
          puts "Added bourbon-neat to package.json\n"
          insert_into_file 'package.json', '    "node-bourbon": "~4.0"\n', after: '  "devDependencies": {\n'
          puts "Added node-bourbon to package.json\n"
        when "PureCSS"
          insert_into_file 'package.json', '    "purecss": "~0.6"\n', after: '  "devDependencies": {\n'
          puts "Added purecss to package.json\n"
        else
          puts "No CSS Framework selected\n"
        end
    end

    def ask_about_font_awesome
      @use_font_awesome = yes?('Would you like to use Font Awesome?')
    end

    def ask_about_turbolinks
      @use_turbolinks = yes?('Would you like to use Turbolinks?')
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
  end
end

