# after any changes to the Gemfile, execute bundle update!
source "https://rubygems.org"

# Performance-booster for watching directories on Windows (Windows only)
gem "wdm", ">= 0.1.0", :platforms => [:mingw, :mswin, :x64_mingw]

# Linux compatibility
platforms :ruby, :x86_64_linux do
  gem "ffi"
end

# Jekyll and related gems
gem "jekyll", "~> 4.4"
gem "rake", "~> 13.0"

# Your theme/layout
gemspec
