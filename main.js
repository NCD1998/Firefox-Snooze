var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require('sdk/simple-storage');
if (!data.storage.urls){
  data.storage.urls = [];
}
if (data.storage.autoState == null) {
  data.storage.autoState = true;
}
var urlnum = data.storage.urls.length;
if (urlnum != 0 && data.storage.autoState) {
  for (var i = (urlnum - 1); i >= 0 ; i--) {
    if (data.storage.urls[i] != null) {
      tabs.open(data.storage.urls[i]);
    data.storage.urls.splice(i,1);
    }
   
  }
}
var togglestartcolor;
if (data.storage.autoState) {
  togglestartcolor = "#00ff00";
}else{
  togglestartcolor = "#ff0000";
}
var { ToggleButton } = require("sdk/ui/button/toggle");
var Tbutton = ToggleButton({
    id: "Toggle-Auto",
    label: "Manual/Auto",
    icon: {
      "16": "./firefox-16.png",
      "32": "./firefox-32.png"
    },
    badge: data.storage.urls.length,
    badgeColor: togglestartcolor,
    onChange: function(state) {
      data.storage.autoState = !data.storage.autoState;
      if (data.storage.autoState) {
        Tbutton.badgeColor = "#00ff00";
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
var button = buttons.ActionButton({
  id: "Snooze-Website",
  label: "ZzZzZz",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
 // tabs.advanceSelectedTab();
  data.storage.urls.push(tabs.activeTab.url);
 if(tabs.length != 1){
    tabs.activeTab.close();
 }else{
    var temp = tabs.activeTab;
    tabs.open("about:blank");
    temp.close();
 }
}