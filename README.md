# The 2nd Law Enforcers Team Website

[![Join the chat at https://gitter.im/team178/team178.github.io](https://badges.gitter.im/team178/team178.github.io.svg)](https://gitter.im/team178/team178.github.io?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Contributing
When making a code related change to the website, be sure to follow the best practices below.

1. Check changes with a local offline copy before committing to master. See [Running Locally](#running-locally) below for how to set this up.
2. Make sure existing code organization is followed. Not limited to but including:
  - 2 space indents (not tabs) on both HTML and CSS.
  - Indents are used where they should be to maintain hierarchy in code.
3. Make sure you use the official team colors found [here](https://docs.google.com/document/d/1k5BJCM6VXceMDnQpZrepQaSfA9wNGvEflAc6zCQ7PRY/edit?usp=sharing)
4. Also make sure to follow the branding standards of *FIRST* [here](http://www.firstinspires.org/sites/default/files/uploads/resource_library/first-brand-guidelines-web-2015.pdf)
5. All of the official logos for the programs of *FIRST* can be found in the drive [here](https://drive.google.com/open?id=0B_S9H2AY2UyEQmNjUHU1bFNBeVk)
6. Please **please PLEASE** comment your code!
7. Lastly: If you don't know, ask!

### Running Locally

Start by making sure you have Ruby installed:

```
ruby -v
```

If nothing appears as a result, [install Ruby](https://www.ruby-lang.org/en/documentation/installation).

Then install [Bundler](http://gembundler.com), if you don't already have it:

```
gem install bundler
```

If you're new to the team, you'll want to make a fork of the repository. This makes it easier for you to make changes and get them reviewed before they're added to the live site.

Once you've forked the repository you'll want to access that code on your own computer.
To do this just clone the repository down to your local machine:

```
git clone https://github.com/username/team178.github.io.git
```

(Make sure to replace `username` with your username.)

Then you need to navigate into your newly cloned repository:

```
cd team178.github.io
```

The last thing you need to do before you can run locally is do a `bundle install` to install the required gems.

Then just run `jekyll serve` to see the website running on `http://localhost:4000`.

If you get any errors or warnings, try running `bundle exec jekyll serve` instead.


## Text Editor of Choice

Some on the website team use [Atom](https://atom.io/) as our text editor of choice. If you already have a preferred text editor, you are free to use that! But if you are just starting out, you can try Atom.

You can get the installer for your OS on [Atom's homepage](https://atom.io/). If you're on Ubuntu, you can use this guide:
[Guide for Ubuntu](https://codeforgeek.com/2014/09/install-atom-editor-ubuntu-14-04/) If you're on Windows you need to right click the installer and click "Run as Administrator". If it fails restart your computer and try installing it a couple of times. If that also fails go to Google for help.
Atom gives you the ability to use packages. These packages can be used to modify how Atom works. For a complete list of packages for Atom go [here](https://atom.io/packages). While there are a great many of packages that you can explore, we recommend that you install the package [Pigments](https://atom.io/packages/pigments). It gives you a preview of colors in your code. Follow the instructions in Atom for how to install it.

If you don't like Atom, there are other options too!

VS Code is open-source and easy to run on all major platforms. It also features Microsoft's IntelliSense autocomplete features for a few languages. It's continually evolving, and looks great. [Get Visual Studio Code here.](https://code.visualstudio.com/)

Notepad ++ is similarly cross-platform, and much simpler. It has been around for a long time, and has syntax highlighting for a lot of languages, and there are packages for even more. This project has a large amount of support and many packages available due to its age. The other two projects above are newer, and currently growing. It, unfortunately isn't as pretty. [Get notepad++ here](https://notepad-plus-plus.org/features/)

We can't wait to get you involved.

## License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
