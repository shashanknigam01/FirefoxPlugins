function listener(details) {
  console.log("Loading: " + details.url);
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();
  
  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    // Just change any instance of Example in the HTTP response
    // to WebExtension Example.

    //str = str.replace('"at_property": "f5160ddd-24fe-18e0-145a-0825411bb0cd"','"at_property": "f5160ddd-24fe-18e0-145a-0825411bb0cde"');  
	
    filter.write(encoder.encode(str));
    //filter.disconnect();
  }

  filter.onstop = event => {
    filter.close();
  }
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://resources.digital-cloud.medallia.com/wdcus/40640/onsite/generic1646044320511.js"], types: ["script"]},
  ["blocking"]
);
