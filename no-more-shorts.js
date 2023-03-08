let pattern = "*://www.youtube.com/shorts/*";
let reg_vid = "https://youtu.be/";

function redirect(requestDetails) {
    console.info(`NO_MORE: Redirection: ${requestDetails.url}`);
    let start = requestDetails.url.indexOf('/shorts/')
    console.info(`NO_MORE: To: ${reg_vid + requestDetails.url.substring(start+8, start+19)}`)
    return {
        redirectUrl: reg_vid + requestDetails.url.substring(start+8, start+19) // start from the end of '/short/' and to the 11 character video id
    };
}

function nav_redirect(tabID, changeInfo, tabInfo) {
  console.info(`NO_MORE: Redirection: ${changeInfo.url}`);
  let start = changeInfo.url.indexOf('/shorts/')
  console.info(`NO_MORE: To: ${reg_vid + changeInfo.url.substring(start+8, start+19)}`)
  browser.tabs.update(tabID, {url:reg_vid + changeInfo.url.substring(start+8, start+19)});
}

//Grab url requests to a short link and replace it with a normal one
browser.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:[pattern]},
    ["blocking"]
  );

//Same check but for on page changes from the youtube page itself
browser.tabs.onUpdated.addListener(
  nav_redirect,
  {urls:[pattern], properties:["url"]}
);