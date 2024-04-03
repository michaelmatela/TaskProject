to run ios
//make sure xcode and simulator is properly setup
step 1
run 
npm install
step 2
run
react-native eject
//this will generate ios and android folder
step 3
cd ios
//go to ios folder
step 4
run 
bundle install
bundle exec pod install
//to install ios dependencies
step 5
run
npm run ios

to run android make sure android studio and emulator is properly installed and the global variables are properly setup in ~/.zshrc
example:
export PATH=/opt/homebrew/bin:$PATH
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

step 1
run 
npm install
step 2
run
react-native eject
//this will generate ios and android folder
step 3
run
npm run android
//wait for gradle to finish building
