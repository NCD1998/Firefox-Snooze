
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require('sdk/simple-storage');
//Conditional Init for the url array in Simple Storage
if (!data.storage.urls){
  data.storage.urls = [];
}
//Conditional Init for the autoState boolean for Simple Storage
if (data.storage.autoState == null) { 
  data.storage.autoState = true;
}
//Open saved webpages If they exist
var urlnum = data.storage.urls.length;
if (urlnum != 0 && data.storage.autoState) {
  for (var i = (urlnum - 1); i >= 0 ; i--) {
    if (data.storage.urls[i] != null) {
      tabs.open(data.storage.urls[i]);
    data.storage.urls.splice(i,1);
    }
   
  }
}
//Set the color of the toggle button when the browser is opened
var togglestartcolor;
if (data.storage.autoState) {
  togglestartcolor = "#00ff00";
}else{
  togglestartcolor = "#ff0000";
}
//Create the ActionButton used to snooze websites
var button = buttons.ActionButton({
  id: "Snooze-Website",
  label: "ZzZzZz",
  icon: {
    "16": "./Snooze_Icon_16.png",
    "32": "./Snooze_Icon_1632.png",
    "64": "./Snooze_Icon_1664.png"
  },
  onClick: handleClick
});
//Create the toggle button for automatic loading of webpages at browser startup
var { ToggleButton } = require("sdk/ui/button/toggle");
var Tbutton = ToggleButton({
    id: "Toggle-Auto",
    label: "Manual/Auto",
    icon: {
      "16": "./Snooze_Icon_16.png",
    "32": "./Snooze_Icon_1632.png",
    "64": "./Snooze_Icon_1664.png"
    },
    badge: data.storage.urls.length,
    badgeColor: togglestartcolor,
    onChange: function(state) {
      //Toggle the autoState Varible for persistance
      data.storage.autoState = !data.storage.autoState;
      //Color and Badge Update
      if (data.storage.autoState) {
        Tbutton.badgeColor = "#00ff00";
        //Open Saved pages on toggle on from off state
        var urlnum = data.storage.urls.length;
        if (urlnum != 0 && data.storage.autoState) {
          for (var i = (urlnum - 1); i >= 0 ; i--) {
            if (data.storage.urls[i] != null) {
              tabs.open(data.storage.urls[i]);
              data.storage.urls.splice(i,1);
            }
          }
        }
        Tbutton.badge = urlnum;
      }else{
        Tbutton.badgeColor = "#ff0000";
      }
    }
  });


function handleClick(state) {
 // save and close tabs
  data.storage.urls.push(tabs.activeTab.url);
 if(tabs.length != 1){
    tabs.activeTab.close();
 }else{
    var temp = tabs.activeTab;
    tabs.open("about:blank");
    temp.close();
 }
}